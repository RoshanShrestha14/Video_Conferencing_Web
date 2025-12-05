const socketAuthMiddleware = require("../Middlewares/SocketAuthMiddleware");

module.exports.socketHandler = (io) => {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log(
      `socket user id : ${socket.userId}  and socket userName : ${socket.userName}`
    );

    socket.on("join-meeting", (meetingCode) => {
      console.log(`User ${socket.userName} joined meeting: ${meetingCode}`);
      socket.join(meetingCode);
      const existingUsers = [];

      const room = io.sockets.adapter.rooms.get(meetingCode);
      console.log(room);

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
      console.log(`from: ${socket.userName} to everyone : ${message}`);
      io.to(code).emit("receive", {
        name: socket.userName,
        messages: message,
      });
    });

    socket.on("offer", (data) => {
      console.log(`WebRTC offer from ${socket.id} to ${data.to}`);
      io.to(data.to).emit("offer", {
        from: socket.id,
        offer: data.offer,
      });
    });

    socket.on("answer", (data) => {
      console.log(`WebRTC answer from ${socket.id} to ${data.to}`);
      io.to(data.to).emit("answer", {
        from: socket.id,
        answer: data.answer,
      });
    });

    socket.on("ice-candidate", (data) => {
      console.log(`ICE candidate from ${socket.id} to ${data.to}`);
      io.to(data.to).emit("ice-candidate", {
        from: socket.id,
        candidate: data.candidate,
      });
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.userName}`);
    });
  });
};
