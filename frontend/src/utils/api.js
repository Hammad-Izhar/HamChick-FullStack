import axios from 'axios';

export function getUser() {
  return axios.get('http://localhost:8080/api/auth', {
    withCredentials: true
  });
}