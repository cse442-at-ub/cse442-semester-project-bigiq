import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    AsyncStorage,
    TextInput,
    Platform,
    TouchableWithoutFeedback
} from 'react-native';
import {postByAuthor} from "../../fetches/PostFetch";

export default class AccountScreen extends React.Component{


    render() {
        const that = this;
        return(
            <View style={{ flex: 1}}>
                <View style={styles.headerContainer}>
                    <TouchableOpacity style={{ position:'relative', top: '60%', left: 20}} onPress={() => that.props.navigation.pop()}>
                        <Image style={{width: 25, height: 25, resizeMode: 'contain'}}
                               source={require('../../assets/backIcon.png')}/>
                    </TouchableOpacity>
                    <View style={styles.SETTING}>
                        <Text style={{color: 'white', fontWeight: 'bold', fontSize: 20}}>Change Screen Name</Text>
                    </View>
                </View>
                <View style={{width: '100%', alignItems: 'center', marginVertical: 30}}>
                    <Text style={{fontSize: 15}}>What do you want your new screen name to be?</Text>
                </View>
                <View style={{width: '100%', alignItems: 'center', height: 30, justifyContent: 'center'}}>
                    <TextInput style={styles.nameTagBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="New Screen Name"
                               placeholderTextColor='gray'
                               multiline = {true}
                               onChangeText={input => this.setState({content: input})}
                               keyboardType='default'
                               maxLength = {16}
                    />
                </View>
                <View style={{width: '100%', alignItems: 'center', marginTop: 20}}>
                    <TouchableOpacity style={{width: '20%', alignItems: 'center', backgroundColor: '#4704a5', borderRadius: 20}}>
                        <Text style={{color: 'white'}}>Submit</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: '#4704a5',
        width: '100%',
        height: '13%',
    },
    SETTING: {
        alignItems: 'center',
        top: '25%'
    },
});

