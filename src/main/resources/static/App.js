import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native'

import Splash from './pages/Splash';
import HomePage from './homePage';

export default class App extends Component {
  render() {
  return(

      <HomePage/>
  );
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#4704a5',
            flexGrow: 1,
            alignItems: 'center',
            justifyContent: 'center',
  }
})