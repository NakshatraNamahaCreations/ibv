const ServiceCategoryModel = require("../../Model/Services/Category");

class Catagory {
  async Addcatagoryservices(req, res) {
    let { categoryname, userId } = req.body;
    let file = req.file?.filename;
    try {
      let newCatagory = new ServiceCategoryModel({
        categoryimage: file,
        categoryname,
        businesstype: "Services",
        userId,
      });
      let newData = newCatagory.save();
      if (newData) {
        return res.status(201).send({ message: `New Category` });
      } else {
        throw Error("Not Able To Save Data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getAllcatagoryservices(req, res) {
    try {
      let categoryservices = await ServiceCategoryModel.find({});
      if (categoryservices) {
        return res.json({ categoryservices: categoryservices });
      } else {
        return res.json({ message: "No Services Found" });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postcategory(req, res) {
    let { businesstype } = req.body;
    let data = await ServiceCategoryModel.find({
      businesstype,
    }).sort({
      _id: -1,
    });

    if (data) {
      return res.json({ categoryservices: data });
    }
  }

  async deleteserviceCatagory(req, res) {
    let catagory = req.params.catagoryid;
    const data = await ServiceCategoryModel.deleteOne({ _id: catagory });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }
}

const catagoryserviceController = new Catagory();
module.exports = catagoryserviceController;
