import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { signInAction } from "../../redux/action/signInAction";
import "./SignInPage.scss";

function SignInPage() {
  const history = useHistory();
  //khởi tạo dispatch để có thể dispatch action
  const dispatch = useDispatch();
  //khởi tạo state để bắt sự kiến onchange
  const [account, setAccount] = useState({
    Username: "",
    Password: "",
  });
  //khởi tạo state error để bắt lỗi
  const [error, setError] = useState({
    Username: "",
    Password: "",
  });
  // khởi tạo state show pass
  const [showPass, setShowPass] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError({
        ...error,
        [name]: "*",
      });
    } else {
      setError({
        ...error,
        [name]: "",
      });
    }
    setAccount({
      ...account,
      [name]: value,
    });
  };

  const validate = () => {
    let check = true;
    let temp = { ...error };
    for (const key in account) {
      if (account[key].trim() === "" || account[key].trim().length < 5) {
        check = false;
        temp[key] = "*";
      }
    }
    if (check === false) {
      setError({
        ...temp,
      });
    }
    return check;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(signInAction(account, history));
    }
  };

  const showPassOnClick = () => {
    setShowPass(!showPass);
  };

  return (
    <div className="signInContainer">
      <div className="signInSection">
        <div className="signInNavigation">
          <Link to="/">
            <i className="fas fa-home"></i>Trang Chủ
          </Link>
          <Link className="btn" to="/sign-in">
            Đăng Nhập
          </Link>
          <Link className="btn btn-sign-up" to="/sign-up">
            Đăng Ký
          </Link>
        </div>
        <form className="signInContent">
          <h2>Đăng nhập</h2>
          <div className="signInInput">
            <div className="signInType">
              <input
                name="Username"
                type="text"
                placeholder="Tài khoản"
                onChange={handleChange}
              />
              <span>{error.Username}</span>
            </div>
            <div className="signInType">
              <input
                name="Password"
                type={showPass ? "text" : "password"}
                placeholder="Mật Khẩu"
                onChange={handleChange}
              />
              <span>{error.Password}</span>
            </div>
          </div>

          <div className="signInSubmit">
            <button type="submit" onClick={handleSubmit}>
              Đăng nhập
            </button>
            <div className="showPass">
              <input type="checkbox" id="showpass" onClick={showPassOnClick} />
              <label>Hiển thị mật khẩu</label>
            </div>
            <hr />
            <span>
              Chưa có tài khoản?<Link to="/sign-up"> Đăng ký</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignInPage;
