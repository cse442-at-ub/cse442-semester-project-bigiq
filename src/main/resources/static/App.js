import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native'

import Splash from './pages/Splash';


export default class App extends Component {
  render() {
  return(
    <View style = {styles.container}>
      <StatusBar
        backgroundColor="#1cd313a"
        barStyle="light-content"
      />
      <Splash/>
    </View>
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