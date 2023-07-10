const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");
const crypto = require("crypto");
const bodyParser = require("body-parser");
// const express = require("express");
const axios = require("axios");

app.use(express.json());
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
const servicesProductroute = require("./Routes/Services/serviceProductList");

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
app.use("/api/vendor/services/productlist", servicesProductroute);

app.use(bodyParser.json());

// In-memory data store for simplicity
let messages = [];

// GET /messages - Fetch all messages
app.get("/messages", (req, res) => {
  res.json({ messages });
});

// POST /messages - Send a new message
app.post("/messages", (req, res) => {
  const { text } = req.body;
  const newMessage = {
    id: messages.length + 1,
    text,
  };
  messages.push(newMessage);
  res.status(201).json({ message: "Message sent successfully" });
});

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

const { v4: uuidv4 } = require("uuid");

app.use(bodyParser.json());

// In-memory message store
let messages1 = [];

// Route to get all messages
app.get("/messages1", (req, res) => {
  res.json(messages);
});

// Route to add a new message
app.post("/messages1", (req, res) => {
  const newMessage = {
    _id: uuidv4(),
    text: req.body.text,
    createdAt: Date.now(),
    user: {
      _id: req.body.user._id,
      name: req.body.user.name,
    },
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

const merchantId = "PGTESTPAYUAT76";
const saltKey = "6be30289-569c-4623-9c34-8d3d1419c024";
// const accessKey = "YOUR_ACCESS_KEY";

app.post("/api/payment/initiate", async (req, res) => {
  try {
    // Perform necessary operations to initiate the payment with PhonePe API
    const response = await axios.post(
      "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay",
      {
        // Include any required payment data from req.body
        amount: req.body.amount,
        currency: req.body.currency,
        orderId: req.body.orderId,
        // redirectUrl: req.body.redirectUrl,
      },
      {
        headers: {
          "X-VERIFY": `${merchantId}:${saltKey}`,
        },
      }
    );

    // Process the response and send the appropriate data back to the frontend
    res.json({ success: true, paymentResponse: response.data });
  } catch (error) {
    console.error("Payment initiation failed:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});
