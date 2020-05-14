import axios from 'axios';
import {
  IAuthParams,
  IUserLogin,
  IUserRegister
} from './interfaces/user';
import {ICreateChatParams, ISearchParams, IViewChatParams} from './interfaces/chat';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000'
});

const api = {
  register(params: IUserRegister) {
    return axiosInstance.post('/user/register', params);
  },
  login(params: IUserLogin) {
    return axiosInstance.post('/user/login', params);
  },
  getMyChats(params: IAuthParams) {
    return axiosInstance.post('/chat/my', params);
  },
  createChat(params: ICreateChatParams) {
    return axiosInstance.post('/chat', params);
  },
  viewChat(params: IViewChatParams) {
    return axiosInstance.post(`/chat/${params.chatId}`, params);
  },
  searchChats(params: ISearchParams) {
    return axiosInstance.post('/chat/search', params);
  }
};

export function getErrorMessage(error: any) {
  let errorMessage: string = '';
  if (error.response) {
    // Request made and server responded
    errorMessage = error.response.data.error;
  } else {
    errorMessage = `Something wrong happened! ${error.message}`;
  }
  return errorMessage;
}

export default api;
