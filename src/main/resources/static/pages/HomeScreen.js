import {
    Text,
    View,
    FlatList,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Image,
    Keyboard,
    ImageBackground
} from "react-native";
import * as React from 'react';



export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [],
            like: 0,
            feedType: true,
            likeIcon: require('../assets/loveIcon.png')
        };
    }
    toggleLikeIcon = () =>{
      if(this.state.likeIcon === require('../assets/loveIcon.png')) {
          this.setState({likeIcon: require('../assets/loveIconClick.png')})
      } else {
          this.setState({likeIcon: require('../assets/loveIcon.png')})
      }
    };
    fetchDataRecent = () =>{
        const getAllPostUrl = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") +
            ":8080/posts/getAllPosts";
        fetch(getAllPostUrl).then(response => response.json()).then( dataAPI => this.setState({data : dataAPI}));
        this.setState({feedType: true});
    };
    fetchDataLiked = () =>{
        const getAllPostUrl = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") +
            ":8080/posts/mostLikedPosts";
        fetch(getAllPostUrl).then(response => response.json()).then( dataAPI => this.setState({data : dataAPI}));
        this.setState({feedType: false})
    };
    componentDidMount() {
        const { navigation } = this.props;
        this.focusListener = navigation.addListener("focus", () => {
            if(this.state.feedType === true){
                this.fetchDataRecent();
            }
            else {
                this.fetchDataLiked();
            }
            console.log(this.state.data.length)
        });
    }
    componentWillUnmount() {
        this.focusListener.remove();
    }
    render() {
        let dataDisplayed = this.state.data;
        let that = this;
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection:'column', backgroundColor: '#4704a5'}}>
                <ImageBackground source={require('../assets/background.png')}
                                 style={{width: '100%', height: '100%',justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
                    <Image style={{width: 100, height: 100, resizeMode: 'contain'}}
                           source={require('../assets/logo.png')}/>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around', }}>
                        <TouchableOpacity style={styles.button} onPress = {() => that.fetchDataRecent()}>
                            <Text style={styles.loginButton}>Most Recent</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress = {() => that.fetchDataLiked()}>
                            <Text style={styles.loginButton}>Most Popular</Text>
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
                                     <Text>{item.timestamp}</Text>
                                     <Text>{item.content}</Text>
                                     <View style = {styles.featureContainer}>
                                         <TouchableOpacity style={{marginHorizontal: 10}} onPress={() => that.toggleLikeIcon()}>
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
    featureContainer : {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    }
});
