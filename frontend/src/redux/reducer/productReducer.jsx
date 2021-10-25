import { GET_PRODUCTTYPE_LIST, GET_PRODUCT_LIST } from "../const/reduxConst";

const initialState = {
  productList: [],
  product: {},
  productTypeList: [],
  productType: {}
};

const productReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_PRODUCT_LIST:
      state.productList = payload;
      return { ...state };
    case GET_PRODUCTTYPE_LIST:
      state.productTypeList = payload;
      return {...state}
    default:
      return state;
  }
};

export default productReducer;
