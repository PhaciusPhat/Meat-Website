import React from "react";
import "./ProductHeader.css";
function ProductHeader() {
  const checkSignIn = () => {
    let Username = undefined;
    if (localStorage.Username !== undefined) {
      Username = JSON.parse(localStorage.Username);
    }

    if (Username === undefined) {
      return (
        <a href="/sign-in">
          <i className="fa fa-user" aria-hidden="true"></i> Đăng nhập
        </a>
      );
    } else {
      return (
        <>
          <li>
            <p  style={{ marginTop: "15px"}}>
              <i className="fa fa-user" aria-hidden="true"></i>
              <span> Xin Chào {Username}</span>
            </p>
          </li>
          <li>
            <a
              href="/"
              onClick={() => {
                localStorage.removeItem("token");
                localStorage.removeItem("Username");
                localStorage.removeItem("id");
                localStorage.removeItem("Role");
              }}
            >
              <i className="fas fa-sign-out-alt"></i>
              <span> Đăng xuất</span>
            </a>
          </li>
        </>
      );
    }
  };

  const checkCart = () => {
    let direct = "";
    if (localStorage.Username !== undefined) {
      direct = "/cart";
    } else {
      direct = "/list-product";
    }
    return (
      <li>
        <a
          href={direct}
          onClick={() => {
            if (localStorage.Username === undefined) {
              alert("Vui lòng đăng nhập");
              window.event.preventDefault();
            }
          }}
        >
          <i className="fas fa-shopping-cart"></i> Giỏ Hàng
        </a>
      </li>
    );
  };

  return (
    <header>
      <div className="container productHeader">
        <ul>
          <li>
            <a className="imgLogo" href="/list-product">
              <img src="./Img/logo.png" alt="logo" />
            </a>
          </li>
          <li>
            <a href="/">
              <i className="fa fa-home" aria-hidden="true"></i> Trang chủ
            </a>
          </li>
          {checkSignIn()}
          {checkCart()}
          <li>
            <p style={{ marginTop: "15px"}}>
              <i className="fas fa-headphones-alt"></i> 1800 6828
            </p>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default ProductHeader;
