const ServiceProductListModal = require("../../Model/Services/serviceProductList");

class ServiceProductList {
  async AddProduct(req, res) {
    let {
      userId,
      serviceSubcatagoryName,
      serviceCatagoryName,
      serviceProductName,
      serviceProductPrice,
      serviceProductImage,
      serviceProductDescription,
      serviceProductQuantity,
      serviceProductStatus,
      serviceProductBrand,
      serviceProductSize,
      serviceProductDiscount,
    } = req.body;
    let file = req.file?.filename;
    try {
      let newProductList = new ServiceProductListModal({
        userId,
        serviceSubcatagoryName,
        serviceCatagoryName,
        serviceProductName,
        serviceProductPrice,
        serviceProductImage: file,
        serviceProductDescription,
        serviceProductQuantity,
        serviceProductStatus,
        serviceProductBrand,
        serviceProductSize,
        serviceProductDiscount,
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select product image",
        });
      }
      newProductList.save().then((data) => {
        console.log(data);
        return res.status(200).json({ success: "success" });
      });
    } catch (error) {
      console.log("error:", error);
    }
  }

  async getServiceProductByUserId(req, res) {
    try {
      let { userId } = req.body;
      const userProducts = await ServiceProductListModal.find({
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

  async ProductsBySubcategory(req, res) {
    try {
      let { serviceSubcatagoryName } = req.body;
      const products = await ServiceProductListModal.find({
        serviceSubcatagoryName,
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

  async updateService(req, res) {
    try {
      const productId = req.params.id;
      const {
        userId,
        serviceCatagoryName,
        serviceSubcatagoryName,
        serviceProductName,
        serviceProductPrice,
        serviceProductImage,
        serviceProductDescription,
        serviceProductQuantity,
        serviceProductStatus,
        serviceProductBrand,
        serviceProductSize,
      } = req.body;
      const file = req.file?.filename;
      const existingService = await ServiceProductListModal.findById(productId);
      // Check each field and update only if it has a value
      if (userId) existingService.userId = userId;
      if (serviceCatagoryName)
        existingService.serviceCatagoryName = serviceCatagoryName;
      if (serviceSubcatagoryName)
        existingService.serviceSubcatagoryName = serviceSubcatagoryName;
      if (serviceProductName)
        existingService.serviceProductName = serviceProductName;
      if (serviceProductPrice)
        existingService.serviceProductPrice = serviceProductPrice;
      if (serviceProductDescription)
        existingService.serviceProductDescription = serviceProductDescription;
      if (serviceProductQuantity)
        existingService.serviceProductQuantity = serviceProductQuantity;
      if (serviceProductStatus)
        existingService.serviceProductStatus = serviceProductStatus;
      if (serviceProductBrand)
        existingService.serviceProductBrand = serviceProductBrand;
      if (serviceProductSize)
        existingService.serviceProductSize = serviceProductSize;
      if (file) existingService.serviceProductImage = file;
      const updatedService = await existingService.save();
      return res.json({ success: "Updated", product: updatedService });
    } catch (error) {
      console.log("error", error);
      return res.status(500).json({ error: "Unable to update the product" });
    }
  }
}

const ServiceProductListController = new ServiceProductList();
module.exports = ServiceProductListController;
