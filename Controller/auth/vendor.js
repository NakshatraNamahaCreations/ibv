const VendorModel = require("../../Model/auth/vendorProfile");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const generateSeriesNumber = require("../../Config/function");

class vendorProfile {
  // async function generateSeriesNumber(req, res) {
  //   try {
  //     // Find the latest account in the collection
  //     const newUser = await VendorModel.findOne(
  //       {},
  //       {},
  //       { sort: { seriesNumber: -1 } }
  //     );

  //     // Extract the series number from the latest account
  //     let seriesNumber = 1;
  //     if (newUser) {
  //       const newUserNumber = newUser.seriesNumber;
  //       seriesNumber = parseInt(newUserNumber.split("-")[1]) + 1;
  //     }

  //     // Generate the new account number with the series number
  //     const newseriesNumber = `IM2023-${seriesNumber}`;
  //     console.log("newseriesNumber=====", newseriesNumber);
  //     return newseriesNumber;
  //   } catch (error) {
  //     console.error("Error generating series number:", error);
  //     throw error;
  //   }
  // }

  async createAccount(req, res) {
    try {
      // Generate the series number
      // const uniqueNumber = await generateSeriesNumber();
      let {
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        alternativeNumber,
        aadhaarNumber,
        dob,
        address,
        distric,
        pincode,
        state,
        businessName,
        businesstype,
        category,
      } = req.body;

      // Find the current count from the database and increment it
      let vendorCount = await VendorModel.findOneAndUpdate(
        {},
        { $inc: { count: 1 } },
        { new: true }
      );

      if (!vendorCount) {
        vendorCount = new VendorModel({ count: 1 });
        await vendorCount.save();
      }

      // Check if vendorCount is still undefined
      if (!vendorCount) {
        console.error("Error retrieving count from database");
        return res.status(500).json({ error: "An error occurred" });
      }

      // Generate the custom number
      const customNumber = `IM2023${vendorCount.count}`;

      password = bcrypt.hashSync(password, 10);
      // firstname = toTitleCase(firstname);
      const Email = await VendorModel.findOne({ email: email });
      if (Email) {
        return res.status(500).json({ error: "Email already exits" });
      }

      const phone = await VendorModel.findOne({ phoneNumber: phoneNumber });
      if (phone) {
        return res.status(500).json({ error: "mobile number already exits" });
      }
      const newVendor = new VendorModel({
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
        alternativeNumber,
        dob,
        address,
        distric,
        pincode,
        state,
        businessName,
        businesstype,
        category,
        customNumber,
      });
      newVendor.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ Success: "Account created. Please login", user: data });
      });
    } catch (error) {
      console.error("Error creating account:", error);
    }
  }

  async vendorLogin(req, res) {
    let { email, password } = req.body;
    try {
      if (!email || !password) {
        return res.status(500).json({ error: "Please fill all fields" });
      } else {
        const data = await VendorModel.findOne({ email: email });
        if (!data) {
          return res.status(500).json({ error: "Invalid email id" });
        } else {
          const passcheck = bcrypt.compare(password, data.password);
          if (passcheck) {
            VendorModel.findOneAndUpdate({ email }, { status: "Online" });
            return res.json({ Success: "Signin successful", user: data });
          } else {
            return res.status(500).json({ error: "Invalid Password" });
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  async uploaddocument(req, res) {
    try {
      let id = req.params.id;
      let file = req.files[0].filename;
      let file1 = req.files[1].filename;
      let file2 = req.files[2].filename;
      let { aadhaarNumber, panNumber } = req.body;
      let data = await VendorModel.findByIdAndUpdate(
        { _id: id },
        {
          aadhaarNumber,
          panNumber,
          adharfrontendimg: file,
          adharbackendimg: file1,
          panimg: file2,
        }
      );
      if (data) {
        return res.json({ success: "Updated" });
      }
    } catch (error) {
      console.log(error);
    }
  }
  async getSignout(req, res) {
    let signout = req.params.userid;
    try {
      await VendorModel.findOneAndUpdate(
        { _id: signout },
        { status: "Offline" }
      )
        .then((data) => {
          return res.json({ Success: "Signout Successfully" });
        })
        .catch((err) => {
          return res.status({ error: "Something went wrong" });
        });
    } catch (error) {
      console.log(error);
    }
  }

  async getAllUser(req, res) {
    try {
      let allUser = await VendorModel.find({});
      res.json({ users: allUser });
    } catch {
      res.status(404);
    }
  }

  async getuser(req, res) {
    let id = req.params.userid;
    let isUser = await VendorModel.findOne({ _id: id });
    if (isUser) {
      return res.json({ NewUser: isUser });
    }
  }
}

const vendorProfileController = new vendorProfile();
// export default vendorProfileController;
module.exports = vendorProfileController;
