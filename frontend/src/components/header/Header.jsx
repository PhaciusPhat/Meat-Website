import React from "react";
import "./Header.scss";
import { Link } from 'react-router-dom';
function Header() {
  const checkAmin = () => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo === null) return;
    else {
      if (userInfo.Role === true) {
        return (
          <li>
            <Link className="headerNav" to="/super-admin">
              QUẢN LÝ
            </Link>
          </li>
        );
      } else {
        return;
      }
    }
  };
  return (
    <header>
      <ul className="container">
        <li>
          <Link className="headerNav" to="/">
            TRANG CHỦ
          </Link>
        </li>
        <li>
          <Link className="headerNav" to="/story">
            CÂU CHUYỆN MEATFRESH
          </Link>
        </li>
        <li>
          <Link className="imgLogo" to="/">
            <img src="./Img/logo.png" alt="logo" />
          </Link>
        </li>
        <li>
          <Link className="headerNav" to="/list-product">
            SẢN PHẨM
          </Link>
        </li>
        <li>
          <Link className="headerNav" to="/contact">
            LIÊN HỆ
          </Link>
        </li>
        {checkAmin()}
      </ul>
    </header>
  );
}

export default Header;
