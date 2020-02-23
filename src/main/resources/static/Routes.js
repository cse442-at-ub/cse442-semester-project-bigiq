import React, { Component } from "react";
import { createStackNavigator, createAppContainer } from 'react-navigation';
import Home from "./pages/Home";
import Splash from "./pages/Splash";

const Project= createStackNavigator({
 Splash: {
    screen: Splash
  },
  Home: {
   screen: Home
  },
});
export default createAppContainer(Project);