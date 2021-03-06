import React from "react";
import { Link } from "react-router-dom";
import AdminAccount from "../../components/adminAccount/AdminAccount";
import AdminProduct from "../../components/adminProduct/AdminProduct";
import AdminStatistics from "../../components/adminStatistics/AdminStatistics";
import "./AdminPage.scss";
function AdminPage() {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  return (
    <>
      <div className="container-fluid">
        <div className="row adminContent">
          <div className="col-1 left">
            <a href="/">
              <img src="./Img/logo.png" alt="" />
            </a>
            <ul className="nav nav-tabs">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  data-toggle="tab"
                  href="#statistics"
                >
                  Thống Kê
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#account">
                 Tài khoản
                </a>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link" data-toggle="tab" href="#product">
                Sản Phẩm
                </a>
              </li> */}
            </ul>
          </div>
          <div className="col-11 right">
            <div className="adminHeader">
              <ul>
                <li>
                  <p>Xin Chào {userInfo?.Username}</p>
                </li>
                <li>
                  <Link
                    to="/"
                    onClick={() => {
                      localStorage.removeItem("token");
                      localStorage.removeItem("userInfo");
                    }}
                  >
                    Đăng xuất
                  </Link>
                </li>
              </ul>
            </div>
            <div className="tab-content">
              <div className="tab-pane active" id="statistics">
                <AdminStatistics />
              </div>
              <div className="tab-pane fade" id="account">
                <AdminAccount />
              </div>
              {/* <div className="tab-pane fade" id="product">
                <AdminProduct/>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminPage;
