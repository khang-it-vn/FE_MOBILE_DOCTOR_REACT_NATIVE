import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  useColorScheme,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-native-paper";
import Colors from './Screens/constants/Colors';
import AppNav from './Screens/AppNav';

export default function App() {
  const isDarkMode = useColorScheme() === "dark";

  const backgroundStyle = {
    flex: 1,
    backgroundColor: isDarkMode ? Colors.black : Colors.white,
  };
  return (
    <Provider>
      <SafeAreaView style={backgroundStyle}>
        <NavigationContainer>
          <AppNav />
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}
