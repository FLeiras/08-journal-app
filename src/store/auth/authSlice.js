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
    login: (state, action) => {},
    logout: (state, payload) => {},
    //Este reducer me va a servir para manejar un Loading, bloquear botones, etc.
    chekingCredentials: (state) => {
      state.status = 'checking';
    },
  },
});

//Este es el genarador de acciones
export const { login, logout, chekingCredentials } = authSlice.actions;
