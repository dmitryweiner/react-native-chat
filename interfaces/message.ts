import {IAuthParams} from './user';
import {IAbstractObject} from './abstract-object';

export interface IMessage extends IAbstractObject{
  content: string;
  chatId: string;
  authorId: string;
  authorNickname: string;
}

export interface ISendMessageParams extends IAuthParams {
  message: {
    content: string;
    chatId: string;
  };
  authorId: string;
}
