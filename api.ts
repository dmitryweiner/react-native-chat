import axios from 'axios';
import {IUserLogin, IUserRegister} from './interfaces/user';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

const api = {
  register(params: IUserRegister) {
    return axiosInstance.post('/user/register', params);
  },
  login(params: IUserLogin) {
    return axiosInstance.post('/user/login', params);
  }
};

export default api;
