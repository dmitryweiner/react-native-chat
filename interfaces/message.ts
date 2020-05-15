import {IAuthParams} from './user';

export interface IMessage {
  id: string;
  content: string;
  authorId: string;
}

export interface ISendMessageParams extends IAuthParams {
  content: string;
  chatId: string;
  creationDate: Date;
  authorId: string;
  authorNickname: string;
}
