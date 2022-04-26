const express = require("express");
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const router = express.Router();
const mongoose = require("mongoose");
// const Order = require("./../models/order");
dotenv.config({ path: "./config.env" });

const { isSignedin, isAuthenticated, isAdmin } = require("./../controllers/auth");

const OrderSchema = mongoose.Schema({
  isPaid: Boolean,
  amount: Number,
  razorpay: {
    orderId: String,
    paymentId: String,
    signature: String,
  },
});
const Order = mongoose.model("Order", OrderSchema);

router.get("/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/create-order", async (req, res) => {
  console.log(req.body.amount);
  //   console.log(process.env.RAZORPAY_KEY_ID);
  //   console.log(process.env.RAZORPAY_SECRET);
  try {
    const Instance = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_SECRET,
    });
    const options = {
      amount: req.body.amount,
      currency: "INR",
    };

    const order = await Instance.orders.create(options);
    if (!order) return res.status(500).send("Some error occured");

    // console.log(order);

    res.send(order);
  } catch (error) {
    console.log("err", error);
    res.status(500).send(error);
  }
});

router.post("/pay-order", async (req, res) => {
  try {
    console.log(req.body);
    
    const { amount, razorpayPaymentId, razorpayOrderId, razorpaySignature } =
      req.body;
    const newOrder = Order({
      isPaid: true,
      amount: amount,
      razorpay: {   
        orderId: razorpayOrderId,
        paymentId: razorpayPaymentId,
        signature: razorpaySignature,
      },
    //   user: req.body.userid,
    });
    await newOrder.save();
    console.log(req.body);
    res.send({
      msg: "Payment was successfull",
    });
    console.log("done");
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

//   app.get('/list-orders', async (req, res) => {
//     const orders = await Order.find();
//     res.send(orders);
//   });

module.exports = router;