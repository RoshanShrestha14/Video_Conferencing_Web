const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = require("./app");
const {socketHandler} = require("./sockets/socketsHandler");
const PORT = process.env.PORT || 3002;
const httpServer = createServer(app);

// Attach Socket.IO
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Use separate socket handler file
socketHandler(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
