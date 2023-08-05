import React, { useEffect, useState } from "react";
import axios from "axios";

function EditServices() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));
  const apiURL = process.env.REACT_APP_API_URL;
  const imgURL = process.env.REACT_APP_IMAGE_API_URL;
  const [category, setcategory] = useState("");
  const [subcatagory, setSubcatagory] = useState("");
  const [selectedProduct, setSelectedService] = useState("");
  const [subcatagorydata, setSubCatagorydata] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPriceDetail, setShowPriceDetails] = useState(false);
  const [changeServiceName, setChangeServiceName] = useState("");
  const [changeServiceBrand, setChangeServiceBrand] = useState("");
  const [changeServiceImage, setChangeServiceImage] = useState("");
  const [changeServiceSize, setChangeServiceSize] = useState("");
  const [changeServiceQuantity, setChangeServiceQuantity] = useState("");
  const [changeServicePrice, setChangeServicePrice] = useState("");
  const [changeServiceDescription, setChangeServiceDescription] = useState("");

  useEffect(() => {
    getProductBySubcatagory();
  }, [subcatagory]);
  const getProductBySubcatagory = async () => {
    try {
      const res = await axios.post(
        apiURL+`/vendor/services/productlist/serviceproductbysubcatagory`,
        { serviceSubcatagoryName: subcatagory } // Pass the subcategory ID as the request payload
      );
      if (res.status === 200) {
        console.log("Product", res);
        setProductData(res.data?.product);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setChangeServiceImage(file);
  };

  useEffect(() => {
    getSubcategoriesByCategory();
  }, [category]);
  const getSubcategoriesByCategory = async () => {
    try {
      let res = await axios.post(
        apiURL+`/vendor/services/subcatagory/postsubcatagoryservicesbycatagory/`,
        {
          catagoryName: category,
        }
      );
      if (res.status === 200) {
        console.log("subcatagory", res);
        setSubCatagorydata(res.data?.subcatagory);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateService = async (e) => {
    const productId = selectedProduct;
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("userId", user._id);
    formdata.append("serviceCatagoryName", user.category);
    formdata.append("serviceSubcatagoryName", subcatagory);
    formdata.append("serviceProductName", changeServiceName);
    formdata.append("serviceProductPrice", changeServicePrice);
    formdata.append("serviceProductBrand", changeServiceBrand);
    formdata.append("serviceProductSize", changeServiceSize);
    formdata.append("serviceProductImage", changeServiceImage);
    formdata.append("serviceProductQuantity", changeServiceQuantity);
    formdata.append("serviceProductDescription", changeServiceDescription);
    formdata.append("serviceProductStatus", "Active");
    try {
      const config = {
        url: `/vendor/services/productlist/updateservice/${productId}`,
        method: "post",
        baseURL: apiURL,
        data: formdata,
      };
      await axios(config).then(function (res) {
        if (res.status === 200) {
          console.log("success");
          alert("Product Updated");
          window.location.reload();
        }
      });
    } catch (error) {
      console.log(error);
      alert("Unable to complete the request");
    }
  };

  return (
    <div>
      <div>
        <a href="/contentmanagement">
          <i class="fa-solid fa-angles-left"></i> Go Back
        </a>
      </div>
      <br />
      <div>
        <h3>Edit Services</h3>
      </div>
      <div className="d-flex" style={{ justifyContent: "space-around" }}>
        <div>
          <label>Choose Catagory:</label>{" "}
          <select
            className="edit-pro-select"
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value="">Select</option>
            <option key={user.category} value={user.category}>
              {user.category}{" "}
            </option>
          </select>
        </div>
        <div>
          <label>Choose SubCatagory:</label>{" "}
          <select
            className="edit-pro-select"
            onChange={(e) => setSubcatagory(e.target.value)}
          >
            <option value="">Select</option>
            {subcatagorydata?.map((subcatagory) => (
              <option
                key={subcatagory.SubcatagoryName}
                value={subcatagory.SubcatagoryName}
              >
                {subcatagory.SubcatagoryName}{" "}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Select Product:</label>{" "}
          <select
            className="edit-pro-select"
            value={selectedProduct}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="">Select</option>
            {productData?.map((product) => (
              <option key={product._id} value={product._id}>
                {product.serviceProductName}
              </option>
            ))}
          </select>
        </div>
      </div>
      <br />
      <hr />
      {selectedProduct ? (
        <>
          <div className="row">
            <div className="col-md-6">
              <br />
              <div>
                <label className="pb-2 edit-lable">Product Name</label>
                <br />
                <input
                  className="edit-input"
                  defaultValue={
                    productData.find(
                      (product) => product._id === selectedProduct
                    )?.serviceProductName || ""
                  }
                  onChange={(e) => setChangeServiceName(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label className="pb-2 edit-lable">Brand</label>
                <br />
                <input
                  className="edit-input"
                  defaultValue={
                    productData.find(
                      (product) => product._id === selectedProduct
                    )?.serviceProductBrand || ""
                  }
                  onChange={(e) => setChangeServiceBrand(e.target.value)}
                />
              </div>
              <br />
              <div>
                <label className="pb-2 edit-lable">Description</label>
                <br />
                <textarea
                  className="edit-textarea"
                  defaultValue={
                    productData.find(
                      (product) => product._id === selectedProduct
                    )?.serviceProductDescription || ""
                  }
                  onChange={(e) => setChangeServiceDescription(e.target.value)}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="d-flex"
                style={{ justifyContent: "space-around" }}
              >
                <div>
                  <label className="pb-2 edit-lable">Product Image</label>
                  <br />
                  {selectedImage && (
                    <img
                      className="edit-product-image"
                      src={selectedImage}
                      alt="Uploaded"
                      onChange={(e) => setChangeServiceImage(e.target.files[0])}
                    />
                  )}
                  {!selectedImage && (
                    <img
                      src={imgURL+`/ServiceProductList/${
                        productData.find(
                          (product) => product._id === selectedProduct
                        )?.serviceProductImage || ""
                      }`}
                      className="edit-product-image"
                      alt=""
                    />
                  )}
                </div>
                <div className="ms-2 ">
                  <label className="pb-2 edit-lable">
                    Upload Product Image
                  </label>
                  <input type="file" onChange={handleImageChange} />
                </div>
              </div>
              <br />
              <div
                className="d-flex"
                style={{ justifyContent: "space-between" }}
              >
                <div>
                  <label className="pb-2 edit-lable">Size</label>
                  <br />
                  <input
                    className="edit-input"
                    defaultValue={
                      productData.find(
                        (product) => product._id === selectedProduct
                      )?.serviceProductSize || ""
                    }
                    style={{ width: "100%" }}
                    onChange={(e) => setChangeServiceSize(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label className="pb-2 edit-lable">Add Price Range</label> :{" "}
                  <span>
                    <i
                      class="fa-solid fa-circle-plus"
                      style={{ cursor: "pointer" }}
                      onClick={() => setShowPriceDetails(!showPriceDetail)}
                    ></i>
                  </span>
                </div>
                <div></div>
              </div>
              <br />
              {showPriceDetail ? (
                <>
                  <div
                    className="d-flex"
                    style={{ justifyContent: "space-between" }}
                  >
                    <div>
                      <label className="pb-2 edit-lable">Product Range</label>
                      <br />
                      <select
                        style={{ width: "100%" }}
                        onChange={(e) =>
                          setChangeServiceQuantity(e.target.value)
                        }
                      >
                        <option>Select</option>
                        <option value="1-1000">1-1000 </option>
                        <option value="1k-10k">1k-10k</option>
                        <option value="10k-1Lakhs">10k-1Lakhs</option>
                        <option value="Above">Above</option>
                      </select>
                    </div>
                    <div>
                      <label className="pb-2 edit-lable">Product Price</label>
                      <br />
                      <input
                        className="edit-input"
                        placeholder="Enter Price Range"
                        style={{ width: "100%" }}
                        onChange={(e) => setChangeServicePrice(e.target.value)}
                        defaultValue={
                          productData.find(
                            (product) => product._id === selectedProduct
                          )?.serviceProductPrice || ""
                        }
                      />
                    </div>
                    <div></div>
                  </div>
                </>
              ) : (
                ""
              )}
              {/* <div>
                <label className="pb-2 edit-lable">
                  Price (INR): {price}
                  .00{" "}
                </label>
                <br />
                <input
                  type="range"
                  id="price"
                  min="1"
                  max="1000"
                  step="1"
                  onChange={handlePriceChange}
                  style={{ width: "60%" }}
                  defaultValue={
                    productData.find(
                      (product) => product._id === selectedProduct
                    )?.productPrice || ""
                  }
                />
              </div> */}
              <br />
              <button className="save-prod-search-btn" onClick={updateService}>
                UPDATE
              </button>
            </div>
          </div>
        </>
      ) : (
        <p style={{ textAlign: "center", color: "maroon" }}>Search product</p>
      )}
    </div>
  );
}

export default EditServices;
{
  /* <input
              type="number"
              step=".01"
              min={0.5}
              max={9999999999999999999}
              defaultValue={3487.2}
            /> */
}
