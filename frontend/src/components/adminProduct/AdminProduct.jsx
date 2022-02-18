import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAction,
  delProductAction,
  getProductListAction,
  getProductTypeListAction,
  updateProductAction,
} from "../../redux/action/productAction";
import "./AdminProduct.scss";
function AdminProduct() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productReducer.productList);
  const productTypeList = useSelector(
    (state) => state.productReducer.productTypeList
  );

  const delP = (id) => {
    dispatch(delProductAction(id));
  };

  const [product, setProduct] = useState({
    img: null,
    ProductName: "",
    ProductPrice: "",
    ProductNumber: "",
    ProductDescribe: "",
    TypeId: "",
  });
  const [error, setError] = useState({
    img: "",
    ProductName: "",
    ProductPrice: "",
    ProductNumber: "",
    ProductDescribe: "",
    TypeId: "",
  });

  const [product2, setProduct2] = useState({
    ProductName: "",
    ProductPrice: "",
    ProductNumber: "",
    ProductDescribe: "",
    TypeId: "",
  });
  const [error2, setError2] = useState({
    ProductName: "",
    ProductPrice: "",
    ProductNumber: "",
    ProductDescribe: "",
    TypeId: "",
  });

  const renderProduct = () => {
    return productList.map((product) => {
      return (
        <div className="item" key={product.id}>
          <div className="itemDiv">{product.ProductName}</div>
          <div className="itemDiv">
            <img src={product.ProductImage} alt="" />
          </div>
          <div className="itemDiv">{product.ProductPrice} VNĐ</div>
          <div className="itemDiv">{product.ProductNumber}</div>
          <div className="itemDiv">
            <button
              style={{ marginTop: "30px" }}
              className="btn btn-info mr-1"
              data-toggle="modal"
              data-target={"#updateP" + product.id}
            >
              sửa
            </button>
            <button
              style={{ marginTop: "30px" }}
              className="btn btn-danger"
              onClick={() => delP(product.id)}
            >
              xóa
            </button>
          </div>
          <div
            className="modal fade"
            id={"updateP" + product.id}
            tabIndex={-1}
            role="dialog"
            aria-labelledby="modelTitleId"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Modal title</h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">×</span>
                  </button>
                </div>
                <div className="modal-body">
                  <div>
                    <input
                      name="ProductName"
                      id={"ProductName" + product.id}
                      defaultValue={product.ProductName}
                      className="w-100"
                    />
                    <span>{error2.ProductName}</span>
                  </div>
                  <div>
                    <input
                      name="ProductPrice"
                      id={"ProductPrice" + product.id}
                      defaultValue={product.ProductPrice}
                      className="w-100"
                    />
                    <span>{error2.ProductPrice}</span>
                  </div>
                  <div>
                    <input
                      name="ProductNumber"
                      id={"ProductNumber" + product.id}
                      defaultValue={product.ProductNumber}
                      className="w-100"
                    />
                    <span>{error2.ProductNumber}</span>
                  </div>
                  <div>
                    {renderChooseType2()}
                    <br />
                    <span>{error2.TypeId}</span>
                  </div>
                  <div>
                    <input
                      name="ProductDescribe"
                      id={"ProductDescribe" + product.id}
                      className="w-100"
                      defaultValue={product.ProductDescribe}
                    />
                    <span>{error2.ProductDescribe}</span>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-dismiss="modal"
                    onClick={closeModal}
                  >
                    Đóng
                  </button>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => handleSubmit2(product.id)}
                  >
                    Lưu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  const closeModal = () => {
    setError2({
      ProductName: "",
      ProductPrice: "",
      ProductNumber: "",
      ProductDescribe: "",
      TypeId: "",
    });
    setProduct2({
      ProductName: "",
      ProductPrice: "",
      ProductNumber: "",
      ProductDescribe: "",
      TypeId: "",
    });
  };

  useEffect(() => {
    dispatch(getProductListAction());
    dispatch(getProductTypeListAction());
  }, []);

  const validate2 = (id) => {
    let check = true;
    let temp = { ...error2 };
    let test = { ...product2 };
    for (const key in product2) {
      if (key === "TypeId") {
        if (product2[key].trim() === "") {
          check = false;
          temp[key] = "Không được bỏ trống";
        } else {
          test[key] = product2[key];
          setError2({
            ...error2,
            [key]: "",
          });
        }
      } else {
        let idName = key + id;
        let doc;
        if (key === "ProductPrice" || key === "ProductNumber") {
          doc = Number(document.getElementById(idName).value.trim());
        } else {
          doc = document.getElementById(idName).value.trim();
        }
        if (doc === "") {
          check = false;
          error2[key] = "Không được bỏ trống";
        } else {
          test[key] = doc;
          setError2({
            ...error2,
            [key]: "",
          });
        }
      }
    }

    setProduct2({
      ...test,
    });

    if (check === false) {
      setError2({
        ...temp,
      });
    }

    return check;
  };

  const handleSubmit2 = (id) => {
    if (validate2(id)) {
      const product22 = {
        ProductName: "",
        ProductPrice: "",
        ProductNumber: "",
        ProductDescribe: "",
        TypeId: "",
      };
      for (const key in product2) {
        if (key !== "TypeId") {
          let idName = key + id;
          product22[key] = document.getElementById(idName).value.trim();
        } else {
          product22[key] = product2[key];
        }
      }
      dispatch(updateProductAction(id, product22));
    }
  };

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    if (name === "TypeId") {
      if (value.trim() === "") {
        setError2({
          ...error2,
          [name]: "Không được bỏ trống",
        });
      } else {
        setError2({
          ...error2,
          [name]: "",
        });
      }
      setProduct2({
        ...product2,
        [name]: value,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError({
        ...error,
        [name]: "Không được bỏ trống",
      });
    } else {
      setError({
        ...error,
        [name]: "",
      });
    }
    if (name === "img") {
      // console.log();
      console.log(typeof e.target.files[0]);
      setProduct({
        ...product,
        img: e.target.files[0],
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  const validate = () => {
    let check = true;
    let temp = { ...error };
    for (const key in product) {
      if (key === "img") {
        if (product[key] === null) {
          check = false;
          temp[key] = "Không được bỏ trống";
        } else {
          setError({
            ...error,
            [key]: "",
          });
        }
      } else {
        if (product[key].trim() === "") {
          check = false;
          temp[key] = "Không được bỏ trống";
        } else {
          setError({
            ...error,
            [key]: "",
          });
        }
      }
    }
    if (check === false) {
      setError({
        ...temp,
      });
    }
    return check;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      let fd = new FormData();
      fd.append("img", product.img, product.img.name);
      fd.append("ProductName", product.ProductName);
      fd.append("ProductPrice", product.ProductPrice);
      fd.append("ProductNumber", product.ProductNumber);
      fd.append("ProductDescribe", product.ProductDescribe);
      fd.append("TypeId", product.TypeId);
      dispatch(addProductAction(fd));
    }
  };

  const renderChooseType = () => {
    return productTypeList.map((item) => {
      return (
        <div
          style={{
            display: "inline-block",
            paddingRight: "20px",
            borderRight: "1px solid black",
          }}
          key={item.id}
        >
          <input
            onChange={handleChange}
            name="TypeId"
            type="radio"
            value={item.id}
            style={{ display: "inline-block", width: "30px" }}
          />
          <label className="text-dark">{item.TypeName}</label>
        </div>
      );
    });
  };

  const renderChooseType2 = () => {
    return productTypeList.map((item) => {
      return (
        <div
          style={{
            display: "inline-block",
            paddingRight: "20px",
            borderRight: "1px solid black",
          }}
          key={item.id}
        >
          <input
            onChange={handleChange2}
            name="TypeId"
            id="TypeId"
            type="radio"
            value={item.id}
            style={{ display: "inline-block", width: "30px" }}
          />
          <label className="text-dark">{item.TypeName}</label>
        </div>
      );
    });
  };

  return (
    <div className="container-fluid">
      <div className="ProductContent">
        <h3>Quản Lý Sản Phẩm</h3>
        <div className="find">
          <input id="find" />
          <button className="btn-danger">Tìm Kiếm theo tên</button>
        </div>
        <div className="InvoiceTable">
          <div className="item title">
            <p>Tên Sản Phẩm</p>
            <p>Hình Ảnh</p>
            <p>Giá</p>
            <p>Số Lượng</p>
            <p>Chức Năng</p>
          </div>
          {renderProduct()}
        </div>
        <div className="addAcc">
          <button
            className="btn btn-success"
            data-toggle="modal"
            data-target="#addPModel"
          >
            Thêm
          </button>
        </div>
        {/*  */}
        <div
          className="modal fade"
          id="addPModel"
          tabIndex={-1}
          role="dialog"
          aria-labelledby="modelTitleId"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Thêm Sản Phẩm</h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">×</span>
                </button>
              </div>
              <div className="modal-body modelInput">
                <div>
                  <input
                    onChange={handleChange}
                    name="ProductName"
                    placeholder="Tên Sản Phẩm"
                  />
                  <span>{error.ProductName}</span>
                </div>
                <div>
                  <input
                    onChange={handleChange}
                    name="ProductPrice"
                    placeholder="Giá"
                    type="number"
                  />
                  <span>{error.ProductPrice}</span>
                </div>
                <div>
                  <input
                    onChange={handleChange}
                    name="ProductNumber"
                    placeholder="Số Lượng"
                    type="number"
                  />
                  <span>{error.ProductNumber}</span>
                </div>
                <div className="text-dark">
                  Ảnh sản phẩm
                  <input
                    onChange={handleChange}
                    name="img"
                    // id="img"
                    type="file"
                    style={{ width: "50%", color: "black", marginLeft: "10px" }}
                  />
                  <br />
                  <span>{error.img}</span>
                </div>
                <div>
                  {renderChooseType()}
                  <br />
                  <span>{error.TypeId}</span>
                </div>
                <div>
                  <input
                    onChange={handleChange}
                    name="ProductDescribe"
                    placeholder="Giới Thiệu Sản Phẩm"
                  />
                  <span>{error.ProductDescribe}</span>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSubmit}
                >
                  Thêm
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminProduct;
