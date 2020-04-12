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
import {postByAuthor} from "../../fetches/PostFetch";

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
        postByAuthor(this.state.screenName).then( dataAPI =>
            this.setState({data : dataAPI})
        );

    };
    settingScreen = () =>{
        this.props.navigation.navigate('SettingScreen');
    };
    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
                doneLoading: true
            });
        });
        const { navigation } = this.props;
        navigation.addListener("focus", () => {
            this.fetchUserPost();
        });
    };
    _listEmptyComponent = () => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', height: 300}}>
                <Text>Looks like you haven't posted anything.</Text>
            </View>
        )
    };
    render() {
        let that = this;
        return (
            <View style={{ alignItems: 'center'}}>
                <TouchableOpacity style={{ position: 'absolute', right: '5%', top: '5%'}} onPress={() => that.settingScreen()}>
                    <Image style={styles.settingIcon}
                           source={require('../../assets/settingIcon.png')}/>
                </TouchableOpacity>
                <Image style={styles.avatar}
                       source={require('../../assets/avatars/1.png')}/>
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
                <View style={{marginVertical: 20}}>
                    <Text style={{color: 'gray'}}>Posts by {that.state.screenName}</Text>
                </View>
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.post_id}
                        extraData={this.state.data}
                        ListEmptyComponent={this._listEmptyComponent}
                        data={this.state.data}
                        renderItem={({ item }) => {
                            return(
                                <View style = {styles.postContainer}>
                                    <TouchableWithoutFeedback>
                                        <View>
                                            <Text style={{fontSize: 10, color: '#cccccc'}}>{item.timestampFront}</Text>
                                            <Text style={{marginVertical: 6, fontSize: 14}}>{item.content}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View style = {styles.featureContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                                <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                       source={that.state.likeIcon}/>
                                            </TouchableOpacity>
                                            <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                                <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                       source={require('../../assets/loveIcon.png')}/>
                                            </TouchableOpacity>
                                            <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                                        </View>
                                        <TouchableOpacity style={{marginHorizontal: 10}}>
                                            <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                   source={require('../../assets/followIcon.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginHorizontal: 10}}>
                                            <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                   source={require('../../assets/shareIcon.png')}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginHorizontal: 10}}>
                                            <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                   source={require('../../assets/flagIcon.png')}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            )
                        }
                        }
                    />
                </View>
            </View>


        );
    }
}
const styles = StyleSheet.create({
    statsText: {fontSize: 30, fontWeight:'bold', color: '#4704a5'},
    statsView:{
        flexDirection: 'column', justifyContent: 'center', alignItems: 'center'
    },
    featureContainer : {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    postContainer:{
        width: 400,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 10,
        padding: 20,
        backgroundColor: 'white',
    },
    statsContainer:{
        width: '80%',
        height: '10%',
        borderRadius: 20,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',

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
    settingIcon:{
        width: 35, height: 35, resizeMode: 'contain'
    },

});

