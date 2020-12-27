import React, {Component} from 'react';
import {View, Text, Platform} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import LoginContainer from './Login/LoginContainer';
import HomeContainer from './Home/HomeContainer';

const Stack = createStackNavigator();

class RootStack extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  async componentDidMount() {}

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={
            ({
              headerShown: false,
              cardStyle: {
                backgroundColor: 'white',
              },
            },
            Platform.OS === 'android'
              ? {
                  ...TransitionPresets.SlideFromRightIOS,
                  gestureEnabled: true,
                  headerShown: false,
                }
              : {headerShown: false})
          }
          initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginContainer} options={{}} />
          <Stack.Screen name="Home" component={HomeContainer} options={{}} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default RootStack;
