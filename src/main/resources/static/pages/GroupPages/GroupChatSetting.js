import * as React from "react";
import { Text, View, FlatList, Switch, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, AsyncStorage } from "react-native";
import {Ionicons, MaterialIcons, Entypo, AntDesign, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {Avatar} from "react-native-elements";



export default class CreateGroupFinal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            admin: false,
            mute: false
        };
    }
    componentDidMount() {
        this.setState({group: this.props.route.params.group});
    }
    notificationComp = () =>{
        if(this.state.mute === false){
            return(
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.setState({mute: !this.state.mute})}>
                    <View style={{justifyContent: 'center'}}>
                        <Ionicons name={'ios-notifications'} size={35} color={'black'}/>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{ fontSize: 15, color: 'black' }}>Mute</Text>
                    </View>
                </TouchableOpacity>
            )
        }else {
            return (
                <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.setState({mute: !this.state.mute})}>
                    <View style={{justifyContent: 'center'}}>
                        <Ionicons name={'md-notifications-off'} size={35} color={'black'}/>
                    </View>
                    <View style={{justifyContent: 'center'}}>
                        <Text style={{ fontSize: 15, color: 'black' }}>Mute</Text>
                    </View>
                </TouchableOpacity>
            )
        }
    };

    render() {
        const that = this;
        return(
          <View style={{flex: 1, backgroundColor: 'white'}}>
              <View style={styles.topFeed}>
                  <TouchableOpacity style={{marginRight: 15}} onPress={() => this.props.navigation.pop()}>
                      <Ionicons name={'ios-arrow-back'} size={30} color={'gray'}/>
                  </TouchableOpacity>
              </View>
              <View style={{width: '100%', alignItems: 'center'}}>
                  <Avatar size={120} rounded source= {{uri:this.state.group.image}}/>
                  <View style={{paddingVertical: 20}}>
                      <Text style={{fontWeight: 'bold', fontSize: 20}}>{this.state.group.group_name}</Text>
                  </View>
                  <View style={{paddingBottom: 20}}>
                      <Text style={{ fontSize: 15}}>{this.state.group.group_desc}</Text>
                  </View>
              </View>
              <View style={{padding: 20}}>
                  <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>Admin/Owner</Text>
              </View>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 20}} activeOpacity={this.state.admin ? .2: 1}>
                  <View style={{justifyContent: 'center', paddingHorizontal: 20}}>
                      <MaterialIcons name={'description'} size={30} color={this.state.admin ? 'black': 'gray'}/>
                  </View>
                  <View style={{justifyContent: 'center',  width: '80%'}}>
                      <Text style={this.state.admin ? styles.adminText: styles.nonAdminText}>Change Description</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 20}} activeOpacity={this.state.admin ? .2: 1}>
                  <View style={{justifyContent: 'center', paddingHorizontal: 20}}>
                      <AntDesign name={'picture'} size={30} color={this.state.admin ? 'black': 'gray'}/>
                  </View>
                  <View style={{justifyContent: 'center',  width: '80%'}}>
                      <Text style={this.state.admin ? styles.adminText: styles.nonAdminText}>Change Group Image</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row'}} activeOpacity={this.state.admin ? .2: 1}>
                  <View style={{justifyContent: 'center', paddingHorizontal: 20}}>
                      <Entypo name={'remove-user'} size={30} color={this.state.admin ? 'black': 'gray'}/>
                  </View>
                  <View style={{justifyContent: 'center',  width: '80%'}}>
                      <Text style={this.state.admin ? styles.adminText: styles.nonAdminText}>Remove Member</Text>
                  </View>
              </TouchableOpacity>
              <View style={{padding: 20}}>
                  <Text style={{fontWeight: 'bold', fontSize: 15, color: 'black'}}>Privilege</Text>
              </View>
              <View style={{flexDirection: 'row'}}>
                  <View style={{justifyContent: 'center', paddingHorizontal: 20}}>
                      <FontAwesome5 name={'user-shield'} size={30} color={ 'brown'}/>
                  </View>
                  <View style={{justifyContent: 'center',  paddingRight: 50}}>
                      <Text style={{ fontSize: 15, color: 'black' }}>Become an Admin</Text>
                  </View>
                  <View style={{justifyContent: 'center'}}>
                      <Text style={{ fontSize: 15, color: 'gray' }}>(Gold Only)</Text>
                  </View>
              </View>
              <View style={{position: 'absolute', bottom: 0, width: '100%', height: '12%', borderTopWidth: 0.5, paddingVertical: 10}}>
                  <View style={{flexDirection: 'row', paddingHorizontal: 20, justifyContent: 'space-between'}}>
                      <TouchableOpacity style={{alignItems: 'center'}}>
                          <View style={{justifyContent: 'center'}}>
                              <AntDesign name={'sharealt'} size={35} color={'black'}/>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                              <Text style={{ fontSize: 15, color: 'black' }}>Share</Text>
                          </View>
                      </TouchableOpacity>
                      {this.notificationComp()}
                      <TouchableOpacity style={{alignItems: 'center'}}>
                          <View style={{justifyContent: 'center'}}>
                              <MaterialCommunityIcons name={'account-group-outline'} size={35} color={ 'black'}/>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                              <Text style={{ fontSize: 15, color: 'black' }}>Members</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={{alignItems: 'center'}}>
                          <View style={{justifyContent: 'center'}}>
                              <Ionicons name={'md-exit'} size={35} color={ 'red'}/>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                              <Text style={{ fontSize: 15, color: 'red' }}>Leave </Text>
                          </View>
                      </TouchableOpacity>
                  </View>

              </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    adminText:{
        fontSize: 15, color: 'black'
    },
    nonAdminText:{
        fontSize: 15, color: 'gray'
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
