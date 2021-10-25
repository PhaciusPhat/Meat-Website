import React from "react";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer">
      <div className="footerContent container">
        <img className="logo" src="./Img/logo.png" alt="" />
        <ul>
          <li>
            <a href="/">Trang Chủ</a>
          </li>
          <li>
            <a href="/">MEATDeli</a>
          </li>
          <li>
            <a href="/">Sản Phẩm</a>
          </li>
          <li>
            <a href="/">Liên Hệ</a>
          </li>
        </ul>
        <div>
          <h3>CHĂM SÓC KHÁCH HÀNG</h3>
          <h2>1800 6823</h2>
        </div>
        <div>
          Theo Dõi chúng tôi
          <div className="social">
            <a href="/">
              <i className="fab fa-facebook-square"></i>
            </a>
            <a href="/">
              <i className="fab fa-youtube-square"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
