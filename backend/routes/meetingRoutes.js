const { userVerification } = require("../Middlewares/AuthMiddleware");
const { createMeeting ,joinMeeting, history} = require("../Controllers/MeetingController");


const router = require("express").Router();

router.post("/new", userVerification, createMeeting);
router.post('/join',userVerification,joinMeeting)
router.get('/history',userVerification,history);



module.exports = router;
