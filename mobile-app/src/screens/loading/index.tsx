import React, { useEffect } from "react";
import { Layout, Spinner } from "@ui-kitten/components";
import { deleteAuthState, getAuthState } from "../../services/auth";
import { ApiClientWithHeaders } from "../../api";

const LoadingScreen = ({ navigation }: any) => {
  useEffect(() => {
    setTimeout(() => {
      checkToken();
    }, 1000);
  }, []);

  const checkToken = async () => {
    try {
      const authState = await getAuthState();
      // You may need to verify the token using your server's logic
      const myClient = await ApiClientWithHeaders(authState?.accessToken);
      const response = await myClient.auth.authControllerGetAuthenticatedUser();

      if (response?.data?.accessToken) {
        // Navigate to Home screen if the token is valid
        navigation.replace("home");
      } else {
        // Navigate to Login screen if the token is not valid or doesn't exist
        navigation.replace("login");
      }
    } catch (error: any) {
      console.error("Invalid JWT token:", error?.message);
      await deleteAuthState();
      navigation.replace("login");
    }
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Spinner />
    </Layout>
  );
};

export default LoadingScreen;
