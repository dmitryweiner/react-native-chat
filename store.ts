import {action, autorun, computed, observable, when} from 'mobx';

export interface IStore {
  counter: number;
  increment: Function;
  decrement: Function;
}

class ObservableStore {
  @observable counter = 0;

  @computed get squareCounter() {
    return this.counter * this.counter;
  }

  constructor() {
    autorun(() => console.log('Autorun fired', this.counter));
    when(
      // once...
      () => this.counter < 0,
      // ... then
      () => console.log('Counter is negative')
    );
  }

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
