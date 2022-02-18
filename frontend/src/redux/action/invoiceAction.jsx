import axios from "axios";
import { GET_INVOICE_LIST } from "./../const/reduxConst";
import swal from "sweetalert";

export const buyItemAction = (obj) => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      await axios({
        method: "post",
        headers: {
          token: token,
        },
        url: "http://localhost:2222/router/invoice/",
        data: obj,
      });
      alert("Mua hàng thành công!!");
      window.location.reload();
    } catch (error) {
      if (error) {
        if (error.response.status == 400) {
          swal("", "Số lượng hàng tồn kho không đủ!!!", "error");
        } else {
          swal("", "Server có vấn đề", "error");
        }
      }
    }
  };
};

export const getAllInvoiceAction = () => {
  return async (dispatch) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const res = await axios({
        method: "get",
        url: "http://localhost:2222/router/invoice/",
        headers: {
          token: token,
        },
      });
      console.log(res, token);
      dispatch({
        type: GET_INVOICE_LIST,
        payload: res.data,
      });
    } catch (error) {
      console.log(error.response);
    }
  };
};
