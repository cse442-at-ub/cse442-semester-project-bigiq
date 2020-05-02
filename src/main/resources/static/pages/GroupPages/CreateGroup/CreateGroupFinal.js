import * as React from "react";
import { Text, View, FlatList, Switch, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, AsyncStorage } from "react-native";
import {Entypo, Ionicons} from "@expo/vector-icons";
import {RNS3} from "react-native-aws3/src/RNS3";
import {insertGroup} from '../../../fetches/GroupFetch';

export default class CreateGroupFinal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupDes: '',
            groupName: '',
            next: true,
            groupImage: 'https://anonmebucket.s3.us-east-2.amazonaws.com/GroupImage/defaultGroupImage.png',
            screenName: '',
            switchState: false,
            nameLength: 160
        };
    }
    componentDidMount() {
        this.setState({groupName: this.props.route.params.name, groupDes: this.props.route.params.description,
        groupImage: this.props.route.params.image});
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
    addGroup = () =>{
        this.getS3(this.state.groupImage);
        const imageName = 'https://anonmebucket.s3.us-east-2.amazonaws.com/GroupImage/'+ this.state.groupName+'.jpg';
        const s3Image = imageName.toString().replace(" ", "+");
        insertGroup(this.state.screenName, this.state.groupName, this.state.groupDes, s3Image);
        this.props.navigation.navigate('GroupScreen');
    }
    render() {
        const that = this;
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                <View style={styles.topFeed}>
                    <TouchableOpacity onPress={() => that.props.navigation.pop()}>
                        <Ionicons name={'md-arrow-round-back'} size={30} color={'gray'}/>
                    </TouchableOpacity>
                </View>
                <View style={{paddingHorizontal: 20, paddingTop: 40, paddingBottom: 20}}>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>Lets take a look at </Text>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>what we have so far</Text>
                </View>
                <View style={{alignItems: 'center', height: '50%', paddingHorizontal: 20, justifyContent: 'center'}}>
                    <View style={{ width: 176, height: 176}}>
                        <Image style={{width: 176, height: 176, borderRadius: 176/ 2,resizeMode: 'contain'}}
                               source={{uri: that.state.groupImage}}/>
                    </View>
                    <Text style={{fontSize: 20, fontWeight:'bold'}}>{that.state.groupName}</Text>
                    <Text style={{fontSize: 15 }}>{that.state.groupDes}</Text>
                </View>
                <View style={{alignItems: 'center', width: '100%',position: 'absolute', bottom: 20}}>
                    <TouchableOpacity style={{width:"90%", height: 40, backgroundColor: '#4704a5', alignItems: 'center',
                        borderRadius: 30, justifyContent: 'center'}} onPress={() => that.addGroup()}>
                        <Text style={{fontSize: 20, fontWeight:'bold', color: 'white'}}>Create</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
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
});

