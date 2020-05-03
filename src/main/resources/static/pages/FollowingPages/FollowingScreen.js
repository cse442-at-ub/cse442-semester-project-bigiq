import * as React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    FlatList,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';

import {fetchInterest, flagPost, likePost} from "../../fetches/PostFetch";
import {Ionicons} from "@expo/vector-icons";

export default class FollowingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            screenName : '',
        };
        this.dataRecent()
    }


    dataRecent = () =>{
        fetchInterest(this.state.screenName).then( dataAPI => this.setState({data : dataAPI}))
    };

    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        this.props.navigation.addListener("focus", () => {
            this.dataRecent();
        });
    }
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
            newArray.splice(index, 1)
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
    render() {
        let that = this;
        return (
        <View style = {{flex: 1}}>
            <View style={styles.topFeed}>
                <View style={styles.Following}>
                    <Text style={{color: 'white', fontWeight: 'bold', fontSize: 27}}>Following</Text>
                </View>
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
                                <TouchableWithoutFeedback onPress={() => that.props.navigation.navigate('PDFollowingScreen', {post: item})}>
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
                                        <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.props.navigation.navigate('PDFollowingScreen', {post: item})}>
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
                                    <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.flag(index, item.id)}>
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


/*
 */








const styles = StyleSheet.create({
Following:{
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
    marginTop : 20,
    width: '95%',
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 10,
    padding: 20,
    backgroundColor: 'white',
    marginLeft : 5,
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

})
