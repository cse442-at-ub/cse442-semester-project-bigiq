import {
    Text,
    View,
    FlatList,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TextInput, AsyncStorage
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as React from 'react';
import {SearchBar, ListItem, Overlay} from 'react-native-elements'
import { fetchGroups } from "../../fetches/GroupFetch";
import {Ionicons} from "@expo/vector-icons";
import {RNS3} from "react-native-aws3/src/RNS3";


export default class GroupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [{group_name: "Video Games", group_id: "2"},
                {group_name: "Soccer", group_id: "12"},
                {group_name: "Video Games", group_id: "22"},
                {group_name: "Video Games", group_id: "23"},
                {group_name: "Video Games", group_id: "222"},],
            search: '',
            groupName: '',
            groupDes: '',
            isVisible: false,
            groupImage: "https://anonmebucket.s3.us-east-2.amazonaws.com/GroupImage/defaultGroupImage.png",
        };
    }

    getS3 = (uri) =>{
        const file = {
            uri: uri,
            name: this.state.groupName + '.jpg',
            type: 'image/jpeg'
        };
        const option = {
            keyPrefix: 'GroupImage/',
            bucket: 'anonmebucket',
            region: 'us-east-2',
            accessKey: 'AKIATKMN22MYCP5X3E7K',
            secretKey: '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',
            successActionStatus: 201
        };
        RNS3.put(file, option).then(response =>{
            if(response.status !== 201){
                throw new Error('Failed to upload image ', response)
            }
            console.log(response.body)
        })

    };

    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        this.getPermissionAsync();
        /*this.props.navigation.addListener("focus", () => {
            this.dataGroups();
        });*/
    };

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    };
    _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ image: result.uri });
            }
        } catch (E) {
            console.log(E);
        }
    };
    fetchCreateGroup = () =>{
        this.getS3(this.state.groupImage);
    };
    headerComponent = () =>{
        return (
            <View style={{width: '100%'}}>
                <View>
                    <SearchBar
                        placeholder="Search"
                        round
                        lightTheme
                        containerStyle={styles.searchContainer}
                    />
                </View>
                <View style={{paddingHorizontal:20, paddingVertical: 10}}>
                    <Text style={{color: '#4704a5', fontWeight: 'bold', fontSize: 20}}>Trending</Text>
                </View>
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.group_id}
                        data={this.state.data}
                        ListEmptyComponent={this.empty}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <View style={styles.cardContainer}>
                                    <View style={{paddingVertical: 10}}>
                                        <Image style={{width: 75, height: 75, resizeMode: 'contain'}}
                                               source={require('../../assets/avatars/2.png')}/>
                                    </View>
                                    <View>
                                        <Text style={{color: '#4704a5', fontWeight: 'bold', fontSize: 15}}>{item.group_name}</Text>
                                    </View>
                                    <View>
                                        <Text style={{color: 'green', fontWeight: 'bold', fontSize: 10}}>Members: {item.group_id}</Text>
                                    </View>
                                </View>
                            )
                        }}/>
                </View>
            </View>

        );
    };
    empty = () =>{
      return(
          <View></View>
      )
    };
    renderItem = ({ item }) => (
        <ListItem
            containerStyle = {styles.listItemContainer}
            title={item.group_name}
            subtitle={item.group_name}
            leftAvatar={{source: require('../../assets/avatars/4.png'),
                size:"medium"}}
            bottomDivider
            titleStyle={styles.listTitle}
            chevron
        />
    );
    render() {
        let that = this;
        return (
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', backgroundColor: 'white' }}>
                <View style={styles.topFeed}>
                    <View style={styles.postnfeed}>
                        <Image style={{width: 40, height: 40, resizeMode: 'contain'}}
                               source={require('../../assets/avatars/1.png')}/>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 27}}>Groups</Text>
                        <TouchableOpacity onPress={() => this.setState({ isVisible: true })}>
                            <Ionicons name={'ios-add'} size={40} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Overlay
                    onBackdropPress={() => this.setState({ isVisible: false })}
                    width="60%"
                    height="40%"
                    overlayStyle={styles.overlayContainer}
                    isVisible={this.state.isVisible}>
                    <View style={{width: '100%', alignItems: 'center', paddingVertical: 20}}>
                        <View style={{marginBottom: 10}}>
                            <Text>Lets Create A New Group</Text>
                        </View>
                        <TouchableOpacity onPress={() => that._pickImage()}>
                            <Image style={{width: 100, height: 100, borderRadius: 100/ 2,resizeMode: 'contain'}}
                                   source={{uri: that.state.groupImage}}/>
                        </TouchableOpacity>
                        <View style={{marginTop: 10, alignItems: 'center'}}>
                            <Text>Group Name</Text>
                            <TextInput style={styles.searchBox}
                                       placeholder="Enter Group Name"
                                       placeholderTextColor='gray'
                                       onChangeText={input => this.setState({ groupName: input })}>
                            </TextInput>
                        </View>
                        <View style={{marginTop: 10, alignItems: 'center'}}>
                            <Text>Group Description (160 Character)</Text>
                            <TextInput style={styles.searchBox}
                                       placeholder="Enter Group Description"
                                       placeholderTextColor='gray'
                                       multiline = {true}
                                       maxLength={160}
                                       onChangeText={input => this.setState({ groupDes: input })}>
                            </TextInput>
                        </View>
                        <TouchableOpacity style={{backgroundColor:'#4704a5', width: 70, alignItems: 'center',
                            borderRadius: 20, marginTop: 20, height: 20, justifyContent: 'center'}}>
                            <Text style={{color:'white'}}>Submit</Text>
                        </TouchableOpacity>
                    </View>

                </Overlay>
                <View style={{width: '100%', height: '90%'}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.group_id}
                        ListHeaderComponent={this.headerComponent()}
                        ListEmptyComponent={this.empty}
                        data={this.state.data}
                        renderItem= {this.renderItem}/>
                </View>
            </View>
        );
    }
}
/*

 */
const styles = StyleSheet.create({
    overlayContainer:{
        marginBottom: 200
    },
    searchButton: {
        padding: 0,
        marginHorizontal: 10,
        width: 180,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: -20,
        paddingVertical: 13,
    },
    listTitle:{
      fontWeight: 'bold'
    },
    listItemContainer:{
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },
    postnfeed:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
    cardContainer:{
        width: 150,
        height: 150,
        borderRadius: 20,
        alignItems: 'center',
        backgroundColor: 'white',

    },
    topFeed: {
        backgroundColor: '#4704a5',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        width: '100%',
        height: '10%'
    },

    group: {
        padding: 20,
        marginHorizontal: 10,
        width: 360,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
    },
    featureContainer: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between'
    },
    searchContainer: {
        backgroundColor: 'white',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
    },

});
