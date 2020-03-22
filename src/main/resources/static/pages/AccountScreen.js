import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity} from 'react-native';

export default class AccountScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            singInStatus: true
        }
    }
    render() {
        let status = this.state.singInStatus;
        let that = this;

        function f() {
            if(status){
                return (
                    <View style={{flex: 1, alignItems: 'center' }}>
                        <Image style={styles.circle}
                               source={require('../assets/accountTopCircle.png')}/>
                        <Image style={styles.avatar}
                               source={require('../assets/avatarDemo.png')}/>
                        <TouchableOpacity style={styles.signOutTouch} onPress={() => that.setState({singInStatus: false})}>
                            <Text style={styles.signOut}> Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                );
            }else {
                return(
                    <View style={styles.loggedOutContainer}>
                        <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                               source={require('../assets/lockIcon.png')}/>
                        <Text style={styles.loggedOutText}>
                            Log In or Sign Up to Access
                        </Text>
                    </View>
                )
            }
        }

        return(
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                {f()}
            </View>
        )
    }
}
const styles = StyleSheet.create({
    circle: {
        position: 'absolute',
        top:'-35%',
        width: 500,
        height: 500,
        borderRadius: 500/2,
    },
    loggedOutContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#6e6e6e',
        //opacity: 0.4
    },
    signOut: {
        color: 'white',
        fontSize: 15
    },
    avatar:{
        width: 100, height: 100, resizeMode: 'contain', marginTop: '10%'
    },
    signOutTouch :{
        position: 'absolute',
        right: '-25%',
        top: '9%'
    },
    loggedOutText: {
        fontSize: 20,
        color: 'white',
        marginTop: 20
    }
});

