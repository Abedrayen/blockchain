import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Button, Layout, Text } from "@ui-kitten/components";
import { Image } from "react-native";
import { primaryColor } from "../../constants/colors";
import { useEffect, useState } from "react";
import { deleteAuthState, getAuthState } from "../../services/auth";
import { Dashboard } from "./Dashboard";

const Tab = createBottomTabNavigator();


function Article() {
  return <Text>Article</Text>;
}

export default function BottomDrawer() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: primaryColor,
        lazy: true,
        // tabBarItemStyle: { backgroundColor: "red" },
        tabBarStyle: { height: 80 },
        tabBarLabelStyle: {
          height: 35,
        },
      }}
      sceneContainerStyle={{
        backgroundColor: "#fff",
        paddingTop: 30,
      }}
    >
      <Tab.Screen
        name="Accueil"
        component={Dashboard}
        options={{
          tabBarAccessibilityLabel: "Info",
          tabBarIcon: ({ focused }: any) =>
            focused ? (
              <Image
                source={require("../../../assets/HiOutlineHome-red.png")}
                style={{ width: 25, height: 25 }}
              />
            ) : (
              <Image
                source={require("../../../assets/HiOutlineHome.png")}
                style={{ width: 25, height: 25 }}
              />
            ),
        }}
      />
      <Tab.Screen
        name="factures"
        component={Article}
        options={{
          tabBarAccessibilityLabel: "Info",
          tabBarIcon: ({ focused }: any) =>
            focused ? (
              <Image
                source={require("../../../assets/IoWalletOutline-red.png")}
                style={{ width: 25, height: 25 }}
              />
            ) : (
              <Image
                source={require("../../../assets/IoWalletOutline.png")}
                style={{ width: 25, height: 25 }}
              />
            ),
        }}
      />
    </Tab.Navigator>
  );
}
