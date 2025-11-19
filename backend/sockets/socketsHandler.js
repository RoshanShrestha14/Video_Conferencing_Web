
let connections = {};
let message = {};
let timeOnline = {};

module.exports.socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("⚡ User connected:", socket.id);
    // socket.on("join-call", (path) => {
    //    if(connections[path]===undefined){
    //     connections[path].push(socket.id)
    //     timeOnline[socket.id]=new Date();
    //      for(let i=0; i < connections[path].length;i++){
    //       io.connections[path][i].emit("user-joined",socket.id,connections[path])


    //      }
    //      if(message[path]===undefined)
    //      {
          
    //      }
     

    //    }

    // });
    socket.on("signal", (toId, message) => {
      io.to(toId).emit("signal", socket.id, message);
    });

    socket.on("disconnect", () => {
      console.log(" User disconnected:", socket.id);
    });
  });
};
