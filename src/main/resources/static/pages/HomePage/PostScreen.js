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
                <TouchableOpacity onPress={() => this._pickImage()}>
                    <Ionicons name={'ios-attach'} size={25} color={'gray'}/>
                </TouchableOpacity>
            )
        }else{
            return(
                <View style={{alignItems: 'center'}}>
                    <Text>Attached</Text>
                    <TouchableOpacity onPress={() => this._pickImage()}>
                        <Ionicons name={'ios-attach'} size={20} color={'gray'}/>
                    </TouchableOpacity>
                </View>

            )
        }
    };
    goBack = () => {
        this.props.navigation.pop();
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
                <View style={{paddingVertical: 20, paddingHorizontal: 25}}>
                    <View style = {{flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontSize: 20, fontWeight: "bold", color: '#4704a5'}}>Title</Text>
                        {this.renderAttachment()}
                    </View>
                    <TextInput style={styles.nameTagBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Write here"
                               placeholderTextColor='gray'
                               multiline = {true}
                               maxLength={60}
                               onChangeText={input => this.setState({content: input})}
                               keyboardType='default'
                    />
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
                    <TouchableOpacity style={styles.iconContainer} onPress={() => this.postFetch()}>
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

