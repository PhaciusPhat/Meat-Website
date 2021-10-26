import axios from "axios";
import { GET_CART_LIST } from "../const/reduxConst";

export const addCartAction = (id, history) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.token);
      const product = {
        productId: id,
      };
      await axios({
        method: "POST",
        url: "http://localhost:2222/router/cart/",
        headers: {
          token: token,
        },
        data: product,
      });
      alert("thêm sản phẩm vào giỏ hàng thành công");
    } catch (error) {
      alert(error.response.data.message);
      if (error) {
        if (error.response.status === 401) {
          history.push("/sign-in");
        }
      }
    }
  };
};

export const delCartAction = (id) => {
  return async (dispatch) => {
    try {
      const del = {
        productId: id,
      };
      const token = JSON.parse(localStorage.token);
      await axios({
        method: "delete",
        url: "http://localhost:2222/router/cart/",
        headers: {
          token: token,
        },
        data: del,
      });
      alert("Xóa thành công");

      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
};

export const getCartListAction = () => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.token);
      const res = await axios({
        method: "GET",
        url: "http://localhost:2222/router/cart/",
        headers: {
          token: token,
        },
      });
      const cartList = [];
      res.data.forEach((element) => {
        cartList.push({
          ProductId: element.Product.id,
          Number: element.Number,
          ProductName: element.Product.ProductName,
          ProductPrice: element.Product.ProductPrice,
          ProductImage: element.Product.ProductImage,
          ProductNumber: element.Product.ProductNumber,
        });
      });
      dispatch({
        type: GET_CART_LIST,
        payload: cartList,
      });
    } catch (error) {
      if (error) {
        if (error.response.status === 401) {
          alert("Vui lòng đăng nhập để thực hiện tính năng này");
        }
      }
    }
  };
};
