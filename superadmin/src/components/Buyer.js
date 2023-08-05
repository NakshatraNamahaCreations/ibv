import React, { useState } from "react";
import Header from "./layout/Header";
import Sidenav from "../Sidenav";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";
import Sidebar from "../components/layout/Sidebar";

import {
  MDBTable,
  MDBTableHead,
  MDBTableBody,
  MDBCheckbox,
} from "mdb-react-ui-kit";

function Buyer() {
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);
  const handleactive1 = () => {
    setSelected(true);
  };
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [toggle, setToggel] = useState(true);
  const [toggle1, setToggel1] = useState(false);
  const handelgeneralbtn = () => {
    setToggel1(true);
  };
  const handeladvancebtn = () => {
    setToggel1(false);
  };
  const handelsavebtn = () => {
    setToggel(true);
  };
  const handelAddbtn = () => {
    setToggel(false);
  };

  return (
    <div div className="row me-0">
      <div className="col-md-2">
        <Sidebar />
      </div>
      <div className="col-md-10">
        {toggle ? (
          <div>
            <div className="mt-4 p-2">
              <h4>Buyer Management</h4>
            </div>
            <div
              style={{
                paddingTop: "25px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search.."
                  // style={{ width: "25%" }}
                />
                {/* <i
                  className="fa-solid fa-magnifying-glass"
                  style={{ position: "relative", left: "90%", bottom: "45%" }}
                ></i> */}
              </div>
              <div className="">
                <Button
                  type="button"
                  // variant="danger"
                  className="btn btn-secondary float-end"
                  onClick={handelAddbtn}
                  style={{ backgroundColor: "#a9042e", border: "none" }}
                >
                  <i class="fa-regular fa-plus"></i>
                  Add Buyer
                </Button>
              </div>
            </div>

            <div>
              <MDBTable align="middle" className="mt-1 p-2">
                <MDBTableHead light>
                  <tr style={{ textAlign: "center" }}>
                    <th>SI No.</th>
                    <th scope="col">Customer Name</th>
                    <th scope="col">Contact No.</th>
                    <th scope="col">Business Name</th>
                    <th scope="col">category</th>
                    <th scope="col">Place of business</th>
                    <th scope="col">Image</th>
                    <th scope="col">Registration date</th>
                    <th scope="col">City</th>
                    <th scope="col">State</th>
                    <th scope="col">Action</th>
                  </tr>
                </MDBTableHead>
                <MDBTableBody>
                  <tr style={{ textAlign: "center" }}>
                    <td>2</td>
                    <td>Ajay</td>
                    <td>7438293829</td>
                    <td>Corporation</td>
                    <td>Realestate</td>
                    <td>Banshankari</td>
                    <td>
                      <img
                        src="https://smallbiztrends.com/ezoimgfmt/media.smallbiztrends.com/2022/05/real-estate-business-ideas-850x476.png?ezimgfmt=ng%3Awebp%2Fngcb12%2Frs%3Adevice%2Frscb12-1"
                        width={"60px"}
                        height={"60px"}
                      />
                    </td>
                    <td>Bengluru</td> <td>karnataka</td>
                    <td>03-07-2023</td>
                    <td>
                      <i
                        title="Edit"
                        class="fa-solid fa-pen"
                        style={{ color: "rgb(255,192,7)", cursor: "pointer" }}
                      ></i>{" "}
                      |{" "}
                      <i
                        title="Delete"
                        class="fa-solid fa-trash"
                        style={{ color: "#a9042e", cursor: "pointer" }}
                      ></i>
                    </td>
                  </tr>
                </MDBTableBody>
              </MDBTable>
            </div>
          </div>
        ) : (
          <div className="shadow p-3 mb-5 bg-body rounded">
            <div>
              <Form>
                <h2>Buyers</h2>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Customer Name</Form.Label>
                    <Form.Control
                      placeholder="Please enter the name"
                      name="Customer name"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Customer Contact no</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Please enter the  contact"
                      name="contact"
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Business Name</Form.Label>
                    <Form.Control
                      placeholder="Please enter the business name"
                      name="businessname"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      placeholder="Please enter the Category"
                      name="category"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Place of business</Form.Label>
                    <Form.Control
                      placeholder="Please enter the  place"
                      name="place"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>upload piture</Form.Label>
                    <Form.Control
                      type="file"
                      placeholder="Please enter the  email"
                      name="profile"
                    />
                  </Form.Group>
                </Row>
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      placeholder="Please enter the  city"
                      name="city"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Control
                      placeholder="Please enter the  state"
                      name="state"
                    />
                  </Form.Group>
                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Registration date</Form.Label>
                    <Form.Control
                      type="date"
                      placeholder="Please enter the  date"
                      name="date"
                    />
                  </Form.Group>
                </Row>
              </Form>
            </div>

            <Button type="button" variant="outline-primary">
              Cancel
            </Button>

            <Button
              type="button"
              variant="danger"
              className="btn btn-secondary float-end"
              onClick={handelsavebtn}
            >
              Save
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Buyer;
