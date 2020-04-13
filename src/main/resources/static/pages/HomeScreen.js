import {
    Text,
    View,
    FlatList,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ImageBackground, AsyncStorage
} from "react-native";
import * as React from 'react';



export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            like: 0,
            feedType: true,
            likeIcon: require('../assets/loveIcon.png'),
            screenName: ''
        };
    }
    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
    };
    toggleLikeIcon = (id) =>{
      if(this.state.likeIcon === require('../assets/loveIcon.png')) {
          this.setState({likeIcon: require('../assets/loveIconClick.png')})
          this.fetchLike(id)
      } else {
          this.setState({likeIcon: require('../assets/loveIcon.png')})
      }
    };
    fetchDataRecent = () =>{
        const getAllPostUrl = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") +
            ":8080/posts/recentPosts";
        fetch(getAllPostUrl).then(response => response.json()).then( dataAPI => this.setState({data : dataAPI}));
        console.log("fetchedRecent");
        this.setState({feedType: true});
    };
    fetchDataLiked = () =>{
        const getAllPostUrl = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") +
            ":8080/posts/mostLikedPosts";
        fetch(getAllPostUrl).then(response => response.json()).then( dataAPI => this.setState({data : dataAPI}));
        console.log("fetchedLikes");
        this.setState({feedType: false})
    };
    fetchData = () =>{
        if(this.state.feedType === true){
            this.fetchDataRecent();
        }
        else {
            this.fetchDataLiked();
        }
    };
    fetchLike = (id) =>{
        const getAllPostUrl = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") +
            ":8080/posts/LikePost?id=" +id + "&user=" + this.state.screenName;
        fetch(getAllPostUrl, {
            method: 'POST',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then(response => response.json()).then( () => this.fetchData());
        console.log("added Like");
    };
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("focus", () => {
            this.fetchData();
        });
    }

    componentWillUnmount() {
        this.focusListener.remove();
    }
    render() {
        let that = this;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'column', backgroundColor: '#4704a5'}}>
                <ImageBackground source={require('../assets/background.png')}
                                 style={{width: '100%', height: '100%',justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
                    <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                           source={require('../assets/logo.png')}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', }}>
                        <TouchableOpacity style={styles.toggleFeedButton} onPress = {() => that.fetchDataRecent()}>
                            <Text style={styles.toggleFeedText}>Most Recent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toggleFeedButton} onPress = {() => that.fetchDataLiked()}>
                            <Text style={styles.toggleFeedText}>Most Popular</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.post_id}
                        extraData={this.state}
                        data={this.state.data}
                        renderItem={({ item }) => {
                             return(
                                 <View style = {styles.postContainer}>
                                     <TouchableWithoutFeedback>
                                         <View>
                                             <Text style={{fontSize: 10, color: '#cccccc'}}>{item.timestampFront}</Text>
                                             <Text style={{marginVertical: 6}}>{item.content}</Text>
                                         </View>
                                     </TouchableWithoutFeedback>
                                     <View style = {styles.featureContainer}>
                                         <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.toggleLikeIcon(item.post_id)}>
                                             <Image style={{width: 20, height: 20, resizeMode: 'contain'}}
                                                    source={that.state.likeIcon}/>
                                         </TouchableOpacity>
                                         <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                                         <TouchableOpacity style={{marginHorizontal: 10}}>
                                             <Image style={{width: 20, height: 20, resizeMode: 'contain'}}
                                                    source={require('../assets/commentIcon.png')}/>
                                         </TouchableOpacity>
                                         <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                                         <TouchableOpacity style={{marginHorizontal: 10}}>
                                             <Image style={{width: 20, height: 20, resizeMode: 'contain'}}
                                                    source={require('../assets/followIcon.png')}/>
                                         </TouchableOpacity>
                                         <TouchableOpacity style={{marginHorizontal: 10}}>
                                             <Image style={{width: 20, height: 20, resizeMode: 'contain'}}
                                                    source={require('../assets/shareIcon.png')}/>
                                         </TouchableOpacity>
                                     </View>
                                 </View>

                             )
                            }
                        }
                    />
                </ImageBackground>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    postContainer: {
        width: 370,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 10,
        padding: 20,
        elevation: 3,
        backgroundColor: 'white',
    },
    toggleFeedText:{
        fontSize: 10, color:'white'
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
