import axios from "axios";

export const buyItemAction = (obj) => {
  return async (dispatch) => {
    try {
      const token = JSON.parse(localStorage.token);
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
      console.log(error.response);
    }
  };
};
