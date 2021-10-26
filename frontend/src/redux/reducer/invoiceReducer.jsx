import { GET_INVOICE_LIST } from "./../const/reduxConst";
const initialState = {
  invoiceList: [],
};
const invoiceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_INVOICE_LIST:
      state.invoiceList = payload;
      return { ...state };

    default:
      return state;
  }
};

export default invoiceReducer;
