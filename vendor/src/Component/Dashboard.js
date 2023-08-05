import React, { useState } from "react";
import { Card } from "react-bootstrap";

function Dashboard() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  var i = 1;
  return (
    <div className="row me-0">
      <div className="pb-4" style={{ display: "flex" }}>
        <img
          src="../images/testimonial.jpg"
          alt=""
          style={{ width: "10%", borderRadius: "100%" }}
        />
        <div className="ms-2">
          <h5>Hi, {user?.firstname},</h5>
          <h2>Welcome back!</h2>
        </div>
      </div>
      <div className="col vm-col-grid">
        <a className="vm-redirect">
          <Card className="vm-content-mana-card">
            <div
              className="vm-card-bg"
              style={{ backgroundColor: "rgb(255 193 18)" }}
            >
              <div className="vm-count_content vm-font-awsm">
                <p>Revenue</p>{" "}
                <h3 className="vm-count_content-head">
                  $ <span class="vm-counter">35000</span>
                </h3>
              </div>
              <a
                className="vm-hightlit-button"
                style={{ backgroundColor: "#ffd253" }}
              >
                Today
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col vm-col-grid">
        <a className="vm-redirect">
          <Card className="vm-content-mana-card">
            <div className="vm-card-bg" style={{ backgroundColor: "#fe5041" }}>
              <div className="vm-count_content vm-font-awsm">
                <p>Orders</p>{" "}
                <h3 className="vm-count_content-head">
                  <span class="vm-counter">87</span>
                </h3>
              </div>
              <a
                className="vm-hightlit-button"
                style={{ backgroundColor: "#ff877c" }}
              >
                Total
              </a>
            </div>
            {/* <div className="cm-text-content">Products</div> */}
          </Card>
        </a>
      </div>
      <div className="col vm-col-grid">
        <a className="vm-redirect">
          <Card className="vm-content-mana-card">
            <div
              className="vm-card-bg"
              style={{ backgroundColor: "rgb(29 184 81)" }}
            >
              <div className="vm-count_content vm-font-awsm">
                <p>Enquiry</p>{" "}
                <h3 className="vm-count_content-head">
                  <span class="vm-counter">30</span>
                </h3>
              </div>
              <a
                className="vm-hightlit-button"
                style={{ backgroundColor: "#4afb85" }}
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
