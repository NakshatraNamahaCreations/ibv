const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const categoryservices = new Schema({
  categoryname: {
    type: String,
  },
  categoryimage: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});
const ServiceCategoryModel = mongoose.model(
  "categoryservices",
  categoryservices
);
module.exports = ServiceCategoryModel;
