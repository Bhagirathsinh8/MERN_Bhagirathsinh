const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

require("../db/conn");
const User = require("../models/userSchema");

router.get("/", (req, res) => {
  res.send("Welcome to MERN Project Server Router JS");
});

// Using Promise To send data into database
// router.post("/registor", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;
//   // console.log(name);
//   // console.log(email);
//   // // res.json({message:req.body});
//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Please Fill All Fields" });
//   }
//   //     database store email :user Fill Email in frontend
//   User.findOne({ email: email })
//     .then((userExists) => {
//       if (userExists) {
//         return res.status(422).json({ error: "Email already exists" });
//       }

//       const user = new User({ name, email, phone, work, password, cpassword });
//       user.save()
//         .then((user) => {
//           res.status(201).json({ message: "User Registered Successfully", user });
//         })
//         .catch((err) => res.status(500).json({ error: "Failed To Register" }));
//     })
//     .catch((err) => {
//       console.log("m");
//     });
// });

//Using Async Await
router.post("/registor", async (req, res) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please Fill All Fields" });
  }

  try {
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      return res.status(422).json({ error: "Email already exists" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "Email already exists" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });
      //hash call
      const userRegister = await user.save();

      // without if statement
      res.status(201).json({ message: "User Registered Successfully", user });
    }
  } catch (err) {
    console.log(err);
  }
});

//Login Route
router.post("/signin", async (req, res) => {
  // console.log(req.body)
  // res.json({message:req.body});
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({ error: "Please Fill All Fields" });
    }

    const userLogin = await User.findOne({ email: email });
    // console.log(userLogin);
    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (!isMatch) {
        res.status(400).json({ message: "Login Unsuccessfull pass Wrong" });
      } else {
        res.json({ message: "Login Success " });
      }
    } else {
      res.status(400).json({ message: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
