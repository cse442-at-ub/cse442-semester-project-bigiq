import { Text, View, FlatList, KeyboardAvoidingView, Dimensions , TouchableOpacity, StyleSheet, Platform,Image, TextInput, TouchableWithoutFeedback, AsyncStorage, Keyboard } from "react-native";
import * as React from "react";
import {Ionicons, SimpleLineIcons, Entypo} from "@expo/vector-icons";
import {Avatar} from 'react-native-elements'
import {getMessages, addMessage} from "../../fetches/GroupFetch";
import { GiftedChat, Bubble, Send, InputToolbar,  } from 'react-native-gifted-chat'
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import UUIDGenerator from 'react-native-uuid-generator';
import * as ImagePicker from "expo-image-picker";

export default class GroupChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            typing: false,
            screenName: '',
            data: [],
            keyboard: false,
            keyboardHeight: 0,
            phoneNumber: '',
        };
    }
    async componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        AsyncStorage.getItem('phoneNumber').then((token) => {
            this.setState({
                phoneNumber: token,
            });
        });
        await this.setState({group: this.props.route.params.group});
        await this.getMessages();
    }

    getMessages = async () =>{
        let data = [];
        await getMessages(this.state.group.group_name, this.state.screenName).then(r => data = r);
        const array = [];
        for (let userObject of data) {
            const object = JSON.parse(JSON.stringify({
                _id: userObject.messageId,
                text: userObject.text,
                createdAt: userObject.createdAt,
                user: {
                    _id: userObject.user.phone_number,
                    name: userObject.user.screen_name,
                },
            }));
            array.unshift(object)
        }
        this.setState({data: array})

    };

    onSend(messages = []) {
        this.setState(previousState => ({
            data: GiftedChat.append(previousState.data, messages),
        }));
        addMessage(this.state.screenName, this.state.group.group_name,  messages[0].text)
    }
    renderBubble = props => {
        return(
            <Bubble
                {...props}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#4704a5'
                    }
                }}
            />
        )
    };
    renderSend = props => {
        return (
            <Send
                {...props}
            >
                <View>
                    <Ionicons name={'ios-send'} size={30} color={'#4704a5'}/>
                </View>

            </Send>
        );
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
        this.getPermissionAsync();
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ groupImage: result.uri });
            }

        } catch (E) {
            console.log(E);
        }
    };
    _pickVideo = async () => {
        this.getPermissionAsync();
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ groupImage: result.uri });
            }

        } catch (E) {
            console.log(E);
        }
    };
    renderAccessory = () => {

        if(this.state.typing === false){
            return (
                <View style={{paddingLeft: 20, paddingRight:75, flexDirection: 'row', justifyContent: 'space-between'}}>
                    <TouchableOpacity onPress={this._pickImage}>
                        <Entypo name={'image'} size={25} color={'gray'}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this._pickVideo}>
                        <Entypo name={'folder-video'} size={25} color={'gray'}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name={'camera'} size={25} color={'gray'}/>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Entypo name={'mic'} size={25} color={'gray'}/>
                    </TouchableOpacity>

                </View>

            );
        }else {
            return null
        }
    };
    customtInputToolbar = props => {
        return (
            <InputToolbar
                {...props}
                containerStyle={{
                    backgroundColor: "white",
                    borderTopColor: "#E8E8E8",
                    padding: 8
                }}

            >
            </InputToolbar>

        );
    };
    groupSetting = () =>{
        this.props.navigation.navigate('GroupChatSetting', {group: this.state.group});
    };
    render() {
        const that = this;
        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.topFeed}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={{marginRight: 15}} onPress={() => that.props.navigation.pop()}>
                                <Ionicons name={'ios-arrow-back'} size={30} color={'gray'}/>
                            </TouchableOpacity>
                            <View style={{marginRight: 15}}>
                                <Avatar size="small" rounded source= {{uri:this.state.group.image}}/>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                                <Text>{that.state.group.group_name}</Text>
                            </View>
                        </View>
                        <TouchableOpacity onPress={() => this.groupSetting()}>
                            <SimpleLineIcons name={'settings'} size={25} color={'gray'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <GiftedChat
                    messages={this.state.data}
                    onSend={messages => this.onSend(messages)}
                    renderUsernameOnMessage={true}
                    renderBubble={this.renderBubble}
                    showUserAvatar
                    renderSend={this.renderSend}
                    renderInputToolbar={this.customtInputToolbar}
                    minInputToolbarHeight={60}
                    renderAccessory={this.renderAccessory}
                    isTyping={true}
                    user={{
                        _id: this.state.phoneNumber,
                        name: this.state.screenName,
                    }}
                />
            </View>
        );
    }
}

const windowHeight10 = Dimensions.get('window').height * .10;
const styles = StyleSheet.create({

    writeContainer:{
        flexDirection:'row',
        justifyContent: 'space-between',
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        borderWidth: 2
    },
    phoneNumberBox: {
        borderRadius: 25,
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        backgroundColor: 'gray',
        width: '85%',
        height: '80%'
    },
    topFeed: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 2,
        width: '100%',
        height: windowHeight10
    },
});
