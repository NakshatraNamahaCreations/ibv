const VendorModel = require("../../Model/auth/vendorProfile");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const generateSeriesNumber = require("../../Config/function");

class vendorProfile {
  async createAccount(req, res) {
    try {
      const {
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
        checkbox,
        websiteaddress,
        panImage,
        panNumber,
        selfie,
        gst,
        referralCode,
        accountName,
        accountNumber,
        latitude,
        longitude,
        categoryname,
        aadhaarNumber,
        // adharfrontendimg,
        // adharbackendimg,
        // panimg,
        // Add this if applicable
      } = req.body;

      const file = req.files[0]?.filename;
      const file1 = req.files[1]?.filename;
      const file2 = req.files[2]?.filename;
      // const file3 = req.files[3]?.filename;

      const vendorCount = await VendorModel.findOneAndUpdate(
        {},
        { $inc: { count: 1 } },
        { new: true }
      );

      if (!vendorCount) {
        const newVendorCount = new VendorModel({ count: 1 });
        await newVendorCount.save();
      }

      if (!vendorCount) {
        return res.status(500).json({ error: "An error occurred" });
      }

      const customNumber = `IM2023${vendorCount.count}`;
      const myReferalCode = `REFIM2023${vendorCount.count}`;

      const hashedPassword = bcrypt.hashSync(password, 10);

      const existingEmail = await VendorModel.findOne({ email });
      if (existingEmail) {
        return res.status(400).json({ error: "Email already exists" });
      }

      const existingPhone = await VendorModel.findOne({ phoneNumber });
      if (existingPhone) {
        return res.status(400).json({ error: "Mobile number already exists" });
      }

      const newVendor = new VendorModel({
        firstname,
        lastname,
        email,
        password: hashedPassword,
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
        referralCode,
        myReferalCode,
        websiteaddress,
        checkbox,
        panImage,
        panNumber,
        selfie,
        gst,
        accountName,
        accountNumber,
        latitude,
        longitude,
        categoryname,
        aadhaarNumber,
        adharfrontendimg: file,
        adharbackendimg: file1,
        panimg: file2,
        // selfieImage: file3,
      });

      const savedVendor = await newVendor.save();
      console.log(savedVendor);
      return res
        .status(201)
        .json({ success: "Account created. Please login", user: savedVendor });
    } catch (error) {
      console.error("Error creating account:", error);
      return res.status(500).json({ error: "An error occurred" });
    }
  }

  async postsubcategory(req, res) {
    let { businesstype } = req.body;
    let vendorprofile = await VendorModel.find({ businesstype }).sort({
      _id: -1,
    });

    if (vendorprofile) {
      return res.json({ vendorprofile: vendorprofile });
    }
  }

  // async vendorLogin(req, res) {
  //   let { email, password } = req.body;
  //   try {
  //     if (!email || !password) {
  //       return res.status(500).json({ error: "Please fill all fields" });
  //     } else {
  //       const data = await VendorModel.findOne({ email: email });
  //       if (!data) {
  //         return res.status(500).json({ error: "Invalid email id" });
  //       } else {
  //         const passcheck = bcrypt.compare(password, data.password);
  //         if (passcheck) {
  //           VendorModel.findOneAndUpdate({ email }, { status: "Online" });
  //           console.log("User Data:", data);
  //           return res
  //             .status(200)
  //             .json({ Success: "Signin successful", user: data });
  //         } else {
  //           return res.status(500).json({ error: "Invalid Password" });
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }

  async vendorLogin(req, res) {
    const { email, password } = req.body;
    try {
      if (!email) {
        return res
          .status(400)
          .json({ error: "Please enter your loginname or email" });
      }
      if (!password) {
        return res.status(400).json({ error: "Please enter your password" });
      }
      const user = await VendorModel.findOne({ email });
      if (!user) {
        return res
          .status(404)
          .json({ error: "User not found or invalid password" });
      }
      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ error: "Invalid password" });
      }
      await VendorModel.findOneAndUpdate({ email }, { status: "Online" });
      return res.json({ success: "Login successful", user });
    } catch (error) {
      console.error("Something went wrong", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }

  async uploaddocument(req, res) {
    try {
      let id = req.params.id;
      let file = req.files[0]?.filename;
      let file1 = req.files[1]?.filename;
      let file2 = req.files[2]?.filename;
      let file3 = req.files[3]?.filename;
      let { aadhaarNumber, panNumber } = req.body;
      let data = await VendorModel.findByIdAndUpdate(
        { _id: id },
        {
          aadhaarNumber,
          panNumber,
          adharfrontendimg: file,
          adharbackendimg: file1,
          panimg: file2,
          selfie: file3,
        }
      );
      if (data) {
        return res.json({ success: "Updated" });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async getdatawithpayment(req, res) {
    try {
      let Allvendor = await VendorModel.aggregate([
        {
          $lookup: {
            from: "paymentgetwaymodels",
            localField: "_id",
            foreignField: "userId",
            as: "paymentgetway",
          },
        },
      ]);
      if (Allvendor) {
        console.log(Allvendor);
        return res.send({ Allvendor: Allvendor });
      } else {
        return res.status(404).json({ error: "subcatagory didn't exist" });
      }
    } catch (error) {
      console.log(error);
      return res.status(404).json({ error: "Something went wrong" });
    }
  }

  async getSignout(req, res) {
    const signoutId = req.params.id;
    if (!signoutId) {
      return res.status(400).json({ error: "Invalid signout ID" });
    }

    // Simulate an error by trying to find the Vendor with the provided ID
    // Replace this line with your actual database query, which should return a promise
    VendorModel.findOneAndUpdate({ _id: signoutId }, { status: "Offline" })
      .then(() => {
        res.json({ Success: "Signout Successfully" });
      })
      .catch((error) => {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
      });
  }

  async userupdate(req, res) {
    let id = req.params.id;
    let { firstname, lastname, email, password, phoneNumber } = req.body;
    let data = await VendorModel.findOneAndUpdate(
      { _id: id },
      {
        firstname,
        lastname,
        email,
        password,
        phoneNumber,
      }
    );
    if (data) {
      return res
        .status(200)
        .json({ Success: "Account created. Please login", user: data });
    }
  }

  async getAllUser(req, res) {
    try {
      let allUser = await VendorModel.find({});
      res.json({ vendorprofile: allUser });
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
module.exports = vendorProfileController;
