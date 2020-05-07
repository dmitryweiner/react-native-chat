import {action, observable} from 'mobx';

export interface IStore {
  counter: number;
  increment: Function;
  decrement: Function;
}

class ObservableStore {
  @observable counter = 0;

  @action
  increment() {
    this.counter++;
  }

  @action
  decrement() {
    this.counter--;
  }
}

const observableStore: IStore = new ObservableStore();
export default observableStore;
