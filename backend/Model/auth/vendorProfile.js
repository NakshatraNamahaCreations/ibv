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
    type: String,
  },
  dob: {
    type: String,
  },
  address: {
    type: String,
  },
  selfie: {
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
  selfie: {
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
  checkbox: {
    type: Boolean,
  },
  websiteaddress: {
    type: String,
  },
  createAt: {
    type: Date,
    default: Date.now(),
  },
  vendorstatus:{
    type:String
  }
});

const VendorModel = mongoose.model("vendorprofile", Vendor);
module.exports = VendorModel;