const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { ObjectId } = mongoose.Schema.Types;

const ProductList = new Schema({
  catagoryId: {
    type: ObjectId,
    ref: "catagories",
  },
  subcatagoryId: {
    type: ObjectId,
    ref: "subcatagories",
  },
  productName: {
    type: String,
  },
  ProductPrice: {
    type: Number,
  },
  productImage: {
    type: String,
  },
  productDescription: {
    type: String,
  },
  productQuantity: {
    type: Number,
  },
  productStatus: {
    type: String,
    default: "active",
  },
  ProductBrand: {
    type: String,
  },
  productSize: {
    type: String,
  },
  productDiscount: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const ProductListModel = mongoose.model("ProductList", ProductList);
module.exports = ProductListModel;
