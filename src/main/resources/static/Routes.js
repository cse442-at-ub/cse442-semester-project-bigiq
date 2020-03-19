import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import BottomNav from "./BottomNav";
import Splash from "./pages/Splash";
import Verification from "./pages/Verification";
import registerName from "./pages/registerName";

const screens= ({
 Splash: {
  screen: Splash,
  navigationOptions:{
   headerShown: false
  }
 },
 Verification: {
  screen: Verification,
  navigationOptions: {
   headerShown: false
  }
 },
 registerName: {
  screen: registerName,
  navigationOptions:{
   headerShown: false
  }
 },
 BottomNav: {
  screen: BottomNav,
  navigationOptions:{
   headerShown: false
  }
 }
});
const Routes = createStackNavigator(screens);
export default createAppContainer(Routes);
