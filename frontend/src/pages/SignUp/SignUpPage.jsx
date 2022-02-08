import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signUnAction } from "../../redux/action/signUpAction";
import "./SignUpPage.scss";
import { Link } from "react-router-dom";
function SignUpPage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [account, setAccount] = useState({
    Username: "",
    Password: "",
    RePassWord: "",
    Phone: "",
    Email: "",
  });
  const [error, setError] = useState({
    Username: "",
    Password: "",
    RePassWord: "",
    Phone: "",
    Email: "",
  });

  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePhone(phone) {
    const re = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    return re.test(phone);
  }

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
      } else {
        if (key === "RePassWord") {
          if (account[key] !== account.Password) {
            temp[key] = "!";
            check = false;
          } else {
            setError({
              ...error,
              [key]: "",
            });
          }
        }
        if (key === "Email") {
          if (!validateEmail(account[key])) {
            temp[key] = "!";
            check = false;
          } else {
            setError({
              ...error,
              [key]: "",
            });
          }
        }
        if (key === "Phone") {
          if (!validatePhone(account[key])) {
            temp[key] = "!";
            check = false;
          } else {
            setError({
              ...error,
              [key]: "",
            });
          }
        }
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
      dispatch(signUnAction(account, history));
    }
  };

  return (
    <div className="SignUpContainer">
      <div className="SignUpSection">
        <div className="SignUpNavigation">
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
        <form className="SignUpContent">
          <h4>Đăng Ký Tài Khoản</h4>
          <div className="SignUpInputSection">
            <div className="SignUpInput">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                onChange={handleChange}
                name="Username"
                placeholder="Tài khoản"
              />
              <span>{error.Username}</span>
            </div>
          </div>
          <div className="SignUpInputSection">
            <div className="SignUpInput">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                onChange={handleChange}
                name="Password"
                type="password"
                placeholder="Mật Khẩu"
              />
              <span>{error.Password}</span>
            </div>
          </div>
          <div className="SignUpInputSection">
            <div className="SignUpInput">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                onChange={handleChange}
                name="RePassWord"
                type="password"
                placeholder="Nhập Lại Mật Khẩu"
              />
              <span>{error.RePassWord}</span>
            </div>
          </div>
          <div className="SignUpInputSection">
            <div className="SignUpInput">
              <i className="fa fa-phone" aria-hidden="true"></i>
              <input
                onChange={handleChange}
                name="Phone"
                type="number"
                placeholder="Điện thoại"
              />
              <span>{error.Phone}</span>
            </div>
          </div>
          <div className="SignUpInputSection">
            <div className="SignUpInput">
              <i className="fas fa-mail-bulk"></i>
              <input onChange={handleChange} name="Email" placeholder="Email" />
              <span>{error.Email}</span>
            </div>
          </div>
          <div className="SignUpSubmit">
            <button type="submit" onClick={handleSubmit}>
              Đăng ký
            </button>
            <hr />
            <span>
              Đã có tài khoản?<Link to="/sign-in">Đăng nhập</Link>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
