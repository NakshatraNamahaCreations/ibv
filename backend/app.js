const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const morgan = require("morgan");

//Db Connection
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database Connected........."))
  .catch((err) => console.log("Database Not Connected !!!"));

//import routes

const ventorauthroute = require("./Routes/auth/vendorProfile");
const catagoryroute = require("./Routes/product/catagory");
const subcatagoryroute = require("./Routes/product/subcatagory");
const productlistroute = require("./Routes/product/productList");
const bannerroute = require("./Routes/admin/banner");
const authotprouter = require("./Routes/auth/otp");

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

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

const PORT = process.env.PORT || 8001;

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
