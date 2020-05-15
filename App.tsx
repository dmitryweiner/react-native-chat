/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions
} from 'react-native/Libraries/NewAppScreen';
import stores from './stores/root';
import RegisterScreen from './views/RegisterScreen';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from './views/LoginScreen';
import ProfileScreen from './views/ProfileScreen';
import {reaction} from 'mobx';
import {inject, observer} from 'mobx-react';
import {NavigationContainerRef} from '@react-navigation/core';
import MyChatsScreen from './views/MyChatsScreen';
import {EvaIconsPack} from '@ui-kitten/eva-icons';
import {IUserStore} from './stores/user';
import CreateChatScreen from './views/CreateChatScreen';
import ChatScreen from './views/ChatScreen';

declare const global: {HermesInternal: null | {}};

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return <MainContainer {...stores} />;
  }
}

type MainContainerProps = {
  userStore: IUserStore;
};

let instanceRef: NavigationContainerRef;

export function setNavigatorRef(instance: NavigationContainerRef) {
  instanceRef = instance;
}

@inject('userStore')
@observer
class MainContainer extends Component<MainContainerProps> {
  reactionDisposer: Function = () => {};
  state = {
    initialNavigatorState: {
      index: 0,
      routes: [{name: 'Login'}]
    }
  };

  componentDidMount() {
    this.reactionDisposer = reaction(
      () => !!this.props.userStore.user,
      (isLogged: boolean) => {
        if (isLogged) {
          instanceRef.reset({
            index: 0,
            routes: [{name: 'Profile'}]
          });
        } else {
          instanceRef.reset({
            index: 0,
            routes: [{name: 'Login'}]
          });
        }
      }
    );
  }

  componentWillUnmount(): void {
    this.reactionDisposer();
  }

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <NavigationContainer ref={setNavigatorRef}>
            <Stack.Navigator headerMode="none" initialRouteName="Login">
              <Stack.Screen name="Register">
                {({navigation}) => {
                  const props = {
                    userStore: stores.userStore,
                    navigation
                  };
                  return <RegisterScreen {...props} />;
                }}
              </Stack.Screen>
              <Stack.Screen name="Login">
                {({navigation}) => {
                  const props = {
                    userStore: stores.userStore,
                    navigation
                  };
                  return <LoginScreen {...props} />;
                }}
              </Stack.Screen>
              <Stack.Screen name="Profile">
                {({navigation}) => {
                  const props = {
                    userStore: stores.userStore,
                    navigation
                  };
                  return <ProfileScreen {...props} />;
                }}
              </Stack.Screen>
              <Stack.Screen name="MyChats">
                {({navigation}) => {
                  const props = {
                    userStore: stores.userStore,
                    chatStore: stores.chatStore,
                    navigation
                  };
                  return <MyChatsScreen {...props} />;
                }}
              </Stack.Screen>
              <Stack.Screen name="CreateChat">
                {({navigation}) => {
                  const props = {
                    userStore: stores.userStore,
                    chatStore: stores.chatStore,
                    navigation
                  };
                  return <CreateChatScreen {...props} />;
                }}
              </Stack.Screen>
              <Stack.Screen name="Chat">
                {({navigation, route}) => {
                  const props = {
                    userStore: stores.userStore,
                    chatStore: stores.chatStore,
                    navigation,
                    route
                  };
                  return <ChatScreen {...props} />;
                }}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter
  },
  engine: {
    position: 'absolute',
    right: 0
  },
  body: {
    backgroundColor: Colors.white
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark
  },
  highlight: {
    fontWeight: '700'
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right'
  }
});

export default App;
