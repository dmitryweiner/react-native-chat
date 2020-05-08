import {inject, observer} from 'mobx-react';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Text, Button} from '@ui-kitten/components';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {IUserStore} from '../stores/user';
import {reaction} from 'mobx';

type MainScreenProps = {
  userStore: IUserStore;
};

@inject('userStore')
@observer
export default class MainScreen extends Component<MainScreenProps> {
  state = {
    nickname: '',
    password: ''
  };

  constructor(props: MainScreenProps) {
    super(props);

    reaction(
      () => this.props.userStore.isRegistrationSuccess,
      () =>
        this.setState({
          nickname: '',
          password: ''
        })
    );
  }

  registrationHandler() {
    console.log(this.state.nickname && this.state.password);
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
        <View>
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
        <View>
          <Button onPress={this.registrationHandler.bind(this)}>
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
    alignItems: 'center'
  },
  centeredText: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    color: Colors.green
  }
});
