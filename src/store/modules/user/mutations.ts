import {
  GET_USER,
  GET_USER_FAILED,
  EDIT_USER,
  EDIT_USER_FAILED,
  CHANGE_PASSWORD,
} from './mutation-types';
import { User } from '../../../models/user';

export default {
  [GET_USER](state: any, user: User) {
    state.user = user;
  },

  [GET_USER_FAILED](state: any) {
    state.user = null;
  },
  [EDIT_USER](state: any, user: User) {
    state.user = user;
  },
  [EDIT_USER_FAILED](state: any) {
  },
  [CHANGE_PASSWORD](state: any) {
  },
};
