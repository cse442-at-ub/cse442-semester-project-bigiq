import {Text, View, FlatList, Platform, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, ImageBackground, AsyncStorage} from "react-native";
import * as React from 'react';
import {fetchDataRecent,fetchDataLiked} from "../fetches/HomeScreenFetch";
import {Ionicons} from "@expo/vector-icons";


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
    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        const { navigation } = this.props;
        navigation.addListener("focus", () => {
            this.fetchData();
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
    dataRecent = () =>{
        fetchDataRecent().then( dataAPI => this.setState({data : dataAPI}));
        this.setState({feedType: true});
        console.log("fetchedRecent");
    };
    dataLiked = () =>{
        fetchDataLiked().then( dataAPI => this.setState({data : dataAPI}));
        console.log("fetchedLikes");
        this.setState({feedType: false})
    };
    postDetail = (id) =>{
        this.props.navigation.navigate('PostDetail', {id})
    };
    postScreenMove = () => {
        console.log('pressed');
        this.props.navigation.navigate('PostScreen');
    };
    fetchData = () =>{
        if(this.state.feedType === true){
            this.dataRecent()
        }
        else {
            this.dataLiked();
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


    render() {
        let that = this;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'column', backgroundColor: '#gray'}}>
                <View style={styles.topFeed}>
                    <View style={{flexDirection: 'row', paddingTop: '33%', justifyContent: 'space-between',paddingHorizontal:30}}>
                        <Image style={{width: 50, height: 50, resizeMode: 'contain'}}
                               source={require('../assets/feed.png')}/>
                        <TouchableOpacity style={{padding: 10, flexDirection: 'row', justifyContent: 'center'}} onPress={()=>that.postScreenMove()}>
                            <Ionicons name={'ios-create'} size={30} color={'#4704a5'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity style={styles.toggleFeedButton} onPress = {() => that.dataRecent()}>
                            {that.MRTypeColor()}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.toggleFeedButton} onPress = {() => that.dataLiked()}>
                            {that.MPTypeColor()}
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
                                     <TouchableWithoutFeedback onPress={() => that.postDetail(item.post_id)}>
                                         <View>
                                             <Text style={{fontSize: 10, color: '#cccccc'}}>{item.timestampFront}</Text>
                                             <Text style={{marginVertical: 6, fontSize: 14}}>{item.content}</Text>
                                         </View>
                                     </TouchableWithoutFeedback>
                                     <View style = {styles.featureContainer}>
                                         <View style={{flexDirection:'row'}}>
                                             <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.toggleLikeIcon(item.post_id)}>
                                                 <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                        source={that.state.likeIcon}/>
                                             </TouchableOpacity>
                                             <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                                         </View>
                                         <View style={{flexDirection:'row'}}>
                                             <TouchableOpacity style={{marginHorizontal: 10}}>
                                                 <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                        source={require('../assets/commentIcon.png')}/>
                                             </TouchableOpacity>
                                             <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                                         </View>
                                         <TouchableOpacity style={{marginHorizontal: 10}}>
                                             <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                    source={require('../assets/followIcon.png')}/>
                                         </TouchableOpacity>
                                         <TouchableOpacity style={{marginHorizontal: 10}}>
                                             <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                    source={require('../assets/shareIcon.png')}/>
                                         </TouchableOpacity>
                                         <TouchableOpacity style={{marginHorizontal: 10}}>
                                             <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                    source={require('../assets/flagIcon.png')}/>
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
    topFeed: {
        backgroundColor: 'white',
        width: '100%',
        height: '25%'
    },
    postContainer: {
        width: 400,
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        marginBottom: 10,
        padding: 20,
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
