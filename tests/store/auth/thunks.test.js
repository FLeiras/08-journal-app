import {
  loginWidthEmailAndPassword,
  logoutFirebase,
  singInWithGoogle,
} from '../../../src/firebase/providers';
import {
  chekingAuthtentications,
  chekingCredentials,
  login,
  logout,
  startGoogleSignIn,
  startLoginWithEmail,
  startLogout,
} from '../../../src/store/auth';
import { clearNotesLogout } from '../../../src/store/journal';
import { demoUser } from '../../fixtures/authFixtures';

jest.mock('../../../src/firebase/providers');

describe('Pruebas en AuthThunks', () => {
  const dispatch = jest.fn();
  beforeEach(() => jest.clearAllMocks());
  test('Debe invocar chekingCredentials', async () => {
    await chekingAuthtentications()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
  });

  test('startGoogleSignIn debe llamar checkingCredentials y login - Exitosamente', async () => {
    const loginData = { ok: true, ...demoUser };
    await singInWithGoogle.mockResolvedValue(loginData);

    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startGoogleSignIn debe llamar checkingCredentials y logOut - Error', async () => {
    const loginData = { ok: false, errorMessage: 'Error en google' };
    await singInWithGoogle.mockResolvedValue(loginData);
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(loginData.errorMessage));
  });

  test('startCreateUserWidthEmail debe llamar checkingCredentials y login - Exitosamente', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWidthEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmail(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLoginWithEmail debe llamar checkingCredentials y login - Exitosamente', async () => {
    const loginData = { ok: true, ...demoUser };
    const formData = { email: demoUser.email, password: '123456' };

    await loginWidthEmailAndPassword.mockResolvedValue(loginData);

    await startLoginWithEmail(formData)(dispatch);
    expect(dispatch).toHaveBeenCalledWith(chekingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(loginData));
  });

  test('startLogout debe llamar logoutFirebase, clearNotes y logout', async () => {
    await startLogout()(dispatch);

    expect(logoutFirebase).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
  });
});
