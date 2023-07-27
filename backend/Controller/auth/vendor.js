const VendorModel = require("../../Model/auth/vendorProfile");
const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const generateSeriesNumber = require("../../Config/function");

class vendorProfile {
  async createAccount(req, res) {
    try {
      let {
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
        panimg,
        panNumber,
        selfie,
        gst,
        referalCode,
        accountname,
        accountnumber,
        latitude,
        longitude,
        categoryname,
        // referalCode,
      } = req.body;

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
      const myreferalCode = `REFIM2023${vendorCount.count}`;

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
        referalCode,
        myreferalCode,
        websiteaddress,
        checkbox,
        panimg,
        panNumber,
        selfie,
        gst,
        accountname,
        accountnumber,
        latitude,
        longitude,
        categoryname,
      });
      newVendor.save().then((data) => {
        console.log(data);
        return res
          .status(200)
          .json({ Success: "Account created. Please login", user: data });
      });
      // const apiKey = "YOUR_GOOGLE_MAPS_API_KEY";
      // const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
      // axios
      //   .get(geocodingUrl)
      //   .then((response) => {
      //     const address = response.data.results[0].formatted_address;
      //     // Respond with the address to the client
      //     res.json({ address });
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     res.status(500).json({ error: "Error fetching address" });
      //   });
    } catch (error) {
      console.error("Error creating account:", error);
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

  async getSignout(req, res) {
    try {
      const signout = req.params.id;
      if (!signout) {
        return res.status(400).json({ error: "Invalid signout ID" });
      }

      await VendorModel.findOneAndUpdate(
        { _id: signout },
        { status: "Offline" }
      );

      res.json({ Success: "Signout Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Something went wrong" });
    }
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
