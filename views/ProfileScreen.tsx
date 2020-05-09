import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button} from '@ui-kitten/components';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IUserStore} from '../stores/user';
import {IUser} from '../interfaces/user';

type ProfileScreenProps = {
  userStore: IUserStore;
  navigation: any;
};

@inject('userStore')
@observer
export default class ProfileScreen extends Component<ProfileScreenProps> {
  renderUserDetails() {
    if (!this.props.userStore.user) {
      return null;
    }
    const {id, nickname, lastActivity} = this.props.userStore.user as any;
    return (
      <View>
        <Text>ID: {id}</Text>
        <Text>Nickname: {nickname}</Text>
        <Text>Last activity: {lastActivity.toString()}</Text>
      </View>
    );
  }

  render() {
    return (
      <View>
        <View style={styles.centeredView}>
          <Text category="h1">Profile</Text>
        </View>
        {this.renderUserDetails()}
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
