import { collection, deleteDoc, doc, setDoc } from 'firebase/firestore/lite';
import { FirebaseDB } from '../../firebase/config';
import {
  addNewNote,
  setCurrentNote,
  savingNote,
  setNote,
  updateNote,
  setSaving,
  setPhotosToActiveNote,
  deleteNoteById,
} from './';
import { fileUpload, loadNotes } from '../../helpers';

export const startNewNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNote());

    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/note`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    dispatch(addNewNote(newNote));
    dispatch(setCurrentNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error('El UID del usuario no existe');

    const notes = await loadNotes(uid);

    dispatch(setNote(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(savingNote());

    const { uid } = getState().auth;
    const { noteActive: note } = getState().journal;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const docRef = doc(FirebaseDB, `${uid}/journal/note/${note.id}`);
    await setDoc(docRef, noteToFirestore, { merge: true });

    dispatch(updateNote(note));
  };
};

export const startUploadFiles = (files = []) => {
  return async (dispatch) => {
    dispatch(setSaving());

    const fileUploadPromises = [];
    for (const file of files) {
      fileUploadPromises.push(fileUpload(file));
    }

    const photoUrls = await Promise.all(fileUploadPromises);
    dispatch(setPhotosToActiveNote(photoUrls));
  };
};

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { noteActive: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/note/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
