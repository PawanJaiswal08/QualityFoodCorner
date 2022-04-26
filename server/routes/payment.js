const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const Razorpay = require("razorpay");
const Order = require("./../models/order");
dotenv.config({ path: "./config.env" });

router.get("/get-razorpay-key", (req, res) => {
  res.send({ key: process.env.RAZORPAY_KEY_ID });
});

router.post("/create-order", async (req, res) => {
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

    res.send(order);
  } catch (error) {
    console.log("err", error);
    res.status(500).send(error);
  }
});

router.post("/pay-order", async (req, res) => {
  try {
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
    res.send({
      msg: "Payment was successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

module.exports = router;