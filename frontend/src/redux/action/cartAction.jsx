import axios from "axios";
import { GET_CART_LIST } from "../const/reduxConst";
import swal from "sweetalert";
export const addCartAction = (id, history) => {
  return async (dispatch) => {
    try {
      const token = localStorage.token;
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
      swal("", "thêm sản phẩm vào giỏ hàng thành công", "success");
    } catch (error) {
      if (error !== undefined) {
        if (error.response.status === 401) {
          swal("", "hết hạn đăng nhập, vui lòng đăng nhập lại", "warning").then(
            () => {
              history.push("/sign-in");
            }
          );
        } else {
          swal("", "Server có vấn đề", "error");
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
      const token = localStorage.getItem('token');
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
          ProductId: element.Product.ProductId,
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
          swal("", "Vui lòng đăng nhập để thực hiện tính năng này", "warning");
        }
      }
    }
  };
};
