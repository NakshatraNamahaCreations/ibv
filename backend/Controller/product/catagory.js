const catagoryModal = require("../../Model/product/catagory");

class Catagory {
  async Addcatagory(req, res) {
    let { catagoryName } = req.body;
    let file = req.file?.filename;
    try {
      let newCatagory = new catagoryModal({
        catagoryImage: file,
        catagoryName,
        businesstype: "Products",
      });
      if (!file) {
        return res.status(500).json({
          status: 500,
          error: "Please select catagory image",
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

  async getAllcatagory(req, res) {
    try {
      let catagory = await catagoryModal.find({});
      if (catagory) {
        return res.json({ catagory: catagory });
      }
    } catch (err) {
      console.log(err);
    }
  }

  async postcategory(req, res) {
    let { businesstype } = req.body;
    let data = await catagoryModal
      .find({
        businesstype,
      })
      .sort({
        _id: -1,
      });

    if (data) {
      return res.json({ catagory: data });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }

  async deleteCatagory(req, res) {
    let catagory = req.params.catagoryid;
    const data = await catagoryModal.deleteOne({ _id: catagory });
    if (data) {
      return res.json({ success: "Deleted Successfully" });
    } else {
      return res.json({ error: "not able to complete" });
    }
  }
}

const catagoryController = new Catagory();
module.exports = catagoryController;
