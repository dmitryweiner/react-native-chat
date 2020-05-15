import React, {Component} from 'react';
import {View} from 'react-native';
import {inject, observer} from 'mobx-react';
import ScreenWithNavigation from '../components/ScreenWithNavigation';
import {IUserStore} from '../stores/user';
import {IChatStore} from '../stores/chat';
import MessagesList from '../components/MessagesList';
import {Input, Button} from '@ui-kitten/components';

type ChatScreenProps = {
  userStore: IUserStore;
  chatStore: IChatStore;
  navigation: any;
  route: any;
};

type ChatScreenState = {
  message: string;
};

@inject('userStore', 'chatStore')
@observer
export default class ChatScreen extends Component<
  ChatScreenProps,
  ChatScreenState
> {
  constructor(props: ChatScreenProps) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidMount(): void {
    this.props.chatStore.viewChat(this.props.route.params?.chatId);
  }

  handleSendMessage = () => {
    this.props.chatStore.sendMessage(
      this.state.message,
      this.props.route.params?.chatId
    );
  };

  handleChangeInput = (value: any) => {
    this.setState({message: value});
  };

  render() {
    return (
      <ScreenWithNavigation
        backHandler={() => this.props.navigation.goBack()}
        title="Сhat">
        <>
          <View>
            <MessagesList messages={this.props.chatStore.currentChat?.messages} />
          </View>
          <View>
            <Input
              value={this.state.message}
              onChangeText={this.handleChangeInput}
            />
            <Button onPress={this.handleSendMessage}>Send</Button>
          </View>
        </>
      </ScreenWithNavigation>
    );
  }
}
