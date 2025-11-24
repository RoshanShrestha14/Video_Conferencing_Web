const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");
const cookie = require("cookie");

const socketAuthMiddleware = (socket, next) => {
  try {
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.token;

    if (!token) {
      return next(new Error("Authentication error: No token provided"));
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    userModel
      .findById(decoded.id)
      .then((user) => {
        if (!user) {
          return next(new Error("Authentication error: User not found"));
        }
        socket.userId = decoded.id;
        socket.userName = user.userName;
        next();
      })
      .catch((err) => {
        next(new Error("Authentication error: Database error"));
      });
  } catch (err) {
    next(new Error("Authentication error: Invalid token"));
  }
};

module.exports = socketAuthMiddleware;
