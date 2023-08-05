import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

function Dashboard() {
  const [data, setdata] = useState([]);
  const [catagory, setCatagory] = useState([]);
  const [Subcatagory, setSubcatagory] = useState([]);

  const getvendor = async () => {
    let res = await axios.get("http://localhost:8000/api/vendor/getalluser");
    if (res.status === 200) {
      setdata(res.data.vendorprofile);
    } else {
      console.log("error");
    }
  };

  const getAllCatagory = async () => {
    let res = await axios.get(
      "http://localhost:8000/api/vendor/product/catagory/getcatagory"
    );
    if (res.status === 200) {
      console.log(res);
      setCatagory(res.data?.catagory);
    }
  };

  const getAllSubCatagory = async () => {
    let res = await axios.get(
      "http://localhost:8000/api/vendor/product/subcatagory/getsubcatagory"
    );
    if (res.status === 200) {
      console.log("subcatagory===", res);
      setSubcatagory(res.data?.subcatagory);
    }
  };

  useEffect(() => {
    getvendor();
    getAllCatagory();
    getAllSubCatagory();
  }, []);

  return (
    <div className="row pt-3 me-0">
      <div className="pt-4 pb-4" style={{ display: "flex" }}>
        <img
          src="../images/testimonial.jpg"
          alt=""
          style={{ width: "10%", borderRadius: "100%" }}
        />
        <div className="ms-2">
          <h5>Hi, Sandra,</h5>
          <h2>Welcome back!</h2>
        </div>
      </div>
      <div className="col col-grid">
        <a href="/banner" className="cm-redirect">
          <Card className="content-mana-card">
            <div className="cm-card-bg">
              <div className="count_content cm-font-awsm">
                <p>Revenue</p>{" "}
                <h3 className="count_content-head">
                  ₹ <span class="counter">0</span>
                </h3>
              </div>
              <a href="#" class="notification_btn">
                Today
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col col-grid">
        <a href="/editproducts" className="cm-redirect">
          <Card className="content-mana-card">
            <div className="cm-card-bg">
              <div className="count_content cm-font-awsm">
                <p>Orders</p>{" "}
                <h3 className="count_content-head">
                  <span class="counter">0</span>
                </h3>
              </div>
              <a
                href="#"
                class="notification_btn"
                style={{ backgroundColor: "#055160" }}
              >
                Today
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col col-grid">
        <a href="/editproducts" className="cm-redirect">
          <Card className="content-mana-card">
            <div className="cm-card-bg">
              <div className="count_content cm-font-awsm">
                <p>Vendor</p>{" "}
                <h3 className="count_content-head">
                  <span class="counter">{data.length} </span>
                </h3>
              </div>
              <a
                href="#"
                class="notification_btn"
                style={{ backgroundColor: "#fe4d3c" }}
              >
                Total
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col col-grid">
        <a href="/editproducts" className="cm-redirect">
          <Card className="content-mana-card">
            <div className="cm-card-bg">
              <div className="count_content cm-font-awsm">
                <p>Buyer</p>{" "}
                <h3 className="count_content-head">
                  <span class="counter">300</span>
                </h3>
              </div>
              <a
                href="#"
                class="notification_btn"
                style={{ backgroundColor: "#1eb852" }}
              >
                Total
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col col-grid">
        <a href="/editproducts" className="cm-redirect">
          <Card className="content-mana-card">
            <div className="cm-card-bg">
              <div className="count_content cm-font-awsm">
                <p>Catagory</p>{" "}
                <h3 className="count_content-head">
                  <span class="counter">{catagory.length} </span>
                </h3>
              </div>
              <a
                href="#"
                class="notification_btn"
                style={{ backgroundColor: "#a9042e" }}
              >
                Total
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col col-grid">
        <a href="/editproducts" className="cm-redirect">
          <Card className="content-mana-card">
            <div className="cm-card-bg">
              <div className="count_content cm-font-awsm">
                <p>Subcategory</p>{" "}
                <h3 className="count_content-head">
                  <span class="counter">{Subcatagory.length} </span>
                </h3>
              </div>
              <a
                href="#"
                class="notification_btn"
                style={{ backgroundColor: "#664d03" }}
              >
                Total
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
    </div>
  );
}

export default Dashboard;
