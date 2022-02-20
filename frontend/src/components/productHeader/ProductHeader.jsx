import React from "react";
import "./ProductHeader.scss";
import swal from "sweetalert";
import { Link } from "react-router-dom";
function ProductHeader() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const checkSignIn = () => {
    if (userInfo === null) {
      return (
        <a href="/sign-in">
          <i className="fa fa-user" aria-hidden="true"></i> Đăng nhập
        </a>
      );
    } else {
      return (
        <>
          <li>
            <a href="/user">
              <i className="fa fa-user" aria-hidden="true"></i>
              <span> Xin Chào {userInfo.Username}</span>
            </a>
          </li>
          <li>
            <Link
              to="/"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("userInfo");
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span> Đăng xuất</span>
            </Link>
          </li>
        </>
      );
    }
  };

  const checkCart = () => {
    let direct = "";
    if (userInfo !== null) {
      direct = "/cart";
    } else {
      direct = "/list-product";
    }
    return (
      <li>
        <Link
          to={direct}
          onClick={() => {
            if (userInfo === null) {
              swal("", "Vui lòng đăng nhập", "warning");
              window.event.preventDefault();
            }
          }}
        >
          <i className="fas fa-shopping-cart"></i> Giỏ Hàng
        </Link>
      </li>
    );
  };

  return (
    <header>
      <div className="container productHeader">
        <ul>
          <li>
            <Link className="imgLogo" to="/list-product">
              <img src="./Img/logo.png" alt="logo" />
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
            </Link>
          </li>
          {checkSignIn()}
          {checkCart()}
          <li>
            <p style={{ marginTop: "15px" }}>
              <i className="fas fa-headphones-alt"></i> 1800 6828
            </p>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default ProductHeader;
