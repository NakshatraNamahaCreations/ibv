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

  async getProduct(req, res) {
    try {
      let product = await ProductListModel.find({});
      if (product) {
        return res.json({ productData: product });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async getProductByUserId(req, res) {
    try {
      let { userId } = req.body;
      const userProducts = await ProductListModel.find({
        userId,
      });
      // .sort({ _id });
      console.log("userProducts", userProducts);
      if (userProducts.length > 0) {
        return res.json({ getUserProduct: userProducts });
      } else {
        return res.json({ getUserProduct: [] });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch user products" });
    }
  }

  async getProductByUserId(req, res) {
    try {
      let { userId } = req.body;
      const userProducts = await ProductListModel.find({
        userId,
      });
      // .sort({ _id });
      console.log("userProducts", userProducts);
      if (userProducts.length > 0) {
        return res.json({ getUserProduct: userProducts });
      } else {
        return res.json({ getUserProduct: [] });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch user products" });
    }
  }
}

const ProductListController = new ProductList();
module.exports = ProductListController;
