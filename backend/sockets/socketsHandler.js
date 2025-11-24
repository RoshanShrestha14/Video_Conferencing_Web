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
      io.to(meetingCode).emit("user-joined", {
        userId: socket.userId,
        userName: socket.userName,
      });   
    });

    //for messages 
      socket.on("send-messages",({message,code})=>{
        console.log(`from: ${socket.userName} to everyone : ${message}`);
        io.to(code).emit("receive",{
        name: socket.userName,
        messages: message,
      })
      })
  });
};
