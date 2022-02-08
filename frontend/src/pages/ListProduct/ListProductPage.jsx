import "./ListProduct.scss";
import swal from "sweetalert";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductListAction,
  getProductTypeListAction,
} from "../../redux/action/productAction";
import ProductHeader from "../../components/productHeader/ProductHeader";
import Footer from "../../components/footer/Footer";
import { addCartAction } from "../../redux/action/cartAction";
import { useHistory } from "react-router";
function ListProductPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const productTypeList = useSelector(
    (state) => state.productReducer.productTypeList
  );
  const productList = useSelector((state) => state.productReducer.productList);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  const renderProductTypeContainer = () => {
    return productTypeList?.map((productType) => {
      return (
        <div key={productType.ProductTypeId} className="productType">
          <h4>{productType.ProductTypeName}</h4>
          <div className="productList">
            {renderProductList(productType.ProductTypeId)}
          </div>
        </div>
      );
    });
  };

  const renderProductList = (id) => {
    return productList.map((product) => {
      let disabled;
      let content;
      if (product.ProductNumber === 0) {
        content = "Hết hàng";
        disabled = true;
      } else {
        disabled = false;
        content = "Thêm vào giỏ hàng";
      }
      if (product.ProductTypeId === id) {
        return (
          <div className="product" key={product.ProductId}>
            <img src={product.ProductImage} alt="" />
            <p className="name">{product.ProductName}</p>
            <p className="price">{product.ProductPrice}VNĐ</p>
            <button
              disabled={disabled}
              onClick={() => addProductIntoCart(product.ProductId)}
            >
              {content}
            </button>
          </div>
        );
      } else {
        return <div key={product.ProductId} style={{ display: "none" }}></div>;
      }
    });
  };
  const addProductIntoCart = (id) => {
    if (userInfo !== null) {
      dispatch(addCartAction(id, history));
    } else {
      swal("", "Vui lòng đăng nhập", "warning");
    }
  };

  useEffect(() => {
    dispatch(getProductListAction());
    dispatch(getProductTypeListAction());
  }, [dispatch]);

  return (
    <>
      <ProductHeader />
      <div className="banner">
        <img src="./Img/banner4.png" style={{ width: "100%" }} alt="banner1" />
      </div>
      <div className="container">{renderProductTypeContainer()}</div>
      <Footer />
    </>
  );
}

export default ListProductPage;
