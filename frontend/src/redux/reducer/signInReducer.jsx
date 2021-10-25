import { SignIn } from "../const/reduxConst";

const initialState = {
  account: {},
};

const signInReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SignIn:
      state.account = payload;
      return { ...state };
    default:
      return state;
  }
};

export default signInReducer;
