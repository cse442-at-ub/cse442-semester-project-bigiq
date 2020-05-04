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
import PostDetailScreen from "./pages/HomePage/Text/PostDetailScreen";
import CommentScreen from "./pages/HomePage/Text/CommentScreen";
import NameScreen from "./pages/AccountSettings/NameScreen";
import SettingScreen from "./pages/AccountSettings/SettingScreen";
import CreateGroupName from "./pages/GroupPages/CreateGroup/CreateGroupName";
import PDFollowingScreen from "./pages/FollowingPages/PDFollowingScreen";
import CSFollowingScreen from "./pages/FollowingPages/CommentScreen";
import CreateGroupDes from "./pages/GroupPages/CreateGroup/CreateGroupDes";
import CreateGroupFinal from "./pages/GroupPages/CreateGroup/CreateGroupFinal";
import GroupChat from "./pages/GroupPages/GroupChat";
import CreateGroupImage from "./pages/GroupPages/CreateGroup/CreateGroupImage";
import GroupChatSetting from "./pages/GroupPages/GroupChatSetting";
import GroupMember from "./pages/GroupPages/GroupMember";
import PostDetailVoice from "./pages/HomePage/Voice/PostDetailVoice";
import CommentVoice from "./pages/HomePage/Voice/CommentVoice";
import RewardScreen from "./pages/AccountSettings/RewardScreen";

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const AccountStack = createStackNavigator();
const FollowingStack = createStackNavigator();
const GroupStack = createStackNavigator();
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
            <Stack.Screen name="PostDetailVoice" component={PostDetailVoice} />
            <Stack.Screen name="CommentScreen" component={CommentScreen} />
            <Stack.Screen name="CommentVoice" component={CommentVoice} />
        </HomeStack.Navigator>
    )
}
function AccountScreens() {
    return (
        <AccountStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="AccountScreen" component={AccountScreen} />
            <Stack.Screen name="SettingScreen" component={SettingScreen} />
            <Stack.Screen name="NameScreen" component={NameScreen} />
            <Stack.Screen name="RewardScreen" component={RewardScreen} />

        </AccountStack.Navigator>
    )
}
function FollowingScreens() {
    return (
        <FollowingStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="FollowingScreen" component={FollowingScreen} />
            <Stack.Screen name="PDFollowingScreen" component={PDFollowingScreen}/>
            <Stack.Screen name="CSFollowingScreen" component={CSFollowingScreen}/>
        </FollowingStack.Navigator>
    )
}
function GroupScreens() {
    return (
        <GroupStack.Navigator
            screenOptions={{
                headerShown: false
            }}
        >
            <Stack.Screen name="GroupScreen" component={GroupScreen} />
            <Stack.Screen name="CreateGroupName" component={CreateGroupName} />
            <Stack.Screen name="CreateGroupDes" component={CreateGroupDes} />
            <Stack.Screen name="CreateGroupImage" component={CreateGroupImage} />
            <Stack.Screen name="CreateGroupFinal" component={CreateGroupFinal} />

        </GroupStack.Navigator>
    )
}
function AppScreen() {
    return (
            <Tab.Navigator
                tabBarOptions={{
                    activeTintColor: '#4704a5',
                    inactiveTintColor: 'gray',
                    keyboardHidesTabBar: true,
                }}
            >
                <Tab.Screen name="Home" component={HomePageScreen}
                            options={{
                                tabBarLabel: 'Home',
                                tabBarIcon: ({color, size}) => (
                                    <Ionicons name={'ios-home'} size={size} color={color}/>
                                ),
                            }}/>
                <Tab.Screen name="Following" component={FollowingScreens}
                            options={{
                                tabBarLabel: 'Following',
                                tabBarIcon: ({color, size}) => (
                                    <Ionicons name={'ios-paper'} size={size} color={color}/>
                                ),
                            }}/>
                <Tab.Screen name="Group" component={GroupScreens}
                            options={{
                                tabBarLabel: 'Group',
                                tabBarIcon: ({color, size}) => (
                                    <Ionicons name={'ios-chatboxes'} size={size} color={color}/>
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
                <Stack.Screen name="GroupChat" component={GroupChat} />
                <Stack.Screen name="GroupChatSetting" component={GroupChatSetting} />
                <Stack.Screen name="GroupMember" component={GroupMember} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

