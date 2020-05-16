import React, {Component} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {inject, observer} from 'mobx-react';
import ScreenWithNavigation from '../components/ScreenWithNavigation';
import {IUserStore} from '../stores/user';
import {IChatStore} from '../stores/chat';
import MessagesList from '../components/MessagesList';
import {Input, Button, Text} from '@ui-kitten/components';
import {IMessage} from '../interfaces/message';

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
  timeoutHandler: any;
  shouldScroll: boolean = false;
  scrollToBottomY: number = 0;
  scrollViewRef: any;
  constructor(props: ChatScreenProps) {
    super(props);
    this.state = {
      message: ''
    };
  }

  componentDidMount(): void {
    this.updateChat();
  }

  updateChat() {
    this.props.chatStore.viewChat(this.props.route.params?.chatId);
    if (this.scrollToBottomY && this.shouldScroll) {
      this.scrollViewRef.scrollTo({
        x: 0,
        y: this.scrollToBottomY,
        animated: true
      });
      this.shouldScroll = false;
    }
    this.timeoutHandler = setTimeout(() => this.updateChat(), 1000);
  }

  componentWillUnmount(): void {
    clearInterval(this.timeoutHandler);
  }

  handleSendMessage = () => {
    this.props.chatStore.sendMessage(
      this.state.message,
      this.props.route.params?.chatId
    );
    this.setState({message: ''});
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
          <View style={styles.chatArea}>
            <ScrollView
              ref={(ref) => (this.scrollViewRef = ref)}
              onContentSizeChange={(contentWidth, contentHeight) => {
                // TODO: move it to handler
                this.scrollToBottomY = contentHeight;
                this.shouldScroll = true;
              }}>
              <MessagesList messages={this.props.chatStore.currentMessages} />
            </ScrollView>
          </View>
          <View style={styles.inputForm}>
            <View style={{flex: 1, margin: 10}}>
              <Input
                value={this.state.message}
                onChangeText={this.handleChangeInput}
              />
            </View>
            <View style={{flex: 0, margin: 10}}>
              <Button onPress={this.handleSendMessage}>Send</Button>
            </View>
          </View>
        </>
      </ScreenWithNavigation>
    );
  }
}

const styles = StyleSheet.create({
  chatArea: {
    flex: 1,
    margin: 10
  },
  inputForm: {
    flexDirection: 'row',
    margin: 10
  }
});
