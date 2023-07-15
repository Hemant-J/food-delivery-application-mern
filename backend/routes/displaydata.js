const express = require("express");
const router = express.Router();

router.post("/foodData", (req, res) => {
  console.log("food data route called");
  try {
    //console.log(global.food_items, global.food_category);
    res.send([global.food_items, global.food_category]);
  } catch (error) {
    console.log(error);
    res.send("server.error");
  }
});

module.exports = router;
