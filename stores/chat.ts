import {action, observable} from 'mobx';
import api, {getErrorMessage} from '../api';
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
  currentChat: IChat | undefined;
  @observable
  currentChatApiState: IApiState | undefined;
  @action
  loadMyChats() {
    this.currentChatApiState = {
      isLoading: true,
      isError: false,
      errorMessage: ''
    };
    api
      .getMyChats(this.rootStore.userStore.getAuthParams())
      .then((response) => response.data.chat)
      .then((chat: IChat) => {
        if (this.currentChatApiState) {
          this.currentChatApiState.isLoading = false;
        }
        this.currentChat = chat;
      })
      .catch((error: any) => {
        if (this.currentChatApiState) {
          this.currentChatApiState.isLoading = false;
          this.currentChatApiState.isError = true;
          this.currentChatApiState.errorMessage = getErrorMessage(error);
        }
      });
  }

  @action
  createChat(title: string) {

  }

}
