import axios from "axios";
import { SignIn } from "../const/reduxConst";
import swal from "sweetalert";
export const signInAction = (account, history) => {
  return async (dispatch) => {
    try {
      const res = await axios({
        url: "http://localhost:2222/router/auth/sign-in",
        method: "POST",
        data: account,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userInfo",  JSON.stringify(res.data.userInfo));
      dispatch({
        type: SignIn,
        payload: res.data,
      });
      swal("", "Đăng Nhập Thành Công", "success").then(() => {
        history.push("/list-product");
      });
    } catch (error) {
      if (error !== undefined) {
        if (error.response.status === 404) {
          swal("", "Không Tìm Thấy Tài Khoản Của Bạn", "error");
        } else if (error.response.status === 400) {
          swal("", "Mật Khẩu Không Đúng", "error");
        } else {
          swal("", "Server Đang Cố Vấn Đề", "error");
        }
      }
    }
  };
};
