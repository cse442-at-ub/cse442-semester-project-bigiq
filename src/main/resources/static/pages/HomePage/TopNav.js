import { createMaterialTopTabNavigator, createAppContainer } from '@react-navigation/material-top-tabs';
import TextScreen from './TextScreen';
import VoiceScreen from './VoiceScreen';

const TopTab = createMaterialTopTabNavigator(  
    {  
        TextScreen: TextScreen,  
        VoiceScreen: VoiceScreen,  
    },  
    {  
        tabBarOptions: {  
            activeTintColor: 'purple',  
            showIcon: true,  
            showLabel:false,  
            style: {  
                backgroundColor:'white'  
            }  
        },  
    }  
);
export default createAppContainer(TopTab);  