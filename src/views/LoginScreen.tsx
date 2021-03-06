import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IUserStore} from '../stores/user';
import {reaction} from 'mobx';

type LoginScreenProps = {
  userStore: IUserStore;
  navigation: any;
};

@inject('userStore')
@observer
export default class LoginScreen extends Component<LoginScreenProps> {
  state = {
    nickname: '',
    password: ''
  };

  reactionDisposer: Function = () => {};

  componentDidMount(): void {
    this.reactionDisposer = reaction(
      () => this.props.userStore.isLoginSuccess,
      () => {
        this.setState({
          nickname: '',
          password: ''
        });
      }
    );
  }

  componentWillUnmount(): void {
    this.reactionDisposer();
  }

  loginHandler() {
    if (this.state.nickname && this.state.password) {
      this.props.userStore.login({...this.state});
    }
  }

  render() {
    return (
      <View>
        <View style={styles.centeredView}>
          <Text category="h1">Login</Text>
        </View>
        <View style={styles.viewWithMargin}>
          {this.props.userStore.isLoginInProgress && <Text>Loading</Text>}
          {this.props.userStore.isLoginSuccess && (
            <Text>Login successful!</Text>
          )}
          {this.props.userStore.isLoginError && (
            <Text>Login error: {this.props.userStore.loginErrorMessage}</Text>
          )}
          <Input
            label="Nickname"
            placeholder="Enter nickname"
            value={this.state.nickname}
            onChangeText={(nickname: string) => this.setState({nickname})}
          />
          <Input
            value={this.state.password}
            label="Password"
            placeholder="Enter your password"
            caption="Should contain at least 8 symbols"
            secureTextEntry={true}
            onChangeText={(password: string) => this.setState({password})}
          />
        </View>
        <View style={styles.viewWithMargin}>
          <Button onPress={this.loginHandler.bind(this)}>Login</Button>
        </View>
        <View style={styles.viewWithMargin}>
          <Text>Don't have an account?</Text>
          <Button
            onPress={() =>
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Register'}]
              })
            }>
            Register
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: Colors.green
  },
  viewWithMargin: {
    margin: 10
  }
});
