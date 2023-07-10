const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ServiceProductList = new Schema({
  userId: {
    type: String,
    required: true,
  },
  serviceSubcatagoryName: {
    type: String,
  },
  serviceCatagoryName: {
    type: String,
  },
  serviceProductName: {
    type: String,
  },
  serviceProductPrice: {
    type: Number,
  },
  serviceProductImage: {
    type: String,
  },
  serviceProductDescription: {
    type: String,
  },
  serviceProductQuantity: {
    type: String,
  },
  serviceProductStatus: {
    type: String,
    default: "active",
  },
  serviceProductBrand: {
    type: String,
  },
  serviceProductSize: {
    type: String,
  },
  serviceProductDiscount: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ServiceProductListModal = mongoose.model(
  "ServiceProducts",
  ServiceProductList
);
module.exports = ServiceProductListModal;
