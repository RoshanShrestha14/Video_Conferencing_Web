const socketAuthMiddleware = require("../Middlewares/SocketAuthMiddleware");
const allParticipants = [];

module.exports.socketHandler = (io) => {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
  
    socket.on("join-meeting", (meetingCode) => {
      socket.join(meetingCode);
      const existingUsers = [];

      const room = io.sockets.adapter.rooms.get(meetingCode);

      if (room) {
        // room is a Set - iterate through socket IDs
        room.forEach((otherSocketId) => {
          // Skip the new joiner themselves
          if (otherSocketId !== socket.id) {
            const otherSocketObject = io.sockets.sockets.get(otherSocketId);
            existingUsers.push({
              userId: otherSocketObject.userId,
              userName: otherSocketObject.userName,
              socketId: otherSocketObject.id,
            });
          }
        });
      }
      if (existingUsers.length > 0) {
        socket.emit("existing-users", existingUsers);
      }

      socket.to(meetingCode).emit("user-joined", {
        userId: socket.userId,
        userName: socket.userName,
        socketId: socket.id,
      });
    });

    socket.on("send-messages", ({ message, code }) => {
      io.to(code).emit("receive", {
        name: socket.userName,
        messages: message,
      });
    });

    socket.on("offer", (data) => {
      io.to(data.to).emit("offer", {
        from: socket.id,
        offer: data.offer,
      });
    });

    socket.on("answer", (data) => {
      io.to(data.to).emit("answer", {
        from: socket.id,
        answer: data.answer,
      });
    });

    socket.on("ice-candidate", (data) => {
      io.to(data.to).emit("ice-candidate", {
        from: socket.id,
        candidate: data.candidate,
      });
    });

    socket.on("audio-status", (data) => {
      const { socketId, audioStatus, meetingCode } = data;
      io.to(meetingCode).emit("audio-status", {
        socketId: socketId,
        audioStatus: audioStatus,
      });
    });

    socket.on("video-status", (data) => {
      const { socketId, videoStatus, meetingCode } = data;

      io.to(meetingCode).emit("video-status", {
        socketId: socketId,
        videoStatus: videoStatus,
      });
    });

    socket.on("leave-meeting", (data) => {
      const { meetingCode } = data;
      socket.leave(meetingCode);

      socket.to(meetingCode).emit("user-left", {
        socketId: socket.id,
      });

    });

    socket.on("updated participants", (data) => {
      io.to(data.meetingCode).emit("participants", data.participants);
    });
  });
};
