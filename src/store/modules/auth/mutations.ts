import Vue from 'vue';
import { axiosAuthenticated, axiosUnauthenticated } from '@/api/api';
import EventBus from '@/helper/eventBus';
import { NAVIGATE, AUTHENTICATED } from '@/helper/event-bus-types';
import {
  CHECK,
  REGISTER,
  REGISTER_FAILED,
  LOGIN,
  LOGIN_FAILED,
  LOGOUT,
} from './mutation-types';

/* eslint-disable no-param-reassign */
export default {
  [CHECK](state: any) {
    state.authenticated = !!localStorage.getItem('authToken');
    if (state.authenticated) {
      axiosAuthenticated.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('authToken')}`;
      EventBus.$emit(AUTHENTICATED, true);
    }
  },

  [REGISTER]() {
    EventBus.$emit(NAVIGATE, '/login');
  },

  [REGISTER_FAILED](state: any) {
    state.authenticated = false;
  },

  [LOGIN](state: any, token: string) {
    state.authenticated = true;
    localStorage.setItem('authToken', token);
    axiosAuthenticated.defaults.headers.common.Authorization = `Bearer ${token}`;

    EventBus.$emit(AUTHENTICATED, true);
    EventBus.$emit(NAVIGATE, '/');
  },

  [LOGIN_FAILED](state: any) {
    state.authenticated = false;
  },

  [LOGOUT](state: any) {
    state.authenticated = false;
    localStorage.removeItem('authToken');
    axiosAuthenticated.defaults.headers.common.Authorization = '';
  },
};
