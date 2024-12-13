// LoginScreen.js
import React, { useState } from "react";
import { Button, CheckBox, Input, Layout, Text } from "@ui-kitten/components";
import { apiClient } from "../../api";
import { changeAuthState } from "../../services/auth";
import { Image, View } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('string');
  const [password, setPassword] = useState('string');

  const handleLogin = async () => {
    const response = await apiClient.auth.authControllerLogin({
      email,
      password,
    });

    if (response?.data) {
      const { accessToken, refreshToken, user } = response.data;
      // Save the data to AsyncStorage
      await changeAuthState({
        accessToken,
        refreshToken,
        user,
      });
      // Navigate to the Home screen
      navigation.replace("expense");
    }
  };

  return (
    <>
      <Layout style={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        paddingHorizontal: 20
      }}>
        <Image
          source={require("../../../assets/logo.png")}
          style={{ width: 150, height: 150 }}
        />
        <Text category="h1" style={{ marginTop: -20 }}>SaveMe</Text>
        <Input
          style={{ marginBottom: 10, marginTop: 20 }}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <Input
          style={{ marginBottom: 10 }}
          placeholder="Password"
          value={password}
          secureTextEntry={true}
          onChangeText={setPassword}
        />
        <Layout style={{
          width: '100%',
          display: 'flex',
          flexDirection: 'row',
        }}>
          <CheckBox
            checked={true}
            onChange={undefined}
          >
            Remember me
          </CheckBox>
          <View style={{ flex: 1 }} />
          <Text
            category="p2"
            style={{ margin: 10, color: 'gray' }}
          >
            Forgot password ?
          </Text>
        </Layout>
        <Button onPress={handleLogin} style={{
          width: '100%',
          marginTop: 10,
        }}>Login</Button>
        <Text
          category="p1"
          style={{ margin: 10, color: 'gray' }}
          onPress={() => {
            navigation.replace('signup')
          }}>
          Or create an from Register ?
        </Text>
      </Layout>
    </>

  );
};

export default LoginScreen;
