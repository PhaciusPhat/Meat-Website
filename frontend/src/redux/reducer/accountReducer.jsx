import { FIND_USER, GET_USER_DETAIL, GET_USER_LIST } from "../const/reduxConst";

const initialState = {
  accountList: [],
  accountDetail: {},
  accountFind: [],
};

const accountReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_USER_LIST:
      state.accountList = payload;
      return { ...state };
    case GET_USER_DETAIL:
      state.accountDetail = payload;
      return { ...state };
    case FIND_USER:
      state.accountFind = payload;
      return { ...state };
    default:
      return state;
  }
};

export default accountReducer;
