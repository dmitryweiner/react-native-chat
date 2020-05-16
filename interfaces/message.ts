import {IAuthParams} from './user';

export interface IMessage {
  id: string;
  content: string;
  chatId: string;
  authorId: string;
  authorNickname: string;
  creationDate: Date;
}

export interface ISendMessageParams extends IAuthParams {
  message: {
    content: string;
    chatId: string;
  };
  authorId: string;
}
