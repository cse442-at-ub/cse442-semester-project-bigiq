import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
} from 'react-native';
import {fetchPostDetails} from "../../fetches/PostFetch";
import {fetchComments} from "../../fetches/CommentFetch";

export default class PostDetailScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            postDetail : [],
            comments: []
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener("focus", () => {
            this.getPostDetail();
            this.getAllComments();
        });
    }

    getPostDetail = () =>{
        const postId = this.props.route.params.id;
        fetchPostDetails(postId).then(dataAPI => this.setState({postDetail : dataAPI}));
    };
    getAllComments = () =>{
        const postId = this.props.route.params.id;
        fetchComments(postId).then(dataAPI => this.setState({comments : dataAPI}));
    };
    backHomeScreen = () =>{
        this.props.navigation.navigate('HomeScreen');
    };
    addComment = () =>{
        this.props.navigation.navigate('CommentScreen', {id: this.state.postDetail.post_id, content: this.state.postDetail.content});
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

    render() {
        const that = this;
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
                <View style={{backgroundColor: '#4704a5', width: '100%', height: '13%'}}>
                    <TouchableOpacity style={{ position:'relative', top: '60%', left: 20}} onPress={() => that.backHomeScreen()}>
                        <Image style={{width: 25, height: 25, resizeMode: 'contain'}}
                               source={require('../../assets/backIcon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.postDetails}>
                        <View>
                            <Text style={{fontSize: 10, color: '#cccccc'}}>{that.state.postDetail.timestampFront}</Text>
                            <Text style={{marginVertical: 6, fontSize: 15}}>{that.state.postDetail.content}</Text>
                        </View>
                        <View style = {styles.featureContainer}>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginHorizontal: 10}}>
                                    <Image style={styles.iconImage}
                                           source={require('../../assets/loveIcon.png')}/>
                                </TouchableOpacity>
                                <Text style = {{color: '#cccccc'}}>{that.state.postDetail.like_ctr}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginHorizontal: 10}}>
                                    <Image style={styles.iconImage}
                                           source={require('../../assets/commentIcon.png')}/>
                                </TouchableOpacity>
                                <Text style = {{color: '#cccccc'}}>{that.state.postDetail.like_ctr}</Text>
                            </View>
                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                <Image style={styles.iconImage}
                                       source={require('../../assets/followIcon.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                <Image style={styles.iconImage}
                                       source={require('../../assets/shareIcon.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                <Image style={styles.iconImage}
                                       source={require('../../assets/flagIcon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{alignItems: 'center', height: '68%'}}>
                    <View style={{padding: 10}}>
                        <Text style={{color: 'gray'}}>Comments</Text>
                    </View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={this._listEmptyComponent}
                        keyExtractor={(item) => item.comment_id}
                        extraData={this.state}
                        data={this.state.comments}
                        renderItem={({ item }) => {
                            return(
                                <View style = {styles.commentContainer}>
                                    <View>
                                        <Text style={{fontSize: 10, color: '#cccccc'}}>{item.timestamp_front}</Text>
                                        <Text style={{marginVertical: 6, fontSize: 14}}>{item.content}</Text>
                                    </View>
                                    <View style = {styles.featuresContainer}>
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                                <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                       source={require('../../assets/loveIcon.png')}/>
                                            </TouchableOpacity>
                                            <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                                        </View>
                                        <View style={{flexDirection:'row'}}>
                                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                                <Image style={{width: 15, height: 15, resizeMode: 'contain'}}
                                                       source={require('../../assets/commentIcon.png')}/>
                                            </TouchableOpacity>
                                            <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                                        </View>
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
        width: 400,
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
