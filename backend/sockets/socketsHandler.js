const socketAuthMiddleware = require("../Middlewares/SocketAuthMiddleware");

module.exports.socketHandler = (io) => {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log(
      `socket user id : ${socket.userId}  and socket userName : ${socket.userName}`
    );

    //for joining
    socket.on("join-meeting", (meetingCode) => {
      console.log(`meetingCode is ${meetingCode}`);
      socket.join(meetingCode);
      socket.to(meetingCode).emit("user-joined", {
        userId: socket.id,
        userName: socket.userName,
      });
    });

    socket.on("send-messages", ({ message, code }) => {
      console.log(`from: ${socket.userName} to everyone : ${message}`);
      io.to(code).emit("receive", {
        name: socket.userName,
        messages: message,
      });
    });

    socket.on("webrtc-offer", (data) => {
      io.to(data.to).emit("webrtc-offer", {
        from: socket.id,
        offer: data.offer,
      });
    });

    socket.on("webrtc-answer", (data) => {
      io.to(data.to).emit("webrtc-answer", {
        from: socket.id,
        answer: data.answer,
      });

      socket.on("ice-candidate", (data) => {
        io.to(data.to).emit("ice-candidate", {
          from: socket.id,
          candidate: data.candidate,
        });
      });
    });
  });
};
