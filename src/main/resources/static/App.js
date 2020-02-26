import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native'

import Navigator from './Routes';

export default class App extends Component {
  render() {
    return(
        <Navigator/>
    );
  }
}