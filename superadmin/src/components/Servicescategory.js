import React, { useEffect, useState } from "react";
import Header from "./layout/Header";
import Sidenav from "../Sidenav";
import axios from "axios";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Sidebar from "../components/layout/Sidebar";
import ReactPaginate from "react-paginate";

function Servicescategory() {
  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;

  const [catagoryname, setCatagoryname] = useState("");
  const [image, setImage] = useState();
  const [catagory, setCatagory] = useState([]);
  const formdata = new FormData();

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page
  const pageCount = Math.ceil(catagory.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = catagory.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const AddCatagory = async (e) => {
    e.preventDefault();
    formdata.append("categoryname", catagoryname);
    formdata.append("categoryimage", image);
    try {
      const config = {
        url: "/vendor/services/catagory/addservicecatagory",
        method: "post",
        baseURL: apiURL,
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Catagory Added");
          window.location.reload("");
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  useEffect(() => {
    getAllCatagory();
  }, []);

  const getAllCatagory = async () => {
    let res = await axios.get(
      apiURL+"/vendor/services/catagory/getservicecatagory"
    );
    if (res.status === 200) {
      console.log("catagoryData==", res);
      setCatagory(res.data?.categoryservices);
    }
  };

  const deletecatagory = async (data) => {
    try {
      axios
        .post(
          apiURL+`/vendor/services/catagory/deleteservicecatagory/` +
            data._id
        )
        .then(function (res) {
          if (res.status === 200) {
            console.log(res.data);
            window.location.reload();
          }
        });
    } catch (error) {
      console.log(error);
      alert("cannot able to do");
    }
  };

  var i = 1;

  return (
    <div className="row">
      <div className="col-md-2">
        <Sidebar />
      </div>

      <div className="col-md-10 pt-3">
        <div className="mt-3 p-2">
          <h4>Service Catagory </h4>
        </div>
        <div
          className="d-flex pt-3 pb-3"
          style={{ justifyContent: "space-between" }}
        >
          <button
            type="button"
            class="btn btn-primary _btn"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Add Category
          </button>
          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            breakLabel={"..."}
            breakClassName={"break-me"}
            pageCount={pageCount}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            subContainerClassName={"pages pagination"}
            activeClassName={"pagination-active"}
          />
        </div>
        <table class="table table-hover table-bordered mt-2">
          <thead className="">
            <tr className="table-secondary">
              <th className="table-head" scope="col">
                S.No
              </th>
              <th className="table-head" scope="col">
                Category
              </th>
              <th className="table-head" scope="col">
                Category Image
              </th>
              <th className="table-head" style={{ width: "10%" }} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((data) => (
              <>
                <tr className="user-tbale-body">
                  <td className="text-center">{i++} </td>
                  <td className="text-center">{data?.categoryname} </td>
                  <td className="text-center">
                    <img
                      src={imgURL+`/ServiceCategory/${data?.categoryimage}`}
                      alt=""
                      width="15%"
                    />
                  </td>
                  <td className="text-center">
                    <i
                      title="Delete"
                      class="fa-solid fa-trash"
                      style={{ color: "#a9042e", cursor: "pointer" }}
                      onClick={() => deletecatagory(data)}
                    ></i>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>{" "}
      </div>

      {/* Modal */}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Banner Images
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="group pt-1">
                <Form>
                  <Row className="mb-3">
                    <Form.Group as={Col} controlId="formGridEmail">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        placeholder=" Category"
                        onChange={(e) => setCatagoryname(e.target.value)}
                      />
                      <br />
                      <Form.Label>Image</Form.Label>
                      <Form.Control
                        type="file"
                        name="categoryimage"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </Form.Group>
                  </Row>
                </Form>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={AddCatagory}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Servicescategory;
