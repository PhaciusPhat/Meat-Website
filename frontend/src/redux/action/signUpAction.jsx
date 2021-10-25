import axios from "axios";
import { SignUp } from "../const/reduxConst";

export const signUnAction = (account, history) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "http://localhost:2222/router/user/",
        method: "POST",
        data: account,
      });
      const { message } = res.data;
      alert(message);
      dispatch({
        type: SignUp,
        payload: account,
      });
      history.push("/sign-in");
    } catch (error) {
      console.log(error);
      if (error !== undefined) {
        if (error.response.status === 400) {
          alert("Đã tồn tại tại khoản có email hoặc tên tài khoản này");
        } else {
          alert("Lỗi");
        }
      }
    }
  };
};
