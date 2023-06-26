const express = require("express");
const router = express.Router();
const ProductListController = require("../../Controller/product/productList");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/productlist");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addproduct",
  upload.single("productImage"),
  ProductListController.AddProduct
);
router.get("/getcatagory", ProductListController.getcatagory);
router.get("/getproduct", ProductListController.getProduct);

module.exports = router;
