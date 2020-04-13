import {
    Text,
    View,
    FlatList,
    Platform,
    TouchableOpacity,
    StyleSheet,
    Image,
    TouchableWithoutFeedback,
    ImageBackground, AsyncStorage
} from "react-native";
import * as React from 'react';
import { fetchGroups } from "../../fetches/GroupFetch";



export default class GroupScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            search: '',
            groupName: '',
        };
    }

    componentDidMount() {
        AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        const { navigation } = this.props;
        navigation.addListener("focus", () => {
            this.dataGroups();
        });
    };

    dataGroups = () => {
        fetchGroups().then(dataAPI => this.setState({ data: dataAPI }));
    };


    render() {
        const { search } = this.state.search;
        let that = this;
        return (
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', backgroundColor: '#4704a5' }}>
                <View style={{ paddingTop: 50, flexDirection: 'column', }}>
                    <View style={styles.searchBox}>
                        <Text style={styles.searchText}>Browsing Page</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.searchButton} onPress={() => that.props.navigation.navigate('CreateGroupScreen')}>
                            <Text style={styles.searchText}>Create Group</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.searchButton} onPress={(search) => this.updateSearch()}>
                            <Text style={styles.searchText}>My Groups</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
                <View>
                    <FlatList
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.group_id}
                        extraData={this.state}
                        data={this.state.data}
                        renderItem={({ item }) => {
                            return (
                                <View style = {styles.postContainer}>
                                    <TouchableWithoutFeedback>
                                        <View>
                                            <Text style={{ fontSize: 10}}>{item.group_name}</Text>
                                             {/* <Text style={{marginVertical: 6, fontSize: 14}}>{item.groupName}</Text> */}
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                            )
                        }}>

                    </FlatList>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    postContainer: {
        width: 370,
        borderRadius: 20,
        shadowOffset: { width: 10, height: 10 },
        shadowColor: 'black',
        shadowOpacity: 1,
        justifyContent: 'center',
        alignContent: 'center',
        marginVertical: 10,
        padding: 20,
        elevation: 3,
        backgroundColor: 'white',
    },
    searchText: {
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
    searchButton: {
        padding: 20,
        marginHorizontal: 10,
        width: 180,
        backgroundColor: '#1c313a',
        borderRadius: 25,
        marginVertical: 10,
        paddingVertical: 13,
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
    searchBox: {
        width: 280,
        backgroundColor: 'rgba(255,255,255,0.3)',
        borderRadius: 25,
        paddingHorizontal: 16,
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 13,
        justifyContent: 'center',
    },

});
