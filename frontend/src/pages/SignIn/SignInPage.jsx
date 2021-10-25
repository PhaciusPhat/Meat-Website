import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { signInAction } from "../../redux/action/signInAction";
import "./SignInPage.css";

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
    if(validate()){
        dispatch(signInAction(account, history));
    }
  };
  return (
    <div className="container">
      <div className="signInSection">
        <form className="signInContent">
          <h2>Đăng nhập</h2>
          <div className="signInInput">
            <input
              name="Username"
              type="text"
              placeholder="Tài khoản"
              onChange={handleChange}
            ></input>
            <span>{error.Username}</span>
            <input
              name="Password"
              type="password"
              placeholder="Mật Khẩu"
              onChange={handleChange}
            ></input>
            <span>{error.Password}</span>
          </div>
          <div className="signInSubmit">
            <button type="submit" onClick={handleSubmit}>
              Đăng nhập
            </button>
            <a href="/sign-up">Chưa có tài khoản? Đăng ký</a>
          </div>
        </form>
        <div>
          <img src="./Img/banner2.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
