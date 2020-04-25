import { Commit, Dispatch } from 'vuex';
import { axiosAuthenticated, errorToMessage } from '@/api/api';
import { User } from '@/models/user';
import VueI18n from '@/plugins/i18n';
import * as types from './mutation-types';

export const getUser = ({ commit, dispatch }: { commit: Commit, dispatch: Dispatch }) => {
  axiosAuthenticated.get('users', {})
    .then((result) => {
      const user: User = {
        email: result.data.username,
        firstName: result.data.firstName,
        lastName: result.data.lastName,
        gender: result.data.gender,
        dateOfBirth: result.data.dateOfBirth != null ? result.data.dateOfBirth.substring(0, 10) : result.data.dateOfBirth,
      };
      commit(types.GET_USER, user);
    })
    .catch((error) => {
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.GET_USER_FAILED);
    });
};

export const editUser = ({ commit, dispatch } : { commit: Commit, dispatch: Dispatch }, user: User) => {
  axiosAuthenticated.put('Users', user)
    .then((result) => { // 204 no content
      commit(types.EDIT_USER, user);
      dispatch('dialogs/addMessage', VueI18n.t('general.success'), { root: true });
    })
    .catch((error) => {
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.EDIT_USER_FAILED);
    });
};

export const changePassword = ({ commit, dispatch } : { commit: Commit, dispatch: Dispatch },
  pwChange: { oldPassword: string, newPassword: string }) => {
  axiosAuthenticated.put('Users/password', pwChange)
    .then((result) => { // 204 no content
      commit(types.CHANGE_PASSWORD);
      dispatch('dialogs/addMessage', VueI18n.t('general.success'), { root: true });
    })
    .catch((error) => {
      console.log(error);
      dispatch('dialogs/addError', errorToMessage(error), { root: true });
      commit(types.CHANGE_PASSWORD);
    });
};

export default {
  getUser,
  editUser,
  changePassword,
};
