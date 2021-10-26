import axios from "axios";
import { SignIn } from "../const/reduxConst";

export const signInAction = (account, history) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "http://localhost:2222/router/auth/sign-in",
        method: "POST",
        data: account,
      });
      const { message, token, id, Username, Role } = res.data;
      alert(message);
      localStorage.setItem("token", JSON.stringify(token));
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("Username", JSON.stringify(Username));
      localStorage.setItem("Role", JSON.stringify(Role));
      dispatch({
        type: SignIn,
        payload: res.data,
      });
      console.log("localStorage: ", localStorage);
      history.push("/list-product");
    } catch (error) {
      if (error !== undefined) {
        if (error.response.status === 404) {
          alert("Không tìm thấy tài khoản của bạn");
        } else if (error.response.status === 400) {
          alert("Nhập mật khẩu sai");
        }
      }
    }
  };
};
