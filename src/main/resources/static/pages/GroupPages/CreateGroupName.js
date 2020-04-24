import { Text, View, FlatList, Switch, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, AsyncStorage } from "react-native";
import * as React from 'react';
import { fetchDataRecent, fetchDataLiked, deletePost } from "../../fetches/PostFetch";
import { Ionicons } from "@expo/vector-icons";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import {RNS3} from "react-native-aws3/src/RNS3";


export default class CreateGroupName extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            next: true,
            groupImage: "https://anonmebucket.s3.us-east-2.amazonaws.com/GroupImage/GroupImageChange.png",
            screenName: '',
            switchState: false,
            nameLength: 16
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
    };


    fetchCreateGroup = () =>{
        this.getS3(this.state.groupImage);
    };
    changeName = (text) =>{
        const length = text.trim().length;
        if(length !== 0){
            this.setState({ next: false, nameLength: 16 - length})
        }else {
            this.setState({ next: true, nameLength: 16 - length})
        }
        this.setState({ groupName: text });
    };


    goDesScreen = () =>{
        if(this.state.next === false){
            this.props.navigation.navigate('CreateGroupDes', {name: this.state.groupName})
        }
    };

    render() {
        let that = this;
        return (
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                <View style={styles.topFeed}>
                    <View style={styles.postnfeed}>
                        <TouchableOpacity onPress={() => that.props.navigation.navigate('GroupScreen')}>
                            <Ionicons name={'md-arrow-round-back'} size={30} color={'gray'}/>
                        </TouchableOpacity>
                        <TouchableOpacity  activeOpacity={that.state.next ? 1:0.2}
                                           onPress={() => that.goDesScreen()}>
                            <Text style={{fontSize: 20, fontWeight:'bold', color: that.state.next ? '#a973ff':'#4704a5'}}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Create your group name</Text>
                </View>
                <View style={{marginHorizontal: '5%', borderBottomWidth: 1, width: '90%', borderColor: 'gray', paddingVertical:10}}>
                    <View style={{ width: '100%'}}>
                        <TextInput
                            autoFocus={true}
                            placeholder="Enter Group Name"
                            placeholderTextColor='gray'
                            style={ {fontSize: 20, paddingHorizontal: 10}  }
                            maxLength={16}
                            onChangeText={input => this.changeName(input)}>
                        </TextInput>
                    </View>
                </View>
                <View style={{position:'relative', flexDirection: 'row-reverse', padding: 20}}>
                    <Text>{that.state.nameLength}</Text>
                </View>
            </View>
        );
    }
}
/*
                <View style={{width: '100%', paddingVertical: 20}}>
                    <View style={{alignItems: 'center'}}>
                        <View style={{marginBottom: 10}}>
                            <Text>Lets Create A New Group</Text>
                        </View>
                        <TouchableOpacity onPress={() => that._pickImage()}>
                            <Image style={{width: 100, height: 100, borderRadius: 100/ 2,resizeMode: 'contain'}}
                                   source={{uri: that.state.groupImage}}/>
                        </TouchableOpacity>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{color: 'gray', paddingHorizontal: 20}}>Group Name</Text>
                        <View style={{alignItems: 'center', width: '100%'}}>
                            <TextInput
                                placeholder="Enter Group Name"
                                placeholderTextColor='black'
                                maxLength={16}
                                onChangeText={input => this.changeName(input)}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={{marginTop: 10}}>
                        <Text style={{color: 'gray', paddingHorizontal: 20}}>Group Description (160 Character)</Text>
                        <View style={{alignItems: 'center', width: '100%'}}>
                            <TextInput
                                    style={{paddingHorizontal: 40}}
                                       placeholder="Enter Group Description"
                                       placeholderTextColor='black'
                                       multiline = {true}
                                       maxLength={160}
                                       onChangeText={input => this.changeDes(input)}>
                            </TextInput>
                        </View>
                    </View>
                    <View style={{marginTop: 20}}>
                        <Text style={{color: 'gray', paddingHorizontal: 20}}>Make your group invite only</Text>
                        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20}}>
                            <Text>Private</Text>
                            <Switch
                                trackColor={{ false: "#767577", true: "green" }}
                                thumbColor={"white"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => that.setState({'switchState' : !this.state.switchState})}
                                value={that.state.switchState}
                            />
                        </View>
                    </View>
                </View>
 */
const styles = StyleSheet.create({
    topFeed: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        width: '100%',
        height: '13%'
    },
    postnfeed:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
});
