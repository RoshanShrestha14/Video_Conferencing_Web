const { createServer } = require("node:http");
const { Server } = require("socket.io");
const app = require("./app");
const {socketHandler} = require("./sockets/socketsHandler");
const PORT = process.env.PORT || 3002;
const httpServer = createServer(app);

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL,
    methods: ["GET", "POST"],
    credentials: true,
        allowedHeaders: ["Content-Type", "Authorization"]

  },
  connectTimeout: 45000,
  pingTimeout: 20000,
  pingInterval: 25000
});



socketHandler(io);

httpServer.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
