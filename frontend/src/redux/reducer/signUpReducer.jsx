import { SignUp } from "../const/reduxConst";

const initialState = {
  account: {},
};

const signUpReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SignUp:
      state.account = payload;
      return { ...state };
    default:
      return state;
  }
};

export default signUpReducer;
