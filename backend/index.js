const express = require("express");
const mongoose = require("mongoose");
const createuser = require("./routes/createUser");
const displaydata = require("./routes/displaydata");
const orderData = require("./routes/orderData");
const delItem = require("./routes/delItem");
const adminFood = require("./routes/adminFood");
const User = require("./models/User");
const Orders = require("./models/Orders");
const adminOrder = require("./routes/adminOrder");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = process.env.PORT;
const url = process.env.MONGO_URL;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With,Content-Type,Accept"
  );
  next();
});

mongoose
  .connect(url)
  .then(console.log("Connected to database"))
  .catch((err) => console.log(err));
var db = mongoose.connection;
const fetchingFI = async () => {
  const cursor = await db.collection("food_items").find();
  //console.log("dataaaaaaaaaa", fetched_data);
  global.food_items = await db
    .collection("food_items")
    .find({})
    .toArray(function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
};
fetchingFI();
const fetchingFC = async () => {
  const cursor = await db.collection("food_category").find();
  global.food_category = await db
    .collection("food_category")
    .find({})
    .toArray(function (err, data) {
      if (err) console.log(err);
      else console.log(data);
    });
};
fetchingFC();

app.get("/", (req, res) => {
  res.send("Working");
});
app.use("/api", createuser);
app.use("/api", displaydata);
app.use("/api", orderData);
app.use("/api", delItem);
app.use("/api", adminFood);
app.use("/api", adminOrder);
app.listen(port, () => {
  console.log(`listening on ${port}`);
});
