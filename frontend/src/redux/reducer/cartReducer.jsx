import { GET_CART_LIST } from "../const/reduxConst";

const initialState = {
  cartList: [],
};

const cartReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_CART_LIST:
      state.cartList = payload;
      return { ...state };

    default:
      return state;
  }
};

export default cartReducer
