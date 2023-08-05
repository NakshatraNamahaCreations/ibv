import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import ReactPaginate from "react-paginate";

const active = {
  backgroundColor: "rgb(169, 4, 46)",
  color: "#fff",
  fontWeight: "bold",
  border: "none",
};
const inactive = { color: "black", backgroundColor: "white" };
function Services() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  const [data, setData] = useState({});
  const [storeData, setStoreData] = useState([]);
  const [selected, setSelected] = useState(0);
  const handleClick = (divNum) => () => {
    setSelected(divNum);
  };

  const [subcatagory, setSubcatagory] = useState("");
  const [catagory, setcatagory] = useState("");
  const [productData, setproductData] = useState([]);
  const [ProductName, setProductName] = useState("");
  const [ProductPrice, setProductPrice] = useState("");
  const [Brand, setBrand] = useState("");
  const [Size, setSize] = useState("");
  const [Image, setImage] = useState("");
  const [Discount, setDiscount] = useState("");
  const [Volume, setVolume] = useState("");
  const [Description, setDescription] = useState("");

  const [catagorydata, setCatagorydata] = useState([]);
  const [subcatagorydata, setSubcatagorydata] = useState([]);

  //pagination
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 10; // Number of items to display per page
  const pageCount = Math.ceil(productData.length / itemsPerPage);
  const offset = currentPage * itemsPerPage;
  const currentPageData = productData.slice(offset, offset + itemsPerPage);

  // Handle page change
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  const handleData = (e) => {
    const { name, value } = e.target;
    setData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const hadleSave = () => {
    setStoreData([...storeData, data]);
    setData("");
  };

  useEffect(() => {
    getServiceProductListByUserId();
  }, [user._id]);

  const getServiceProductListByUserId = async () => {
    let res = await axios.post(
      `http://localhost:8000/api/vendor/services/productlist/serviceproductbyuserid/`,
      { userId: user._id }
    );
    if (res.status === 200) {
      console.log("getUserProduct===", res);
      setproductData(res.data?.getUserProduct);
    }
  };

  useEffect(() => {
    getSubcategoriesByCategory();
  }, [catagory]);

  const getSubcategoriesByCategory = async () => {
    try {
      let res = await axios.post(
        `http://localhost:8000/api/vendor/services/subcatagory/postsubcatagoryservicesbycatagory/`,
        {
          catagoryName: catagory,
        }
      );
      if (res.status === 200) {
        console.log("subcatagoryservices--", res);
        setSubcatagorydata(res.data?.subcatagory);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addServiceProducts = async (e) => {
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("userId", user._id);
    formdata.append("serviceCatagoryName", catagory);
    formdata.append("serviceSubcatagoryName", subcatagory);
    formdata.append("serviceProductName", ProductName);
    formdata.append("serviceProductPrice", ProductPrice);
    formdata.append("serviceProductImage", Image);
    formdata.append("serviceProductDescription", Description);
    formdata.append("serviceProductQuantity", Volume);
    formdata.append("serviceProductStatus", "Active");
    formdata.append("serviceProductBrand", Brand);
    formdata.append("serviceProductSize", Size);
    formdata.append("serviceProductDiscount", Discount);
    try {
      const config = {
        url: "/vendor/services/productlist/addserviceproducts",
        method: "post",
        baseURL: "http://localhost:8000/api",
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Product Added");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("not able to complete");
    }
  };

  return (
    <div className="row">
      <div className="d-flex float-end mt-3 mb-3">
        <button
          className="btn-primary-button mx-2 addProduct"
          style={selected == 1 ? active : inactive}
          onClick={handleClick(1)}
        >
          Add Product
        </button>

        <button
          style={selected == 0 ? active : inactive}
          onClick={handleClick(0)}
          className="btn-secondary-button AllProduct"
        >
          All Product
        </button>
      </div>

      <div>
        <div>
          <h1>Services</h1>
          {selected == 0 ? (
            <>
              <div className="float-end">
                <ReactPaginate
                  previousLabel={<i class="fa-solid fa-angles-left"></i>}
                  nextLabel={<i class="fa-solid fa-angles-right"></i>}
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
              </div>{" "}
              <table class="table table-hover table-bordered mt-5">
                <thead className="text-align-center">
                  <tr className="table-secondary ">
                    <th>S.No</th>
                    <th>Product Name</th>
                    <th>Product Price</th>
                    <th>Product Brand</th>
                    <th>Product Size</th>
                    <th>Product Volume</th>
                    <th>Product Image</th>
                    <th>Discount Percentage(%)</th>
                    <th>Category</th>
                    <th>Description</th>
                    <th>Admin Review</th>
                  </tr>
                </thead>
                <tbody className="justify-content-center">
                  {currentPageData.map((ProductList, index) => {
                    return (
                      <tr className="user-tbale-body">
                        <td>{index + 1}</td>
                        <td>{ProductList?.serviceProductName}</td>
                        <td>{ProductList?.serviceProductPrice}</td>
                        <td className="text-center">
                          {ProductList?.serviceProductBrand}
                        </td>
                        <td>{ProductList?.serviceProductSize}</td>
                        <td>{ProductList?.serviceProductQuantity}</td>
                        <td>
                          <img
                            src={`http://localhost:8000/ServiceProductList/${ProductList.serviceProductImage}`}
                            className="td-img"
                            alt="..."
                            style={{ width: "100%" }}
                          />
                        </td>
                        <td>{ProductList.serviceProductDiscount}%</td>
                        <td>{ProductList.serviceCatagoryName}</td>
                        <td>{ProductList.serviceProductDescription}</td>
                        <td style={{ color: "#0000ff" }}> Pending... </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>{" "}
            </>
          ) : (
            <>
              {" "}
              <div className="card mt-4">
                <div className="card-body p-3">
                  {/* <div className="vhs-sub-heading pb-2">Add New Record</div> */}

                  {/* <Form> */}
                  <Row className="mb-3">
                    <Col md={1}></Col>
                    <Col md={5}>
                      <Form.Group className="product-grid">
                        <Form.Label>Select Catagory</Form.Label>
                        <Form.Select
                          defaultValue="Choose..."
                          onChange={(e) => setcatagory(e.target.value)}
                        >
                          <option>Choose...</option>
                          <option key={user?.id} value={user?.category}>
                            {user?.category}{" "}
                          </option>
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="product-grid">
                        <Form.Label>Product Name</Form.Label>
                        <Form.Control
                          name="Productname"
                          // value={data.ProductName}
                          onChange={(e) => setProductName(e.target.value)}
                          type="text"
                          placeholder="Enter Product"
                        />
                      </Form.Group>
                      <Form.Group className="product-grid">
                        <Form.Label>Product Price</Form.Label>
                        {/* <Form.Control
                          name="productPrice"
                          // value={data.ProductPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                          type="number"
                          placeholder="Enter Price"
                        /> */}
                      </Form.Group>
                      <Form.Group
                        controlId="formGridZip"
                        className="product-grid"
                      >
                        <Form.Label>Product Volume</Form.Label>
                        {/* <Form.Control
                          type="number"
                          name="volume"
                          placeholder="Product Volume"
                          // value={data.volume}
                          onChange={(e) => setVolume(e.target.value)}
                        /> */}
                      </Form.Group>
                      <Form.Group className="product-grid">
                        <Form.Label>Choose Image</Form.Label>
                        <Form.Control
                          name="image"
                          type="file"
                          // multiple
                          // value={data.image}
                          onChange={(e) => setImage(e.target.files[0])}
                        />
                      </Form.Group>
                      <br />
                      <Button
                        onClick={addServiceProducts}
                        type="button"
                        class="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Save
                      </Button>
                    </Col>
                    <Col md={5}>
                      <Form.Group className="product-grid">
                        <Form.Label>Select Subcatagory</Form.Label>
                        <Form.Select
                          defaultValue="Choose..."
                          onChange={(e) => setSubcatagory(e.target.value)}
                        >
                          <option>Choose...</option>
                          {subcatagorydata?.map((e) => (
                            <option key={e.id} value={e.id}>
                              {e.SubcatagoryName}{" "}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="product-grid">
                        <Form.Label>Product Brand</Form.Label>
                        <Form.Control
                          name="brand"
                          placeholder="Product Brand"
                          // value={data.brand}
                          onChange={(e) => setBrand(e.target.value)}
                        />
                      </Form.Group>
                      <Form.Group className="product-grid">
                        <Form.Label>Product Size</Form.Label>
                        <Form.Select
                          name="size"
                          defaultValue="Choose..."
                          // value={data.size}
                          onChange={(e) => setSize(e.target.value)}
                        >
                          <option>Choose...</option>
                          <option value="38x 28x 18cm">38x 28x 18cm</option>
                          <option value="12Lx 12Wx 11H cm">
                            12Lx 12Wx 11H cm
                          </option>
                          <option value="28 x20x7.6 cm">28 x20x7.6 cm </option>
                          <option value="22.5x 11 x10.5cm">
                            22.5x 11 x10.5cm
                          </option>
                        </Form.Select>
                      </Form.Group>

                      {/* <Form.Group
                        controlId="formGridZip"
                        className="product-grid"
                      >
                        <Form.Label>
                          Customer Discount Percentage(%){" "}
                        </Form.Label>
                        <Form.Control
                          name="discount"
                          placeholder="Customer Discount Percentage"
                          // value={data.discount}
                          onChange={(e) => setDiscount(e.target.value)}
                        />
                      </Form.Group> */}
                      <Form.Group className="mb-3 product-grid">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                          name="discription"
                          as="textarea"
                          rows={3}
                          // value={data.discription}
                          onChange={(e) => setDescription(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                    <Col md={1}></Col>
                  </Row>

                  {/* </Form> */}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default Services;
