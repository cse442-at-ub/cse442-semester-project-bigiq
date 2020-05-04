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
    TouchableWithoutFeedback, TextInput
} from 'react-native';
import {Ionicons} from "@expo/vector-icons";



export default class RewardScreen extends React.Component{


goBack = () =>{
        this.props.navigation.navigate('AccountScreen');
};


render(){
    let that = this
    return(
        <View style={styles.topFeed}>
            <TouchableOpacity style={{ position:'relative', top: '60%', left: 20}} onPress={() => that.goBack()}>
                <Ionicons name={'ios-arrow-back'} size={30} color={'gray'}/>
            </TouchableOpacity>
            <View style={styles.Rewards}>
                    <Text style={{color: '#4704a5', fontWeight: 'bold', fontSize: 27, top : '-13.5%'}}>Rewards</Text>
            </View>
            <View style={styles.statusFeed}>
                <View style = {styles.Status}>
                    <Text style={{color: '#4704a5', fontWeight: 'bold', fontSize: 20, top : '-14%'}}> STATUS : BRONZE I</Text>
                    <Text style = {{color: '#4704a5', left : -180, top : '-5%'}}> 50 More Posts Until Next Rank </Text>
                    <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: -115, top : '-16%'}}
                                source={require('../../assets/rewardBadge/Bronze1.png')}/>
                </View>
            </View>
            <View style={styles.bronzeBar}>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 10, top : '15%'}}
                       source={require('../../assets/rewardBadge/Bronze1.png')}/>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 70, top : '-50%'}}
                       source={require('../../assets/rewardBadge/Bronze2.png')}/>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 130, top : '-115%'}}
                       source={require('../../assets/rewardBadge/Bronze3.png')}/>
                <Text style = {{color: '#4704a5', right: -200, top : '-170%'}}> In Bronze you can : {'\n'} {'\u2B24'} Display bronze badge </Text>
            </View>
            <View style={styles.silverBar}>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 10, top : '15%'}}
                                source={require('../../assets/rewardBadge/Silver1.png')}/>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 70, top : '-50%'}}
                                source={require('../../assets/rewardBadge/Silver2.png')}/>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 130, top : '-115%'}}
                                source={require('../../assets/rewardBadge/Silver3.png')}/>
                <Text style = {{color: '#4704a5', right: -200, top : '-170%'}}> In Silver you can : {'\n'} {'\u2B24'} Display silver badge </Text>
            </View>
            <View style={styles.goldBar}>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 10, top : '15%'}}
                                source={require('../../assets/rewardBadge/Gold1.png')}/>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 70, top : '-50%'}}
                                source={require('../../assets/rewardBadge/Gold2.png')}/>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 130, top : '-115%'}}
                                source={require('../../assets/rewardBadge/Gold3.png')}/>
                <Text style = {{color: '#4704a5', right: -200, top : '-170%'}}> In Gold you can : {'\n'} {'\u2B24'} Display Gold badge</Text>
            </View>
            <View style={styles.platBar}>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 10, top : '15%'}}
                                source={require('../../assets/rewardBadge/Plat1.png')}/>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 70, top : '-50%'}}
                                source={require('../../assets/rewardBadge/Plat2.png')}/>
                <Image style={{width: 70, height: 70, resizeMode: 'contain', marginLeft: 130, top : '-115%'}}
                                source={require('../../assets/rewardBadge/Plat3.png')}/>
                <Text style = {{color: '#4704a5', right: -200, top : '-170%'}}> In Platinum you can : {'\n'} {'\u2B24'} Display Platinum badge {'\n'} {'\u2B24'} You have unlocked group {'\n'} moderator privileges! </Text>
            </View>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    Status : {
        flexDirection: 'row',
        paddingHorizontal: 15,
        position: 'relative',
        top: '15%',
    },
    Rewards:{
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 30,
        position: 'relative',
        top: '15%',
    },
    topFeed: {
        backgroundColor: 'white',
        width: '100%',
        height: '13%',
    },
    statusFeed: {
        backgroundColor : 'white',
        width: '100%',
        height: '100%',
        top : '23%'
    },
    bronzeBar:{
        backgroundColor : 'white',
        width: '100%',
        height: '130%',
        top : '26%'
    },
    silverBar:{
        backgroundColor : 'white',
        width: '100%',
        height: '130%',
        top : '26%',
    },
    goldBar:{
        backgroundColor : 'white',
        width: '100%',
        height: '130%',
        top : '26%',
    },
    platBar:{
        backgroundColor : 'white',
        width: '100%',
        height: '130%',
        top : '26%',
    }
});
