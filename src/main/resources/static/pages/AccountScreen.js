import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import * as NavigationActions from "react-navigation";
import {color} from "react-native-reanimated";

export default class AccountScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            screenName: '',
            doneLoading: false,
            data: [],
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
    signOutHandler = async () =>{
        AsyncStorage.clear();
        this.props.navigation.navigate('Splash');
    };
    /*componentWillUnmount() {
        this.focusListener.remove();
    }*/
    render() {
        let that = this;

        function loadFlatList() {
            if(that.state.data.length > 0) {
                return (
                    <View>
                        <Text>You have not posted or liked anything</Text>
                    </View>
                )
            }
            else {
                return (
                    <View>

                    </View>
                )
            }
        }
        function renderScreen() {
            if(that.state.doneLoading){
                return (

                        <View style={{ alignItems: 'center'}}>
                            <Image style={styles.avatar}
                                   source={require('../assets/avatars/1.png')}/>
                            <View style={styles.nameContainer}>
                                <Text style={{color:'white'}}>{that.state.screenName}</Text>
                            </View>
                            <View style={styles.statsContainer}>
                                <View style={styles.statsView}>
                                    <Text style={styles.statsText}>0</Text>
                                    <Text style={{color: 'gray'}}>Posts</Text>
                                </View>
                                <View style={styles.statsView}>
                                    <Text style={styles.statsText}>0</Text>
                                    <Text style={{color: 'gray'}}>Likes</Text>
                                </View>
                                <View style={styles.statsView}>
                                    <Text style={styles.statsText}>0</Text>
                                    <Text style={{color: 'gray'}}>Following</Text>
                                </View>
                            </View>
                            {loadFlatList()}
                        </View>


                );
            }else {
                return(
                    <View>
                    </View>
                )
            }
        }

        return(
            <View>
                {renderScreen()}
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
    statsText: {fontSize: 30, fontWeight:'bold', color: '#4704a5'},
    statsView:{
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    },
    statsContainer:{
        width: '80%',
        height: '25%',
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    nameContainer:{
        backgroundColor: '#4704a5',
        borderRadius: 20,
        position: 'relative',
        width: 140,
        alignItems: 'center',
        justifyContent: 'center',
        height: 30,
        top: -15
    },
    avatar:{
        width: 125, height: 125, resizeMode: 'contain', marginTop: '10%'
    },

});

