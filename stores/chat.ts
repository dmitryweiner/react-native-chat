import {action, observable} from 'mobx';
import api, {
  getDefaultApiState,
  getErrorMessage,
  setErrorApiState,
  setSuccessApiState
} from '../api';
import {IRootStore} from './root';
import {IChat} from '../interfaces/chat';
import {IApiState} from '../interfaces/api';

export interface IChatStore {
  rootStore: IRootStore;

  myChats: Array<IChat>;
  myChatsApiState: IApiState;
  loadMyChats: Function;

  currentChat: IChat;

  createChatApiState: IApiState;
  createChat: Function;
  resetCreateChatState: Function;

  viewChatApiState: IApiState;
  viewChat: Function;

  joinChatApiState: IApiState;
  joinChat: Function;

  searchChatResutls: Array<IChat>;
  searchChatApiState: IApiState;
}

export class ChatStore {
  rootStore: IRootStore;
  constructor(rootStore: IRootStore) {
    this.rootStore = rootStore;
  }

  @observable
  myChats: Array<IChat> | undefined;
  @observable
  myChatsApiState: IApiState | undefined;
  @action
  loadMyChats() {
    this.myChatsApiState = getDefaultApiState();
    api
      .getMyChats(this.rootStore.userStore.getAuthParams())
      .then((response) => response.data.chats)
      .then((chats: Array<IChat>) => {
        if (this.myChatsApiState) {
          this.myChatsApiState = setSuccessApiState(this.myChatsApiState);
        }
        this.myChats = chats;
      })
      .catch((error: any) => {
        if (this.myChatsApiState) {
          this.myChatsApiState = setErrorApiState(this.myChatsApiState, error);
        }
      });
  }

  @observable
  currentChat: IChat | undefined;
  @observable
  createChatApiState: IApiState | undefined;
  @action
  createChat(title: string) {
    this.createChatApiState = getDefaultApiState();
    api
      .createChat({...this.rootStore.userStore.getAuthParams(), title})
      .then((response) => response.data.chat)
      .then((chat: IChat) => {
        if (this.createChatApiState) {
          this.createChatApiState = setSuccessApiState(this.createChatApiState);
        }
        this.currentChat = chat;
      })
      .catch((error: any) => {
        if (this.createChatApiState) {
          this.createChatApiState = setErrorApiState(
            this.createChatApiState,
            error
          );
        }
      });
  }

  @action
  resetCreateChatState() {
    this.createChatApiState = getDefaultApiState();
  }

  @observable
  viewChatApiState: IApiState | undefined;
  @action
  viewChat(chatId: string) {
    this.viewChatApiState = getDefaultApiState();
    api
      .viewChat({...this.rootStore.userStore.getAuthParams(), chatId})
      .then((response) => response.data.chat)
      .then((chat: IChat) => {
        if (this.viewChatApiState) {
          this.viewChatApiState = setSuccessApiState(this.viewChatApiState);
        }
        this.currentChat = chat;
      })
      .catch((error: any) => {
        if (this.viewChatApiState) {
          this.viewChatApiState = setErrorApiState(
            this.viewChatApiState,
            error
          );
        }
      });
  }

  @observable
  joinChatApiState: IApiState | undefined;
  @action
  joinChat(chatId: string) {
    this.viewChatApiState = getDefaultApiState();
    api
      .joinChat({...this.rootStore.userStore.getAuthParams(), chatId})
      .then((response) => response.data.chat)
      .then((chat: IChat) => {
        if (this.joinChatApiState) {
          this.joinChatApiState = setSuccessApiState(this.joinChatApiState);
        }
        this.currentChat = chat;
      })
      .catch((error: any) => {
        if (this.joinChatApiState) {
          this.joinChatApiState = setErrorApiState(
            this.joinChatApiState,
            error
          );
        }
      });
  }

  @observable
  searchChatResutls: Array<IChat> | undefined;
  @observable
  searchChatApiState: IApiState | undefined;
  @action
  searchChats(query: string) {
    this.searchChatApiState = getDefaultApiState();
    api
      .searchChats({...this.rootStore.userStore.getAuthParams(), query})
      .then((response) => response.data.chats)
      .then((chats: Array<IChat>) => {
        if (this.searchChatApiState) {
          this.searchChatApiState = setSuccessApiState(this.searchChatApiState);
        }
        this.searchChatResutls = chats;
      })
      .catch((error: any) => {
        if (this.searchChatApiState) {
          this.searchChatApiState = setErrorApiState(
            this.searchChatApiState,
            error
          );
        }
      });
  }
}
