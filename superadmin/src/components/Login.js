import React, { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Form, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { CreateToggle } from "./TogglerProvider";

export function Login() {
  const { toggle, handleshow, handlehide } = useContext(CreateToggle);

  return (
    <div style={{ height: "100vh" }}>
      <div
        className="row justify-content-center me-0"
        style={{ alignItems: "center" }}
      >
        <div className="col-9" style={{ marginTop: "5%" }}>
          <Card style={{ boxShadow: "0px 0px 5px 2px lightgray" }}>
            <Form>
              <div style={{ display: "flex" }}>
                <div className="col-6">
                  <img
                    src="./images/frontimage.jpg"
                    style={{ width: "100%", height: "500px" }}
                  />
                </div>
                <div className="col-6 ">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 5,
                    }}
                  >
                    <img
                      src="./images/newlogo.png"
                      className="img-fluid"
                      style={{ width: "100px" }}
                      alt=""
                    />
                  </div>
                  <div className="inputlogin">
                    <div
                      class="input-group mb-4 mt-3"
                      style={{
                        display: "block",
                        width: "90%",
                        marginLeft: "40px",
                      }}
                    >
                      <Row className="mb-3">
                        {" "}
                        <Row className="mb-3">
                          <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control type="email" placeholder="Email" />
                          </Form.Group>
                        </Row>
                        <Row className="mb-3">
                          {!toggle ? (
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                type="text"
                                placeholder="Password"
                              />
                              <i
                                class="fa-regular fa-eye "
                                style={{
                                  position: "absolute",
                                  left: "86%",
                                  bottom: "26%",
                                }}
                                onClick={handlehide}
                              ></i>
                            </Form.Group>
                          ) : (
                            <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Control
                                type="password"
                                placeholder="Password"
                              />

                              <i
                                class="fa-solid fa-eye-slash "
                                style={{
                                  position: "absolute ",
                                  left: "86%",
                                  bottom: "26%",
                                }}
                                onClick={handleshow}
                              ></i>
                            </Form.Group>
                          )}
                        </Row>
                        {/* <toggle/> */}
                        <Link
                          style={{
                            position: "absolute",
                            left: "50%",
                            top: "90%",
                          }}
                          to="/Settings"
                        >
                          Forgot Password?
                        </Link>
                      </Row>
                    </div>
                  </div>
                  <div class="form-check" style={{ marginLeft: "114px" }}>
                    <Form.Group className="mb-3" id="formGridCheckbox">
                      <Form.Check type="checkbox" label="Remeber me" />
                    </Form.Group>
                  </div>
                  <div className="text-center pt-3">
                    <Link to="/home">
                      <Button
                        style={{
                          width: "300px",
                          padding: "4px",
                          backgroundColor: "#a9042e",
                          border: "none",
                          fontWeight: "bold",
                        }}
                      >
                        Login
                      </Button>
                    </Link>
                    <div style={{ margin: "20px" }}>
                      <Link className="link_but" to="/Signup">
                        or sign up
                      </Link>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            </Form>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Login;
