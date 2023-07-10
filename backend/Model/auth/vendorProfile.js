const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Vendor = new Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  phoneNumber: {
    type: Number,
  },
  alternativeNumber: {
    type: Number,
  },
  aadhaarNumber: {
    type: Number,
  },
  panNumber: {
    type: Number,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },

  distric: {
    type: String,
  },
  pincode: {
    type: Number,
  },
  state: {
    type: String,
  },
  businessName: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  category: {
    type: String,
  },
  businesstype: {
    type: String,
  },
  adharfrontendimg: {
    type: String,
  },
  adharbackendimg: {
    type: String,
  },
  panimg: {
    type: String,
  },
  customNumber: {
    type: String,
    require: true,
    unique: true,
  },
  count: {
    type: Number,
    default: 0,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
});

const VendorModel = mongoose.model("vendorprofile", Vendor);
module.exports = VendorModel;
