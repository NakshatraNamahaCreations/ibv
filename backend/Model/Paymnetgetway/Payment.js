const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const paymentgetwaymodel = new Schema({
  orderId: {
    type: String,
  },
  amount: {
    type: Number,
  },
  transactionId: {
    type: String,
  },
  status: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
  cardNumber: { type: String },
  expiryDate: { type: String },
  cvv: { type: String },
});
const Paymentgetwaymodel = mongoose.model(
  "paymentgetwaymodel",
  paymentgetwaymodel
);
module.exports = Paymentgetwaymodel;
