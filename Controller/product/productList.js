const ProductListModel = require("../../Model/product/productList");

class ProductList {
  async AddProduct(req, res) {
    let {
      // catagoryId,
      // subcatagoryId,
      productName,
      ProductPrice,
      productDescription,
      productQuantity,
      productStatus,
      ProductBrand,
      productSize,
      productDiscount,
    } = req.body;
    let file = req.file?.filename;
    try {
      let newCatagory = new ProductListModel({
        productImage: file,
        // catagoryId,
        // subcatagoryId,
        productName,
        ProductPrice,
        productDescription,
        productQuantity,
        productStatus,
        ProductBrand,
        productSize,
        productDiscount,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select product image",
        });
      }
      newCatagory.save().then((data) => {
        console.log(data);
        return res.status(200).json({ success: "success" });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getcatagory(req, res) {
    try {
      let catagory = await ProductListModel.find({});
      if (catagory) {
        return res.json({ catagory: catagory });
      }
    } catch (err) {
      console.log(err);
    }
  }
}

const ProductListController = new ProductList();
module.exports = ProductListController;
