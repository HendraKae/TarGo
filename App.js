import React, { useEffect, useRef } from "react";
import { StyleSheet, View, BackHandler, ToastAndroid } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "./src/screens/HomeScreen";
import ActivityScreen from "./src/screens/ActivityScreen";
import Sidebar from "./src/components/Sidebar";
import useFonts from "./src/utils/Fonts";

const Stack = createStackNavigator();

export default function App() {
  const fontsLoaded = useFonts();
  const navigationRef = useRef(null);
  const backPressed = useRef(0); // Gunakan useRef agar nilainya tetap

  useEffect(() => {
    const backAction = () => {
      if (navigationRef.current?.getCurrentRoute()?.name !== "Home") {
        navigationRef.current?.navigate("Home");
        return true;
      } else {
        if (backPressed.current === 0) {
          backPressed.current = 1;
          ToastAndroid.show("Tekan kembali lagi untuk keluar", ToastAndroid.SHORT);
          setTimeout(() => {
            backPressed.current = 0;
          }, 2000);
          return true;
        }
        BackHandler.exitApp();
        return false;
      }
    };

    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    
    return () => backHandler.remove();
  }, []);

  if (!fontsLoaded) {
    return <View style={styles.loaderContainer}></View>;
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Activity" component={ActivityScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
      <Sidebar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
