const SubcatagoryModel = require("../../Model/product/subCatagory");

class SubCatagory {
  async AddSubcatagory(req, res) {
    let { SubcatagoryName, catagoryName } = req.body;
    let file = req.file?.filename;
    try {
      let newSubCatagory = new SubcatagoryModel({
        SubcatagoryImage: file,
        SubcatagoryName,
        catagoryName,
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

  async getsubcategory(req, res) {
    let subcategory = await SubcatagoryModel.find({}).sort({ _id: -1 });
    if (subcategory) {
      return res.json({ subcategory: subcategory });
    }
  }

  async postsubcategory(req, res) {
    let { categoryName } = req.body;
    let data = await SubcatagoryModel.find({ categoryName }).sort({
      _id: -1,
    });
    console.log(data);
    if (data) {
      return res.json({ subcategory: data });
    }
  }

  async getAllSubcatagory(req, res) {
    try {
      let AllsubCatagory = await SubcatagoryModel.aggregate([
        {
          $lookup: {
            from: "catagories",
            localField: "catagoryId",
            foreignField: "_id",
            as: "catagories",
          },
        },
      ]);
      if (AllsubCatagory) {
        return res.send({ subcatagory: AllsubCatagory });
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
    const data = await SubcatagoryModel.deleteOne({ _id: subcatagory });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }
}

const SubCatagoryController = new SubCatagory();
module.exports = SubCatagoryController;
