import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    Alert,
} from 'react-native';
import {deleteAllPostAuth} from "../../fetches/PostFetch";
import {deleteUser} from "../../fetches/UserFetch";

export default class SettingScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            screenName: '',
            phoneNumber: '',
            notificationIcon: require('../../assets/settingNotificationIcon.png'),
            hide: true
        }
    }
    deleteAllPostHandler = () =>{
        deleteAllPostAuth(this.state.phoneNumber).then(res => res.text())
    };
    goBack = () =>{
        this.props.navigation.navigate('AccountScreen');
    };
    signOutHandler = async () =>{
        AsyncStorage.clear();
        this.props.navigation.navigate('Splash');
    };
    deleteAccountAlert = () =>
        Alert.alert(
            "Are You Sure?",
            "Deleting your account will not delete any of your posts. By deleting your account" +
            " you will only unlink your phone number and screen name. In order to delete all post go to settings and" +
            "click Delete All Post.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.signOutHandler() }
            ],
            { cancelable: false }
        );
    deleteAllPostAlert = () =>{
        Alert.alert(
            "Are You Sure?",
            "This will make your post invisible on the feed but if someone is following it, they will still be able to see it.",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.deleteAllPostHandler() }
            ],
            { cancelable: false }
        );
    };
    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        AsyncStorage.getItem('phoneNumber').then((token) => {
            this.setState({
                phoneNumber: token,
            });
        });
    };
    switchNotiIcon = () =>{
        if(this.state.notificationIcon === require('../../assets/settingNotificationIcon.png')){
            this.setState({ notificationIcon: require('../../assets/settingNotificationOff.png')})
        }
        else {
            this.setState({ notificationIcon: require('../../assets/settingNotificationIcon.png')})
        }
    };
    render() {
        const that = this;
        return(
            <View style={{ flex: 1}}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ position:'relative', top: '60%', left: 20}} onPress={() => that.goBack()}>
                        <Image style={{width: 25, height: 25, resizeMode: 'contain'}}
                               source={require('../../assets/backIcon.png')}/>
                    </TouchableOpacity>
                    <View style={styles.SETTING}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>SETTINGS</Text>
                    </View>
                </View>
                <View style={{padding: 20}}>
                    <Text style={{color: 'gray'}}>Personal Information</Text>
                </View>
                <TouchableOpacity style={styles.sectionContainer} onPress={() => that.props.navigation.navigate('NameScreen')}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 35, height: 35, resizeMode: 'contain', marginRight: 20}}
                               source={require('../../assets/settingName.png')}/>
                        <Text>{that.state.screenName}</Text>
                    </View>
                    <View style={{right: 0, backgroundColor: 'white'}}>
                        <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                               source={require('../../assets/rightIcon.png')}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.sectionContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 35, height: 35, resizeMode: 'contain', marginRight: 20}}
                               source={require('../../assets/settingPhoneIcon.png')}/>
                        <Text>{that.state.phoneNumber}</Text>
                    </View>
                    <View style={{right: 0, backgroundColor: 'white'}}>
                        <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                               source={require('../../assets/rightIcon.png')}/>
                    </View>
                </View>
                <View style={{padding: 20}}>
                    <Text style={{color: 'gray'}}>Phone Setting</Text>
                </View>
                <View style={styles.sectionContainer}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => that.switchNotiIcon()}>
                            <Image style={{width: 35, height: 35, resizeMode: 'contain', marginRight: 20}}
                                   source={that.state.notificationIcon}/>
                        </TouchableOpacity>
                        <Text>Notification</Text>
                    </View>
                </View>
                <View style={{padding: 20}}>
                    <Text style={{color: 'gray'}}>Account</Text>
                </View>
                <TouchableOpacity style={styles.sectionContainer} onPress={() => that.deleteAllPostAlert()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 33, height: 33, resizeMode: 'contain', marginRight: 20}}
                                   source={require('../../assets/deletePostIcon.png')}/>
                        <Text>Delete All Post</Text>
                    </View>
                    <View style={{right: 0, backgroundColor: 'white'}}>
                        <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                               source={require('../../assets/rightIcon.png')}/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.sectionContainer} onPress={()=> that.deleteAccountAlert()}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <Image style={{width: 35, height: 35, resizeMode: 'contain', marginRight: 20}}
                                   source={require('../../assets/deleteAccountIcon.png')}/>
                        <Text>Delete Account</Text>
                    </View>
                    <View style={{right: 0, backgroundColor: 'white'}}>
                        <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                               source={require('../../assets/rightIcon.png')}/>
                    </View>
                </TouchableOpacity>
                <View style={styles.signOutContainer}>
                    <TouchableOpacity style={styles.signOut} onPress={() => that.signOutHandler()}>
                        <Text style={{color: 'white'}}>Sign Out</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#4704a5',
        width: '100%',
        height: '13%',
    },
    SETTING:{
        alignItems: 'center',
        top: '25%'
    },
    sectionContainer: {
        paddingHorizontal: 30,
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'},
    signOutContainer:{
        position:'absolute',
        bottom: 20,
        width: '100%',
        alignItems: 'center'
    },
    signOut:{
        width: '20%',
        backgroundColor: 'red',
        alignItems: 'center',
        borderRadius: 20,
        height: 30,
        justifyContent: 'center'
    }
});

