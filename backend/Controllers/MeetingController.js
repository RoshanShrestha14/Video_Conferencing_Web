const meetingModel = require("../Models/meetingSchema");

const generateMeetingCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

module.exports.createMeeting = async (req, res) => {
  try {
    const meetingCode = generateMeetingCode();
    const newMeeting = await meetingModel.create({
      creator: req.userId,
      meetingCode: meetingCode,
    });
    res.status(201).json({
      message: "Meeting created successfully",
      success: true,
      meeting: newMeeting,
    });
  } catch (error) {
    console.error("Create Meeting Error", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
