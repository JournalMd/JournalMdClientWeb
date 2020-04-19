import { Commit, Dispatch } from 'vuex';
import { axiosAuthenticated } from '@/api/api';
import * as types from './mutation-types';

// TODO
// Find a better name than note
// stronly typed entities is mainly base entity from db (=id) ;-)

export const getNoteTypes = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) => {
  axiosAuthenticated.get('NoteTypes', {})
    .then((result) => {
      console.log(result);
      const noteTypes = result.data.value;
      commit(types.GET_NOTE_TYPES, noteTypes);
    })
    .catch((error) => {
      dispatch('dialogs/addError', error.response.data.message, { root: true });
      commit(types.GET_NOTE_TYPES, []); // TODO ? _FAILED
    });
};

export const getCategories = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) => {
  axiosAuthenticated.get('Categories', {})
    .then((result) => {
      console.log(result);
      const categories = result.data.value;
      commit(types.GET_CATEGORIES, categories);
    })
    .catch((error) => {
      dispatch('dialogs/addError', error.response.data.message, { root: true });
      commit(types.GET_CATEGORIES, []); // TODO ? _FAILED
    });
};

export const getTags = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) => {
  axiosAuthenticated.get('Tags', {})
    .then((result) => {
      console.log(result);
      const tags = result.data.value;
      commit(types.GET_TAGS, tags);
    })
    .catch((error) => {
      dispatch('dialogs/addError', error.response.data.message, { root: true });
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
      console.log(result);
      const notes = result.data.value;
      commit(types.GET_NOTES, notes);
    })
    .catch((error) => {
      dispatch('dialogs/addError', error.response.data.message, { root: true });
      commit(types.GET_NOTES, []); // TODO ? _FAILED
    });
};

export const createNote = ({ commit } : { commit: Commit}, note: any) => {
  // TODO api
  commit(types.CREATE_NOTE, note);
};

export const editNote = ({ commit } : { commit: Commit}, note: any) => {
  // TODO api
  commit(types.EDIT_NOTE, note);
};

export const deleteNote = ({ commit } : { commit: Commit}, id: number) => {
  // TODO api
  commit(types.DELETE_NOTE, id);
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
