const { Schema } = require("mongoose");
const { model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  fullName: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 12);
});

const userModel = new model("user", userSchema);
module.exports = userModel;
