const express = require("express");
const router = express.Router();
const ServiceProductListController = require("../../Controller/Services/serviceProductList");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/ServiceProductList");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/addserviceproducts",
  upload.single("serviceProductImage"),
  ServiceProductListController.AddProduct
);

// router.get(
//   "/getservicecatagory",
//   catagoryserviceController.getAllcatagoryservices
// );
// router.post(
//   "/deleteservicecatagory/:catagoryid",
//   catagoryserviceController.deleteserviceCatagory
// );
router.post(
  "/serviceproductbyuserid",
  ServiceProductListController.getServiceProductByUserId
);
router.post(
  "/serviceproductbysubcatagory",
  ServiceProductListController.ProductsBySubcategory
);
router.post(
  "/updateservice/:id",
  upload.single("serviceProductImage"),
  ServiceProductListController.updateService
);

module.exports = router;
