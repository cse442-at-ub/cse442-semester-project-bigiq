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
import {SearchBar, ListItem, Avatar} from 'react-native-elements'
import { fetchGroups } from "../../fetches/GroupFetch";
import {Ionicons} from "@expo/vector-icons";
import {RNS3} from "react-native-aws3/src/RNS3";


export default class GroupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search: '',
            groupName: '',
            groupDes: '',
            isVisible: false,
            groupImage: "https://anonmebucket.s3.us-east-2.amazonaws.com/GroupImage/defaultGroupImage.png",
        };
    }


    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        this.props.navigation.addListener("focus", () => {
            this.dataGroups();
        });
    };
    dataGroups = () =>{
        fetchGroups(this.state.screenName).then( dataAPI => this.setState({data : dataAPI}))
    }

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
                        keyExtractor={(item) => item.id}
                        data={this.state.data}
                        ListEmptyComponent={this.empty}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <TouchableWithoutFeedback>
                                    <View style={styles.cardContainer}>
                                        <View style={{paddingVertical: 5, flexDirection: 'row'}}>
                                        <Avatar
                                            size="medium"
                                            rounded
                                            source= {{uri:item.image}}
                                            />
                                            <View style={{marginTop: 15, marginLeft: 10}}>
                                                <Text style={{color: 'black', fontWeight: 'bold', fontSize: 15}}>{item.group_name}</Text>
                                                <Text style={{color: 'gray', fontSize: 10, textAlign: 'center'}}>{item.memberCount} Members</Text>
                                            </View>
                                        </View>
                                    
                                        <View>
                                            <Text style={{textAlign: 'center',color: 'black', fontSize: 10}}>{item.group_desc}</Text>
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
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
            subtitle={item.group_desc}
            leftAvatar={{ source: { uri: item.image }, size:"medium"}}
            bottomDivider
            titleStyle={styles.listTitle}
            onPress={() => this.props.navigation.navigate('GroupChat',{group: item})}
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
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateGroupName')}>
                            <Ionicons name={'ios-add'} size={40} color={'white'}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{width: '100%', height: '90%'}}>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
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
        width: 250,
        height: 80,
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
