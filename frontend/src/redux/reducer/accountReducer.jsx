import { GET_USER_DETAIL, GET_USER_LIST } from "../const/reduxConst";

const initialState = {
  accountList: [],
  accountDetail: {},
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_LIST:
      state.accountList = payload;
      return { ...state };
    case GET_USER_DETAIL:
      state.accountDetail = payload;
      return { ...state };
    default:
      return state;
  }
};

export default accountReducer;
