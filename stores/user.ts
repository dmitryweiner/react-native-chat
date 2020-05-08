import {action, observable} from 'mobx';
import {IUserRegister, IUser} from '../interfaces/user';
import api from '../api';
import {IError} from '../interfaces/error';

export interface IUserStore {
  user?: IUser;
  isRegistrationInProgress: boolean;
  isRegistrationError: boolean;
  isRegistrationSuccess: boolean;
  registrationErrorMessage: string;
  register: Function;
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
        console.log(errorMessage);
        this.registrationErrorMessage = errorMessage;
      });
  }
}

const userStore = new UserStore();
export default userStore;
