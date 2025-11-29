const socketAuthMiddleware = require("../Middlewares/SocketAuthMiddleware");
const allSocket = {};

module.exports.socketHandler = (io) => {
  io.use(socketAuthMiddleware);

  io.on("connection", (socket) => {
    console.log(
      `socket user id : ${socket.userId}  and socket userName : ${socket.userName}`
    );

    allSocket[socket.id] = {
      userId: socket.userId,
      userName: socket.userName,
    };

    socket.on("join-meeting", (meetingCode) => {
      console.log(`User ${socket.userName} joined meeting: ${meetingCode}`);
      socket.join(meetingCode);
      
      socket.to(meetingCode).emit("user-joined", {
        userId: socket.userId,      
        userName: socket.userName,  
        socketId: socket.id         
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
      console.log(`WebRTC offer from ${socket.id} to ${data.to}`);
      io.to(data.to).emit("webrtc-offer", {
        from: socket.id,
        offer: data.offer,
      });
    });

    socket.on("webrtc-answer", (data) => {
      console.log(`WebRTC answer from ${socket.id} to ${data.to}`);
      io.to(data.to).emit("webrtc-answer", {
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
      delete allSocket[socket.id];
      
    });

  });
};