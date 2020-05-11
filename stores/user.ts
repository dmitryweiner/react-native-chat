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
  logout: Function;
  checkIfLogged: Function;
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
        this.isRegistrationInProgress = false;
        this.isRegistrationError = true;
        this.registrationErrorMessage = getErrorMessage(error);
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
        this.isLoginInProgress = false;
        this.isLoginError = true;
        this.loginErrorMessage = getErrorMessage(error);
      });
  }

  @action
  logout() {
    this.user = undefined;
  }

  @action
  checkIfLogged() {
    return !!this.user;
  }
}

function getErrorMessage(error: any) {
  let errorMessage: string = '';
  if (error.response) {
    // Request made and server responded
    errorMessage = error.response.data.error;
  } else {
    errorMessage = `Something wrong happened! ${error.message}`;
  }
  return errorMessage;
}

const userStore = new UserStore();
export default userStore;