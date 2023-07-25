const express = require("express");
const router = express.Router();
const vendorProfileController = require("../../Controller/auth/vendor");
const multer = require("multer");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "Public/documents");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});

const upload = multer({ storage: storage });
router.post("/signup", vendorProfileController.createAccount);
router.post("/login", vendorProfileController.vendorLogin);
router.post("/postsubcategory", vendorProfileController.postsubcategory);
router.post(
  "/uploaddocument/:id",
  upload.any(),
  vendorProfileController.uploaddocument
);
router.get("/signout/:id", vendorProfileController.getSignout);
router.get("/getuser/:userid", vendorProfileController.getuser);
router.get("/getalluser", vendorProfileController.getAllUser);
router.post("/useredit/:id", vendorProfileController.userupdate);

module.exports = router;
