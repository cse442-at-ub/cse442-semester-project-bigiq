import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

export default class Logo extends Component{
  render(){
    return(
      <View style ={styles.container}>
        <Image style={{width:150,height:150, resizeMode: 'contain'}}
          source={require('../assets/logo.png')}/>
        <Text style= {styles.logoText}> Welcome to AnonMe!  </Text>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    flexGrow : 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logoText : {
    fontSize : 18,
    color: 'rgba(255,255,255,0.7)',
    position: 'absolute',
    top: '55%'
  }
})