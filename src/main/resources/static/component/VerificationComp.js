import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

export default function VerificationComp({navigation}) {
    return(
        <TouchableOpacity style = {styles.button} onPress = {() => navigation.navigate('HomePage')}>
            <Text style={styles.loginButton}>Login / Signup</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius : 25,
    marginVertical : 10,
    paddingVertical: 13
  }
})