export interface IUserRegister {
  nickname: string;
  password: string;
}

export interface IUserLogin {
  nickname: string;
  password: string;
}

export interface IUser {
  id: string;
  nickname: string;
  token: string;
  lastActivity: Date;
}