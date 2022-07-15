const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//Register
router.post("/register", async (req, res) => {
  try {
    //Generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password,salt);

    //Create new user
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
    });

    //Save user and return response
    const user = await newUser.save();
    res.status(200).json(user);
  } catch(err) {
      res.status(500).json(err);
  }
});

//Login
router.post("/login", async(req,res)=>{
  try {
    
    const user = await User.findOne({username:req.body.username});

    const validPassword = await bcrypt.compare(req.body.password,user.password);
    //If wrong password is entered
    if(!user && !validPassword){
      res.status(401).json("Wrong username or password, try again")
    } else if (user && !validPassword){
      res.status(401).json("Wrong password, try again")
    } else if (!user){
      res.status(404).json("User not found!");
    } else {
      //If correct username and password
      const { password, ...others } = user._doc;
      res.status(200).json(others);
    };
  }catch(err){
    res.status(500).json(err);
  }
  
});

module.exports = router;