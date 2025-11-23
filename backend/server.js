const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = require("./app");
const {socketHandler} = require("./sockets/socketsHandler");
const PORT = process.env.PORT || 3002;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});

socketHandler(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
