import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView
} from 'react-native';

export default class Form extends Component {
  render(){
    return(
          <KeyboardAvoidingView
                behavior = "padding"
                style ={styles.container}
              >
        <TextInput style = {styles.phoneNumberBox} 
        underlineColorAndroid = 'rgba(0,0,0,0)' 
        placeholder = "Phone Number"
        placeholderTextColor = '#ffffff'
        keyboardType = 'number-pad'
        />
        
        <TouchableOpacity style = {styles.button}>
            <Text style={styles.loginButton}>Login / Signup</Text>

        </TouchableOpacity>
    </KeyboardAvoidingView>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flexGrow : 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  phoneNumberBox: {
      width: 300,
      backgroundColor: 'rgba(255,255,255,0.3)',
      borderRadius : 25,
      paddingHorizontal : 16,
      fontSize: 16,
      color : '#ffffff',
      textAlign: 'center',
      marginVertical : 10,
      paddingVertical: 13,
  },
  button: {
    width: 300,
    backgroundColor: '#1c313a',
    borderRadius : 25,
    marginVertical : 10,
    paddingVertical: 13
  },
  loginButton: {
      fontSize: 16,
      fontWeight: '500',
      color: '#ffffff',
      textAlign: 'center'
  }

})