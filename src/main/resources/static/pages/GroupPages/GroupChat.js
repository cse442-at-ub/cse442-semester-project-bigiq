import { Text, View, FlatList, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Image, TextInput, TouchableWithoutFeedback, AsyncStorage, Keyboard } from "react-native";
import * as React from "react";
import {Ionicons, SimpleLineIcons, MaterialCommunityIcons} from "@expo/vector-icons";
import {Avatar} from 'react-native-elements'

export default class GroupChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            data: [{"message" : "sadadsf"},
            {"message" : "sadadsf"},
            {"message" : "sadadsf"},
            {"message" : "sadadsf"},
            {"message" : "sadadsf"},
            {"message" : "sadadsf"},
            {"message" : "sadadsf"},
            {"message" : "hrdtfghdfh"},
            {"message" : "rgmkwejngkjwe"},
            {"message" : "ergsdfgsdgsd"},
            {"message" : "sadadsitgsjndgjkndff"},
            {"message" : "sgfdsdgd"},
            {"message" : "dfgsdgsd"},
        ],
            offset: 64
        };
    }
    componentDidMount() {
        this.setState({group: this.props.route.params.group});
    }
    
    render() {
        const that = this;
        return(
            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
                <View style={styles.topFeed}>
                  <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={{marginRight: 15}} onPress={() => that.props.navigation.pop()}>
                            <Ionicons name={'ios-arrow-back'} size={30} color={'gray'}/>
                        </TouchableOpacity>
                       <View style={{marginRight: 15}}>
                            <Avatar size="small" rounded source= {{uri:this.state.group.image}}/>
                       </View>
                       <View style={{justifyContent: 'center'}}>
                            <Text>{that.state.group.group_name}</Text>
                       </View>
                    </View>
                        <TouchableOpacity>
                            <SimpleLineIcons name={'settings'} size={25}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <KeyboardAvoidingView behavior={'height'} keyboardVerticalOffset = {10} >
                    <View style={{height:'84%'}}>
                        <FlatList
                            ref={ref => this.flatList = ref}
                            showsHorizontalScrollIndicator={false}
                            keyExtractor={(item) => item.id}
                            data={this.state.data}
                            ListEmptyComponent={this.empty}
                            onContentSizeChange={() => this.flatList.scrollToEnd({animated: true})}
                            onLayout={() => this.flatList.scrollToEnd({animated: true})}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableWithoutFeedback>
                                        <View style={{height: 30, marginHorizontal: 30}}>
                                        <Text>{item.message}</Text>
                                        </View>
                                    
                                    </TouchableWithoutFeedback>
                                )
                            }}
                            />
                    </View>
                </KeyboardAvoidingView>
                <KeyboardAvoidingView behavior={'position'} keyboardVerticalOffset = {-200}>
                    <View style={styles.writeContainer}>
                        <View style = {{flexDirection: 'row'}}>
                            <View style={{justifyContent: 'center', marginRight: 10}}>
                                <MaterialCommunityIcons name={'sticker-emoji'} size={25} color= {'gray'}/>
                            </View>
                        
                            <TextInput style={styles.phoneNumberBox}
                                    placeholder="Send a Message"
                                    placeholderTextColor='gray'
                                            
                            />
                        </View>
                        
                    </View>
                </KeyboardAvoidingView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    writeContainer:{
        borderTopWidth: 1,
        borderTopColor: 'gray',
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        flexDirection:'row',
        justifyContent: 'space-between',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        height: 40
    },
    phoneNumberBox: {
        borderRadius: 25,
        fontSize: 16,
        color: '#ffffff',
        textAlign: 'center',
    },
    topFeed: {
        backgroundColor: 'white',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 2,
        width: '100%',
        height: '10%'
    },
});
