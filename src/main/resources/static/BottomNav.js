import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomeScreen from "./pages/HomeScreen";
import PostScreen from "./pages/PostScreen";
import FollowingScreen from "./pages/FollowingScreen";
import AccountScreen from "./pages/AccountScreen";
import GroupScreen from "./pages/GroupScreen";

const Tab = createBottomTabNavigator();

export default class BottomNav extends React.Component {
    render() {
        return (
            <NavigationContainer>
                <Tab.Navigator
                    tabBarOptions={{
                        activeTintColor: '#4704a5',
                        inactiveTintColor: 'gray',
                    }}
                >
                    <Tab.Screen name="Home" component={HomeScreen}
                                options={{
                                    tabBarLabel: 'Home',
                                    tabBarIcon: ({color, size}) => (
                                        <Ionicons name={'ios-home'} size={size} color={color}/>
                                    ),
                                }}/>
                    <Tab.Screen name="Following" component={FollowingScreen}
                                options={{
                                    tabBarLabel: 'Following',
                                    tabBarIcon: ({color, size}) => (
                                        <Ionicons name={'ios-chatboxes'} size={size} color={color}/>
                                    ),
                                }}/>
                    <Tab.Screen name="Post" component={PostScreen}
                                options={{

                                    tabBarIcon: ({color, size}) => (
                                        <Ionicons name={'ios-create'} size={size} color={'blue'}/>
                                    ),
                                }}/>
                    <Tab.Screen name="Group" component={GroupScreen}
                                options={{
                                    tabBarLabel: 'Group',
                                    tabBarIcon: ({color, size}) => (
                                        <Ionicons name={'ios-paper'} size={size} color={color}/>
                                    ),
                                }}/>
                    <Tab.Screen name="Account" component={AccountScreen}
                                options={{
                                    tabBarLabel: 'Account',
                                    tabBarIcon: ({color, size}) => (
                                        <Ionicons name={'ios-contact'} size={size} color={color}/>
                                    ),
                                }}/>
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}
