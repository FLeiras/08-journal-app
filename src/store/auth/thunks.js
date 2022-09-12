import { chekingCredentials } from './authSlice';

export const chekingAuthtentications = (email, password) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
  };
};

export const startGoogleSignIn = (email, password) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
  };
};
