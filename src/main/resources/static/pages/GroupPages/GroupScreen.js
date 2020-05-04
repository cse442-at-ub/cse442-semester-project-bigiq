import {
    Text,
    View,
    FlatList,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    TextInput, AsyncStorage, Dimensions
} from "react-native";
import * as React from 'react';
import {SearchBar, ListItem, Avatar} from 'react-native-elements'
import { fetchTrending, searchGroups, fetchUserGroups, insertUser } from "../../fetches/GroupFetch";
import {Ionicons} from "@expo/vector-icons";


export default class GroupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            trendingSearchData: [],
            trendingSearchD: false,
            search: '',
            groupName: '',
            groupDes: '',
            isVisible: false,
            groupImage: "https://anonmebucket.s3.us-east-2.amazonaws.com/GroupImage/defaultGroupImage.png",
            isSearching: false,

        };
    }


    async componentDidMount() {
        await AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        this.props.navigation.addListener("focus", () => {
            this.fetchUserGroups();
            this.fetchTrendingGroups();
        });
    };
    fetchUserGroups = async () =>{
        await fetchUserGroups(this.state.screenName).then( dataAPI => this.setState({data : dataAPI}))
    };
    fetchTrendingGroups = async () =>{
        await fetchTrending(this.state.screenName).then( dataAPI => this.setState({trendingSearchData : dataAPI}))
    };
    updateSearch = search => {
        this.setState({ search });
        this.searchFetch();
    };
    searchFetch = () =>{
        searchGroups(this.state.search).then(dataAPI => this.setState({trendingSearchData : dataAPI}))
    };

    trendingOrSearch =() =>{
        if(this.state.search.length === 0){
            this.fetchTrendingGroups();
            return(
                <View style={{paddingHorizontal:20, paddingVertical: 10}}>
                    <Text style={{color: '#4704a5', fontWeight: 'bold', fontSize: 20}}>Trending</Text>
                </View>
            );
        }else {
            return (
                <View style={{paddingHorizontal:20, paddingVertical: 10}}>
                    <Text style={{color: '#4704a5', fontWeight: 'bold', fontSize: 20}}>Search</Text>
                </View>
            )
        }
    };
    emptySearch = () =>{
        return(
            <View style={{alignItems:'center', width: Dimensions.get('window').width}}>
                <Text>Sorry but we can't find that group.</Text>
                <Text>How about you create one?</Text>
            </View>
        )
    };
    addUserGroup = (item) =>{
        const baseURL = "http://" + (Platform.OS === 'android' ? "10.0.2.2":"192.168.100.156");
        const URL = baseURL + ":8080/groups/addUser?screenname=" + this.state.screenName + "&group_name=" + item.group_name;
        const that = this;
        fetch(URL, {
            method: "POST"
        }).then(function(response) {
            if(response.ok){
                const joined = that.state.data.concat(item);
                that.setState({ data: joined })
            }
        });
    };
    headerComponent = () =>{
        return (
            <View style={{width: '100%'}}>
                <View>
                    <SearchBar
                        placeholder="Search"
                        round
                        lightTheme
                        containerStyle={styles.searchContainer}
                        showLoading={this.state.isSearching}
                        onChangeText={this.updateSearch}
                        value={this.state.search}
                    />
                </View>
                {this.trendingOrSearch()}
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.id}
                        data={this.state.trendingSearchData}
                        extraData={this.state.trendingSearchData}
                        ListEmptyComponent={this.emptySearch()}
                        horizontal={true}
                        renderItem={({ item }) => {
                            return (
                                <View>
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
                                    <View style={{width: '100%', alignItems: 'center'}}>
                                        <TouchableOpacity style={{backgroundColor: '#4704a5', width: '30%', height: 20,
                                            justifyContent: 'center', alignItems: 'center', borderRadius: 20}}
                                                onPress={() => this.addUserGroup(item)}>
                                            <View style={{flexDirection: 'row'}}>
                                                <Text style={{color: 'white', marginRight: 5}}>Join</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        }}/>

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
            onPress={() => this.props.navigation.dangerouslyGetParent().
                dangerouslyGetParent().navigate('GroupChat',{group: item})}
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
                        ListEmptyComponent={this.empty()}
                        data={this.state.data}
                        extraData={this.state.data}
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
        height: 100,
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
