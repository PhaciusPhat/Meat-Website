import React from "react";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./HomePage.scss";
function HomePage() {
  return (
    <>
    <Header/>
      <div className="banner">
        <img src="./Img/banner.jpg" alt="banner1" />
        <img className="decoration" src="/Img/topbg.png" alt="decoration" />
      </div>

      <div className="listBestSell"></div>

      <div className="story">
        <img src="./Img/banner1.jpg" alt=""/>
        <div className="story-content">
          <h2>
            CÂU CHUYỆN <img className="logo" src="./Img/logo.png" alt=""/>
          </h2>
          <p>
            Với ước mong mang đến cho mỗi gia đình sản phẩm thịt sạch, chất
            lượng với giá cả hợp lý, Masan MEAT Life đã hoàn thiện chuỗi giá trị
            đạm động vật từ hệ thống chăn nuôi khép kín đến nhà máy sản xuất
            thức ăn chăn nuôi chất lượng cao, nhà máy chế biến thịt và hệ thống
            phân phối giữ mát để đảm bảo sản phẩm thịt sạch MEATFRESH đến tay
            người tiêu dùng với chất lượng thuần khiết theo công nghệ thịt mát
            từ Châu Âu.
          </p>
          <a href="#">KHÁM PHÁ CÂU CHUYỆN</a>
        </div>
      </div>
      <div className="container moreDes">
        <div className="left">
          <h5>THỊT SẠCH MEAT FRESH LUÔN BÊN BẠN</h5>
          <h6>Thịt sạch tới mỗi gia đình</h6>
          <p>
            Các bà nội trợ từ nay có thể yên tâm thảnh thơi mua sắm tại các cửa
            hàng MEATFresh ở Hà Nội và Hồ Chí Minh.
          </p>
          <img src="./Img/footer.png" alt=""/>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3733.7795116790494!2d105.88741835120109!3d20.637842186143764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135c94972217969%3A0x488b296adb068f91!2zS2h1IGPDtG5nIG5naGnhu4dwIMSQ4buTbmcgVsSDbiBJVg!5e0!3m2!1svi!2s!4v1635081790198!5m2!1svi!2s"
          width="600"
          height="500"
          loading="lazy"
          title="map"
        ></iframe>
      </div>
      <Footer/>
    </>
  );
}

export default HomePage;
