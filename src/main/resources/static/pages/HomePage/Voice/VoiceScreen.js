import {
    Text,
    View,
    FlatList,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ImageBackground,
    AsyncStorage,
    Dimensions
} from "react-native";
import * as React from 'react';
import { Slider } from 'react-native';
import { Audio } from 'expo-av';
import {Ionicons, FontAwesome, Entypo} from "@expo/vector-icons";
import {VoiceMostLiked, VoiceMostRecent, likeVoice} from "../../../fetches/VoiceFetch";
import {fetchDataLiked, fetchDataRecent, likePost} from "../../../fetches/PostFetch";
import {get} from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default class VoiceScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [{
                "id": "51543327-9ef4-4301-8615-feaeefecdbfd",
                "content": "https://anonmebucket.s3.us-east-2.amazonaws.com/Audio/2e42ddbb-07a9-4c02-990b-e745f2c545a2.mp3",
                "flag_ctr": 0,
                "likes": 0,
                "like_button": false,
                "flag_button": false,
                "duration": 30100,
                "timestamp": "May 04, 2:05 PM",
                "play_button": false,
                "value": 0,
                "screenName": "dumby1"
            }],
            isPlaying: false,
            playbackInstance: null,
            timeGone: 0,
            currentIndex: 0,
            volume: 1.0,
            isBuffering: false,
            value: 0,
            interval: null,
            feedType: true,
            screenName: ''
        };
    }
    async componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        await Audio.setAudioModeAsync({
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DO_NOT_MIX,
            playThroughEarpieceAndroid: true,
        });
        await this.fetchData();
        this._loadNewPlaybackInstance();
    }
    fetchData = () =>{
        this.state.feedType ? this.getDataRecent(): this.getDataLiked()
    };
    getDataRecent = async () =>{
        await VoiceMostRecent(this.state.screenName).then( dataAPI => {
            this.setState({data : dataAPI})
        });
        this.setState({feedType: true});

    };
    getDataLiked = () =>{
        VoiceMostLiked(this.state.screenName).then( dataAPI => this.setState({data : dataAPI}));
        this.setState({feedType: false})
    };
    async _loadNewPlaybackInstance() {
        const {isPlaying, volume, currentIndex} = this.state;

        try {
            const playbackInstance = new Audio.Sound();
            console.log(this.state.data[currentIndex].content)
            const source = {
                uri: this.state.data[currentIndex].content
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
    onPlaybackStatusUpdate = status => {
        this.setState({
            isBuffering: status.isBuffering
        })
    };
    updateValue = (status, index) =>{
        const array = [...this.state.data];
        array[index].value = status.positionMillis;
        this.setState({ data: array });
    };
    handlePlayPause = async (index) => {
        const { isPlaying, playbackInstance } = this.state;
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync();
        this.setState({
            isPlaying: !isPlaying
        });
        this.flipPlay();
        if(this.state.isPlaying === true){
            this.state.interval = setInterval(() => playbackInstance.getStatusAsync().then(status => this.updateValue(status, index)), 1000);
        }
        if(this.state.isPlaying === false){
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
        const array = [...this.state.data];
        array[this.state.currentIndex].play_button = !array[this.state.currentIndex].play_button;
        this.setState({ data: array });
    };
    playAudio = async (index) => {
        let { playbackInstance } = this.state;
        if(this.state.currentIndex === index){
            this.handlePlayPause(index)
        }
        else{
            if(this.state.isPlaying === true){
                this.setState({isPlaying: false})
                this.flipPlay();
            }
            await playbackInstance.unloadAsync();
            console.log("unloaded")
            this.setState({
                currentIndex: index
            });
            await this._loadNewPlaybackInstance();
            console.log("loaded")
            this.handlePlayPause(index);
        }
    };
    goToPostDetail = (item) =>{
        this.props.navigation.navigate('PostDetailVoice', {post: item})
    };
    async componentWillUnmount() {
        if(this.state.playbackInstance !== null){
            await this.state.playbackInstance.unloadAsync();
        }
    }
    _listEmptyComponent = () =>{
        return(
            <View></View>
        )
    };
    MPTypeColor = () =>{
        if(this.state.feedType === true){
            return <Text style={{fontSize: 12, color:'gray'}}>Most Popular</Text>
        }else {
            return <Text style={{fontSize: 12, color:'#4704a5'}}>Most Popular</Text>
        }
    };
    MRTypeColor = () =>{
        if(this.state.feedType === false){
            return <Text style={{fontSize: 12, color:'gray'}}>Most Recent</Text>
        }else {
            return <Text style={{fontSize: 12, color:'#4704a5'}}>Most Recent</Text>
        }
    };
    fetchLike = (id) =>{
        likeVoice(id,this.state.screenName).then(res => res.text);
    };
    checkLike = (index, id) =>{
        const newArray = [...this.state.data];
        console.log(newArray)
        newArray[index].like_button = !newArray[index].like_button;
        if(newArray[index].like_button === false){
            newArray[index].likes = newArray[index].likes - 1;
        }else {
            newArray[index].likes = newArray[index].likes + 1;
        }
        this.setState({ data: newArray });
        this.fetchLike(id)
    };
    render(){
        return(
            <View style={{flex: 1, flexDirection:'column', backgroundColor: '#gray'}}>
                <View style={{flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={styles.toggleFeedButton} onPress = {() => this.getDataRecent()}>
                        {this.MRTypeColor()}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleFeedButton} onPress = {() => this.getDataLiked()}>
                        {this.MPTypeColor()}
                    </TouchableOpacity>
                </View>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={this._listEmptyComponent}
                    extraData={this.state.data}
                    data={this.state.data}
                    renderItem={({ item, index }) => {
                        return(
                            <View style={{alignItems: 'center', flexDirection:'column', width: '100%'}}>
                                <View style = {styles.postContainer}>
                                    <TouchableWithoutFeedback >
                                        <View>
                                            <Text style={{fontSize: 10, color: '#cccccc'}}>{item.timestamp}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <View>
                                        <View style={{width: '100%', flexDirection: 'row',
                                            justifyContent: 'center'}}>
                                            <TouchableOpacity onPress={() => this.playAudio(index)}
                                            style={{justifyContent:'center'}}>
                                                {!item.play_button && <Ionicons name={'md-play'} size={30} color={'black'}/>}
                                                {item.play_button && <Ionicons name={'md-pause'} size={30} color={'black'}/>}
                                            </TouchableOpacity>
                                            <View style={{paddingHorizontal: 5}}>
                                                <Slider
                                                    style={{width: Dimensions.get('window').width * .6}}
                                                    value={item.value}
                                                    onValueChange={value => this.setState({value: value})}
                                                    onSlidingComplete={() => this.seek()}
                                                    maximumValue={item.duration}
                                                    minimumValue={0}
                                                    thumbTintColor={'black'}
                                                    minimumTrackTintColor="gray"
                                                    maximumTrackTintColor="#000000"
                                                />
                                            </View>
                                            <View style={{justifyContent:'center'}}>
                                                <Text>{this.millisToMinutesAndSeconds(item.value)} /
                                                    {this.millisToMinutesAndSeconds(item.duration)}</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style = {styles.featureContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => this.checkLike(index, item.id)}>
                                                <Ionicons
                                                    name={'md-thumbs-up'}
                                                    size={16}
                                                    color={item.like_button ? '#4704a5' : 'gray'}
                                                />
                                            </TouchableOpacity>
                                            <Text style = {{color: '#cccccc'}}>{item.likes}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => this.goToPostDetail(item)}>
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
            </View>
        )
    }
}



/*
               <View style={{flex: 1}}>

            </View>
 */

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
