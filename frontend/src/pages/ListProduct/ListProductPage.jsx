import "./ListProduct.css";

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

  const renderProductTypeContainer = () => {
    return productTypeList.map((productType) => {
      return (
        <div key={productType.id} className="productType">
          <h4>{productType.TypeName}</h4>
          <div className="productList">{renderProductList(productType.id)}</div>
        </div>
      );
    });
  };

  const renderProductList = (id) => {
    return productList.map((product) => {
      if (product.TypeId === id) {
        return (
          <div className="product" key={product.id}>
            <img src={product.ProductImage} alt="" />
            <p className="name">{product.ProductName}</p>
            <p className="price">{product.ProductPrice}VNĐ</p>
            <button onClick={() => addProductIntoCart(product.id)}>
              Thêm vào giỏ hàng
            </button>
          </div>
        );
      }
    });
  };
  const addProductIntoCart = (id) => {
    if(localStorage.Username !== undefined){
      dispatch(addCartAction(id, history));
    } else{
      alert("Vui lòng đăng nhập")
    }
  };

  useEffect(() => {
    dispatch(getProductListAction());
    dispatch(getProductTypeListAction());
  }, []);

  return (
    <>
      <ProductHeader />
      <div className="banner">
        <img src="./Img/banner4.png" alt="banner1" />
      </div>
      <div className="container">{renderProductTypeContainer()}</div>
      <Footer />
    </>
  );
}

export default ListProductPage;
