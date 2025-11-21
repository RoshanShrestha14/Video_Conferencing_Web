const { userVerification } = require("../Middlewares/AuthMiddleware");
const { createMeeting } = require("../Controllers/MeetingController");

const router = require("express").Router();

router.post("/new", userVerification, createMeeting);

module.exports = router;
