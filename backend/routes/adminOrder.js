const express = require("express");
const router = express.Router();
const app = express();
var bodyParser = require("body-parser");
app.use(require("body-parser").json());
const order = require("../models/Orders");
const PendingOrder = require("../models/PendingOrder");
var jsonParser = bodyParser.json();

router.get("/adminOrder", jsonParser, async (req, res) => {
  try {
    let data = await PendingOrder.find({});
    res.send(data);
  } catch (error) {
    res.send(error);
  }
});

router.post("/adminOrderDel", jsonParser, async (req, res) => {
  try {
    let response = await PendingOrder.findByIdAndDelete(req.body.id);
    res.json({ response: response, success: true });
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
