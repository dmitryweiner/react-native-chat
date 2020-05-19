import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Text, Button, Input} from '@ui-kitten/components';
import {IUserStore} from '../stores/user';
import ScreenWithNavigation from '../components/ScreenWithNavigation';
import {IChatStore} from '../stores/chat';
import {reaction} from 'mobx';

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
                <Text>
                  {this.props.chatStore.createChatApiState.errorMessage}
                </Text>
              </View>
            )}
            <View style={styles.detailsHolder}>
              <Input
                placeholder="Enter chat title"
                value={this.state.title}
                onChangeText={this.handleTitleChange}
              />
            </View>
            <View style={styles.buttonsSectionWrapper}>
              <View style={styles.buttonWrapper}>
                <Button
                  status="warning"
                  onPress={() => this.props.navigation.goBack()}>
                  Cancel
                </Button>
              </View>
              <View style={styles.buttonWrapper}>
                <Button status="success" onPress={this.handleSaveChat}>
                  Save
                </Button>
              </View>
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
  },
  detailsHolder: {
    margin: 10,
    flex: 1
  },
  buttonsSectionWrapper: {
    flexDirection: 'row'
  },
  buttonWrapper: {
    margin: 10,
    flex: 1
  }
});
