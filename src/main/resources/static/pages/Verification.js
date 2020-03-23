import React, { Component } from 'react';
import {
    Image, KeyboardAvoidingView,
    StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground,
    View,
    Platform,
} from 'react-native'
// import axios from 'axios';

// import App from '../App';


export default class Verification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            success: true,
            code: ''
        }
    }

    checkCode = () => {
        if(this.state.code.length === 6) {
            const {params} = this.props.navigation.state;
            const phoneNumber = params ? params.phoneNumber : null;
            const url = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") +
                ":8080/verify/phoneVerificationCheck?phoneNumber=";
            fetch(url + phoneNumber + "&code=" + this.state.code).then(response => response.json()).then(data => {
                if (data.status === '0') {
                    this.props.navigation.navigate('registerName', {phoneNumber: phoneNumber})
                }else {
                    this.setState({success: false})
                }
                console.log(data)
            });
        }
    }

    render() {

        let suc = this.state.success;
        function printTryAgain () {
            if (suc === false) {
                return (<Text style={styles.IncorrectCode}>Verification Code Incorrect, Try Again</Text>)
            }
        }

        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/background.png')}
                                 style={{width: '100%', height: '100%'}}>
                    <View style={styles.containerLogo}>
                        <Image style={{width: 150, height: 150, resizeMode: 'contain'}}
                               source={require('../assets/logo.png')}/>
                        <Text style={styles.logoText}> Welcome to AnonMe! </Text>
                        {printTryAgain()}
                    </View>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.containerForm}>
                        <TextInput style={styles.phoneNumberBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   placeholder="Enter 6-Digit Verification Code Here"
                                   placeholderTextColor='#ffffff'
                                   keyboardType='number-pad'
                                   onChangeText={input => this.setState({code: input})}
                                   maxLength = {6}
                            //    value={userInput}

                        />
                        {/* {() => navigation.navigate('HomePage')} THIS GOES INTO ONPRESS FOR THE ENTER BUTTON */}
                        <TouchableOpacity style={styles.button} onPress={this.checkCode()}>
                            <Text style={styles.loginButton}>Enter</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ImageBackground>
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
    IncorrectCode : {
        fontSize : 18,
        color: 'rgba(255,255,255,0.7)',
        position: 'absolute',
        top: '66%'
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

