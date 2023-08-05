import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Sidenav from "../Sidenav";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import DataTable from "react-data-table-component";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";

import { useParams, Link } from "react-router-dom";

function Vendorprofile() {
  const [data, setdata] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getvendor();
  }, []);

  const getvendor = async () => {
    let res = await axios.get(apiURL+"/vendor/getalluser");
    if ((res.status = 200)) {
      setdata(res.data.vendorprofile);
    } else {
      console.log("error");
    }
  };

  const a = data?.filter((a) => a._id === id);

  const item = a[0];

  const Approve = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `/vendor/approvevendor/${item._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          vendorstatus: "approved",
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          // alert("Vendor registration has been successfully approved");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not approved");
    }
  };

  const Disapprove = async (e) => {
    e.preventDefault();
    try {
      const config = {
        url: `vendor/disapprovevendor/${item._id}`,
        method: "post",
        baseURL: apiURL,
        headers: { "content-type": "application/json" },
        data: {
          vendorstatus: "disapproved", // Change the vendorstatus to "disapproved"
        },
      };
      await axios(config).then(function (response) {
        if (response.status === 200) {
          // alert("Vendor registration has been successfully approved");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.error(error);
      alert("  Not approved");
    }
  };

  console.log(item);
  return (
    <div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        <div>
          <h5 className="p-3 text-center">
            <b>Vendor Profile</b>
          </h5>
          <hr />
          {/* <div className="d-flex">
            <div>
              <img
                src={`http://localhost:8000/documents/${item.selfie}`}
                className="vendorprofile"
              />
            </div>
            <div className="mx-4">
              <div>
                <p>{item?.firstname}</p>
                <p>{item?.lastname}</p>
              </div>
              <p>
                <b>{item?.phoneNumber}</b>
              </p>
            </div>
          </div> */}
          <div className="row me-0">
            <div className="col-md-4">
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src={`http://localhost:8000/documents/${item?.selfie}`}
                  className="vendorprofile"
                  alt=""
                  style={{ width: "25%", borderRadius: "100%" }}
                />
                <div style={{ marginLeft: "1rem" }}>
                  <div style={{ fontSize: "18px", fontWeight: "500" }}>
                    {item?.firstname} {item?.lastname}
                  </div>
                  <div style={{ color: "#6f8d93", fontWeight: "400" }}>
                    <i>{item?.phoneNumber}</i>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="card p-4 mt-3"
            style={{ borderRadius: "25px", backgroundColor: "#afffca" }}
          >
            <div className="row">
              <div className="col-6">
                <div className="row p-2">
                  <div className="col-4">
                    <b>Vendor Code</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ color: "#009834" }}>
                      <b>{item?.customNumber}</b>
                    </span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>first Name</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.firstname}</span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>Last Name</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.lastname}</span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Phone Number</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {item?.phoneNumber}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>DOB</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.dob}</span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>Email</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.email}</span>
                  </div>
                </div>
                <div className="row p-2">
                  <div className="col-4">
                    <b>Address</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.address}</span>
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="row p-2">
                  <div className="col-4">
                    <b>Buisness Name</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {item?.businessName}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Business Type</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {item?.businesstype}
                    </span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Buisness Category</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>{item?.category}</span>
                  </div>
                </div>

                <div className="row p-2">
                  <div className="col-4">
                    <b>Buisness website</b>
                  </div>
                  <div className="col-1">:</div>
                  <div className="col-5">
                    <span style={{ fontWeight: "600" }}>
                      {item?.websiteaddress}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            className="d-flex p-5"
            style={{ justifyContent: "space-evenly" }}
          >
            <div>
              {item?.vendorstatus === "approved" ? (
                <p style={{ color: "#01ad3d" }}>Approved</p>
              ) : (
                <button
                  disabled={item?.vendorstatus === "approved"}
                  style={{
                    backgroundColor: "#01ad3d",
                    border: 0,
                    borderRadius: "10px",
                    color: "white",
                    padding: "4px 15px",
                    fontWeight: "700",
                  }}
                  onClick={Approve}
                >
                  Approve
                </button>
              )}
            </div>
            <div>
              {item?.vendorstatus === "disapproved" ? (
                <p style={{ color: "#01ad3d" }}>Disapproved</p>
              ) : (
                <button
                  dis
                  style={{
                    backgroundColor: "#fbbc05",
                    border: 0,
                    borderRadius: "10px",
                    color: "white",
                    padding: "4px 15px",
                    fontWeight: "700",
                  }}
                  onClick={Disapprove}
                >
                  Disapprove
                </button>
              )}
            </div>
            <div>
              <button
                style={{
                  backgroundColor: "#ff4131",
                  border: 0,
                  borderRadius: "10px",
                  color: "white",
                  padding: "4px 15px",
                  fontWeight: "700",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendorprofile;
