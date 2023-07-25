const ProductListModel = require("../../Model/product/productList");

class ProductList {
  async AddProduct(req, res) {
    let {
      userId,
      catagoryName,
      SubcatagoryName,
      productName,
      productPrice,
      productDescription,
      productQuantity,
      productStatus,
      productBrand,
      productSize,
      productDiscount,
      // productRange,
    } = req.body;
    let file = req.file?.filename;
    try {
      let newCatagory = new ProductListModel({
        productImage: file,
        userId,
        catagoryName,
        SubcatagoryName,
        // catagoryId,
        // subcatagoryId,
        productName,
        productPrice,
        productDescription,
        productQuantity,
        productStatus,
        productBrand,
        productSize,
        productDiscount,
        // productRange,
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
        console.log("product", product);
        return res.json({ productData: product });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async productrange(req, res) {
    try {
      const id = req.params.id;
      const { productRange } = req.body;

      const doc = await ProductListModel.findByIdAndUpdate(
        { _id: id },
        { $push: { productRange: productRange } },
        { new: true } // Optional: To return the updated document
      );

      res.json(doc);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // async getProductsBySubcategory(req, res) {
  //   try {
  //     const subcategoryId = req.params.subcategoryId;
  //     const products = await ProductListModel.find({
  //       subcategory: subcategoryId,
  //     });
  //     if (products) {
  //       return res.json({ products: products });
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  async ProductsBySubcategory(req, res) {
    try {
      let { SubcatagoryName } = req.body;
      const products = await ProductListModel.find({
        SubcatagoryName,
      });
      // .sort({ _id });
      console.log("product", products);
      if (products.length > 0) {
        return res.json({ product: products });
      } else {
        return res.json({ product: [] });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Failed to fetch subcategories" });
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

  async updateProduct(req, res) {
    try {
      const productId = req.params.id;
      const {
        userId,
        catagoryName,
        SubcatagoryName,
        productName,
        productPrice,
        productDescription,
        productQuantity,
        productStatus,
        productBrand,
        productSize,
      } = req.body;
      const file = req.file?.filename;

      const existingProduct = await ProductListModel.findById(productId);

      // Check each field and update only if it has a value
      if (userId) existingProduct.userId = userId;
      if (catagoryName) existingProduct.catagoryName = catagoryName;
      if (SubcatagoryName) existingProduct.SubcatagoryName = SubcatagoryName;
      if (productName) existingProduct.productName = productName;
      if (productPrice) existingProduct.productPrice = productPrice;
      if (productDescription)
        existingProduct.productDescription = productDescription;
      if (productQuantity) existingProduct.productQuantity = productQuantity;
      if (productStatus) existingProduct.productStatus = productStatus;
      if (productBrand) existingProduct.productBrand = productBrand;
      if (productSize) existingProduct.productSize = productSize;
      if (file) existingProduct.productImage = file;

      const updatedProduct = await existingProduct.save();

      return res.json({ success: "Updated", product: updatedProduct });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the product" });
    }
  }
}
const ProductListController = new ProductList();
module.exports = ProductListController;
