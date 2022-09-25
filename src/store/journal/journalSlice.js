import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
  name: 'journal',
  initialState: {
    isSaving: false,
    messageSave: '',
    notes: [],
    noteActive: null,
    // noteActive: {
    //   id: 'ABC123',
    //   title: '',
    //   body: '',
    //   date: 12011987,
    //   imagesURLS: [], // https://foto1.jpg, https://foto2.jpg, https://foto3.jpg
    // }
  },
  reducers: {
    savingNote: (state) => {
      state.isSaving = true;
    },
    addNewNote: (state, action) => {
      state.notes.push(action.payload);
      state.isSaving = false;
    },
    setCurrentNote: (state, action) => {
      state.noteActive = action.payload;
      state.messageSave = '';
    },
    setNote: (state, action) => {
      state.notes = action.payload;
    },
    setSaving: (state) => {
      state.isSaving = true;
      state.messageSave = '';
    },
    updateNote: (state, action) => {
      state.isSaving = false;
      state.notes = state.notes.map((note) => {
        if (note.id === action.payload.id) {
          return action.payload;
        }
        return note;
      });

      state.messageSave = `Nota actualizada correctamente!!`;
    },
    setPhotosToActiveNote: (state, action) => {
      state.noteActive.imageURLS = [
        ...state.noteActive.imageURLS,
        ...action.payload,
      ];
      state.isSaving = false;
    },
    clearNotesLogout: (state) => {
      state.isSaving = false;
      state.messageSave = '';
      state.notes = [];
      state.noteActive = null;
    },
    deleteNoteById: (state, action) => {
      state.noteActive = null;
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  savingNote,
  addNewNote,
  setCurrentNote,
  setNote,
  setSaving,
  updateNote,
  deleteNoteById,
  setPhotosToActiveNote,
  clearNotesLogout,
} = journalSlice.actions;
