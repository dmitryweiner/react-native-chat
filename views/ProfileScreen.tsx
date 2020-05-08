import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IUserStore} from '../stores/user';
import {IUser} from '../interfaces/user';

type ProfileScreenProps = {
  userStore: IUserStore;
};

@inject('userStore')
@observer
export default class ProfileScreen extends Component<ProfileScreenProps> {
  render() {
    const {id, nickname, lastActivity} = this.props.userStore.user;

    return (
      <View>
        <View style={styles.centeredView}>
          <Text category="h1">Profile</Text>
        </View>
        <View>
          <Text>ID: {id}</Text>
          <Text>Nickname: {nickname}</Text>
          <Text>Last activity: {lastActivity.toString()}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: Colors.green
  }
});
