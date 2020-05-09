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
import userStore from './stores/user';
import RegisterScreen from './views/RegisterScreen';
import {ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './views/LoginScreen';
import ProfileScreen from './views/ProfileScreen';

declare const global: {HermesInternal: null | {}};

const stores = {
  userStore
};

const Stack = createStackNavigator();

class App extends Component {
  render() {
    return (
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
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
          </Stack.Navigator>
        </NavigationContainer>
      </ApplicationProvider>
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
