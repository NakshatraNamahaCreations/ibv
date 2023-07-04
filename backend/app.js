const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const crypto = require("crypto");
const bodyParser = require("body-parser");

const ccav = require("node-ccavenue");

// Middleware
app.use(bodyParser.json());
//Db Connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected........."))
  .catch((err) => console.log("Database Not Connected !!!"));

// Function to encrypt the data using AES-128-CBC
const encrypt = (data, key) => {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-128-cbc", key, iv);
  let encryptedData = cipher.update(data, "utf8", "hex");
  encryptedData += cipher.final("hex");
  return {
    encryptedData,
    iv: iv.toString("hex"),
  };
};

// app.post("/payment", async (req, res) => {
//   try {
//     const { orderId, amount } = req.body;
//     const merchantId = "YOUR_MERCHANT_ID";
//     const accessCode = "YOUR_ACCESS_CODE";
//     const workingKey = "YOUR_WORKING_KEY";
//     const redirectUrl = "http://localhost:3000/response";

//     const postData = {
//       merchant_id: merchantId,
//       order_id: orderId,
//       amount: amount,
//       redirect_url: redirectUrl,
//       cancel_url: redirectUrl,
//       currency: "INR",
//       billing_name: "John Doe",
//       billing_email: "john.doe@example.com",
//       billing_tel: "1234567890",
//       // Add other required parameters according to your needs
//     };

//     const { encryptedData, iv } = encrypt(JSON.stringify(postData), workingKey);
//     const ccavenueUrl =
//       "https://secure.ccavenue.com/transaction/transaction.do?command=initiateTransaction";

//     const response = await axios.post(
//       ccavenueUrl,
//       `encRequest=${encodeURIComponent(
//         encryptedData
//       )}&access_code=${accessCode}&iv_parameter=${encodeURIComponent(iv)}`,
//       {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//         },
//       }
//     );

//     res.send(response.data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("An error occurred");
//   }
// });

app.get("/response", (req, res) => {
  // Handle the response from CCavenue after payment completion
  res.send("Payment response received");
});

//import routes

const ventorauthroute = require("./Routes/auth/vendorProfile");
const catagoryroute = require("./Routes/product/catagory");
const subcatagoryroute = require("./Routes/product/subcatagory");
const productlistroute = require("./Routes/product/productList");
const bannerroute = require("./Routes/admin/banner");
const authotprouter = require("./Routes/auth/otp");
const servicescatagoryroute = require("./Routes/Services/Category");
const servicessubcatagoryroute = require("./Routes/Services/Subcategory");
const AddPaymentGetWay = require("./Routes/Paymentgetway/Payment");

//middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.static("Public"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//creating Routes
app.use("/api/vendor", ventorauthroute);
app.use("/api/vendor/product/catagory", catagoryroute);
app.use("/api/vendor/product/subcatagory", subcatagoryroute);
app.use("/api/product", productlistroute);
app.use("/api/admin", bannerroute);
app.use("/api", authotprouter);
app.use("/api/vendor/services/catagory", servicescatagoryroute);
app.use("/api/vendor/services/subcatagory", servicessubcatagoryroute);
app.use("/api/payment", AddPaymentGetWay);

// Configure CCAvenue credentials
const merchantId = "2603333";
const accessCode = "AVQE82KF22BY94EQYB";
const encryptionKey = "EDFA94A283965346CCFA3E5138BFC5CD";

// Payment request route
// app.post("/payment", (req, res) => {
//   // Generate the order_id and other required parameters
//   const order_id = "123";
//   const amount = req.body.amount;

//   // Define the PaymentRequest model
//   const paymentRequestSchema = new mongoose.Schema({
//     order_id: { type: String, required: true },
//     amount: { type: Number, required: true },
//     status: { type: String, required: true },
//   });

//   const PaymentRequest = mongoose.model("PaymentRequest", paymentRequestSchema);
//   // Store the payment request data in MongoDB
//   const paymentRequest = new PaymentRequest({
//     order_id,
//     amount,
//     status: "pending",
//   });
//   paymentRequest.save();

//   // Create the payment request object
//   const payment = new ccav.Payment({
//     merchantId,
//     orderId: order_id,
//     amount,
//     redirectUrl: "YOUR_REDIRECT_URL",
//     cancelUrl: "YOUR_CANCEL_URL",
//     language: "EN",
//   });

//   // Generate the secure hash
//   const secureHash = payment.generateSecureHash(encryptionKey);
//   payment.setRedirectUrlParams({ encRequest: secureHash });

//   // Redirect the user to the CCAvenue payment page
//   res.redirect(payment.getPaymentUrl());
// });

// Payment callback route
app.post("/payment/callback", (req, res) => {
  const response = ccav.Payment.decodeCallback(encryptionKey, req.body);

  // Verify the authenticity of the callback
  if (response.isValid()) {
    const order_id = response.getOrderID();
    const status = response.getStatus();

    // Update the payment status in the database
    PaymentRequest.findOneAndUpdate({ order_id }, { status }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }

  res.sendStatus(200);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
