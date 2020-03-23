import * as React from 'react';
import {
    AsyncStorage,
    KeyboardAvoidingView, Platform, StyleSheet, Text,
    TextInput, TouchableOpacity, View, Keyboard, TouchableWithoutFeedback
} from 'react-native'


export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            screenName: '',
            textInput: ''
        }
    }

    postFetch = () => {
        const url = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") + ":8080/posts/insertPost";
        const that = this;
        fetch(url, {
            method: "POST",
            body: JSON.stringify( {
                author: "ewee",
                content: that.state.content
            } ),
            headers: new Headers({'content-type': 'application/json'}),
        }).then(function(response) {
            if(response.ok){
                console.log("POSTED")
            }
        });
    };
    render() {
        return (

                <View style={{flex: 1}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', }}>
                        <TouchableOpacity style={styles.button} onPress = {() => this.postFetch()}>
                            <Text style={styles.loginButton}>Post</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress = {Keyboard.dismiss}>
                            <Text style={styles.loginButton}>Exit</Text>
                        </TouchableOpacity>
                    </View>
                    <KeyboardAvoidingView
                        behavior="padding"
                        style={styles.containerForm}>
                        <TextInput style={styles.postInput}
                                   placeholder="Your NameTag"
                                   placeholderTextColor='#ffffff'
                                   onChangeText={input => this.setState({content: input})}
                                   keyboardType='default'
                                   multiline = {true}
                        />
                    </KeyboardAvoidingView>
                </View>

        );
    }
}
    const styles = StyleSheet.create({
        postInput: {
            position: 'absolute',
            borderRadius: 10,
            fontSize: 16,
            flex: 1,
            backgroundColor: 'white',
            width: 400,
            height: 300,
            padding: 20
        },
        loginButton: {
            fontSize: 16,
            color: '#ffffff',
            textAlign: 'center',
        },
        containerForm : {
            flexGrow : 1,
            justifyContent: 'center',
            alignItems: 'center'
        },
        button: {
            width: 80,
            backgroundColor: '#1c313a',
            borderRadius: 25,
            marginVertical: 10,
            paddingVertical: 13,
        },
    });

