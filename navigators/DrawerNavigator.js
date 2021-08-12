// ./navigation/DrawerNavigator.js

import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

// import Home from "../screens/Home";
import SignUp from "../screens/SignUp";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      {/* <Drawer.Screen name="Home" component={Home} /> */}
      <Drawer.Screen name="SignUp" component={SignUp} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;