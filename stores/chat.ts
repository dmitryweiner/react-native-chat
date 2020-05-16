import {action, computed, observable, runInAction} from 'mobx';
import api, {
  getInitialApiState,
  setErrorApiState,
  setSuccessApiState,
  resetApiState
} from '../api';
import {IRootStore} from './root';
import {IChat} from '../interfaces/chat';
import {IApiState} from '../interfaces/api';
import {IMessage} from '../interfaces/message';

export interface IChatStore {
  rootStore: IRootStore;

  myChats: Array<IChat>;
  myChatsApiState: IApiState;
  loadMyChats: Function;

  currentChat: IChat;
  currentMessages: Array<IMessage>;

  createChatApiState: IApiState;
  createChat: Function;
  resetCreateChatState: Function;

  viewChatApiState: IApiState;
  viewChat: Function;

  joinChatApiState: IApiState;
  joinChat: Function;

  searchChatResutls: Array<IChat>;
  searchChatApiState: IApiState;

  sendMessageApiState: IApiState;
  sendMessage: Function;
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
    this.myChatsApiState = getInitialApiState();
    api
      .getMyChats(this.rootStore.userStore.getAuthParams())
      .then((response) => response.data)
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

  @computed
  get currentMessages(): Array<IMessage> {
    if (this.currentChat) {
      return this.currentChat.messages;
    }
    return [];
  }

  @observable
  createChatApiState: IApiState | undefined;
  @action
  createChat(title: string) {
    this.createChatApiState = getInitialApiState();
    api
      .createChat({...this.rootStore.userStore.getAuthParams(), chat: {title}})
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
    this.createChatApiState = resetApiState();
  }

  @observable
  viewChatApiState: IApiState | undefined;
  @action
  viewChat(chatId: string) {
    this.viewChatApiState = getInitialApiState();
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
    this.viewChatApiState = getInitialApiState();
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
    this.searchChatApiState = getInitialApiState();
    api
      .searchChats({...this.rootStore.userStore.getAuthParams(), query})
      .then((response) => response.data)
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

  @observable
  sendMessageApiState: IApiState | undefined;
  @action
  sendMessage(content: string, chatId: string) {
    this.sendMessageApiState = getInitialApiState();
    api
      .sendMessage({
        ...this.rootStore.userStore.getAuthParams(),
        message: {
          content,
          chatId
        }
      })
      .then((response) => response.data.message)
      .then((message: IMessage) => {
        if (this.sendMessageApiState) {
          this.sendMessageApiState = setSuccessApiState(
            this.sendMessageApiState
          );
        }
        // DON'T DO THIS
        // this.currentChat?.messages.push(message);
        // OR COMPONENT WILL NOT RERENDER
        // BETTER DO THIS
        if (this.currentChat) {
          this.currentChat.messages = [...this.currentChat.messages, message];
        }
      })
      .catch((error: any) => {
        if (this.sendMessageApiState) {
          this.sendMessageApiState = setErrorApiState(
            this.sendMessageApiState,
            error
          );
        }
      });
  }
}
