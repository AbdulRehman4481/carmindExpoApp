import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { StyleSheet } from "react-native";
import { PaperProvider } from "react-native-paper";
import { enableScreens } from 'react-native-screens';
import HomeScreen from "./app/HomeScreen/HomeScreen";
import Login from "./app/Login/Login";
import TaskDetail from "./app/TaskDetail/TaskDetail";

enableScreens();
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{
                headerShadow: false,
              }}
            />
            <Stack.Screen
              name="Details"
              component={TaskDetail}
              options={{
                headerShadow: false,
              }}
            />
            <Stack.Screen
              name="Login"
              component={Login}
              options={{
                headerShadow: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    // </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
