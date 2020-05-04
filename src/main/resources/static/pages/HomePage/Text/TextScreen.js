import {Text, View, FlatList, Platform, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, ImageBackground, AsyncStorage} from "react-native";
import * as React from 'react';
import {fetchDataRecent,fetchDataLiked, deletePost, likePost, flagPost} from "../../../fetches/PostFetch";
import {Ionicons} from "@expo/vector-icons";

export default class TextScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            like: 0,
            feedType: true,
            likeIcon: require('../../../assets/loveIcon.png'),
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
        this.props.navigation.addListener("focus", () => {
            this.fetchData();
        });
    };

    dataRecent = () =>{
        fetchDataRecent(this.state.screenName).then( dataAPI => this.setState({data : dataAPI}));
        this.setState({feedType: true});

    };
    dataLiked = () =>{
        fetchDataLiked(this.state.screenName).then( dataAPI => this.setState({data : dataAPI}));
        this.setState({feedType: false})
    };
    postDetail = (item) =>{
        this.props.navigation.navigate('PostDetail', {post: item})
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
    _listEmptyComponent = () =>{
        return(
            <View></View>
        )
    };

    render(){
        let that = this;
        return(
            <View style={{flex: 1, flexDirection:'column', backgroundColor: '#gray'}}>
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
                    keyExtractor={(item) => item.id}
                    ListEmptyComponent={this._listEmptyComponent}
                    extraData={this.state.data}
                    data={this.state.data}
                    renderItem={({ item, index }) => {
                            return(
                            <View style={{alignItems: 'center', flexDirection:'column', width: '100%'}}>
                                <View style = {styles.postContainer}>
                                    <TouchableWithoutFeedback onPress={() => that.postDetail(item)}>
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
                                            <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.postDetail(item.id)}>
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
