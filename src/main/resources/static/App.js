import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native'

import Navigator from './Routes';


export default class App extends Component {
  render() {
  return(
      <Navigator/>
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