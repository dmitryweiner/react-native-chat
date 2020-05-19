import {IAbstractObject} from './abstract-object';

export interface IUserRegister {
  nickname: string;
  password: string;
}

export interface IUserLogin {
  nickname: string;
  password: string;
}

export interface IAuthParams {
  userId: string;
  token: string;
}

export interface IUser extends IAbstractObject {
  nickname: string;
  token: string;
  lastActivity: Date;
}

export interface IHiddenUser {
  id: string;
  nickname: string;
}
