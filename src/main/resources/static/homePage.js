import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default class HomePage extends Component {
  constructor(props){
    super();
    this.state = {
      home: require('./assets/homeIconClick.png'),
      following: require('./assets/followingIcon.png'),
      group: require('./assets/groupIcon.png'),
      textColor: '#4704a5',
      voiceColor: '#000000'
    }
  }
  changeHomeIcon = () =>{
    if (this.state.home === require('./assets/homeIcon.png')) {
      this.setState({
        home: require('./assets/homeIconClick.png'),
        following: require('./assets/followingIcon.png'),
        group:require('./assets/groupIcon.png')
      })
    }
  }
  changeText = () =>{
    if (this.state.textColor === '#000000') {
      this.setState({
        textColor: '#4704a5',
        voiceColor: '#000000'
      })
    }
  }
  changeVoice = () =>{
    if (this.state.voiceColor === '#000000') {
      this.setState({
        textColor: '#000000',
        voiceColor: '#4704a5'
      })
    }
  }
  changeFollowingIcon = () =>{
    if (this.state.following === require('./assets/followingIcon.png')) {
      this.setState({
        home: require('./assets/homeIcon.png'),
        following: require('./assets/followingIconClick.png'),
        group:require('./assets/groupIcon.png')
      })
    }
  }
  changeGroupIcon = () =>{
    if (this.state.group === require('./assets/groupIcon.png')) {
      this.setState({
        home: require('./assets/homeIcon.png'),
        following: require('./assets/followingIcon.png'),
        group:require('./assets/groupIconClick.png')
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Hello, world!</Text>
        <View style = {styles.navBar}>
          <TouchableOpacity onPress = {this.changeHomeIcon}>
            <Image source = {this.state.home} 
              style = {styles.homeIcon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.changeFollowingIcon}>
            <Image source = {this.state.following} 
              style = {styles.navImages}/>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.changeGroupIcon}>
            <Image source = {this.state.group} 
              style = {styles.navImages}/>
          </TouchableOpacity>
          <Image source = {require('./assets/postIcon.png')} 
            style = {styles.postIcon}/>
        </View>
        <View style={styles.top}>
          <Image source = {require('./assets/logo.png')} 
            style = {styles.logo}/>
            <Image source = {require('./assets/accountIcon.png')} 
            style = {styles.accountIcon}/>
        </View>
        <View style={styles.switchType}>
          <TouchableOpacity onPress = {this.changeText} style={{width:'50%'}}>
            <Text style={{color:this.state.textColor,fontSize:30,fontWeight:'bold'}}>Text</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.changeVoice}>
            <Text style={{color: this.state.voiceColor, fontSize:30,fontWeight:'bold'}}>Voice</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#ffff',
  },
  text:{
    fontSize:30,
    fontWeight:'bold'
  },
  top:{
    position:'absolute',
    top: 0,
    backgroundColor: '#4704a5',
    width: '100%',
    height:'12%',
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  switchType:{
    position: "absolute",
    top: '15%',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  logo:{
    width: 100, height: 100, top: 20, resizeMode:"contain", marginLeft: 30
  },
  accountIcon:{
    width: 40, height: 40, top: 45, resizeMode:"contain", marginRight: 30
  },
  navBar:{
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    height: '10%',
    backgroundColor:'#ffff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
	    width: 1,
	    height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 20.00,
    elevation: 24,
  },
  navImages:{
    width: 45, height: 45, top: 10, resizeMode:"contain"
  },
  homeIcon:{
    width: 45, height: 45, marginLeft: 25, top: 10, resizeMode:"contain"
  },
  postIcon:{
    width: 50, height: 50, marginRight:20, top: 7, resizeMode:"contain"
  }
})
