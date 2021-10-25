import "./ContactPage.css";

import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function ContactPage() {
  return (
    <>
      <Header />
      <div className="banner">
        <div className="bannerImage">
          <img src="./Img/lienhe.jpg" alt="" />
          <div className="cover"></div>
        </div>
        <img className="decoration" src="/Img/topbg.png" alt="decoration" />
        <h1 style={{ left: "45%" }}>LIÊN HỆ</h1>
      </div>
      <section className="contact container">
        <h1>
          <b>THÔNG TIN LIÊN HỆ</b>
        </h1>
        <div className="contactContent">
          <div>
            <h2>Chọn thịt sạch</h2>
            <h2>
              Chọn <b>MEATDeli</b>
            </h2>
          </div>
          <div style={{ width: "390px" }}>
            <h4>
              <b>Công ty TNHH MNS Meat Hà Nam</b>
            </h4>
            <p>
              <i className="fas fa-map-marker-alt"></i>
              Lô CN-02, KCN Đồng Văn IV, xã Đại Cương, huyện Kim Bảng, tỉnh Hà
              Nam
            </p>
            <p>
              <i className="fas fa-envelope"></i>
              yusuuuuki2712@gmail.com
            </p>
          </div>
          <div>
            <h4>
              <b>Tổng đài chăm sóc khách hàng</b>
            </h4>
            <p>
              <i className="fas fa-phone-alt"></i>1800 6828
            </p>
          </div>
        </div>
        <iframe
          alt=""
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.7795116790494!2d105.88741835120109!3d20.637842186143764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135c94972217969%3A0x488b296adb068f91!2zS2h1IGPDtG5nIG5naGnhu4dwIMSQ4buTbmcgVsSDbiBJVg!5e0!3m2!1svi!2s!4v1635081790198!5m2!1svi!2s"
            title="map"
        ></iframe>
      </section>
      <Footer />
    </>
  );
}

export default ContactPage;
