const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const banner = new Schema({
  bannerImage: {
    type: String,
  },
  content: {
    type: String,
  },
});

const bannerModel = mongoose.model("banner", banner);
module.exports = bannerModel;
