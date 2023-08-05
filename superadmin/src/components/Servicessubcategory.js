import Header from "./layout/Header";
import Sidenav from "../Sidenav";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/layout/Sidebar";
import ReactPaginate from "react-paginate";

function ServicessubCategory() {
  const [catagory, setCatagory] = useState([]);
  const [Subcatagory, setSubcatagory] = useState([]);
  const [catagoryName, setCatagoryName] = useState("");
  const [subcatagoryName, setSubcatagoryName] = useState("");
  const [subcatagory_image, setSubcatagory_image] = useState();

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page
  const pageCount = Math.ceil(Subcatagory.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = Subcatagory.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const AddSubCatagory = async (e) => {
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("catagoryName", catagoryName);
    formdata.append("SubcatagoryName", subcatagoryName);
    formdata.append("SubcatagoryImage", subcatagory_image);
    try {
      const config = {
        url: "/vendor/services/subcatagory/addsubcatagoryservices",
        method: "post",
        baseURL: "http://localhost:8000/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Subcatagory Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  useEffect(() => {
    getAllCatagory();
    getAllSubCatagory();
  }, []);

  const getAllCatagory = async () => {
    let res = await axios.get(
      "http://localhost:8000/api/vendor/services/catagory/getservicecatagory"
    );
    if (res.status === 200) {
      console.log("catagory===", res);
      setCatagory(res.data?.categoryservices);
    }
  };

  const getAllSubCatagory = async () => {
    let res = await axios.get(
      "http://localhost:8000/api/vendor/services/subcatagory/getsubcatagoryservices"
    );
    if (res.status === 200) {
      console.log("subcatagory===", res);
      setSubcatagory(res.data?.subcategory);
    }
  };

  const deletecatagory = async (data) => {
    try {
      axios
        .post(
          `http://localhost:8000/api/vendor/services/subcatagory/deletesubcatagoryservices/` +
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
          <h4>Service Subcatagory </h4>
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
            Add Subcategory
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
                Category Name
              </th>
              <th className="table-head" scope="col">
                Subcategory Name
              </th>
              <th className="table-head" scope="col">
                Subcategory Image
              </th>
              <th className="table-head" style={{ width: "10%" }} scope="col">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPageData?.map((data) => (
              <tr className="user-tbale-body">
                <td className="text-center">{i++} </td>
                <td className="text-center">{data.catagoryName}</td>
                <td className="text-center"> {data.SubcatagoryName} </td>
                <td style={{ textAlign: "center" }}>
                  <img
                    src={`http://localhost:8000/servicesubcatagory/${data.SubcatagoryImage}`}
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
                Subcategory
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="mt-1">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Category Name</Form.Label>
                  <Form.Select
                    defaultValue="Choose..."
                    onChange={(e) => setCatagoryName(e.target.value)}
                  >
                    <option>--Select All--</option>
                    {catagory.map((data) => (
                      <option value={data?.id}>{data?.categoryname} </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </div>

              <div className="mt-1">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Subcategory Name</Form.Label>
                  <Form.Control
                    onChange={(e) => setSubcatagoryName(e.target.value)}
                  />
                </Form.Group>
              </div>
              <div className="mt-1">
                <Form.Group as={Col} controlId="formGridState">
                  <Form.Label>Select Banner Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => setSubcatagory_image(e.target.files[0])}
                  />
                </Form.Group>
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={AddSubCatagory}
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

export default ServicessubCategory;
