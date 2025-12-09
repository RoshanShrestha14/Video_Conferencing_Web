const { Schema } = require("mongoose");
const { model } = require("mongoose");

const meetingSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: "user", required: true },
  meetingCode: {
    type: String,
    require: true,
  },
  participants: [
    {
      userId: {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
    require: true,
  },
});

const meetingModel = new model("meeting", meetingSchema);

module.exports = meetingModel;
