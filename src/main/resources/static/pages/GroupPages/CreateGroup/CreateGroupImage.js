import * as React from "react";
import { Text, View, FlatList, Switch, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, AsyncStorage } from "react-native";
import {Ionicons, Entypo} from "@expo/vector-icons";
import {pickImage} from "../../../fetches/ImageAccess";


export default class CreateGroupImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
            groupImage: "https://anonmebucket.s3.us-east-2.amazonaws.com/GroupImage/defaultGroupImage.png",
            screenName: '',
            switchState: false,
            nameLength: 16
        };
    }
    _pickImage = async () => {
        pickImage().then(r => {
            if(r.uri !== undefined){
                this.setState({groupImage: r.uri})
            }
        })
    };

    goFinalScreen = () =>{
        this.props.navigation.navigate('CreateGroupFinal', {image: this.state.groupImage, name: this.props.route.params.name,
        description: this.props.route.params.description})
    };
    render() {
        let that = this;
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                <View style={styles.topFeed}>
                    <TouchableOpacity onPress={() => that.props.navigation.pop()}>
                        <Ionicons name={'md-arrow-round-back'} size={30} color={'gray'}/>
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Let's pick a group image</Text>
                    <Text style={{fontSize: 13, color: 'gray'}}>You can always leave it to the default image</Text>
                </View>
                <View style={{alignItems: 'center'}}>
                    <View style={{ width: 176, height: 176}}>
                        <Image style={{width: 176, height: 176, borderRadius: 176/ 2,resizeMode: 'contain'}}
                               source={{uri: that.state.groupImage}}/>
                        <View style={{flexDirection: 'row-reverse', bottom: '30%'}}>
                            <View style={styles.cameraBackground}>
                                <Entypo name={'camera'} size={40} color={'gray'} onPress={() => that._pickImage()}/>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{alignItems: 'center', width: '100%',position: 'absolute', bottom: 20}}>
                    <TouchableOpacity style={{width:"90%", height: 40, backgroundColor: '#4704a5', alignItems: 'center',
                        borderRadius: 30, justifyContent: 'center'}} onPress={() => that.goFinalScreen()}>
                        <Text style={{fontSize: 20, fontWeight:'bold', color: 'white'}}>Continue</Text>
                    </TouchableOpacity>
                </View>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    cameraBackground:{
        backgroundColor: 'white',
        borderWidth: .5,
        width: 60,
        height: 60,
        alignItems:'center',
        borderRadius:60/2,
        justifyContent: 'center'
    },
    topFeed: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        width: '100%',
        height: '10%'
    },
});
