import {Text, View, FlatList, Platform, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, ImageBackground, AsyncStorage} from "react-native";
import * as React from 'react';
import {fetchDataRecent,fetchDataLiked, deletePost} from "../../fetches/PostFetch";
import {Ionicons} from "@expo/vector-icons";


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
      if(this.state.likeIcon === require('../../assets/loveIcon.png')) {
          this.setState({likeIcon: require('../../assets/loveIconClick.png')})
          this.fetchLike(id)
      } else {
          this.setState({likeIcon: require('../../assets/loveIcon.png')})
      }
    };
    deletePost =(id) =>{
        deletePost(id).then(res => res.text())
    };
    dataRecent = () =>{
        fetchDataRecent(this.state.screenName).then( dataAPI => this.setState({data : dataAPI}));
        this.setState({feedType: true});

    };
    dataLiked = () =>{
        fetchDataLiked(this.state.screenName).then( dataAPI => this.setState({data : dataAPI}));
        this.setState({feedType: false})
    };
    postDetail = (id) =>{
        this.props.navigation.navigate('PostDetail', {id})
    };
    postScreenMove = () => {
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
    };

    checkLike = (bool) =>{
        if(bool === false){
            return(
                <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                       source={require('../../assets/loveIcon.png')}/>
            )
        }else {
            return(
                <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                       source={require('../../assets/loveIconClick.png')}/>
            )
        }
    };
    render() {
        let that = this;
        return (
            <View style={{flex: 1, flexDirection:'column', backgroundColor: '#gray'}}>
                <View style={styles.topFeed}>
                    <View style={styles.postnfeed}>
                        <Text style={{color: '#4704a5', fontWeight: 'bold', fontSize: 27}}>Feed</Text>
                        <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'center'}} onPress={()=>that.postScreenMove()}>
                            <Ionicons name={'ios-create'} size={30} color={'#4704a5'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around' }}>
                    <TouchableOpacity style={styles.toggleFeedButton} onPress = {() => that.dataRecent()}>
                        {that.MRTypeColor()}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.toggleFeedButton} onPress = {() => that.dataLiked()}>
                        {that.MPTypeColor()}
                    </TouchableOpacity>
                </View>
                <View style={{justifyContent: 'center', alignItems: 'center', flexDirection:'column', height: '80%'}}>
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
                                                 {that.checkLike(item.flag_button)}
                                             </TouchableOpacity>
                                             <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                                         </View>
                                         <View style={{flexDirection:'row'}}>
                                             <TouchableOpacity style={{marginHorizontal: 10}}>
                                                 <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                        source={require('../../assets/commentIcon.png')}/>
                                             </TouchableOpacity>
                                             <Text style = {{color: '#cccccc'}}>{0}</Text>
                                         </View>
                                         <TouchableOpacity style={{marginHorizontal: 10}}>
                                             <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                    source={require('../../assets/followIcon.png')}/>
                                         </TouchableOpacity>
                                         <TouchableOpacity style={{marginHorizontal: 10}}>
                                             <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                    source={require('../../assets/shareIcon.png')}/>
                                         </TouchableOpacity>
                                         <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.deletePost(item.post_id)}>
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
    postnfeed:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 30,
        position: 'relative',
        top: '10%'
    },
    topFeed: {
        backgroundColor: 'white',
        width: '100%',
        height: '13%'
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
