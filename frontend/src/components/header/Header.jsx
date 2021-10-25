import React from "react";
import "./Header.css";
function Header() {
  const checkAmin = () => {
    if(localStorage.Role===undefined) return;
    const Role = JSON.parse(localStorage.Role);
    console.log(Role);
    if (Role === "admin") {
      return <li>
        <a className="headerNav" href="/super-admin">
            QUẢN LÝ
          </a>
      </li>
    } else{
      return;
    }
  };
  return (
    <header>
      <ul className="container">
        <li>
          <a className="headerNav" href="/">
            TRANG CHỦ
          </a>
        </li>
        <li>
          <a className="headerNav" href="/story">
            CÂU CHUYỆN MEATFRESH
          </a>
        </li>
        <li>
          <a className="imgLogo" href="/">
            <img src="./Img/logo.png" alt="logo" />
          </a>
        </li>
        <li>
          <a className="headerNav" href="/list-product">
            SẢN PHẨM
          </a>
        </li>
        <li>
          <a className="headerNav" href="/contact">
            LIÊN HỆ
          </a>
        </li>
        {checkAmin()}
      </ul>
    </header>
  );
}

export default Header;
