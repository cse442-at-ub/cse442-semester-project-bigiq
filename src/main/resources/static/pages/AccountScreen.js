import React from 'react';
import {Image, StyleSheet, View, Text, TouchableOpacity, AsyncStorage, FlatList, Platform} from 'react-native';

export default class AccountScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            screenName: '',
            doneLoading: false,
            data: []
        }
    }

    fetchUserPost = () =>{
        const getAllPostUrl = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") +
            ":8080/posts/postsByScreenName?screenName=";
        fetch(getAllPostUrl + this.state.screenName).then(response => response.json()).then( dataAPI => this.setState({data : dataAPI}));

    };
    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
                doneLoading: true
            });
        });
        /*const { navigation } = this.props;
        this.focusListener = navigation.addListener("focus", () => {
            this.fetchUserPost();
            console.log(this.state.data.length)
        });*/
    };
    /*componentWillUnmount() {
        this.focusListener.remove();
    }*/
    render() {
        let that = this;
        function f() {
            if(that.state.doneLoading){
                return (
                    <View style={{flex: 1, alignItems: 'center' }}>
                        <Image style={styles.circle}
                               source={require('../assets/accountTopCircle.png')}/>
                        <Image style={styles.avatar}
                               source={require('../assets/avatarDemo.png')}/>
                        <TouchableOpacity style={styles.signOutTouch} onPress={() => that.setState({singInStatus: false})}>
                            <Text style={styles.signOut}> Sign Out</Text>
                        </TouchableOpacity>
                        <Text>{that.state.screenName}</Text>
                        <View>

                        </View>
                    </View>
                );
            }else {
                return(
                    <View style={styles.loggedOutContainer}>
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
/*
<Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                               source={require('../assets/lockIcon.png')}/>
                        <Text style={styles.loggedOutText}>
                            Log In or Sign Up to Access
                        </Text>
 */
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

