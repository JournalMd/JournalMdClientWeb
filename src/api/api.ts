import axios from 'axios';
import EventBus from '@/helper/eventBus';
import { NAVIGATE } from '@/helper/event-bus-types';

axios.defaults.baseURL = 'https://localhost:44302/api/'; // TODO change to real api - process.env.JOURNALMD_API_LOCATION;
axios.defaults.headers.common.Accept = 'application/json';
// axios.defaults.headers.common['Accept-Language'] = 'de-DE,de;q=0.9,en-DE;q=0.8,en;q=0.7,en-US;q=0.6';

axios.interceptors.response.use(
  response => response,
  (error) => {
    if (error.response.status === 401) {
      EventBus.$emit(NAVIGATE, '/login');
    }

    return Promise.reject(error);
  },
);

export const axiosAuthenticated = axios.create({
});
axiosAuthenticated.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem('authToken')}`;

export const axiosUnauthenticated = axios.create({
});
