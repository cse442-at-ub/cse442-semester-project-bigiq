import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import HomePage from "./pages/homePage";
import Splash from "./pages/Splash";

const screens= ({
 Splash: {
  screen: Splash,
  navigationOptions:{
   headerShown: false

  }
 },
 HomePage: {
  screen: HomePage,
  navigationOptions:{
   headerShown: false
  }
 },
 Tabs: {
  screen: Tabs
 }
});
const Routes = createStackNavigator(screens);
export default createAppContainer(Routes);