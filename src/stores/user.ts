import {action, observable} from 'mobx';
import {IUserRegister, IUser, IAuthParams} from '../interfaces/user';
import api, {getErrorMessage} from '../api';
import AsyncStorage from '@react-native-community/async-storage';
import {IRootStore} from './root';

const USER_STORAGE_KEY = 'user';

export interface IUserStore {
  rootStore: IRootStore;
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
  getAuthParams: Function;
}

export class UserStore {
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

  rootStore: IRootStore;
  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
    this.loadUser();
  }

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
        this.saveUser(user);
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
        this.saveUser(user);
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
    this.removeUser();
  }

  @action
  checkIfLogged() {
    return !!this.user;
  }

  loadUser = async () => {
    try {
      const value = await AsyncStorage.getItem(USER_STORAGE_KEY);
      if (value !== null) {
        this.user = JSON.parse(value);
      }
    } catch (e) {
      console.error('Error loading user', e);
    }
  };

  saveUser = async (user: IUser) => {
    try {
      await AsyncStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
    } catch (e) {
      console.error('Error saving user', e);
    }
  };

  removeUser = async () => {
    try {
      await AsyncStorage.removeItem(USER_STORAGE_KEY);
    } catch (e) {
      console.error('error reading value');
    }
  };

  getAuthParams(): IAuthParams {
    if (this.user) {
      return {
        token: this.user.token,
        userId: this.user.id
      };
    }
    throw new Error('User not authorized');
  }
}
