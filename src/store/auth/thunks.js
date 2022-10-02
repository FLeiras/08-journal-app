import {
  loginWidthEmailAndPassword,
  logoutFirebase,
  registerWidthEmail,
  singInWithGoogle,
} from '../../firebase/providers';
import { clearNotesLogout } from '../journal';
import { chekingCredentials, login, logout } from './';

export const chekingAuthtentications = () => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(chekingCredentials());
    const result = await singInWithGoogle();
    if (!result.ok) return dispatch(logout(result.errorMessage));

    dispatch(login(result));
  };
};

export const startCreateUserWidthEmail = ({ email, displayName, password }) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());

    const { ok, uid, photoURL, errorMessage } = await registerWidthEmail({
      email,
      password,
      displayName,
    });

    if (!ok) return dispatch(logout({ errorMessage }));

    dispatch(login({ uid, displayName, email, photoURL }));
  };
};

export const startLoginWithEmail = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(chekingCredentials());

    const result = await loginWidthEmailAndPassword({ email, password });

    if (!result.ok) return dispatch(logout(result));

    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await logoutFirebase();
    dispatch(clearNotesLogout());
    dispatch(logout());
  };
};
