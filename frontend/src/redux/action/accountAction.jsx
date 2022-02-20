import axios from "axios";
import { GET_USER_DETAIL, GET_USER_LIST } from "../const/reduxConst";

export const getAccountListAction = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "get",
        url: "http://localhost:2222/router/user/",
        headers: {
          token: token,
        },
      });
      dispatch({
        type: GET_USER_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const addAccAction = (account) => {
  return async (dispatch) => {
    try {
      await axios({
        url: "http://localhost:2222/router/user/",
        method: "POST",
        data: account,
      });
      // const { message } = res.data;
      alert("Thêm tài khoản thành công");
      window.location.reload();
    } catch (error) {
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

export const delAccAction = (Username) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      await axios({
        method: "delete",
        url: `http://localhost:2222/router/user/?Username=${Username}`,
        headers: {
          token: token,
        },
      });
      alert("xóa thành công");
      window.location.reload();
    } catch (error) {
      alert("Tài khoản này đã mua hàng không thể xóa");
    }
  };
};

export const updateAccAction = (account) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      await axios({
        method: "put",
        url: `http://localhost:2222/router/user/?Username=${account.Username}`,
        headers: {
          token: token,
        },
        data: account,
      });
      alert("cập nhật thành công");
      window.location.reload();
    } catch (error) {
      alert("Email trùng với tài khoản khác");
    }
  };
};

export const getDetailAcc = (Username) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios({
        method: "get",
        url: `http://localhost:2222/router/user/user-detail/?Username=${Username}`,
        headers: {
          token: token,
        },
      });
      dispatch({
        type: GET_USER_DETAIL,
        payload: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateInfo = (Username, info) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      await axios({
        method: "put",
        url: `http://localhost:2222/router/user/?Username=${Username}`,
        headers: {
          token: token,
        },
        data: info,
      });
      alert("Thay Đổi thông tin thành công!!");
      window.location.reload();
    } catch (error) {
      if (error) {
        if (error.response.status === 400) {
          alert("Email này đã có tài khoản khác sử dụng");
        } else {
          alert("Lỗi");
        }
      }
    }
  };
};

export const updatePass = (info, history) => {
  return async (dispatch) => {
    try {
      console.log(info);
      const token = localStorage.getItem("token");
      await axios({
        method: "put",
        url: `http://localhost:2222/router/user/change-pass/`,
        headers: {
          token: token,
        },
        data: info,
      });
      alert("Thay Đổi mật khẩu thành công!!");
      alert("Vui lòng đăng nhập lại");
      localStorage.removeItem("token");
      localStorage.removeItem("userInfo");
      history.push("/")
    } catch (error) {
      if (error) {
        if (error.response.status === 400) {
          alert("Sai Mật Khẩu");
        } else {
          alert("Lỗi");
        }
      }
    }
  };
};
