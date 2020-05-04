import * as React from "react";
import {
    Text,
    View,
    FlatList,
    Switch,
    TouchableOpacity,
    StyleSheet,
    Image,
    TextInput,
    ImageBackground,
    AsyncStorage,
    Dimensions,
    Alert
} from "react-native";
import {Ionicons, MaterialIcons, Entypo, AntDesign, FontAwesome5, MaterialCommunityIcons} from "@expo/vector-icons";
import {Avatar, Overlay} from "react-native-elements";
import {leaveGroup, checkAdmin, changeImage, changeDesc} from "../../fetches/GroupFetch";
import { NavigationActions } from 'react-navigation';
import {pickImage} from "../../fetches/ImageAccess";
import {getS3} from "../../fetches/S3";


export default class CreateGroupFinal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            group: [],
            admin: false,
            mute: false,
            changedImage: '',
            screenName: '',
            refreshImage: 0,
            overlayDesc: false,
            overlayRemove: false,
            desc: '',
            descLength: 160,
            removeMem : '',
        };
    }
    async componentDidMount() {
        await this.setState({group: this.props.route.params.group});
        await AsyncStorage.getItem('screenName').then((token) => {
            this.setState({
                screenName: token,
            });
        });
        this.checkAdmin();
    }
    leaveAlert = () =>{
        Alert.alert(
            "Are You Sure?",
            "Do you want to leave " + this.state.group.group_name + " ?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => this.leaveGroup()}
            ],
            { cancelable: false }
        );
    };
    checkAdmin = () =>{
        checkAdmin(this.state.screenName, this.state.group.group_name).then(bool => this.setState({admin: bool}))
    };
    leaveGroup =() =>{
        leaveGroup(this.state.screenName, this.state.group.group_name);
        this.props.navigation.navigate('AppScreen', {}, NavigationActions.navigate({ routeName: 'Group' }))
    };
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
    changeGroupImage = async () =>{
        if(this.state.admin === true){
            const groupName = this.state.group.group_name;
            await pickImage().then(r => this.setState({changedImage: r.uri}));
            if(this.state.changedImage !== undefined){
                await getS3(this.state.changedImage, groupName);
                const imageName = 'https://anonmebucket.s3.us-east-2.amazonaws.com/GroupImage/'+ groupName +'.jpg';
                changeImage(imageName, groupName);
                this.setState({refreshImage: this.state.refreshImage + 1})
            }
        }
    };
    toggleOverlayDes = () =>{
        if(this.state.admin === true){
            this.setState({overlayDesc: !this.state.overlayDesc})
        }
    };
    toggleOverlayRemove = () =>{
        if(this.state.admin === true){
            this.setState({overlayRemove: !this.state.overlayRemove})
        }
    };
    changeDesc = () =>{
        if(this.state.admin === true){
            changeDesc(this.state.group.group_name, this.state.desc);
            const newArray = this.state.group;
            newArray.group_desc = this.state.desc;
            this.setState({ group: newArray });
            this.toggleOverlayDes();
        }
    };
    removeMember = () =>{
        if(this.state.admin === true){
            leaveGroup(this.state.removeMem, this.state.group.group_name);
        }
    };
    render() {
        return(
          <View style={{flex: 1, backgroundColor: 'white'}}>
              <View style={styles.topFeed}>
                  <TouchableOpacity style={{marginRight: 15}} onPress={() => this.props.navigation.pop()}>
                      <Ionicons name={'ios-arrow-back'} size={30} color={'gray'}/>
                  </TouchableOpacity>
              </View>
              <View style={{width: '100%', alignItems: 'center'}}>
                  <Avatar key= {this.state.refreshImage} size={120} rounded source= {{uri:this.state.group.image}}/>
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
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 20}} activeOpacity={this.state.admin ? .2: 1}
              onPress={() => this.toggleOverlayDes()}>
                  <View style={{justifyContent: 'center', paddingHorizontal: 20}}>
                      <MaterialIcons name={'description'} size={30} color={this.state.admin ? 'black': 'gray'}/>
                  </View>
                  <View style={{justifyContent: 'center',  width: '80%'}}>
                      <Text style={this.state.admin ? styles.adminText: styles.nonAdminText}>Change Description</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row', paddingBottom: 20}} activeOpacity={this.state.admin ? .2: 1}
                                onPress={() => this.changeGroupImage()}>
                  <View style={{justifyContent: 'center', paddingHorizontal: 20}}>
                      <AntDesign name={'picture'} size={30} color={this.state.admin ? 'black': 'gray'}/>
                  </View>
                  <View style={{justifyContent: 'center',  width: '80%'}}>
                      <Text style={this.state.admin ? styles.adminText: styles.nonAdminText}>Change Group Image</Text>
                  </View>
              </TouchableOpacity>
              <TouchableOpacity style={{flexDirection: 'row'}} activeOpacity={this.state.admin ? .2: 1}
                    onPress={() => this.toggleOverlayRemove()}>
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
                      <TouchableOpacity style={{alignItems: 'center'}}
                                        onPress={() => this.props.navigation.navigate('GroupMember',{group: this.state.group})}>
                          <View style={{justifyContent: 'center'}}>
                              <MaterialCommunityIcons name={'account-group-outline'} size={35} color={ 'black'}/>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                              <Text style={{ fontSize: 15, color: 'black' }}>Members</Text>
                          </View>
                      </TouchableOpacity>
                      <TouchableOpacity style={{alignItems: 'center'}} onPress={() => this.leaveAlert()}>
                          <View style={{justifyContent: 'center'}}>
                              <Ionicons name={'md-exit'} size={35} color={ 'red'}/>
                          </View>
                          <View style={{justifyContent: 'center'}}>
                              <Text style={{ fontSize: 15, color: 'red' }}>Leave</Text>
                          </View>
                      </TouchableOpacity>
                  </View>
              </View>
              <Overlay isVisible={this.state.overlayDesc}
                       onBackdropPress={() => this.toggleOverlayDes()}
                       overlayStyle={styles.overlay}>
                  <View>
                      <View style={{width: '100%', alignItems: 'center'}}>
                          <Text style={{fontSize: 18}}>Change Your Group Description</Text>
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
                                  onChangeText={input => this.setState({desc: input, descLength: 160 - input.length})}>
                              </TextInput>
                          </View>
                      </View>
                      <View style={{position:'relative', flexDirection: 'row-reverse', padding: 20}}>
                          <Text>{this.state.descLength}</Text>
                      </View>
                      <View style={{width: '100%', alignItems: 'center', position: 'absolute', bottom: 20, height: '10%'}}>
                          <TouchableOpacity style={{backgroundColor: '#4704a5', alignItems: 'center', justifyContent: 'center',
                              width: '40%', borderRadius: 20, height: '100%'}}
                                            onPress={() => this.changeDesc()}>
                              <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
                          </TouchableOpacity>
                      </View>
                  </View>
              </Overlay>
              <Overlay isVisible={this.state.overlayRemove}
                       onBackdropPress={() => this.toggleOverlayRemove()}
                       overlayStyle={styles.overlayRemove}>
                  <View style={{width: '100%', alignItems: 'center'}}>
                      <Text style={{fontSize: 18}}>Enter the Screen Name of the</Text>
                      <Text style={{fontSize: 18}}>Person you want to remove</Text>
                  </View>
                  <View style={{marginHorizontal: '5%', borderBottomWidth: 1, width: '90%', borderColor: 'gray', paddingTop: 40, paddingBottom: 10}}>
                      <View style={{ width: '100%'}}>
                          <TextInput
                              autoFocus={true}
                              placeholder="Screen Name"
                              placeholderTextColor='gray'
                              style={ {fontSize: 15, paddingHorizontal: 10}  }
                              maxLength={20}
                              onChangeText={input => this.setState({removeMem: input})}>
                          </TextInput>
                      </View>
                  </View>
                  <View style={{width: '100%', alignItems: 'center', position: 'absolute', bottom: 20, height: '10%'}}>
                      <TouchableOpacity style={{backgroundColor: '#4704a5', alignItems: 'center', justifyContent: 'center',
                          width: '40%', borderRadius: 20, height: '100%'}}
                                        onPress={() => this.removeMember()}>
                          <Text style={{color: 'white', fontWeight: 'bold'}}>Submit</Text>
                      </TouchableOpacity>
                  </View>
              </Overlay>
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
    overlay:{
        height: '40%',
        width: '80%',
        position: 'absolute',
        top: '10%'
    },
    overlayRemove:{
        height: '25%',
        width: '80%',
        position: 'absolute',
        top: '10%'
    }
});
