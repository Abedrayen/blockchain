import AsyncStorage from "@react-native-async-storage/async-storage";
import { Api } from "./myApi";
import { getAccessToken } from "../services/auth";

const apiClient = new Api({
  baseApiParams: {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  },
  baseUrl: `${process.env.EXPO_PUBLIC_API_URL}`,
});

export const ApiClientWithHeaders = async (token: string) => {
  const myClient = await new Api({
    baseApiParams: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
    baseUrl: `${process.env.EXPO_PUBLIC_API_URL}`,
  });
  return myClient;
};
export { apiClient };
