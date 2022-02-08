import axios from "axios";
import { SignUp } from "../const/reduxConst";
import swal from "sweetalert";
export const signUnAction = (account, history) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "http://localhost:2222/router/auth/sign-up",
        method: "POST",
        data: account,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo",  JSON.stringify(res.data.userInfo));
      dispatch({
        type: SignUp,
        payload: res.data,
      });
      dispatch({
        type: SignUp,
        payload: account,
      });
      swal("", "Đăng Ký Thành Công", "success").then(() => {
        history.push("/list-product");
      });
    } catch (error) {
      // console.log(error);
      if (error !== undefined) {
        if (error.response.status === 400) {
          swal("", "Đã tồn tại tại khoản có email hoặc tên tài khoản này", "error");
        } else {
          swal("", "Server Đang Cố Vấn Đề", "error");
        }
      }
    }
  };
};
