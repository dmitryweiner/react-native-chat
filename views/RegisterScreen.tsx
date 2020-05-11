import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IUserStore} from '../stores/user';
import {reaction} from 'mobx';

type MainScreenProps = {
  userStore: IUserStore;
  navigation: any;
};

@inject('userStore')
@observer
export default class RegisterScreen extends Component<MainScreenProps> {
  state = {
    nickname: '',
    password: ''
  };

  reactionDisposer: Function = () => {};

  componentDidMount() {
    this.reactionDisposer = reaction(
      () => this.props.userStore.isRegistrationSuccess,
      (isSuccess: boolean) => {
        if (isSuccess) {
          this.setState({
            nickname: '',
            password: ''
          });
/*          this.props.navigation.reset({
            index: 0,
            routes: [{name: 'Profile'}]
          });*/
        }
      }
    );
  }

  componentWillUnmount(): void {
    this.reactionDisposer();
  }

  registrationHandler() {
    if (this.state.nickname && this.state.password) {
      this.props.userStore.register({...this.state});
    }
  }

  render() {
    return (
      <View>
        <View style={styles.centeredView}>
          <Text category="h1">Registration</Text>
        </View>
        <View style={styles.viewWithMargin}>
          {this.props.userStore.isRegistrationInProgress && (
            <Text>Loading</Text>
          )}
          {this.props.userStore.isRegistrationSuccess && (
            <Text>Registration successful!</Text>
          )}
          {this.props.userStore.isRegistrationError && (
            <Text>
              Registration error:{' '}
              {this.props.userStore.registrationErrorMessage}
            </Text>
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
          <Button onPress={this.registrationHandler.bind(this)}>
            Register
          </Button>
        </View>
        <View style={styles.viewWithMargin}>
          <Text>Already have an account?</Text>
          <Button
            onPress={() =>
              this.props.navigation.reset({
                index: 0,
                routes: [{name: 'Login'}]
              })
            }>
            Login
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
