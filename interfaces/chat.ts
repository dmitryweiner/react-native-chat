import {IAuthParams, IHiddenUser} from './user';
import {IMessage} from './message';

export interface ISearchParams extends IAuthParams {
  query: string;
}

export interface ICreateChatParams extends IAuthParams {
  title: string;
}

export interface IViewChatParams extends IAuthParams {
  chatId: string;
}

export interface IJoinChatParams extends IAuthParams {
  chatId: string;
}

export interface IChat {
  id: string;
  title: string;
  creationDate: Date;
  messages: Array<IMessage>;
  participants: Array<IHiddenUser>;
}
