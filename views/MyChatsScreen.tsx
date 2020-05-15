import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {
  Text,
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction
} from '@ui-kitten/components';
import {IUserStore} from '../stores/user';
import ScreenWithNavigation from '../components/ScreenWithNavigation';

type MyChatsProps = {
  userStore: IUserStore;
  navigation: any;
};

@inject('userStore')
@observer
export default class MyChatsScreen extends Component<MyChatsProps> {
  render() {
    return (
      <ScreenWithNavigation
        backHandler={() => this.props.navigation.goBack()}
        title="My chats">
        <ScrollView>
          <Text>Test</Text>
        </ScrollView>
      </ScreenWithNavigation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minHeight: 128
  }
});
