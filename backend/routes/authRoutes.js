const { Signup, Login } = require("../Controllers/AuthController");
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware");

router.post("/signup", Signup);
router.post("/login", Login);

//check user route
router.post('/check',userVerification, (req,res)=>{
    const user = req.User;
     if (user) return res.json({ success: true, user: user.userName,userId:req.userId });
      else return res.json({ success: false });
} );

module.exports = router;
