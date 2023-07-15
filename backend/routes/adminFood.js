const express = require("express");
const router = express.Router();
const food_item = require("../models/FoodItem");

router.get("/allFoodData", async (req, res) => {
  let data = await food_item.find({});
  if (data !== {}) {
    res.send(data);
    //console.log(data);
  } else {
    res.send("error");
    console.log("error in retreving food");
  }
});

router.post("/addFoodItem", async (req, res) => {
  try {
    let response = await food_item.create({
      CategoryName: req.body.CategoryName,
      name: req.body.name,
      img: req.body.img,
      options: req.body.options,
      description: req.body.description,
    });
    console.log(response);
    res.json({ success: "true" });
  } catch (error) {
    console.log("error:", error);
    res.json({ success: "false" });
  }
});
module.exports = router;
