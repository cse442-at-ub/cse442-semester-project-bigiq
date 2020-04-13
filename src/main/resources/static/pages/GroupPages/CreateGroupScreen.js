import { Text, View, FlatList, Platform, TouchableOpacity, StyleSheet, Image, TouchableWithoutFeedback, ImageBackground, AsyncStorage } from "react-native";
import * as React from 'react';
import { fetchDataRecent, fetchDataLiked, deletePost } from "../../fetches/PostFetch";
import { Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-gesture-handler";


export default class CreateGroupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupName: '',
        };
    }

    postDetail = (id) => {
        this.props.navigation.navigate('PostDetail', { id })
    };
    postScreenMove = () => {
        this.props.navigation.navigate('PostScreen');
    };
    postGroupName = () => {
        const that = this;
        const getAllPostUrl = "http://" + (Platform.OS === 'android' ? "10.0.2.2" : "192.168.100.156") +
            ":8080/groups/insertGroup";
        fetch(getAllPostUrl, {
            method: 'POST',
            body: JSON.stringify({
               group_name: that.state.groupName 
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        }).then(function(response) {
            if(response.ok){
                that.props.navigation.pop();
            }
        });
    };


    render() {
        let that = this;
        return (
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', backgroundColor: '#4704a5' }}>
                <TextInput style={styles.searchBox} 
                    placeholder="Tap Here To Type Your Group Name"
                    placeholderTextColor='#ffffff'
                    onChangeText={input => this.setState({ groupName: input })}></TextInput>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.searchButton} onPress={() => this.postGroupName()}>
                            <Text style={styles.searchText}>Submit</Text>
                        </TouchableOpacity>
                    </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    searchBox: {
        width: 400,
        height: 50,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        alignItems: 'center',
        marginVertical: 100,
        paddingVertical: 13,
    },
    searchText: {
        // fontSize: 10, color:'white'
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
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
});
