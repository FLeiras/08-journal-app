import { collection, deleteDoc, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../../src/firebase/config';
import {
  addNewNote,
  savingNote,
  setCurrentNote,
  startNewNote,
} from '../../../src/store/journal';

describe('Pruebas en Journal Thunks', () => {
  const dispatch = jest.fn();
  const getState = jest.fn();

  beforeEach(() => jest.clearAllMocks());

  test('startNewNote debe crear una nota en blanco', async () => {
    const uid = 'TEST-UID';
    getState.mockReturnValue({ auth: { uid } });

    await startNewNote()(dispatch, getState);

    expect(dispatch).toHaveBeenCalledWith(savingNote());
    expect(dispatch).toHaveBeenCalledWith(
      addNewNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
        imageURLS: [],
      }),
    );

    expect(dispatch).toHaveBeenCalledWith(
      setCurrentNote({
        body: '',
        title: '',
        id: expect.any(String),
        date: expect.any(Number),
        imageURLS: [],
      }),
    );

    //borrar de fireBase
    const collectionRef = collection(FirebaseDB, `${uid}/journal/note`);
    const docs = await getDocs(collectionRef);

    const deletePromises = [];
    docs.forEach((doc) => deletePromises.push(deleteDoc(doc.ref)));

    await Promise.all(deletePromises);
  }, 15000);
});
