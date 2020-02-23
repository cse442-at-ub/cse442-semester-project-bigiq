import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar
} from 'react-native'

import Logo from '../component/Logo';
import Form from '../component/Form';


export default class Splash extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Logo/>
                <Form/>        
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4704a5',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

