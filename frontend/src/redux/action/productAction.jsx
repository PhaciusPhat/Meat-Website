import axios from "axios";
import { GET_PRODUCTTYPE_LIST, GET_PRODUCT_LIST } from "../const/reduxConst";

export const getProductTypeListAction = () => {
    return async (dispatch) => {
        try {
          //   const token = JSON.parse(localStorage.getItem("token"));
          const res = await axios({
            method: "get",
            url: "http://localhost:2222/router/productType/",
          });
          dispatch({
              type: GET_PRODUCTTYPE_LIST,
              payload: res.data,
          })
        } catch (error) {
        }
      };
}

export const getProductListAction = () => {
  return async (dispatch) => {
    try {
      const res = await axios({
        method: "get",
        url: "http://localhost:2222/router/product/",
      });
      dispatch({
          type: GET_PRODUCT_LIST,
          payload: res.data,
      })
    } catch (error) {
      if(error){
        if (error.response.status === 401) {
          alert("Đăng nhập hết hạn");
        }
      }
    }
  };
};

export const delProductAction = (id) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.token);
      const res = await axios({
        method: "delete",
        url: `http://localhost:2222/router/product/${id}`,
        headers: {
          token: token,
        },
      })
      alert("xóa thành công");
      window.location.reload();
    } catch (error) {
      alert("Sản phẩm này đã được mua không thể xóa");
    }
  }
}

export const addProductAction = (product) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.token);
      const res = await axios({
        method: "post",
        url: `http://localhost:2222/router/product/`,
        headers: {
          token: token,
        },
        data: product
      })
      alert("thêm thành công");
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  }
}



export const updateProductAction = (id, product) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.token);
      const res = await axios({
        method: "put",
        url: `http://localhost:2222/router/product/${id}`,
        headers: {
          token: token,
        },
        data: product
      })
      alert("cập nhật thành công");
      window.location.reload();
    } catch (error) {
      console.log(error.response);
    }
  }
}