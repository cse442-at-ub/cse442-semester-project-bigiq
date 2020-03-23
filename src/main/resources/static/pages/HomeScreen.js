import {Text, View, FlatList, Platform, TouchableOpacity, StyleSheet, Image} from "react-native";
import * as React from 'react';
import { AsyncStorage } from "react-native";

const getAllPostUrl = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") +
    ":8080/posts/getAllPosts";
const fetchPost = fetch(getAllPostUrl).then(response => response.json());

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            like: 0,
        };
        fetchPost.then( dataAPI => this.setState({data : dataAPI}));

    }
    getData = () =>{
        fetchPost.then( dataAPI => this.setState({data : dataAPI}));
        console.log(this.state.data);
    };

    render() {
        let dataDisplayed = this.state.data;
        let that = this;
        function f() {
            if(dataDisplayed.length === 0){
                return(
                    <TouchableOpacity style={{marginHorizontal: 1}} onPress ={() => that.getData()} >
                        <Text>Refresh</Text>
                    </TouchableOpacity>
                );
                console.log("data:")
                console.log(that.state.data)
            }
        }
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'column', backgroundColor: '#4704a5'}}>
                <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                       source={require('../assets/logo.png')}/>
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.post_id}
                    extraData={this.state}
                    data={this.state.data}
                    renderItem={({ item }) => {
                        let likes = item.like_ctr;

                         return(
                             <View style = {styles.postContainer}>
                                 <Text>{item.timestamp}</Text>
                                 <Text>{item.content}</Text>
                                 <View style = {styles.featureContainer}>
                                     <TouchableOpacity style={{marginHorizontal: 10}}>
                                         <Image style={{width: 20, height: 20, resizeMode: 'contain'}}
                                                source={require('../assets/loveIcon.png')}/>
                                     </TouchableOpacity>
                                     <Text style = {{color: '#cccccc'}}>{likes}</Text>
                                     <TouchableOpacity style={{marginHorizontal: 10}}>
                                         <Image style={{width: 20, height: 20, resizeMode: 'contain'}}
                                                source={require('../assets/commentIcon.png')}/>
                                     </TouchableOpacity>
                                     <Text style = {{color: '#cccccc'}}>{likes}</Text>
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
    featureContainer : {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    }
});
