//requiring modules
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes  = require("./routes/authRoutes");



const app = express();

//DB connection
async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("Database connected");
  } catch (err) {
    console.log("MongoDB Connection Failed!", err);
  }
}
connectDB();

//mddleware setup
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // For form data


app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);



//routes
app.use("/auth",authRoutes);



module.exports = app;