const socketAuthMiddleware = require("../Middlewares/SocketAuthMiddleware");

module.exports.socketHandler = (io) => {

  io.use(socketAuthMiddleware);
  
  io.on("connection", (socket) => {
    console.log( `socket user id : ${socket.userId }  and socket userName : ${socket.userName}`);  
  });
};
