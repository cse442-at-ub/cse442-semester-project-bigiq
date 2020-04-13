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

import {fetchInterest} from "../../fetches/PostFetch";
import {Ionicons} from "@expo/vector-icons";

export default class FollowingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            screenName : '',
        };
    }


dataRecent = () =>{
    fetchInterest(this.state.screenName).then( dataAPI => this.setState({data : dataAPI}));

};

componentDidMount() {
    AsyncStorage.getItem('screenName').then((token) => {
        this.setState({
            screenName: token,
        });
    });
    const { navigation } = this.props;
        navigation.addListener("focus", () => {
            this.dataRecent();
    });
}



render() {
    let that = this;
    return (
    <View style = {{flex: 1,}}>
        <View style={styles.topFeed}>
            <View style={styles.Following}>
                <Text style={{color: '#4704a5', fontWeight: 'bold', fontSize: 27}}>Following</Text>
            </View>
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
                                <TouchableOpacity style={{marginHorizontal: 10}} onPress={() =>that.checkLike(index, item.post_id)}>
                                    <Ionicons
                                        name={'md-thumbs-up'}
                                        size={16}
                                        color={item.like_button ? '#4704a5' : 'gray'}
                                    />
                                </TouchableOpacity>
                                <Text style = {{color: '#cccccc'}}>{item.like_ctr}</Text>
                            </View>
                            <View style={{flexDirection:'row'}}>
                                <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.postDetail(item.post_id)}>
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
                )
            }
            }
        />
    </View>
    );}
}


/*
 */








const styles = StyleSheet.create({
Following:{
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
    marginTop : 20,
    width: 400,
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
