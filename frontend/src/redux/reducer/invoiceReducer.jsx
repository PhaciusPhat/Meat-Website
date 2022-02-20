import {
  GET_DETAIL_INVOICE,
  GET_INVOICE_LIST,
  GET_USER_INVOICE_LIST,
} from "./../const/reduxConst";
const initialState = {
  invoiceList: [],
  invoiceDetail: {},
  userInvoices: [],
};
const invoiceReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_INVOICE_LIST:
      state.invoiceList = payload;
      return { ...state };
    case GET_DETAIL_INVOICE:
      state.invoiceDetail = payload;
      return { ...state };
    case GET_USER_INVOICE_LIST:
      state.userInvoices = payload;
      return { ...state };
    default:
      return state;
  }
};

export default invoiceReducer;
