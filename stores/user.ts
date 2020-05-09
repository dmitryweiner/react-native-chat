import {action, observable} from 'mobx';
import {IUserRegister, IUser} from '../interfaces/user';
import api from '../api';

export interface IUserStore {
  user: IUser | undefined;
  isRegistrationInProgress: boolean;
  isRegistrationError: boolean;
  isRegistrationSuccess: boolean;
  registrationErrorMessage: string;
  register: Function;

  isLoginInProgress: boolean;
  isLoginError: boolean;
  isLoginSuccess: boolean;
  loginErrorMessage: string;
  login: Function;
}

class UserStore {
  @observable
  user: IUser | undefined;

  @observable
  isRegistrationInProgress = false;
  @observable
  isRegistrationError = false;
  @observable
  isRegistrationSuccess = false;
  @observable
  registrationErrorMessage = '';
  @action
  register(params: IUserRegister) {
    this.isRegistrationInProgress = true;
    this.isRegistrationSuccess = false;
    this.isRegistrationError = false;
    api
      .register(params)
      .then((response: any) => {
        return response.data.user;
      })
      .then((user: IUser) => {
        this.isRegistrationSuccess = true;
        this.isRegistrationInProgress = false;
        this.user = user;
      })
      .catch((error: any) => {
        let errorMessage: string = '';
        if (error.response) {
          // Request made and server responded
          errorMessage = error.response.data.error;
        } else {
          errorMessage = `Something wrong happened! ${error.message}`;
        }
        this.isRegistrationInProgress = false;
        this.isRegistrationError = true;
        this.registrationErrorMessage = errorMessage;
      });
  }

  @observable
  isLoginInProgress = false;
  @observable
  isLoginError = false;
  @observable
  isLoginSuccess = false;
  @observable
  loginErrorMessage = '';
  @action
  login(params: IUserRegister) {
    this.isLoginInProgress = true;
    this.isLoginSuccess = false;
    this.isLoginError = false;
    api
      .login(params)
      .then((response: any) => {
        return response.data.user;
      })
      .then((user: IUser) => {
        this.isLoginSuccess = true;
        this.isLoginInProgress = false;
        this.user = user;
      })
      .catch((error: any) => {
        let errorMessage: string = '';
        if (error.response) {
          // Request made and server responded
          errorMessage = error.response.data.error;
        } else {
          errorMessage = `Something wrong happened! ${error.message}`;
        }
        this.isLoginInProgress = false;
        this.isLoginError = true;
        this.loginErrorMessage = errorMessage;
      });
  }
}

function defaultErrorHandler() {}

const userStore = new UserStore();
export default userStore;
