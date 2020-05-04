import * as React from 'react';
import {
    KeyboardAvoidingView, Platform, StyleSheet, Text,
    TextInput, TouchableOpacity, View, Keyboard, Image, AsyncStorage
} from 'react-native'
import {Ionicons, FontAwesome, MaterialCommunityIcons} from "@expo/vector-icons";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

export default class PostScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            screenName: '',
            textInput: '',
            video: '',
            textVoice: false,
            picked: false
        }
    }
    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
    };
    postFetch = () => {
        const url = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") + ":8080/posts/insertPost";
        const that = this;

        fetch(url, {
            method: "POST",
            body: JSON.stringify( {
                author: that.state.screenName,
                content: that.state.content
            } ),
            headers: new Headers({'content-type': 'application/json'}),
        }).then(function(response) {
            if(response.ok){
                that.goBack()
            }
        });
    };
    voiceFetch = () => {
        const url = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156") + ":8080/audio/insertAudio";
        const fileURL = this.state.video;
        //const cleanURL = fileURL.replace("file://", "");
        const photo = {
            uri: fileURL,
            type: 'video/mp4',
            name: 'file.mp4',
        };

        const body = new FormData();
        body.append('file', photo);
        body.append('screenname', this.state.screenName);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.send(body);
        this.goBack()
        /*fetch(url, {
            method: "POST",
            body: JSON.stringify( {
                author: that.state.screenName,
                content: that.state.content
            } ),
            headers: {
                'Content-Type': 'multipart/form-data;'
            },
        }).then(function(response) {
            if(response.ok){
                that.goBack()
            }
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
        this.getPermissionAsync();
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Videos,
                allowsEditing: true,
                quality: 1,
            });
            if (!result.cancelled) {
                this.setState({ video: result.uri , picked : true});
            }

        } catch (E) {
            console.log(E);
        }
    };
    renderAttachment = () =>{
        if(this.state.picked === false){
            return(
                <TouchableOpacity onPress={() => this._pickImage()} style={{alignItems: 'center', width: '100%', paddingVertical: 40}}>
                    <Ionicons name={'ios-attach'} size={70} color={'gray'}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <View style={{alignItems: 'center', width: '100%', paddingVertical: 40}}>
                    <Text>Attached</Text>
                    <TouchableOpacity onPress={() => this._pickImage()}>
                        <Ionicons name={'ios-attach'} size={50} color={'gray'}/>
                    </TouchableOpacity>
                </View>

            )
        }
    };
    goBack = () => {
        this.props.navigation.pop();
    };
    postRequest = () =>{
        this.state.textVoice ? this.voiceFetch(): this.postFetch()
    };
    textVoiceRender = () =>{
        if(this.state.textVoice === false){
            return(
                <View style={{paddingVertical: 20, paddingHorizontal: 25}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, fontWeight: "bold", color: '#4704a5'}}>Let's Start a Conversation</Text>
                    </View>
                    <TextInput style={styles.nameTagBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Write here"
                               placeholderTextColor='gray'
                               multiline = {true}
                               onChangeText={input => this.setState({content: input})}
                               keyboardType='default'
                    />
                </View>
            )
        }else {
            return (
                <View style={{alignItems:'center', justifyContent: 'center'}}>
                    <View style = {{ justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{fontSize: 20, fontWeight: "bold", color: '#4704a5'}}>Pick an Video</Text>
                        {this.renderAttachment()}
                    </View>

                </View>
            );
        }
    };
    render() {
        const that = this;
        return (
            <View style={{flex: 1, position:'relative', backgroundColor: 'white'}}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => this.goBack()}>
                        <FontAwesome name={'close'} size={30} color={'#4704a5'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => this.setState({textVoice: !this.state.textVoice})}>
                        <MaterialCommunityIcons name={'voice'} size={25} color={this.state.textVoice ? '#4704a5':'gray'}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => this.postRequest()}>
                        <FontAwesome name={'send'} size={20} color={'#4704a5'}/>
                    </TouchableOpacity>
                </View>
                {this.textVoiceRender()}
            </View>

        );
    }
}
    const styles = StyleSheet.create({
        topContainer:{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '100%',
            height: '10%',
            borderBottomWidth: 2,
            borderBottomColor: '#e0e0e0',
        },
        iconContainer:{
            paddingHorizontal: 30,
            justifyContent: 'flex-end',
            paddingBottom: 7
        },
    });

