/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import ViewAllScreen from './screens/ViewAllScreen';
import CreateStudentScreen from './screens/CreateStudentScreen';
import StudentDetailScreen from './screens/StudentDetailScreen';

const AppNavigator = createStackNavigator({
  ViewStudents: ViewAllScreen,
  CreateStudent: CreateStudentScreen,
  StudentDetails: StudentDetailScreen,
},
{
  initialRouteName: 'ViewStudents',
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: '#808',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  },
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer/>;
  }
  componentDidMount() {
    setTimeout(() => sendCountNotification(), 1000);
  }
}

