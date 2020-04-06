import React from 'react';
import {
    Image,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
} from 'react-native';
import {fetchPostDetails} from "../fetches/PostDetailFetch";

export default class CommentScreen extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            type: '',
            id: '',
            content: '',
            comment: ''
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        navigation.addListener("focus", () => {
            this.setState({
                type: this.props.route.params.type,
                id: this.props.route.params.id,
                content: this.props.route.params.content
            });
        });
    }

    goBack = () =>{
      this.props.navigation.pop();
    };

    render() {
        return(
            <View style={{flex: 1, backgroundColor: 'white'}}>
                <View style={styles.topContainer}>
                    <TouchableOpacity style={styles.iconContainer} onPress={() => this.goBack()}>
                        <Image style={styles.topIcons}
                               source={require('../assets/exitIcon.png')}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.iconContainer}>
                        <Image style={styles.topIcons}
                               source={require('../assets/uploadIcon.png')}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.commentDetailsContainer}>
                    <Text style={{color: 'gray', paddingBottom: 20}}>Comment on:</Text>
                    <Text style={{fontWeight: "bold", fontSize: 15}}>{this.state.content}</Text>
                </View>
                <View>
                    <TextInput style={styles.nameTagBox}
                               underlineColorAndroid='rgba(0,0,0,0)'
                               placeholder="Write here"
                               placeholderTextColor='gray'
                               multiline = {true}
                               autoFocus={true}
                               onChangeText={input => this.setState({comment: input})}
                               keyboardType='default'
                    />
                </View>
            </View>
        )
    }

}
const styles = StyleSheet.create({
    topContainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        height: '13%',
        borderBottomWidth: 2,
        borderBottomColor: '#e0e0e0',
    },
    topIcons: {
        width: 20, height: 20, resizeMode: 'contain'
    },
    iconContainer:{
        paddingHorizontal: 30,
        paddingTop: '15%'
    },
    commentDetailsContainer:{
        padding: 20
    },

    nameTagBox: {
        width: '100%',
        paddingHorizontal : 16,
        fontSize: 16,
        color : 'black',
        padding: 20,
    },
});
