const express = require("express");
const router = express.Router();
const app = express();
var bodyParser = require("body-parser");
//app.use(bodyParser);
app.use(require("body-parser").json());
const order = require("../models/Orders");
const PendingOrder = require("../models/PendingOrder");
var jsonParser = bodyParser.json();
//var urlencodedParser = bodyParser.urlencoded({ extended: false });

router.post("/orderData", jsonParser, async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, {
    Order_date: req.body.order_date,
    status: "pending",
    order_id: req.body.order_id,
  });
  //await data.splice(0, 0, { status: "pending" });

  let emailID = await order.findOne({ email: req.body.email });
  //console.log("body", req.body.order_id);
  if (emailID === null) {
    try {
      await order
        .create({
          email: req.body.email,
          order_data: [data],
        })
        .then(() => {
          res.json({ sucess: true });
        });
    } catch (error) {
      console.log("error in server", error);
      res.json({ success: false });
    }
  } else {
    try {
      await order
        .findOneAndUpdate(
          { email: req.body.email },
          {
            $push: { order_data: data },
          }
        )
        .then(() => {
          res.json({ sucess: true });
        });
    } catch (error) {
      console.log("error in server", error);
      res.json({ sucess: false });
    }
  }
  let emailID1 = await PendingOrder.findOne({ email: req.body.email });
  if (emailID1 === null) {
    try {
      await PendingOrder.create({
        email: req.body.email,
        order_data: [data],
      }).then(() => {
        //res.json({ sucess: true });
      });
    } catch (error) {
      console.log("error in server for pending", error);
      //res.json({ success: false });
    }
  } else {
    try {
      await PendingOrder.findOneAndUpdate(
        { email: req.body.email },
        {
          $push: { order_data: data },
        }
      ).then(() => {
        //res.json({ sucess: true });
      });
    } catch (error) {
      console.log("error in server Pending ", error);
      //res.json({ sucess: false });
    }
  }
});

router.post("/myorderData", jsonParser, async (req, res) => {
  try {
    let myData = await order.findOne({ email: req.body.email });
    res.json({ orderData: myData });
  } catch (error) {
    res.send("error in server", error);
  }
});

router.get("/adminOrderData", jsonParser, async (req, res) => {
  try {
    let myData = await order.find({});
    res.send(myData);
  } catch (error) {
    res.send("error in server", error);
  }
});

module.exports = router;
