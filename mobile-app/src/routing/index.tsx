import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoadingScreen from "../screens/loading";
import LoginScreen from "../screens/login";
import HomeScreen from "../screens/home";
import ExpencesScreen from "../screens/expences";
import BankScreen from "../screens/bank";
import BlockchainScreen from "../screens/blockchain";
import RegisterScreen from "../screens/login/Signup";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="/loading"
      screenOptions={{
        headerTitle: "Loading",
        headerShown: false,
        cardStyle: {
          flex: 1,
          paddingTop: 0,
          backgroundColor: "#fff",
        },
      }}
    >
      <Stack.Screen name="loading" component={LoadingScreen} />
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="signup" component={RegisterScreen} />
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="expense" component={ExpencesScreen} />
      <Stack.Screen name="bank" component={BankScreen} />
      <Stack.Screen name="blockchain" component={BlockchainScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
