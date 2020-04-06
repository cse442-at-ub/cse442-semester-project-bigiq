import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    FlatList,
    Platform,
    TextInput,
} from 'react-native';
import {fetchPostDetails} from "../fetches/PostDetailFetch";

export default class AccountScreen extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data : []
        }
    }
    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener("focus", () => {
            this.getPostDetail();
        });
    }

    getPostDetail = () =>{
        const postId = this.props.route.params.id;
        fetchPostDetails(postId).then(dataAPI => this.setState({data : dataAPI}));
    };
    backHomeScreen = () =>{
        this.props.navigation.navigate('HomeScreen');
    };
    addComment = (type) =>{
        let id = this.state.data.post_id;
        this.props.navigation.navigate('CommentScreen', {type: type, id: id, content: this.state.data.content});
    };
    render() {
        const that = this;
        return (
            <View style={{ flex: 1, alignItems: 'center'}}>
                <View style={{backgroundColor: '#4704a5', width: '100%', height: 100}}>
                    <TouchableOpacity style={{ position:'relative', top: '60%', left: 20}} onPress={() => that.backHomeScreen()}>
                        <Image style={{width: 25, height: 25, resizeMode: 'contain'}}
                               source={require('../assets/backIcon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.detailsContainer}>
                    <View style={styles.postDetails}>
                        <View>
                            <Text style={{fontSize: 10, color: '#cccccc'}}>{that.state.data.timestampFront}</Text>
                            <Text style={{marginVertical: 6, fontSize: 15}}>{that.state.data.content}</Text>
                        </View>
                        <View style = {styles.featureContainer}>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginHorizontal: 10}}>
                                    <Image style={styles.iconImage}
                                           source={require('../assets/loveIcon.png')}/>
                                </TouchableOpacity>
                                <Text style = {{color: '#cccccc'}}>{that.state.data.like_ctr}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginHorizontal: 10}}>
                                    <Image style={styles.iconImage}
                                           source={require('../assets/commentIcon.png')}/>
                                </TouchableOpacity>
                                <Text style = {{color: '#cccccc'}}>{that.state.data.like_ctr}</Text>
                            </View>
                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                <Image style={styles.iconImage}
                                       source={require('../assets/followIcon.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                <Image style={styles.iconImage}
                                       source={require('../assets/shareIcon.png')}/>
                            </TouchableOpacity>
                            <TouchableOpacity style={{marginHorizontal: 10}}>
                                <Image style={styles.iconImage}
                                       source={require('../assets/flagIcon.png')}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={() => that.addComment('post')}>
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
