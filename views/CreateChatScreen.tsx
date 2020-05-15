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
import {reaction, when} from 'mobx';

type CreateChatProps = {
  userStore: IUserStore;
  chatStore: IChatStore;
  navigation: any;
};

type CreateChatState = {
  title: string;
};

@inject('userStore', 'chatStore')
@observer
export default class CreateChatScreen extends Component<
  CreateChatProps,
  CreateChatState
> {
  disposer: Function = () => {};

  constructor(props: CreateChatProps) {
    super(props);

    this.state = {
      title: ''
    };
  }

  componentDidMount(): void {
    this.props.chatStore.resetCreateChatState();
    this.disposer = reaction(
      () => this.props.chatStore.createChatApiState?.isSuccess,
      (isSuccess: boolean) => {
        if (isSuccess) {
          this.props.navigation.goBack();
        }
      }
    );
  }

  componentWillUnmount(): void {
    this.disposer();
  }

  handleSaveChat = () => {
    this.props.chatStore.createChat(this.state.title);
  };

  handleTitleChange = (title: string) => {
    this.setState({title});
  };

  render() {
    return (
      <>
        <ScreenWithNavigation
          backHandler={() => this.props.navigation.goBack()}
          title="Create chat">
          <>
            {this.props.chatStore.createChatApiState?.isError && (
              <View style={styles.viewWithMargin}>
                <Text>{this.props.chatStore.createChatApiState.errorMessage}</Text>
              </View>
            )}
            <View style={styles.viewWithMargin}>
              <Input
                placeholder="Enter chat title"
                value={this.state.title}
                onChangeText={this.handleTitleChange}
              />
            </View>
            <View>
              <Button onPress={this.handleSaveChat}>
                Save
              </Button>
              <Button onPress={() => this.props.navigation.goBack()}>
                Cancel
              </Button>
            </View>
          </>
        </ScreenWithNavigation>
      </>
    );
  }
}

const styles = StyleSheet.create({
  viewWithMargin: {
    margin: 10
  }
});
