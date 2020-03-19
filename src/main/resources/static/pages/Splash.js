import React, { } from 'react';
import {
    Image, KeyboardAvoidingView,
    StyleSheet, Text, TextInput, TouchableOpacity, ImageBackground,
    View, Platform
} from 'react-native'

export default class Splash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phoneNumber : "",
            status : null
        }
    }
    verification = () => {
        const url = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"localhost") + ":8080/verify/phoneVerification?phoneNumber=";
        console.log(url);
        fetch(url + this.state.phoneNumber).then(response => response.json()).then(data => {
            if (data.status === '0') {
                this.props.navigation.navigate('Verification', {phoneNumber: this.state.phoneNumber})
            }
            else {
                console.log(data.status)
            }
        }).catch(function(err) {
            console.log(err);
        });
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground source={require('../assets/background.png')}
                                 style={{width: '100%', height: '100%'}}>
                    <View style={styles.containerLogo}>
                        <Image style={{width: 150, height: 150, resizeMode: 'contain'}}
                               source={require('../assets/logo.png')}/>
                        <Text style={styles.logoText}> Welcome to AnonMe! </Text>
                    </View>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.containerForm}>
                        <TextInput style={styles.phoneNumberBox}
                                   underlineColorAndroid='rgba(0,0,0,0)'
                                   placeholder="Click to Enter Phone Number"
                                   placeholderTextColor='#ffffff'
                                   keyboardType='number-pad'
                                   onChangeText={input => this.setState({phoneNumber:input})}
                                   maxLength= {10}
                        />

                        <TouchableOpacity style={styles.button} onPress={() => this.verification()}>
                            <Text style={styles.loginButton}>Login / Signup</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('BottomNav')}>
                            <Text style={styles.loginButton}>Continue as Guest</Text>
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
    containerLogo: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logoText: {
        fontSize: 18,
        color: 'rgba(255,255,255,0.7)',
        position: 'absolute',
        top: '55%'
    },
    containerForm: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    phoneNumberBox: {
        width: 300,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        marginVertical: 10,
        paddingVertical: 13,
    },
    button: {
        width: 300,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13
    },
    loginButton: {
        fontSize: 16,
        fontWeight: '500',
        color: '#ffffff',
        textAlign: 'center'
    }
});

