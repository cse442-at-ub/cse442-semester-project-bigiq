import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import RecentFeedScreen from "./RecentFeedScreen";
import * as React from 'react';
import MostLikedFeedScreen from "./MostLikedFeedScreen";

const Tab = createMaterialTopTabNavigator();

export default class TopNav extends React.Component {
    render() {
        return (
            <Tab.Navigator>
                <Tab.Screen name="RecentFeed" component={RecentFeedScreen}/>
                <Tab.Screen name="MostLikedFeed" component={MostLikedFeedScreen}/>
            </Tab.Navigator>
        );
    }
}
