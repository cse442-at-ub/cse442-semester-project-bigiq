import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

export default class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      home: require('../assets/homeIconClick.png'),
      following: require('../assets/followingIcon.png'),
      group: require('../assets/groupIcon.png'),
      account: require('../assets/accountIcon.png'),
      textColor: '#4704a5',
      voiceColor: '#000000'
    }
  }
  changeAccountIcon = () =>{
    if (this.state.account === require('../assets/accountIcon.png')) {
      this.setState({
        home: require('../assets/homeIcon.png'),
        following: require('../assets/followingIcon.png'),
        group:require('../assets/groupIcon.png'),
        account:require('../assets/accountIconClick.png')
      })
    }
  }
  changeHomeIcon = () =>{
    if (this.state.home === require('../assets/homeIcon.png')) {
      this.setState({
        home: require('../assets/homeIconClick.png'),
        following: require('../assets/followingIcon.png'),
        group:require('../assets/groupIcon.png'),
        account:require('../assets/accountIcon.png')
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
    if (this.state.following === require('../assets/followingIcon.png')) {
      this.setState({
        home: require('../assets/homeIcon.png'),
        following: require('../assets/followingIconClick.png'),
        group:require('../assets/groupIcon.png')
      })
    }
  }
  changeGroupIcon = () =>{
    if (this.state.group === require('../assets/groupIcon.png')) {
      this.setState({
        home: require('../assets/homeIcon.png'),
        following: require('../assets/followingIcon.png'),
        group:require('../assets/groupIconClick.png')
      })
    }
  }
  render() {
    return (
      <View style={styles.container}>
        <View style = {styles.navBar}>
          <TouchableOpacity onPress = {this.changeHomeIcon}>
            <Image source = {this.state.home} 
              style = {styles.homeIcon}/>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.changeFollowingIcon}>
            <Image source = {this.state.following} 
              style = {styles.navImages}/>
          </TouchableOpacity>
          <TouchableWithoutFeedback>
            <Image source = {require('../assets/postIcon.png')}
                   style = {styles.postIcon}/>
          </TouchableWithoutFeedback>
          <TouchableOpacity onPress = {this.changeGroupIcon}>
            <Image source = {this.state.group} 
              style = {styles.navImages}/>
          </TouchableOpacity>
          <TouchableOpacity onPress = {this.changeAccountIcon}>
            <Image source = {this.state.account}
                   style = {styles.accountIcon}/>
          </TouchableOpacity>

        </View>
        <View style={styles.top}>
          <Image source = {require('../assets/logo.png')}
            style = {styles.logo}/>

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
    width: 70, height: 70, top: '-7%', resizeMode:"contain"
  },
  accountIcon:{
    width: 48, height: 48, marginRight:20, top: 7, resizeMode:"contain"
  },
})
