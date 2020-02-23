import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>asdfw</Text>
      <View style={styles.navBar}>
        <Image source = {require('./assets/homeIcon.png')} 
        style = {{ width: 100, height: 100, marginHorizontal:100 }}/>
        <Image source = {require('./assets/followingIcon.png')} 
        style = {{ width: 100, height: 100, marginHorizontal:100 }}/>
        <Image source = {require('./assets/groupIcon.png')} 
        style = {{ width: 100, height: 100, marginHorizontal:100 }}/>
        <Image source = {require('./assets/writeIcon.png')} 
        style = {styles.writeIcon}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  navBar: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    flex: 1,
    flexDirection: "row",
    backgroundColor: '#fff',
    width: '100%',
    height: '20%',
  },
  writeIcon: {
    position: 'absolute',
    width: '125',
    height: '125',
    bottom: '20',
    left: '100',
  }
});
