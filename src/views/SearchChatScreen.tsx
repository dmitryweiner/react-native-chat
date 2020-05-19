import {IUserStore} from '../stores/user';
import {IChatStore} from '../stores/chat';
import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import ScreenWithNavigation from '../components/ScreenWithNavigation';
import {Button, Input, Spinner} from '@ui-kitten/components';
import {Alert, StyleSheet, View} from 'react-native';
import ChatsList from '../components/ChatsList';

type SearchChatProps = {
  userStore: IUserStore;
  chatStore: IChatStore;
  navigation: any;
};

type SearchChatState = {
  query: string;
};

@inject('userStore', 'chatStore')
@observer
export default class SearchChatScreen extends Component<
  SearchChatProps,
  SearchChatState
> {
  state: SearchChatState = {
    query: ''
  };

  componentDidMount(): void {
    this.props.chatStore.resetSearchChat();
  }

  handleSearch = () => {
    this.props.chatStore.searchChat(this.state.query);
  };

  handleChangeInput = (value: string) => {
    this.setState({query: value});
  };

  viewHandler = (chatId: string) => {
    this.props.navigation.navigate('Chat', {chatId});
  };

  joinHandler = (chatId: string) => {
    Alert.alert(
      'Joining chat',
      'Do you want to join this chat?',
      [
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel'
        },
        {text: 'Yes', onPress: () => this.handleJoinAgreed(chatId)}
      ],
      {cancelable: false}
    );
  };

  handleJoinAgreed = (chatId: string) => {
    this.props.chatStore.joinChat(chatId);
    this.props.navigation.navigate('Chat', {chatId});
  };

  render() {
    return (
      <ScreenWithNavigation
        backHandler={() => this.props.navigation.goBack()}
        title="Find chats">
        <>
          <View style={styles.inputForm}>
            <View style={{flex: 1, margin: 10}}>
              <Input
                value={this.state.query}
                onChangeText={this.handleChangeInput}
              />
            </View>
            <View style={{flex: 0, margin: 10}}>
              <Button onPress={this.handleSearch}>Search</Button>
            </View>
          </View>
          {this.props.chatStore.searchChatApiState?.isLoading && <Spinner />}
          <View style={styles.chatsList}>
            <ChatsList
              chats={this.props.chatStore.searchChatResults}
              viewHandler={this.viewHandler}
              joinHandler={this.joinHandler}
              user={this.props.userStore.user}
            />
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
  inputForm: {
    flexDirection: 'row',
    margin: 10
  },
  viewWithMargin: {
    margin: 10
  }
});
