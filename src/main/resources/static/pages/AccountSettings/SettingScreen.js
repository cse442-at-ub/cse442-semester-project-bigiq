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


export default class SettingScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            screenName: '',
            phoneNumber: '',
            notificationIcon: require('../../assets/settingNotificationIcon.png')
        }
    }

    goBack = () =>{
        this.props.navigation.navigate('AccountScreen');
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
                <View style={{paddingHorizontal: 30, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <Image style={{width: 35, height: 35, resizeMode: 'contain', marginRight: 20}}
                               source={require('../../assets/settingName.png')}/>
                        <Text>{that.state.screenName}</Text>
                    </View>
                    <View style={{right: 0, backgroundColor: 'white'}}>
                        <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                               source={require('../../assets/rightIcon.png')}/>
                    </View>
                </View>
                <View style={{paddingHorizontal: 30, paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
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
                <View style={{paddingHorizontal: 30, paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
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
                <View style={{paddingHorizontal: 30, paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => that.switchNotiIcon()}>
                            <Image style={{width: 33, height: 33, resizeMode: 'contain', marginRight: 20}}
                                   source={require('../../assets/deletePostIcon.png')}/>
                        </TouchableOpacity>
                        <Text>Delete All Post</Text>
                    </View>
                    <View style={{right: 0, backgroundColor: 'white'}}>
                        <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                               source={require('../../assets/rightIcon.png')}/>
                    </View>
                </View>
                <View style={{paddingHorizontal: 30, paddingTop: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <TouchableOpacity onPress={() => that.switchNotiIcon()}>
                            <Image style={{width: 35, height: 35, resizeMode: 'contain', marginRight: 20}}
                                   source={require('../../assets/deleteAccountIcon.png')}/>
                        </TouchableOpacity>
                        <Text>Delete Account</Text>
                    </View>
                    <View style={{right: 0, backgroundColor: 'white'}}>
                        <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                               source={require('../../assets/rightIcon.png')}/>
                    </View>
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
    }


});

