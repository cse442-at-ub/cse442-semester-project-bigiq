import {Text, View, FlatList, Platform, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, ImageBackground, AsyncStorage} from "react-native";
import * as React from 'react';
import {fetchDataRecent,fetchDataLiked, deletePost, likePost, flagPost} from "../../fetches/PostFetch";
import {Ionicons} from "@expo/vector-icons";
import TextScreen from './Text/TextScreen';
import VoiceScreen from './Voice/VoiceScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            like: 0,
            feedType: true,
            likeIcon: require('../../assets/loveIcon.png'),
            screenName: '',
            isFetching: false
        };
    }
    postScreenMove = () => {
        this.props.navigation.navigate('PostScreen');
    };
    render() {
        let that = this;
        const TopTab = createMaterialTopTabNavigator();
        return (
            <View style={{flex: 1, flexDirection:'column', backgroundColor: '#gray'}}>
                <View style={styles.topFeed}>
                    <View style={styles.postnfeed}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 27}}>Feed</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center'}} onPress={()=>that.postScreenMove()}>
                            <Ionicons name={'ios-create'} size={30} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <TopTab.Navigator
                    tabBarOptions={{
                    activeTintColor: '#4704a5',
                    style: {
                        backgroundColor:'white'
                    }
                }}
                >
                    <TopTab.Screen name="Text" component={TextScreen} />
                    <TopTab.Screen name="Voice" component={VoiceScreen} />
                </TopTab.Navigator>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    postnfeed:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        position: 'relative',
        top: '9%'
    },
    topFeed: {
        backgroundColor: '#4704a5',
        width: '100%',
        height: '10%'
    },
    postContainer: {
        width: '95%',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 20,
        marginBottom: 10,
        backgroundColor: 'white',
    },
    toggleFeedText:{
        fontSize: 10, color:'black'
    },
    toggleFeedButton: {
      padding: 20,
      marginHorizontal: 30
    },
    featureContainer : {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    }
});
