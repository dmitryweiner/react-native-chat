import {IUserStore, UserStore} from './user';
import {ChatStore, IChatStore} from './chat';

export interface IRootStore {
  userStore: IUserStore;
  chatStore: IChatStore;
}

class RootStore {
  userStore: IUserStore;
  chatStore: IChatStore;
  constructor() {
    this.userStore = new UserStore(this);
    this.chatStore = new ChatStore(this);
  }
}

const rootStore: IRootStore = new RootStore();

const stores = {
  rootStore,
  userStore: rootStore.userStore,
  chatStore: rootStore.chatStore
};

export default stores;
