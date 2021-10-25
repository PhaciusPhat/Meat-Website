import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signUnAction } from "../../redux/action/signUpAction";
import "./SignUpPage.css";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value.trim() === "") {
      setError({
        ...error,
        [name]: "Không được bỏ trống",
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
      if (account[key].trim() === "") {
        check = false;
        temp[key] = "Không được bỏ trống";
      } else {
        if (key === "RePassWord") {
          if (account[key] !== account.Password) {
            temp[key] = "Không trùng mật khẩu";
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
            temp[key] = "Email sai định dạng";
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
      let newAccount = {
        ...account,
        Address: null,
        Role: "client",
      };
      dispatch(signUnAction(newAccount, history));
    }
  };

  return (
    <div className="container">
      <div className="SignUpContainer">
        <form className="SignUpContent">
          <h4>Đăng Ký Tài Khoản</h4>
          <div>
            <div className="SignUpInput">
              <i className="fa fa-user" aria-hidden="true"></i>
              <input
                onChange={handleChange}
                name="Username"
                placeholder="Tài khoản"
              />
            </div>
            <span>{error.Username}</span>
          </div>
          <div>
            <div className="SignUpInput">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                onChange={handleChange}
                name="Password"
                type="password"
                placeholder="Mật Khẩu"
              />
            </div>
            <span>{error.Password}</span>
          </div>
          <div>
            <div className="SignUpInput">
              <i className="fa fa-lock" aria-hidden="true"></i>
              <input
                onChange={handleChange}
                name="RePassWord"
                type="password"
                placeholder="Nhập Lại Mật Khẩu"
              />
            </div>
            <span>{error.RePassWord}</span>
          </div>
          <div>
            <div className="SignUpInput">
              <i className="fa fa-phone" aria-hidden="true"></i>
              <input
                onChange={handleChange}
                name="Phone"
                type="number"
                placeholder="Điện thoại"
              />
            </div>
            <span>{error.Phone}</span>
          </div>
          <div>
            <div className="SignUpInput">
              <i className="fas fa-mail-bulk"></i>
              <input onChange={handleChange} name="Email" placeholder="Email" />
            </div>
            <span>{error.Email}</span>
          </div>
          <div className="SignUpSubmit">
            <button type="submit" onClick={handleSubmit}>
              Đăng ký
            </button>
            <a href="/sign-in">Đã có tài khoản? Đăng nhập</a>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpPage;
