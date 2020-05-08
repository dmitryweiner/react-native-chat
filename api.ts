import axios from 'axios';
import {IUserRegister} from './interfaces/user';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

const api = {
  register(params: IUserRegister) {
    return axiosInstance.post('/user/register', params);
  }
};

export default api;
