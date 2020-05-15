import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, StyleSheet, ScrollView, TextInputComponent} from 'react-native';
import {
  Text,
  Icon,
  Layout,
  MenuItem,
  OverflowMenu,
  TopNavigation,
  TopNavigationAction,
  Button,
  Card,
  Modal,
  Input,
  Spinner
} from '@ui-kitten/components';
import {IUserStore} from '../stores/user';
import ScreenWithNavigation from '../components/ScreenWithNavigation';
import ChatsList from '../components/ChatsList';
import {IChatStore} from '../stores/chat';
import {reaction} from 'mobx';

type MyChatsProps = {
  userStore: IUserStore;
  chatStore: IChatStore;
  navigation: any;
};

type MyChatsState = {
  isModalVisible: boolean;
  title: string;
};

@inject('userStore', 'chatStore')
@observer
export default class MyChatsScreen extends Component<
  MyChatsProps,
  MyChatsState
> {
  disposer: Function = () => {};

  componentDidMount(): void {
    this.props.chatStore.loadMyChats();
    this.disposer = reaction(
      () => this.props.chatStore.createChatApiState?.isSuccess,
      (isSuccess: boolean) => {
        if (isSuccess) {
          this.props.chatStore.loadMyChats();
        }
      }
    );
  }

  componentWillUnmount(): void {
    this.disposer();
  }

  viewHandler = (chatId: string) => {
    this.props.navigation.navigate('Chat', {chatId});
  };

  render() {
    return (
      <ScreenWithNavigation
        backHandler={() => this.props.navigation.goBack()}
        title="My chats">
        <>
          {(this.props.chatStore.myChatsApiState?.isLoading ||
            this.props.chatStore.createChatApiState?.isLoading) && <Spinner />}
          <View style={styles.chatsList}>
            <ChatsList
              chats={this.props.chatStore.myChats}
              viewHandler={this.viewHandler}
            />
          </View>
          <View style={styles.viewWithMargin}>
            <Button
              onPress={() => this.props.navigation.navigate('CreateChat')}>
              Create chat
            </Button>
          </View>
        </>
      </ScreenWithNavigation>
    );
  }
}

const styles = StyleSheet.create({
  chatsList: {
    flex: 1,
    margin: 10
  },
  viewWithMargin: {
    margin: 10
  }
});
