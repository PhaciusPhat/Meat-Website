import React from "react";
import "./Footer.scss";
import { Link } from 'react-router-dom';
function Footer() {
  return (
    <div className="footer">
      <div className="footerContent container">
        <img className="logo" src="./Img/logo.png" alt="" />
        <ul>
          <li>
            <Link to="/">Trang Chủ</Link>
          </li>
          <li>
            <Link to="/list-product">Sản Phẩm</Link>
          </li>
          <li>
            <Link to="/contact">Liên Hệ</Link>
          </li>
        </ul>
        <div>
          <h3>CHĂM SÓC KHÁCH HÀNG</h3>
          <h2>1800 6823</h2>
        </div>
        <div>
          Theo Dõi chúng tôi
          <div className="social">
            <Link to="/">
              <i className="fab fa-facebook-square"></i>
            </Link>
            <Link to="/">
              <i className="fab fa-youtube-square"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
