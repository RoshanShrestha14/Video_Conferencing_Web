const meetingModel = require("../Models/meetingSchema");

const generateMeetingCode = () =>
  Math.random().toString(36).substring(2, 8).toUpperCase();

module.exports.createMeeting = async (req, res) => {
  try {
    const meetingCode = generateMeetingCode();
    const newMeeting = await meetingModel.create({
      creator: req.userId,
      meetingCode: meetingCode,
      participants: [
        {
          userId: req.userId,
        },
      ],
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

module.exports.joinMeeting = async (req, res) => {
  const { meetingCode } = req.body;
  const meeting = await meetingModel.findOne({ meetingCode: meetingCode });
  if (!meeting) {
    return res.json({ success: false });
  }

  await meetingModel.updateOne(
    { meetingCode },
    { $addToSet: { participants: { userId: req.userId } } }
  );
  return res.json({ success: true });
};

module.exports.history = async (req, res) => {
  const userId = req.userId;
  try {
    const joinedMeetings = await meetingModel
      .find({
        "participants.userId": userId,
      })
      .populate("creator", "fullName");

    const history = joinedMeetings.map((meeting) => ({
      meetingCode: meeting.meetingCode,
      date: meeting.date,
      hostName: meeting.creator.fullName,
      totalParticipants: meeting.participants.length,
    }));

    res.status(200).json({ success: true, history });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};
