import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Icon, { Icons } from "./components/Icons";
import Screen from "./Screen";
import Colors from "./constants/Colors";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import NavHome from "./Screen/Home/NavHome";

import { createStackNavigator } from "@react-navigation/stack";
const Tab = createMaterialTopTabNavigator();

const TabArr = [
  {
    route: "NavHome",
    label: "Home",
    type: Icons.Ionicons,
    activeIcon: "grid",
    inActiveIcon: "grid-outline",
    component: NavHome,
  },
  // {
  //   route: "Like",
  //   label: "Like",
  //   type: Icons.MaterialCommunityIcons,
  //   activeIcon: "heart-plus",
  //   inActiveIcon: "heart-plus-outline",
  //   component: App,
  // },
  // {
  //   route: "Search",
  //   label: "Search",
  //   type: Icons.MaterialCommunityIcons,
  //   activeIcon: "timeline-plus",
  //   inActiveIcon: "timeline-plus-outline",
  //   component: App2 ,
  // },

  // {
  //   route: "NavProfile",
  //   label: "NavProfile",
  //   type: Icons.FontAwesome,
  //   activeIcon: "user-circle",
  //   inActiveIcon: "user-circle-o",
  //   component: Home,
  // },
];
const Stack = createStackNavigator();
export default function RootStack() {
  return (
    <React.Fragment>
      <Tab.Navigator
        tabBarPosition="bottom"
        screenOptions={{
          swipeEnabled: false,
          tabBarShowLabel: false,
          tabBarIndicatorStyle: {
            position: "absolute",
            top: 0,
            height: 6,
            backgroundColor: Colors.lightRed,
          },
          tabBarItemStyle: { flexDirection: "row" },
          // tabBarStyle: { backgroundColor: 'powderblue' },
          // tabBarScrollEnabled: true,
          tabBarActiveTintColor: Colors.lightRed,
          tabBarInactiveTintColor: Colors.lightRed,
        }}
      >
        {TabArr.map((_, index) => {
          return (
            <Tab.Screen
              key={index}
              name={_.route}
              component={_.component}
              options={{
                tabBarIcon: ({ color, size, focused }) => (
                  <Icon
                    name={focused ? _.activeIcon : _.inActiveIcon}
                    type={_.type}
                    size={size}
                    color={color}
                  />
                ),
              }}
            />
          );
        })}
      </Tab.Navigator>
    </React.Fragment>
  );
}
