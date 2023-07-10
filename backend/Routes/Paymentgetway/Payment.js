const express = require("express");
const router = express.Router();
const paymentgetwaycontroller = require("../../Controller/Paymentgetway/Payment");

// router.post("/addpayment", paymentgetwaycontroller.addPayment);
router.post("/pay", paymentgetwaycontroller.newpayment);
router.post("/payment/callback", paymentgetwaycontroller.callback);
router.post("/payment/:orderId", paymentgetwaycontroller.paymentstatus);
router.post("/addpayment", paymentgetwaycontroller.initiatePayment);

module.exports = router;
