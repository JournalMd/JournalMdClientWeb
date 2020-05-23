import {
  GET_NOTE_TYPES,
  GET_CATEGORIES,
  GET_TAGS,
  CREATE_TAG,
  CREATE_TAG_FAILED,
  GET_INSPIRATIONS,
  GET_NOTES,
  CREATE_NOTE,
  CREATE_NOTE_FAILED,
  EDIT_NOTE,
  EDIT_NOTE_FAILED,
  DELETE_NOTE,
  DELETE_NOTE_FAILED,
} from './mutation-types';

export default {
  [GET_NOTE_TYPES](state: any, noteTypes: any[]) {
    state.noteTypes = noteTypes;
  },
  [GET_CATEGORIES](state: any, categories: any[]) {
    categories.forEach((cat: any) => {
      if (cat.parentCategory == null) {
        // eslint-disable-next-line no-param-reassign
        cat.header = cat.title;
      }
    });
    state.categories = categories;
  },
  [GET_TAGS](state: any, tags: any[]) {
    state.tags = tags;
  },
  [CREATE_TAG](state: any, tag: any) {
    state.tags = [tag, ...state.tags];
  },
  [CREATE_TAG_FAILED](state: any) {
  },
  [GET_INSPIRATIONS](state: any, inspirations: any[]) {
    state.inspirations = inspirations;
  },
  [GET_NOTES](state: any, notes: any[]) {
    /* eslint-disable no-param-reassign */
    notes.forEach((value) => {
      value.date = new Date(`${value.date}Z`); // saved as local but api misses Z
      value.fields = {};
      value.noteValues.forEach((nv: any) => {
        value.fields[nv.noteFieldId] = nv;
      });
    });
    /* eslint-enable no-param-reassign */
    state.notes = notes;
  },
  [CREATE_NOTE](state: any, note: any) {
    /* eslint-disable no-param-reassign */
    note.date = new Date(note.date);
    note.fields = {};
    note.noteValues.forEach((nv: any) => {
      note.fields[nv.noteFieldId] = nv;
    });
    state.notes = [note, ...state.notes];
    /* eslint-enable no-param-reassign */
  },
  [CREATE_NOTE_FAILED](state: any) {
  },
  [EDIT_NOTE](state: any, note: any) {
    /* state.notes = [
      ...state.notes.filter((fNote: { id: any; }) => fNote.id !== note.id),
      note,
    ]; */
    // keep order
    /* eslint-disable no-param-reassign */
    note.date = new Date(note.date);
    note.fields = {};
    note.noteValues.forEach((nv: any) => {
      note.fields[nv.noteFieldId] = nv;
    });
    state.notes = [...state.notes.map((fNote: { id: any; }) => (fNote.id !== note.id ? fNote : { ...fNote, ...note }))];
    /* eslint-enable no-param-reassign */
  },
  [EDIT_NOTE_FAILED](state: any) {
  },
  [DELETE_NOTE](state: any, id: number) {
    const index = state.notes.findIndex((i: { id: number; }) => i.id === id);
    if (index > -1) {
      state.notes.splice(index, 1);
    }
  },
  [DELETE_NOTE_FAILED](state: any) {
  },
};
