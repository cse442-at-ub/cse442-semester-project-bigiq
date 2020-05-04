import * as React from "react";
import { Text, View, FlatList, Switch, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, AsyncStorage } from "react-native";
import {Ionicons} from "@expo/vector-icons";
import {getAllUsers} from "../../fetches/GroupFetch";

export default class GroupMember extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            groupMembers: [],
            screenName: ''
        };
    }
    async componentDidMount() {
        await this.setState({group: this.props.route.params.group});
        await AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        await this.getMemberList()
    }
    getMemberList = async () =>{
        await getAllUsers(this.state.group_name, this.state.screenName).then(data => this.setState({groupMembers: data}));
        console.log(this.state.groupMembers)
    };

    render() {
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                <View style={styles.topFeed}>
                    <View style={styles.postnfeed}>
                        <TouchableOpacity onPress={() => this.props.navigation.pop()}>
                            <Ionicons name={'md-arrow-round-back'} size={30} color={'gray'}/>
                        </TouchableOpacity>
                        <View style={{justifyContent: 'center' , paddingLeft: 40}}>
                            <Text style={{fontSize: 20, fontWeight:'bold'}}>Members</Text>
                        </View>
                    </View>
                </View>
                <View style={{paddingHorizontal: 20, paddingVertical: 30}}>
                    <Text>{this.state.groupMembers.length} Members</Text>
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
        position: 'relative',
    },
});
