import {IAuthParams, IHiddenUser} from './user';
import {IMessage} from './message';
import {IAbstractObject} from './abstract-object';

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

export interface IChat extends IAbstractObject {
  title: string;
  messages: Array<IMessage>;
  participants: Array<IHiddenUser>;
}
