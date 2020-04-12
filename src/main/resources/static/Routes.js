import { createStackNavigator } from '@react-navigation/stack';
import Splash from "./pages/SignIn/Splash";
import Verification from "./pages/SignIn/Verification";
import registerName from "./pages/SignIn/registerName";
import { NavigationContainer } from '@react-navigation/native';
import React from "react";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import HomeScreen from "./pages/HomePage/HomeScreen";
import {Ionicons} from "@expo/vector-icons";
import FollowingScreen from "./pages/FollowingPages/FollowingScreen";
import PostScreen from "./pages/HomePage/PostScreen";
import GroupScreen from "./pages/GroupPages/GroupScreen";
import AccountScreen from "./pages/AccountSettings/AccountScreen";
import PostDetailScreen from "./pages/HomePage/PostDetailScreen";
import CommentScreen from "./pages/HomePage/CommentScreen";
import SettingScreen from "./pages/AccountSettings/SettingScreen";

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();

const Tab = createBottomTabNavigator();

function HomePageScreen() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="PostScreen" component={PostScreen} />
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            <Stack.Screen name="CommentScreen" component={CommentScreen} />
        </HomeStack.Navigator>
    )
}
function AccountScreens() {
    return (
        <HomeStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />

        </HomeStack.Navigator>
    )
}
function AppScreen() {
    return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#4704a5',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name="Home" component={HomePageScreen}
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
                <Tab.Screen name="Group" component={GroupScreen}
                            options={{
                                tabBarLabel: 'Group',
                                tabBarIcon: ({color, size}) => (
                                    <Ionicons name={'ios-paper'} size={size} color={color}/>
                                ),
                            }}/>
                <Tab.Screen name="Account" component={AccountScreens}
                            options={{
                                tabBarLabel: 'Account',
                                tabBarIcon: ({color, size}) => (
                                    <Ionicons name={'ios-contact'} size={size} color={color}/>
                                ),
                            }}/>
            </Tab.Navigator>
    )

}
export default function Routes() {
    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    headerLeft: null
                }}
            >
                <Stack.Screen name="Splash" component={Splash} />
                <Stack.Screen name="Verification" component={Verification} />
                <Stack.Screen name="registerName" component={registerName} />
                <Stack.Screen name="AppScreen" component={AppScreen} />

            </Stack.Navigator>
        </NavigationContainer>
    );
}

