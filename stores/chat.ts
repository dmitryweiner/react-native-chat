import {action, observable} from 'mobx';
import api, {getDefaultApiState, getErrorMessage} from '../api';
import {IRootStore} from './root';
import {IChat} from '../interfaces/chat';
import {IApiState} from '../interfaces/api';

export interface IChatStore {
  rootStore: IRootStore;
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
          this.myChatsApiState.isLoading = false;
        }
        this.myChats = chats;
      })
      .catch((error: any) => {
        if (this.myChatsApiState) {
          this.myChatsApiState.isLoading = false;
          this.myChatsApiState.isError = true;
          this.myChatsApiState.errorMessage = getErrorMessage(error);
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
          this.createChatApiState.isLoading = false;
        }
        this.currentChat = chat;
      })
      .catch((error: any) => {
        if (this.createChatApiState) {
          this.createChatApiState.isLoading = false;
          this.createChatApiState.isError = true;
          this.createChatApiState.errorMessage = getErrorMessage(error);
        }
      });
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
          this.viewChatApiState.isLoading = false;
        }
        this.currentChat = chat;
      })
      .catch((error: any) => {
        if (this.viewChatApiState) {
          this.viewChatApiState.isLoading = false;
          this.viewChatApiState.isError = true;
          this.viewChatApiState.errorMessage = getErrorMessage(error);
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
          this.joinChatApiState.isLoading = false;
        }
        this.currentChat = chat;
      })
      .catch((error: any) => {
        if (this.joinChatApiState) {
          this.joinChatApiState.isLoading = false;
          this.joinChatApiState.isError = true;
          this.joinChatApiState.errorMessage = getErrorMessage(error);
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
          this.searchChatApiState.isLoading = false;
        }
        this.searchChatResutls = chats;
      })
      .catch((error: any) => {
        if (this.searchChatApiState) {
          this.searchChatApiState.isLoading = false;
          this.searchChatApiState.isError = true;
          this.searchChatApiState.errorMessage = getErrorMessage(error);
        }
      });
  }
}
