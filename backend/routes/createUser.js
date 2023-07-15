const express = require("express");
const User = require("../models/User");
const Joi = require("joi");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  email: Joi.string().email().required(),
  location: Joi.string().required(),
  user_type: Joi.string(),
  admin_key: Joi.string().allow(null, ""),
});
router.post("/createuser", async (req, res) => {
  console.log(req.body);
  const { error, value } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ error: error.details[0].message });
    console.log("Error in Joi Validation******", error);
    return;
  } else {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    const duplicate = await User.count({ email: req.body.email });
    if (duplicate !== 0) {
      res.status(400).json({ error: "Email Already exists" });
      console.log("Error in Duplicate Validation******");
    } else {
      if (req.body.user_type === "User") {
        try {
          const result = await User.create({
            name: req.body.name,
            password: secPassword,
            email: req.body.email,
            location: req.body.location,
            user_type: req.body.user_type,
          });
        } catch (error) {
          res.status(400).json({ error: error.details[0].message });
          console.log("Error in Server******", error);
        }
      } else {
        if (req.body.admin_key === "adminkey") {
          try {
            const result = await User.create({
              name: req.body.name,
              password: secPassword,
              email: req.body.email,
              location: req.body.location,
              user_type: req.body.user_type,
            });
          } catch (error) {
            res.status(400).json({ error: error.details[0].message });
            console.log("Error in Server******", error);
          }
        } else {
          res.status(400).json({ error: "Invalid Admin Key" });
          console.log("Error in Server admin key******", error);
        }
      }
      res.json({ done: true });
    }
  }
});

router.post("/login", async (req, res) => {
  let email = req.body.email;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid Email or Pass", login: "false" });
    }

    const newpassword = await bcrypt.compare(req.body.password, user.password);

    if (!newpassword) {
      return res
        .status(400)
        .json({ error: "Invalid Email or Pass", login: "false" });
    }
    const data = {
      currUser: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, process.env.JWT_SEC);
    console.log(authToken);
    return res.json({
      login: true,
      authToken: authToken,
      userType: user.user_type,
    });
  } catch (error) {
    console.log(error);
    res.json({ login: false });
  }
});

router.get("/users", async (req, res) => {
  let data = await User.find({});
  try {
    let data = await User.find({});
    res.send(data).status(200);
    //console.log(data);
  } catch (error) {
    res.send(error).status(400);
  }
});

router.post("/delUser", async (req, res) => {
  try {
    let response = await User.findByIdAndDelete(req.body.id);
    res.json({ response: response, success: true });
    //console.log(req.body.id);
  } catch (error) {
    //console.log("error in server", error);
    res.json({ success: false });
  }
});

module.exports = router;
