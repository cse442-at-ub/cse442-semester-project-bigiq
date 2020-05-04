import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList, AsyncStorage, Slider, Dimensions,
} from 'react-native';
import {flagPost, likePost} from "../../../fetches/PostFetch";
import {fetchComments} from "../../../fetches/CommentFetch";
import {Ionicons} from "@expo/vector-icons";
import {Audio} from "expo-av";

export default class PostDetailVoice extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            screenName: '',
            postDetail : {"id" : "123", "link" : "https://anonmebucket.s3.us-east-2.amazonaws.com/Audio/Gog.mp3", "bool": false,
                "duration": 10300 , "time" : "May 03, 7:28 AM", "content": "title", "value": 0, "like_button" : false},
            comments: [],
            value: 0,
            isPlaying: false,
            playbackInstance: null,
            timeGone: 0,
            currentIndex: 0,
            volume: 1.0,
            isBuffering: false,
            interval: null,
            feedType: true
        }
    }
    async componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        this.props.navigation.addListener("focus", () => {
            this.getPostDetail();
            //this.getAllComments();
        });
        await Audio.setAudioModeAsync({
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        this._loadNewPlaybackInstance();
    }
    async _loadNewPlaybackInstance() {
        const {isPlaying, volume} = this.state;
        try {
            const playbackInstance = new Audio.Sound();
            const source = {
                uri: this.state.postDetail.link
            };
            const status = {
                shouldPlay: isPlaying,
                volume
            };
            playbackInstance.setOnPlaybackStatusUpdate(this.onPlaybackStatusUpdate);
            await playbackInstance.loadAsync(source, status, false);
            this.setState({playbackInstance: playbackInstance})
        } catch (e) {
            console.log(e)
        }
    }
    updateValue = (status) =>{
        const array = this.state.postDetail;
        array.value = status.positionMillis;
        this.setState({ postDetail: array });
    };
    handlePlayPause = async () => {
        const { isPlaying, playbackInstance } = this.state;
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
        this.setState({
            isPlaying: !isPlaying
        });
        this.flipPlay();
        if(this.state.isPlaying === true){
            this.state.interval = setInterval(() => playbackInstance.getStatusAsync().then(status => this.updateValue(status)), 1000);
        }else {
            clearInterval(this.state.interval)
        }
    };
    seek = async () => {
        await this.state.playbackInstance.setPositionAsync(this.state.value);
    };
    millisToMinutesAndSeconds = (millis) => {
        const minutes = Math.floor(millis / 60000);
        const seconds = ((millis % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    };
    flipPlay = () =>{
        const array = this.state.postDetail;
        array.bool = !array.bool;
        this.setState({ postDetail: array });
    };
    /*playAudio = async (index) => {
        let { playbackInstance } = this.state;
        if(this.state.currentIndex === index){
            this.handlePlayPause(index)
        }
        else if (playbackInstance) {
            if(this.state.isPlaying === true){
                this.setState({isPlaying: false})
                this.flipPlay();
            }
            await playbackInstance.unloadAsync();
            this.setState({
                currentIndex: index
            });
            await this._loadNewPlaybackInstance();
            this.handlePlayPause(index);
        }
    };*/

    async componentWillUnmount() {
        await this.state.playbackInstance.unloadAsync();
    }

    getPostDetail = () =>{
        this.setState({postDetail: this.props.route.params.post});
    };
    backHomeScreen = () =>{
        this.props.navigation.pop();
    };
    _listEmptyComponent = () => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', height: 300}}>
                <Text>Looks like no one commented on this post.</Text>
                <Text>Wanna be the first?</Text>
                <TouchableOpacity onPress={() => this.addComment()}>
                    <View style={styles.createCommentButton}>
                        <Text style={{color: 'white'}}>Comment</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };

    addComment = () =>{
        this.props.navigation.navigate('CommentVoice', {id: this.state.postDetail.id, content: "Voice Audio"});
    };

    render() {
        const that = this;
        return (
            <View style={{ flex: 1}}>
                <View style={{backgroundColor: '#4704a5', width: '100%', height: '13%'}}>
                    <TouchableOpacity style={{ position:'relative', top: '60%', left: 20}} onPress={() => that.backHomeScreen()}>
                        <Image style={{width: 25, height: 25, resizeMode: 'contain'}}
                               source={require('../../../assets/backIcon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.postDetails}>
                        <View>
                            <Text style={{fontSize: 10, color: '#cccccc'}}>{this.state.postDetail.time}</Text>
                        </View>
                        <View>
                            <View style={{width: '100%', flexDirection: 'row',
                                justifyContent: 'center'}}>
                                <TouchableOpacity onPress={() => this.handlePlayPause()}
                                                  style={{justifyContent:'center'}}>
                                    {!this.state.postDetail.play_button && <Ionicons name={'md-play'} size={30} color={'black'}/>}
                                    {this.state.postDetail.play_button && <Ionicons name={'md-pause'} size={30} color={'black'}/>}
                                </TouchableOpacity>

                                <View style={{paddingHorizontal: 5}}>
                                    <Slider
                                        style={{width: Dimensions.get('window').width * .6}}
                                        value={this.state.postDetail.value}
                                        onValueChange={value => this.setState({value: value})}
                                        onSlidingComplete={() => this.seek()}
                                        maximumValue={this.state.postDetail.duration}
                                        minimumValue={0}
                                        thumbTintColor={'black'}
                                        minimumTrackTintColor="#FFFFFF"
                                        maximumTrackTintColor="#000000"
                                    />
                                </View>
                                <View style={{justifyContent:'center'}}>
                                    <Text>{this.millisToMinutesAndSeconds(this.state.postDetail.value)} / {this.millisToMinutesAndSeconds(this.state.postDetail.duration)}</Text>
                                </View>
                            </View>
                        </View>
                        <View style = {styles.featureContainer}>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginHorizontal: 10}}>
                                    <Ionicons
                                        name={'md-thumbs-up'}
                                        size={16}
                                        color={that.state.postDetail.like_button ? '#4704a5' : 'gray'}
                                    />
                                </TouchableOpacity>
                                <Text style = {{color: '#cccccc'}}>{that.state.postDetail.likes}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginHorizontal: 10}}>
                                    <Ionicons
                                        name={'md-chatbubbles'}
                                        size={16}
                                        color={'gray'}/>
                                </TouchableOpacity>
                                <Text style = {{color: '#cccccc'}}>{this.state.comments.length}</Text>
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
                            <TouchableOpacity style={{marginHorizontal: 10}} >
                                <Ionicons
                                    name={'ios-flag'}
                                    size={16}
                                    color={that.state.postDetail.flag_button ? '#4704a5' : 'gray'}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{alignItems: 'center', width: '100%'}}>
                    <View style={{padding: 10}}>
                        <Text style={{color: 'gray'}}>Comments</Text>
                    </View>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    ListEmptyComponent={this._listEmptyComponent()}
                    keyExtractor={(item) => item.id}
                    extraData={this.state}
                    data={this.state.comments}
                    renderItem={({ item, index }) => {
                        return(
                            <View style={{alignItems: 'center', flexDirection:'column'}}>
                                <View style = {styles.commentContainer}>
                                    <View>
                                        <Text style={{fontSize: 10, color: '#cccccc'}}>{item.timestamp}</Text>
                                        <Text style={{marginVertical: 6, fontSize: 14}}>{item.content}</Text>
                                    </View>
                                    <View style = {styles.featureContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                                <Ionicons
                                                    name={'md-thumbs-up'}
                                                    size={16}
                                                    color={item.like_button ? '#4704a5' : 'gray'}
                                                />
                                            </TouchableOpacity>
                                            <Text style = {{color: '#cccccc'}}>{0}</Text>
                                        </View>

                                        <TouchableOpacity style={{marginHorizontal: 10}}>
                                            <Ionicons
                                                name={'ios-share'}
                                                size={16}
                                                color={'gray'}/>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{marginHorizontal: 10}}>
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


                <TouchableWithoutFeedback onPress={() => this.addComment()}>
                    <View style={styles.writeCommentContainer}>
                        <View style={{width: '95%', borderRadius: 3, left: '3%', backgroundColor:'#e4e4e4', height: '60%', justifyContent: 'center'}}>
                            <Text style={{ left: 20, color: '#888888'}}>Want to add a comment?</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    featuresContainer : {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    createCommentButton:{
        width: 100,
        backgroundColor: '#4704a5',
        borderRadius: 20,
        alignItems:'center',
        justifyContent: 'center',
        height: 30,
        marginTop: 20
    },
    commentContainer:{
        width: '95%',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 10,
        padding: 20,
        backgroundColor: 'white',
    },
    detailsContainer:{
        width: '100%',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: 'white',
    },
    postDetails:{
        padding:15,
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
    },
    iconImage:{
        width: 15, height: 15, resizeMode: 'contain'
    },
    featureContainer : {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    writeCommentContainer:{
        position: 'absolute',
        bottom:'0%',
        backgroundColor: 'white',
        width:'100%',
        height: '5%',
        alignContent: 'center',
        justifyContent: 'center'
    },
    commentInput:{
        borderColor: 'black',
        backgroundColor: '#e0e0e0'
    }
});
