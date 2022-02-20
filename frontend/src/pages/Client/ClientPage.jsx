import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import {
  getDetailAcc,
  updateInfo,
  updatePass,
} from "../../redux/action/accountAction";
import ProductHeader from "./../../components/productHeader/ProductHeader";
import "./ClientPage.scss";
import { useHistory } from "react-router";
function ClientPage() {
  const dispatch = useDispatch();
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  useEffect(() => {
    dispatch(getDetailAcc(userInfo?.Username));
  }, [dispatch]);

  const history = useHistory();
  const userDetail = useSelector((state) => state.accountReducer.accountDetail);

  const submitUpdate = () => {
    const info = {
      Phone: document.getElementById("Phone").value,
      Role: userDetail.Role,
      Email: document.getElementById("Email").value,
      Address: document.getElementById("Address").value,
    };
    dispatch(updateInfo(userDetail.Username, info));
  };

  const submitChange = () => {
    const info = {
      Username: userDetail.Username,
      Password: document.getElementById("old").value,
      NewPassword: document.getElementById("new").value,
    };
    dispatch(updatePass(info, history));
  };

  return (
    <>
      <ProductHeader />
      <div className="clientPage container">
        <div>
          {/* Nav tabs */}
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <a className="nav-link active" data-toggle="tab" href="#home">
                Thông tin tài khoản
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" data-toggle="tab" href="#menu1">
                Thay đổi mật khẩu
              </a>
            </li>
          </ul>
          {/* Tab panes */}
          <div className="tab-content" style={{ height: "400px" }}>
            <div className="tab-pane container active" id="home">
              <h3>Thông tin tài khoản</h3>
              <div>
                <i className="fas fa-phone-square-alt"></i>
                <input
                  id="Phone"
                  type="number"
                  defaultValue={userDetail.Phone}
                />
              </div>
              <div>
                <i className="fas fa-envelope"></i>
                <input id="Email" defaultValue={userDetail.Email} />
              </div>
              <div>
                <i className="fas fa-house-user"></i>
                <input id="Address" defaultValue={userDetail.Address} />
              </div>

              <button className="btn btn-success" onClick={submitUpdate}>
                Lưu
              </button>
            </div>
            <div className="tab-pane container fade" id="menu1">
              <p>mật khẩu cũ</p>
              <div>
                <input type="password" id="old" />
                <i className="fas fa-key"></i>
              </div>
              <p>mật khẩu mới</p>
              <div>
                <input type="password" id="new" />
                <i className="fas fa-key"></i>
              </div>
              <button onClick={submitChange} className="btn btn-success mt-5">
                Thay đổi mật khẩu
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ClientPage;
