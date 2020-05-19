import React, {Component} from 'react';
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
import SearchChatScreen from './views/SearchChatScreen';

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
  componentDidMount() {
    this.reactionDisposer = reaction(
      () => !!this.props.userStore.user,
      (isLogged: boolean) => {
        // ReactNavigation might be uninitialized this moment
        setTimeout(() => {
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
        }, 0);
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
                    route // NOTE: to get route parameters you should pass route object
                  };
                  return <ChatScreen {...props} />;
                }}
              </Stack.Screen>
              <Stack.Screen name="SearchChat">
                {({navigation}) => {
                  const props = {
                    userStore: stores.userStore,
                    chatStore: stores.chatStore,
                    navigation
                  };
                  return <SearchChatScreen {...props} />;
                }}
              </Stack.Screen>
            </Stack.Navigator>
          </NavigationContainer>
        </ApplicationProvider>
      </>
    );
  }
}

export default App;
