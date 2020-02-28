import React, { Component } from 'react';
import {
    Image, KeyboardAvoidingView,
    StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground,
    View,
} from 'react-native'

export default function Verification ({navigation}){

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/background.png')} style={{width:'100%',height:'100%', resizeMode: 'contain'}}>
            <View style ={styles.containerLogo}>
                <Image style={{width:150,height:150, resizeMode: 'contain'}} source={require('../assets/logo.png')}/>
                <Text style= {styles.logoText}> Welcome to AnonMe!  </Text>
            </View>
            <KeyboardAvoidingView
                behavior = "padding"
                style ={styles.containerForm}>
                <TextInput style = {styles.phoneNumberBox}
                           underlineColorAndroid = 'rgba(0,0,0,0)'
                           placeholder = "Enter 6-Digit Verification Code Here"
                           placeholderTextColor = '#ffffff'
                           keyboardType = 'number-pad'
                           onChangeText={(text) => this.setState({text})}
                           value={this.state.text}
                />

                <TouchableOpacity style = {styles.button} onPress = {() => navigation.navigate('HomePage')}>
                    <Text style={styles.loginButton}>Enter</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#4704a5',
        flexGrow: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerLogo : {
        flexGrow : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText : {
        fontSize : 18,
        color: 'rgba(255,255,255,0.7)',
        position: 'absolute',
        top: '55%'
    },
    containerForm : {
        flexGrow : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    phoneNumberBox: {
        width: 280,
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
        width: 70,
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
});

