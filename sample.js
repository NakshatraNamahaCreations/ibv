const userModel = require("../../Model/User/user");
const bcrypt = require("bcryptjs");
const {
  validateEmail,
  toTitleCase,
  phonenumber,
} = require("../../Config/function");
const jwt = require("jsonwebtoken");

class User {
  async postSignup(req, res) {
    let {
      firstname,
      lastname,
      username,
      email,
      mobile,
      password,
      cpassword,
      profiletype,
    } = req.body;
    let file = req.file?.filename;
    if (
      !firstname ||
      !lastname ||
      !username ||
      !email ||
      !mobile ||
      !password ||
      !cpassword ||
      !profiletype
    ) {
      return res.status(500).json({ error: "All field must not be empty" });
    } else if (firstname.length < 3 && firstname > 25) {
      return res
        .status(500)
        .json({ error: "firstname must be 3-25 charecter" });
    } else if (password !== cpassword) {
      return res.status(500).json({ error: "password mismatch" });
    } else if (password.length < 8) {
      return res.status(500).json({ error: "password should be more than 8" });
    } else if (!validateEmail(email)) {
      return res.status(500).json({ error: "Email is not valid" });
    } else {
      try {
        password = bcrypt.hashSync(password, 10);
        firstname = toTitleCase(firstname);
        const Email = await userModel.findOne({ email: email });
        if (Email) {
          return res.status(500).json({ error: "Email already exits" });
        }
        const phone = await userModel.findOne({ mobile: mobile });
        if (phone) {
          return res.status(500).json({ error: "mobile number already exits" });
        }
        let Newuser = new userModel({
          firstname,
          lastname,
          username,
          email,
          mobile,
          password,
          cpassword,
          profiletype,
          profileImage: file,
        });
        Newuser.save().then((data) => {
          console.log(data);
          return res
            .status(200)
            .json({ Success: "Signup Success, Please login" });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }

  async loginwithmobile(req, res) {
    let { mobile } = req.body;
    try {
      if (!mobile) {
        return res.status(500).json({ error: "Please fill all fields" });
      } else {
        const data = await userModel.findOne({ mobile: mobile });
        if (!data) {
          return res.status(500).json({ error: "invalid mobile number" });
        } else {
          // const passcheck = bcrypt.compare(password, data.password);
          // if (passcheck) {
          try {
            userModel.findOneAndUpdate({ mobile }, { status: "Online" });
            //create the jwt token
            let token = jwt.sign(
              {
                userId: data._id.toString(),
                project: "eloe",
              },
              "projectEloe",
              { expiresIn: "10800s" }
            );
            res.setHeader("x-api-key", token);
            return res.json({ Success: "Signin successful", user: data });
          } catch (error) {
            console.log(error);
            return res.status(500).json({ error: "Invalid Password" });
          }

          // }
          //  else {
          //   return res.status(500).json({ error: "Invalid Password" });
          // }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const authcontroller = new User();
module.exports = authcontroller;
