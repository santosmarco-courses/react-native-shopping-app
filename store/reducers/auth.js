import { SIGN_OUT, SIGN_IN, SET_USER } from "../actions/actionTypes";

const initialState = {};

const signIn = (state, { data }) => data;

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return signIn(state, action);
    case SIGN_OUT:
      return initialState;
    case SET_USER:
      return action.data;
    default:
      return state;
  }
};

export default authReducer;
