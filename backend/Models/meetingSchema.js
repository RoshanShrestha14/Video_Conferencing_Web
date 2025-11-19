const { Schema } = require("mongoose");
const { model } = require("mongoose");

const meetingSchema = new Schema({
  user_id: {
    type: String,
  },
  meetingCode: {
    type: Number,
    require: true,
  },
  date: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

const meetingModel = new model("meeting",meetingSchema);

module.exports = meetingModel;