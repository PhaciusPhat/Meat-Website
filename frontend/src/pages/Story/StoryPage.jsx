import "./StoryPage.css";
import React from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";

function StoryPage() {
  return (
    <>
      <Header />
      <div className="banner">
        <div className="bannerImage">
          <img src="./Img/banner3.jpg" alt="" />
          <div className="cover"></div>
        </div>
        <img className="decoration" src="/Img/topbg.png" alt="decoration" />
        <h1>CÂU CHUYỆN THỊT SẠCH MEATFRESH</h1>
      </div>

      <section className="storyContent container">
        <div className="first">
          <div className="desc">
            <h1>THỊT SẠCH MEATDELI - TƯƠI NGON SUỐT 9 NGÀY</h1>
            <p>
              <span>Thịt sạch MEATDeli</span>, từ nguồn heo khỏe, được xử lý và
              đóng gói khép kín với Công Nghệ Oxy Fresh 9 từ Châu Âu giúp ngăn
              chặn vi khuẩn xâm nhập và tạo môi trường mát lành cho thịt tiếp
              tục thở. <span>Thịt sạch MEATDeli</span>, tươi ngon suốt 9 ngày vì
              bữa ăn ngon vô lo cho cả nhà.
            </p>
          </div>
          <div className="imgDesc">
            <img className="badge" src="./Img/badge.png" alt="" />
            <img
              className="demoImage"
              src="./Img/f16a764671f8b589b4d4ac802d0f88a3.png"
              alt=""
            />
            <div className="descContent">
              <div>
                <i className="fa fa-check" aria-hidden="true"></i>
                <span>Hệ thống chăn nuôi khép kín</span>
              </div>
              <div>
                <i className="fa fa-check" aria-hidden="true"></i>
                <span>Công nghệ Oxy-Fresh 9</span>
              </div>
              <div>
                <i className="fa fa-check" aria-hidden="true"></i>
                <span>Công nghệ thịt mát từ Châu Âu</span>
              </div>
            </div>
          </div>
        </div>
        <h4>ƯU ĐIỂM VƯỢT TRỘI CỦA MEAT DELI</h4>
        <div className="second">
          <div className="item">
            <img src="./Img/cauchuyen1.jpg" alt="" />
            <div className="content">
              <h5>
                Hệ thống chăn nuôi khép kín - Đảm bảo an toàn cho người tiêu
                dùng trong thời điểm dịch tả lợn Châu Phi đang hoành hành
              </h5>
              <p>
                Thịt sạch MEATDeli được sản xuất trong quy trình khép kín: Heo
                khoẻ được nuôi theo tiêu chuẩn Global GAP và áp dụng hệ thống
                kiểm soát 3 tuyến kiểm dịch theo hướng dẫn của bộ NN-PTNT và Cục
                An toàn thực phẩm - Bộ Y Tế.
              </p>
              <p>- Tuyến số 1: Chỉ heo khỏe mới được xuất trại.</p>
              <p>
                - Tuyến số 2: Chỉ heo khỏe, không nhiễm dịch bệnh mới được đưa
                vào nhà máy.
              </p>
              <p>
                {" "}
                - Tuyến số 3: Thịt heo an toàn mới được xuất bán ra thị trường.
              </p>
            </div>
          </div>
          <div className="item">
            <img src="./Img/cauchuyen2.jpg" alt="" />
            <div className="content">
              <h5>Tươi ngon suốt 9 ngày với Công nghệ Oxy-Fresh 9 Châu Âu</h5>
              <p>
                Thịt được áp dụng đóng gói với Công nghệ Oxy-Fresh 9 từ Châu Âu.
                Công nghệ này giúp giữ nguyên chất lượng và màu đỏ hồng của thịt
                tươi trong suốt thời hạn sử dụng, hạn chế vi sinh phát triển nhờ
                cung cấp Oxy tự nhiên vào bên trong hộp thịt. Toàn bộ quá trình
                chế biến, đóng gói, vận chuyển và phân phối đều đảm bảo nhiệt độ
                thịt từ 0 đến 4 độ C giúp thịt tiếp tục “thở” trong môi trường
                mát lành, tươi ngon suốt 9 ngày*.
              </p>
            </div>
          </div>
          <div className="item">
            <img src="./Img/cauchuyen3.jpg" alt="" />
            <div className="content">
              <h5>Dây chuyền Công nghệ Thịt mát nhập khẩu từ Châu Âu</h5>
              <p>
                Sản xuất theo công nghệ thịt mát từ Châu Âu lần đầu tiên có mặt
                tại Việt Nam.
              </p>
            </div>
          </div>
        </div>
        <div className=""></div>
      </section>
      <Footer />
    </>
  );
}

export default StoryPage;
