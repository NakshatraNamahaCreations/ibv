import React, { useEffect, useState } from "react";
import axios from "axios";

function EditProducts() {
  const user = JSON.parse(sessionStorage.getItem("vendor"));

  const [category, setcategory] = useState("");
  const [subcatagory, setSubcatagory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [subcatagorydata, setSubCatagorydata] = useState([]);
  const [productData, setProductData] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [showPriceDetail, setShowPriceDetails] = useState(false);
  const [changeProductName, setChangeProductName] = useState("");
  const [changeProductBrand, setChangeProductBrand] = useState("");
  const [changeProductImage, setChangeProductImage] = useState("");
  const [changeProductSize, setChangeProductSize] = useState("");
  const [changeProductQuantity, setChangeProductQuantity] = useState("");
  const [changeProductPrice, setChangeProductPrice] = useState("");
  const [changeProductDescription, setChangeProductDescription] = useState("");

  useEffect(() => {
    getSubcategoriesByCategory();
  }, [category]);
  const getSubcategoriesByCategory = async () => {
    try {
      let res = await axios.post(
        `http://localhost:8000/api/vendor/product/subcatagory/postsubcatagory/`,
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
  useEffect(() => {
    getProductBySubcatagory();
  }, [subcatagory]);
  const getProductBySubcatagory = async () => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/product/productsBySubcategory`,
        { SubcatagoryName: subcatagory } // Pass the subcategory ID as the request payload
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
    setChangeProductImage(file);
  };

  const updateProduct = async (e) => {
    const productId = selectedProduct;
    const formdata = new FormData();
    e.preventDefault();
    formdata.append("userId", user._id);
    formdata.append("catagoryName", user.category);
    formdata.append("SubcatagoryName", subcatagory);
    formdata.append("productName", changeProductName);
    formdata.append("productPrice", changeProductPrice);
    formdata.append("productBrand", changeProductBrand);
    formdata.append("productSize", changeProductSize);
    formdata.append("productImage", changeProductImage);
    formdata.append("productQuantity", changeProductQuantity);
    formdata.append("productDescription", changeProductDescription);
    formdata.append("productStatus", "Active");
    try {
      const config = {
        url: `/product/updateproduct/${productId}`,
        method: "post",
        baseURL: "http://localhost:8000/api",
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
        <h3>Edit Products</h3>
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
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Select</option>
            {productData?.map((product) => (
              <option key={product._id} value={product._id}>
                {product.productName}
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
                    )?.productName || ""
                  }
                  onChange={(e) => setChangeProductName(e.target.value)}
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
                    )?.productBrand || "Enter Brand Name"
                  }
                  onChange={(e) => setChangeProductBrand(e.target.value)}
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
                    )?.productDescription || ""
                  }
                  onChange={(e) => setChangeProductDescription(e.target.value)}
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
                      onChange={(e) => setChangeProductImage(e.target.files[0])}
                    />
                  )}
                  {!selectedImage && (
                    <img
                      src={`http://localhost:8000/productlist/${
                        productData.find(
                          (product) => product._id === selectedProduct
                        )?.productImage || ""
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
                      )?.productSize || ""
                    }
                    style={{ width: "100%" }}
                    onChange={(e) => setChangeProductSize(e.target.value)}
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
                          setChangeProductQuantity(e.target.value)
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
                        onChange={(e) => setChangeProductPrice(e.target.value)}
                        defaultValue={
                          productData.find(
                            (product) => product._id === selectedProduct
                          )?.productPrice || ""
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
              <button className="save-prod-search-btn" onClick={updateProduct}>
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

export default EditProducts;
{
  /* <input
              type="number"
              step=".01"
              min={0.5}
              max={9999999999999999999}
              defaultValue={3487.2}
            /> */
}
