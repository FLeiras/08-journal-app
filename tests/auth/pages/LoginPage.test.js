const { configureStore } = require('@reduxjs/toolkit');
const { render, screen, fireEvent } = require('@testing-library/react');
const { Provider } = require('react-redux');
const { MemoryRouter } = require('react-router-dom');
const { LoginPage } = require('../../../src/auth/pages/LoginPage');
const { authSlice } = require('../../../src/store/auth');
const { notAuthenticatedState } = require('../../fixtures/authFixtures');

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmail = jest.fn();
jest.mock('../../../src/store/auth/thunks', () => ({
  startGoogleSignIn: () => mockStartGoogleSignIn,
  startLoginWithEmail: ({ email, password }) => {
    return () => mockStartLoginWithEmail({ email, password });
  },
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => (fn) => fn(),
}));

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    auth: notAuthenticatedState,
  },
});

describe('Pruebas en <LoginPage/>', () => {
  beforeEach(() => jest.clearAllMocks());

  test('Debe mostrar un componente correctamente', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );
    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('Elboton de Google debe llamar startGoogleSignIn', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
  });

  test('Submit debe llamar startLoginWhitEmail', () => {
    const email = 'fede@google.com';
    const password = '123456';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>,
    );

    const emailField = screen.getByRole('textbox', { name: 'Correo' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, {
      target: { name: 'password', value: password },
    });

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmail).toHaveBeenCalledWith({
      email: email,
      password: password,
    });
  });
});
