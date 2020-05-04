import * as React from "react";
import { Text, View, FlatList, Switch, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, AsyncStorage } from "react-native";
import {Ionicons} from "@expo/vector-icons";

export default class CreateGroupDes extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupDes: '',
            next: true,
            groupImage: "https://anonmebucket.s3.us-east-2.amazonaws.com/GroupImage/GroupImageChange.png",
            screenName: '',
            switchState: false,
            nameLength: 160
        };
    }
    changeDes = (text) =>{
        const length = text.trim().length;
        if(length !== 0){
            this.setState({ next: false, nameLength: 160 - length})
        }else {
            this.setState({ next: true, nameLength: 160 - length})
        }
        this.setState({ groupDes: text });
    };
    goImageScreen = () =>{
        if(this.state.next === false){
            this.props.navigation.navigate('CreateGroupImage', {name: this.props.route.params.name,
                description: this.state.groupDes})
        }
    };

    render() {
        let that = this;
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                <View style={styles.topFeed}>
                    <View style={styles.postnfeed}>
                        <TouchableOpacity onPress={() => that.props.navigation.pop()}>
                            <Ionicons name={'md-arrow-round-back'} size={30} color={'gray'}/>
                        </TouchableOpacity>
                        <TouchableOpacity  activeOpacity={that.state.next ? 1:0.2}
                                           onPress={() => that.goImageScreen()}>
                            <Text style={{fontSize: 20, fontWeight:'bold', color: that.state.next ? '#a973ff':'#4704a5'}}>Next</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Add a description</Text>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>for your group</Text>
                    <Text style={{fontSize: 13, color: 'gray'}}>Moderators and Admins can always change the description</Text>
                </View>
                <View style={{marginHorizontal: '5%', borderBottomWidth: 1, width: '90%', borderColor: 'gray', paddingVertical:10}}>
                    <View style={{ width: '100%'}}>
                        <TextInput
                            autoFocus={true}
                            placeholder="Describe your group"
                            placeholderTextColor='gray'
                            style={ {fontSize: 18, paddingHorizontal: 10}  }
                            maxLength={160}
                            multiline = {true}
                            onChangeText={input => this.changeDes(input)}>
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

const styles = StyleSheet.create({
    topFeed: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        width: '100%',
        height: '10%'
    },
    postnfeed:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        position: 'relative',
    },
});
