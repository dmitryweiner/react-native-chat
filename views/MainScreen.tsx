import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
import {IStore} from '../store';
import {Colors} from 'react-native/Libraries/NewAppScreen';

type MainScreenProps = {
  store: IStore;
};

@inject('store')
@observer
export default class MainScreen extends Component<MainScreenProps> {
  render() {
    return (
      <View>
        <View style={styles.numberView}>
          <Text style={styles.number}>{this.props.store.counter}</Text>
        </View>
        <View>
          <Button
            title="Increment"
            onPress={() => this.props.store.increment()}
          />
        </View>
        <View>
          <Button
            title="Decrement"
            onPress={() => this.props.store.decrement()}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  numberView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  number: {
    textAlign: 'center',
    fontSize: 60,
    fontWeight: '600',
    color: Colors.green
  }
});
