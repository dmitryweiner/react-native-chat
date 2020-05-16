import axios from 'axios';
import {IAuthParams, IUserLogin, IUserRegister} from './interfaces/user';
import {
  ICreateChatParams,
  IJoinChatParams,
  ISearchParams,
  IViewChatParams
} from './interfaces/chat';
import {IApiState} from './interfaces/api';
import {ISendMessageParams} from './interfaces/message';

const axiosInstance = axios.create({
  baseURL: 'http://rnweb.dweiner.ru:3099'
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
  joinChat(params: IJoinChatParams) {
    return axiosInstance.put(`/chat/${params.chatId}`, params);
  },
  searchChat(params: ISearchParams) {
    return axiosInstance.post('/chat/search', params);
  },
  sendMessage(params: ISendMessageParams) {
    return axiosInstance.post('/message', params);
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

export function getInitialApiState(): IApiState {
  return {
    isLoading: true,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  };
}

export function resetApiState(): IApiState {
  return {
    isLoading: false,
    isSuccess: false,
    isError: false,
    errorMessage: ''
  };
}

export function setSuccessApiState(apiState: IApiState) {
  apiState.isSuccess = true;
  apiState.isLoading = false;
  return apiState;
}

export function setErrorApiState(apiState: IApiState, error: any) {
  apiState.isSuccess = false;
  apiState.isLoading = false;
  apiState.isError = true;
  apiState.errorMessage = getErrorMessage(error);
  return apiState;
}

export default api;
