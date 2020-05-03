import { Commit, Dispatch } from 'vuex';
import { axiosAuthenticated, errorToMessage } from '@/api/api';
import VueI18n from '@/plugins/i18n';
import * as types from './mutation-types';

// TODO
// Find a better name than note
// stronly typed entities is mainly base entity from db (=id) ;-)

export const getNoteTypes = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) => {
  axiosAuthenticated.get('NoteTypes', {})
    .then((result) => {
      const noteTypes = result.data.value;
      commit(types.GET_NOTE_TYPES, noteTypes);
    })
    .catch((error) => {
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.GET_NOTE_TYPES, []); // TODO ? _FAILED
    });
};

export const getCategories = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) => {
  axiosAuthenticated.get('Categories', {})
    .then((result) => {
      const categories = result.data.value;
      commit(types.GET_CATEGORIES, categories);
    })
    .catch((error) => {
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.GET_CATEGORIES, []); // TODO ? _FAILED
    });
};

export const getTags = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) => {
  axiosAuthenticated.get('Tags', {})
    .then((result) => {
      const tags = result.data.value;
      commit(types.GET_TAGS, tags);
    })
    .catch((error) => {
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.GET_TAGS, []); // TODO ? _FAILED
    });
};

/* eslint-disable object-curly-newline, max-len, object-property-newline */ // Allow test data onliner
export const getInspirations = ({ commit } : { commit: Commit}) => {
  const inspirations: any[] = [ // TODO strongly type
    { id: 1, type: 'journal', title: 'Journal Inspiration #1', description: 'Write one.' },
    { id: 2, type: 'journal', title: 'Journal Inspiration #2', description: 'Write every day.' },
    { id: 3, type: 'journal', title: 'Journal Inspiration #3', description: 'TODO ich muss mir echt mehr Beispiele einfallen lassen...' },
  ];

  commit(types.GET_INSPIRATIONS, inspirations);
};

export const getNotes = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) => {
  axiosAuthenticated.get('Notes', {})
    .then((result) => {
      const notes = result.data.value;
      commit(types.GET_NOTES, notes);
    })
    .catch((error) => {
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.GET_NOTES, []); // TODO ? _FAILED
    });
};

export const createNote = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, note: any) => {
  // eslint-disable-next-line no-param-reassign
  note.noteValues = [];
  Object.entries(note.fields).forEach((element: any) => {
    note.noteValues.push({
      value: element[1].value.toString(),
      noteFieldId: element[1].fieldId,
    });
  });

  axiosAuthenticated.post('Notes', note)
    .then((result) => {
      dispatch('dialogs/addMessage', VueI18n.t('general.created'), { root: true });
      dispatch('dialogs/createNote', null, { root: true }); // "close" dialog
      const createdNote = result.data;
      commit(types.CREATE_NOTE, createdNote);
    })
    .catch((error) => {
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.CREATE_NOTE_FAILED);
    });
};

export const editNote = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }, note: any) => {
  // eslint-disable-next-line no-param-reassign
  note.noteValues = [];
  Object.entries(note.fields).forEach((element: any) => {
    note.noteValues.push({
      value: element[1].value.toString(),
      noteFieldId: element[1].noteFieldId,
    });
  });
  axiosAuthenticated.put(`Notes/${note.id}`, note)
    .then((result) => {
      dispatch('dialogs/addMessage', VueI18n.t('general.edited'), { root: true });
      dispatch('dialogs/editNote', null, { root: true }); // "close" dialog
      const editedNote = result.data;
      commit(types.EDIT_NOTE, editedNote);
    })
    .catch((error) => {
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.EDIT_NOTE_FAILED);
    });
};

export const deleteNote = ({ commit, dispatch } : { commit: Commit, dispatch: Dispatch }, id: number) => {
  axiosAuthenticated.delete(`Notes/${id}`, {})
    .then((result) => {
      dispatch('dialogs/addMessage', VueI18n.t('general.success'), { root: true });
      commit(types.DELETE_NOTE, id);
    })
    .catch((error) => {
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.DELETE_NOTE_FAILED);
    });
};

export default {
  getNoteTypes,
  getCategories,
  getTags,
  getInspirations,
  getNotes,
  createNote,
  editNote,
  deleteNote,
};
