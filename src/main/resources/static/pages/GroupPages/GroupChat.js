import { Text, View, FlatList, Switch, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, AsyncStorage } from "react-native";
import * as React from "react";
import {Ionicons} from "@expo/vector-icons";

export default class GroupChat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: '',
        };
    }
    componentDidMount() {
        this.setState({groupId: this.props.route.params.id});
    }
    render() {
        return(
          <View style={{ flex: 1, flexDirection: 'column', backgroundColor: 'white'}}>
              <View style={styles.topFeed}>
                  <TouchableOpacity onPress={() => that.props.navigation.pop()}>
                      <Ionicons name={'md-arrow-round-back'} size={30} color={'gray'}/>
                  </TouchableOpacity>
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
});
