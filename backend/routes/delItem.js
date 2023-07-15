const express = require("express");
const router = express.Router();
const food_item = require("../models/FoodItem");

router.post("/delItem", async (req, res) => {
  try {
    let response = await food_item.findByIdAndDelete(req.body.id);
    res.json({ response: response, success: true });
    console.log(req.body.id);
  } catch (error) {
    console.log("error in server", error);
    res.json({ success: false });
  }
});

module.exports = router;
