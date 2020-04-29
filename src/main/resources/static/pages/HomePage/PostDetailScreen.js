import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList, AsyncStorage,
} from 'react-native';
import {flagPost, likePost} from "../../fetches/PostFetch";
import {fetchComments} from "../../fetches/CommentFetch";
import {Ionicons} from "@expo/vector-icons";

export default class PostDetailScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            screenName: '',
            postDetail : [],
            comments: []
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        this.props.navigation.addListener("focus", () => {
            this.getPostDetail();
            this.getAllComments();
        });
    }

    getPostDetail = () =>{
        this.setState({postDetail: this.props.route.params.post});
    };
    getAllComments = () =>{
        const postId = this.props.route.params.post.id;
        fetchComments(postId).then(dataAPI => this.setState({comments : dataAPI}));
    };
    backHomeScreen = () =>{
        this.props.navigation.navigate('HomeScreen');
    };
    addComment = () =>{
        this.props.navigation.navigate('CommentScreen', {id: this.state.postDetail.id, content: this.state.postDetail.content});
    };
    _listEmptyComponent = () => {
        return (
            <View style={{alignItems: 'center', justifyContent: 'center', height: 300}}>
                <Text>Looks like no one commented on this post.</Text>
                <Text>Wanna be the first?</Text>
                <TouchableOpacity onPress={this.addComment}>
                    <View style={styles.createCommentButton}>
                        <Text style={{color: 'white'}}>Comment</Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    };
    fetchLike = (id) =>{
        likePost(id,this.state.screenName).then(res => res.text);
    };
    fetchFlag = (id) =>{
        flagPost(id,this.state.screenName).then(res => res.text);
    };
    like = (id) =>{
        const newArray = this.state.postDetail;
        newArray.like_button = !newArray.like_button;
        if(newArray.like_button === false){
            newArray.likes = newArray.likes - 1;
        }else {
            newArray.likes = newArray.likes + 1;
        }
        this.setState({ postDetail: newArray });
        this.fetchLike(id)
    };
    flag = (id) =>{
        const newArray = this.state.postDetail;
        newArray.flag_button = !newArray.flag_button;
        this.setState({ postDetail: newArray });
        this.fetchFlag(id)
    };
    /*fetchLikeComment = (id) =>{
        likePost(id,this.state.screenName).then(res => res.text);
    };
    fetchFlagComment = (id) =>{
        flagPost(id,this.state.screenName).then(res => res.text);
    };
    checkLikeComment = (index, id) =>{
        const newArray = [...this.state.data];
        newArray[index].like_button = !newArray[index].like_button;
        if(newArray[index].like_button === false){
            newArray[index].like_ctr = newArray[index].like_ctr - 1;
        }else {
            newArray[index].like_ctr = newArray[index].like_ctr + 1;
        }
        this.setState({ data: newArray });
        this.fetchLikeComment(id)
    };
    flagComment = (index, id) =>{
        const newArray = [...this.state.data];
        newArray[index].flag_button = !newArray[index].flag_button;
        this.setState({ data: newArray });
        this.fetchFlagComment(id)
    };*/
    render() {
        const that = this;
        return (
            <View style={{ flex: 1}}>
                <View style={{backgroundColor: '#4704a5', width: '100%', height: '13%'}}>
                    <TouchableOpacity style={{ position:'relative', top: '60%', left: 20}} onPress={() => that.backHomeScreen()}>
                        <Image style={{width: 25, height: 25, resizeMode: 'contain'}}
                               source={require('../../assets/backIcon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.postDetails}>
                        <View>
                            <Text style={{fontSize: 10, color: '#cccccc'}}>{that.state.postDetail.time}</Text>
                            <Text style={{marginVertical: 6, fontSize: 15}}>{that.state.postDetail.content}</Text>
                        </View>
                        <View style = {styles.featureContainer}>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.like(that.state.postDetail.id)}>
                                    <Ionicons
                                        name={'md-thumbs-up'}
                                        size={16}
                                        color={that.state.postDetail.like_button ? '#4704a5' : 'gray'}
                                    />
                                </TouchableOpacity>
                                <Text style = {{color: '#cccccc'}}>{that.state.postDetail.likes}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.addComment()}>
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
                        ListEmptyComponent={this._listEmptyComponent}
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
                                            <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.flagComment(index, item.post_id)}>
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

                
                <TouchableWithoutFeedback onPress={() => that.addComment()}>
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
