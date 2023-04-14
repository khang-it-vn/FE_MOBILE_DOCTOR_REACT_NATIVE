import { NavigationContainer } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionSpecs,
  HeaderStyleInterpolators,
  CardStyleInterpolators,
} from "@react-navigation/stack";
import React from "react";
import { Easing, StatusBar, StyleSheet, Text, View } from "react-native";
import Home from "./Home";
import NavScan from "../Utils/NavScan";
import NavScan2 from "../Verify/NavScan2";
import NavScan3 from "../VerifyDefault/NavScan3";
import NavScan4 from "../VerifyDonateDefault/NavScan4";
import NavScan5 from "../Gifts/NavScan5";
const Stack = createStackNavigator();

const config = {
  animation: "spring",
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const closeConfig = {
  animation: "timing",
  config: {
    duration: 200,
    easing: Easing.linear,
  },
};

const customTransition = {
  gestureEnabled: true,
  gestureDirection: "horizontal",
  transitionSpec: {
    open: TransitionSpecs.TransitionIOSSpec,
    close: TransitionSpecs.TransitionIOSSpec,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            rotate: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: ["180deg", "0deg"],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.7],
                })
              : 1,
          },
        ],
      },
      opacity: current.opacity,
    };
  },
};

const AppStack = () => {
  return (
    <Stack.Navigator
      // apply for all screen
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
      headerMode="none"
    >
   
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
      name="NavScan"
      component={NavScan}
      options={{
        ...customTransition,
      }}
    />
     
      <Stack.Screen
        name="NavScan2"
        component={NavScan2}
        options={{
          ...customTransition,
        }}
      />
      
      <Stack.Screen
      name="NavScan3"
      component={NavScan3}
      options={{
        ...customTransition,
      }}
    />
    <Stack.Screen
      name="NavScan4"
      component={NavScan4}
      options={{
        ...customTransition,
      }}
    />
    <Stack.Screen
      name="NavScan5"
      component={NavScan5}
      options={{
        ...customTransition,
      }}
    />
    </Stack.Navigator>
  );
};

const App = () => {
  return <AppStack />;
};

export default App;
