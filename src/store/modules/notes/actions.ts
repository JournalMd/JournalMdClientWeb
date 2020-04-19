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

export const getNotes = ({ commit } : { commit: Commit}) => {
  const notes: any[] = [ // + noteFieldValues // TODO strongly type
    { id: 1, typeId: 1, title: 'Note 1', description: 'Zombie ipsum reversus ab viral inferno, nam rick grimes malum cerebro. De carne lumbering animata corpora quaeritis. Summus brains sit​​, morbo vel maleficia?', createdAt: new Date(2020, 0, 1, 11, 11), mood: 5, categories: [1, 8, 20, 21, 19] },
    { id: 2, typeId: 1, title: 'Note 2', description: 'De apocalypsi gorger omero undead survivor dictum mauris.', createdAt: new Date(2020, 0, 2, 12, 12), mood: 4, categories: [] },
    { id: 3, typeId: 1, title: 'Note 3 The voodoo sacerdos flesh eater, suscitat mortuos comedere carnem virus.', description: 'Hi mindless mortuis soulless creaturas, imo evil stalking monstra adventus resi dentevil vultus comedat cerebella viventium. Qui animated corpse, cricket bat max brucks terribilem incessu zomby.', createdAt: new Date(2020, 0, 3, 10, 0), mood: null, categories: [] },
    { id: 4, typeId: 1, title: 'Note 4 Really long ding dong', description: '', createdAt: new Date(2020, 0, 3, 14, 0), mood: 5, categories: [] },

    { id: 5, typeId: 2, title: 'Task 1', description: 'Kekse backen.', createdAt: new Date(2020, 0, 1, 11, 12), mood: 4, categories: [1, 8],
      fields: { completed: { id: 1, fieldId: 1, value: 'true' }, due: { id: 11, fieldId: 5, value: '2020-04-04' } } },
    { id: 6, typeId: 2, title: 'Task 2', description: 'Kekse essen...', createdAt: new Date(2020, 0, 1, 11, 15), mood: 5, categories: [1, 8],
      fields: { completed: { id: 2, fieldId: 1, value: 'false' }, due: { id: 12, fieldId: 5, value: '2020-05-05' } } },

    { id: 7, typeId: 3, title: 'Goal 1 Abnehmen', description: '', createdAt: new Date(2020, 0, 1, 11, 14), mood: 1, categories: [1, 8],
      fields: { achieved: { id: 3, fieldId: 2, value: 'true' } } },
    { id: 8, typeId: 3, title: 'Goal 2 Noch mehr abnehmen', description: 'Viel...', createdAt: new Date(2020, 0, 1, 11, 16), mood: 2, categories: [1, 8],
      fields: { achieved: { id: 4, fieldId: 2, value: 'false' } } },

    { id: 9, typeId: 4, title: 'Journal', description: '', createdAt: new Date(2020, 0, 1, 11, 14), mood: 5, categories: [1, 8] },
    { id: 10, typeId: 4, title: 'Noch ein Journal', description: '# Markdown\n\n**dfff**\n\nsdfsdg\n\n* a\n* [ ] b', createdAt: new Date(2020, 0, 2, 1, 1), mood: null, categories: [] },

    { id: 11, typeId: 5, title: 'Activity 1', description: 'Kleine Runde', createdAt: new Date(2020, 0, 1, 11, 22), mood: null, categories: [1, 8, 19] },

    { id: 12, typeId: 6, title: 'Habit 1', description: '', createdAt: new Date(2020, 0, 1, 11, 22), mood: null, categories: [1, 8] },
    { id: 13, typeId: 6, title: 'Habit 2', description: '', createdAt: new Date(2019, 7, 7, 11, 22), mood: 5, categories: [] },

    { id: 14, typeId: 7, title: 'Routine 1', description: '', createdAt: new Date(2020, 0, 2, 11, 22), mood: 2, categories: [] },
    { id: 15, typeId: 7, title: 'Routine 2', description: '', createdAt: new Date(2019, 8, 8, 11, 22), mood: null, categories: [] },

    { id: 16, typeId: 8, title: 'Weight 1', description: '', createdAt: new Date(2019, 2, 1, 12, 12), mood: 5, categories: [],
      fields: { height: { id: 5, fieldId: 3, value: '192' }, weight: { id: 6, fieldId: 4, value: '81' } } },
    { id: 17, typeId: 8, title: 'Weight 2', description: '', createdAt: new Date(2019, 7, 2, 12, 14), mood: 2, categories: [],
      fields: { height: { id: 7, fieldId: 3, value: '192' }, weight: { id: 8, fieldId: 4, value: '86' } } },

    { id: 18, typeId: 3, title: 'Goal 3 Bucket List 1', description: 'Categories Test Item', createdAt: new Date(2018, 0, 1, 11, 16), mood: 5, categories: [14],
      fields: { achieved: { id: 9, fieldId: 2, value: 'false' } } },
    { id: 19, typeId: 3, title: 'Goal 4 Bucket List 1', description: 'Categories Test Item', createdAt: new Date(2018, 0, 1, 11, 18), mood: 5, categories: [14],
      fields: { achieved: { id: 10, fieldId: 2, value: 'false' } } },
  ];

  commit(types.GET_NOTES, notes);
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