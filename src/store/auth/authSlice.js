import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    status: 'not-authenticated', //'checking', 'not-authenticated', 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
  },
  reducers: {
    login: (state, { payload }) => {
      (state.status = 'authenticated'), (state.uid = payload.uid);
      state.email = payload.email;
      state.displayName = payload.displayName;
      state.photoURL = payload.photoURL;
      state.errorMessage = null;
    },
    logout: (state, { payload }) => {
      (state.status = 'not-authenticated'), (state.uid = null);
      state.email = null;
      state.displayName = null;
      state.photoURL = null;
      state.errorMessage = payload.errorMessage;
    },
    //Este reducer me va a servir para manejar un Loading, bloquear botones, etc.
    chekingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

//Este es el genarador de acciones
export const { login, logout, chekingCredentials } = authSlice.actions;
