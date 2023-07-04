const ServicesSubcatagoryModel = require("../../Model/Services/Subcategory");

class SubCatagory {
  async AddSubcatagoryservices(req, res) {
    let { SubcatagoryName, catagoryName } = req.body;
    let file = req.file?.filename;
    try {
      let newSubCatagory = new ServicesSubcatagoryModel({
        SubcatagoryImage: file,
        SubcatagoryName,
        catagoryName,
        businesstype: "Categoryes",
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select image",
        });
      }
      newSubCatagory.save().then((data) => {
        console.log(data);
        return res.status(200).json({ success: "success" });
      });
    } catch (error) {
      console.log(error);
    }
  }

  async getsubcategoryservices(req, res) {
    let subcategory = await ServicesSubcatagoryModel.find({}).sort({ _id: -1 });
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async postsubcategory(req, res) {
    let { categoryname } = req.body;
    let subcatagoryservices = await ServicesSubcatagoryModel.find({
      categoryname,
    }).sort({
      _id: -1,
    });
    console.log(subcatagoryservices);
    if (subcatagoryservices) {
      return res.json({ subcatagoryservices: subcatagoryservices });
    }
  }

  async getSubcategoriesservicesByCategory(req, res) {
    const catagoryname = req.params.categoryId;
    try {
      const subcatagoryservices = await ServicesSubcatagoryModel.find({
        catagoryname,
      }).sort({
        _id: -1,
      });
      if (subcatagoryservices) {
        console.log("catagoryname", catagoryname);
        return res.json({ subcatagoryservices: subcatagoryservices });
      }
    } catch (err) {
      console.log(err);

      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getAllSubcatagoryservice(req, res) {
    try {
      let subcatagoryservices = await ServicesSubcatagoryModel.aggregate([
        {
          $lookup: {
            from: "catagories",
            localField: "catagoryId",
            foreignField: "_id",
            as: "catagories",
          },
        },
      ]);
      if (subcatagoryservices) {
        return res.send({ subcatagoryservices: subcatagoryservices });
      } else {
        return res.status(404).json({ error: "subcatagory didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async deleteSubCatagory(req, res) {
    let subcatagory = req.params.subcatagoryid;
    const data = await ServicesSubcatagoryModel.deleteOne({ _id: subcatagory });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }
}

const SubCatagoryserviceController = new SubCatagory();
module.exports = SubCatagoryserviceController;
