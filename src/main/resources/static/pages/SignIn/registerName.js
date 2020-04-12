import React, { Component } from 'react';
import {
    Image, ImageBackground, KeyboardAvoidingView, Platform,
    StyleSheet, Text, TextInput, TouchableOpacity,
    View,
} from 'react-native'
import { AsyncStorage } from "react-native";


export default class registerName extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            screenName : '',
            validName: false,
            success: true
        }
    }
    checkName = () => {
        const that  = this;
        const url = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") +
            ":8080/users/checkname?screenName=" + this.state.screenName;
        fetch(url).then(response => response.json()).then(data => {
            if (data.status === '0') {
                that.setState({validName: true})
            }
            else {
                that.setState({success: false})
            }
        });
    };

    addUser = async () => {
        const that  = this;
        await that.checkName();
        const {params} = that.props.navigation.state;
        const phoneNumber = params ? params.phoneNumber : null;
        const payload = {
            phoneNumber: phoneNumber,
            screenName: that.state.screenName
        };
        const url = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") + ":8080/users/adduser";
        await fetch(url, {
            method: "POST",
            body: JSON.stringify( payload ),
            headers: new Headers({'content-type': 'application/json'}),
        }).then(function(response) {
            if(response.ok){
                AsyncStorage.setItem('phoneNumber', phoneNumber);
                AsyncStorage.setItem('screenName', that.state.screenName);
                that.props.navigation.navigate('AppScreen');
            }
        });
    };
    render() {
        let suc = this.state.success;
        function printTryAgain () {
            if (suc === false) {
                return (<Text style={styles.IncorrectCode}>You Can't Use That Tag, Try Again</Text>)
            }
        }
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../../assets/background.png')}
                                 style={{width: '100%', height: '100%'}}>
                    <View style={styles.containerLogo}>
                        <Image style={{width: 150, height: 150, resizeMode: 'contain'}}
                               source={require('../../assets/logo.png')}/>
                        <Text style={styles.logoText}> Welcome to AnonMe! </Text>
                        <Text style={styles.registerText}> Please Create Your NameTag </Text>
                        {printTryAgain()}
                    </View>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.containerForm}>
                        <TextInput style={styles.nameTagBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   placeholder="Your NameTag"
                                   placeholderTextColor='#ffffff'
                                   onChangeText={input => this.setState({screenName: input})}
                                   keyboardType='default'
                        />

                        <TouchableOpacity style={styles.button} onPress={() => this.addUser()}>
                            <Text style={styles.registerButton}>Register</Text>
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
    registerHeader : {
        fontSize : 16,
        color: 'rgba(255,255,255,0.7)',
        position: 'absolute',
        justifyContent : 'center',
    },
    registerText : {
        fontSize : 20,
        color : '#ffffff',

    },
    containerForm : {
        flexGrow : 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    nameTagBox: {
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
        paddingVertical: 13,
    },
    registerButton: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center',
    },
    logoText : {
        fontSize : 18,
        color: 'rgba(255,255,255,0.7)',
        position: 'absolute',
        top: '55%'
    },
});

