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
    TouchableWithoutFeedback, Dimensions
} from 'react-native';
import {flagPost, likePost, postByAuthor} from "../../fetches/PostFetch";
import {Ionicons} from "@expo/vector-icons";

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
        this.props.navigation.addListener("focus", () => {
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
    fetchLike = (id) =>{
        likePost(id,this.state.screenName).then(res => res.text);
    };
    fetchFlag = (id) =>{
        flagPost(id,this.state.screenName).then(res => res.text);
    };

    checkLike = (index, id) =>{
        const newArray = [...this.state.data];
        newArray[index].like_button = !newArray[index].like_button;
        if(newArray[index].like_button === false){
            newArray[index].likes = newArray[index].likes - 1;
        }else {
            newArray[index].likes = newArray[index].likes + 1;
        }
        this.setState({ data: newArray });
        this.fetchLike(id)
    };
    flag = (index, id) =>{
        const newArray = [...this.state.data];
        newArray[index].flag_button = !newArray[index].flag_button;
        this.setState({ data: newArray });
        this.fetchFlag(id)
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
                        <Text style={styles.statsText}>{this.state.data.length}</Text>
                        <Text style={{color: 'gray'}}>Posts</Text>
                    </View>
                    <TouchableOpacity style={styles.statsView} onPress={() => this.props.navigation.navigate('RewardScreen')}>
                        <Image style={{width: 70, height: 70, resizeMode: 'contain'}}
                               source={require('../../assets/rewardBadge/Bronze1.png')}/>
                    </TouchableOpacity>
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
                        keyExtractor={(item) => item.id}
                        extraData={this.state.data}
                        ListEmptyComponent={this._listEmptyComponent}
                        data={this.state.data}
                        renderItem={({ item, index }) => {
                            return(
                                <View style={{width: Dimensions.get('window').width, alignItems: 'center'}}>
                                    <View style = {styles.postContainer}>
                                        <TouchableWithoutFeedback>
                                            <View>
                                                <Text style={{fontSize: 10, color: '#cccccc'}}>{item.time}</Text>
                                                <Text style={{marginVertical: 6, fontSize: 14}}>{item.content}</Text>
                                            </View>
                                        </TouchableWithoutFeedback>
                                        <View style = {styles.featureContainer}>
                                            <View style={{flexDirection:'row'}}>
                                                <TouchableOpacity style={{marginHorizontal: 10}} onPress={() =>that.checkLike(index, item.id)}>
                                                    <Ionicons
                                                        name={'md-thumbs-up'}
                                                        size={16}
                                                        color={item.like_button ? '#4704a5' : 'gray'}
                                                    />
                                                </TouchableOpacity>
                                                <Text style = {{color: '#cccccc'}}>{item.likes}</Text>
                                            </View>
                                            <View style={{flexDirection:'row'}}>
                                                <TouchableOpacity style={{marginHorizontal: 10}}>
                                                    <Ionicons
                                                        name={'md-chatbubbles'}
                                                        size={16}
                                                        color={'gray'}/>
                                                </TouchableOpacity>
                                                <Text style = {{color: '#cccccc'}}>{0}</Text>
                                            </View>
                                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                                <Ionicons
                                                    name={'md-add-circle'}
                                                    size={16}
                                                    color={'gray'}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                                <Ionicons
                                                    name={'ios-share'}
                                                    size={16}
                                                    color={'gray'}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.flag(index, item.post_id)}>
                                                <Ionicons
                                                    name={'ios-flag'}
                                                    size={16}
                                                    color={item.flag_button ? '#4704a5' : 'gray'}
                                                />
                                            </TouchableOpacity>
                                        </View>
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
        width: 380,
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

