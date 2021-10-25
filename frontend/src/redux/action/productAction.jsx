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
