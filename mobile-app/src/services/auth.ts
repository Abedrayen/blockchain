import AsyncStorage from "@react-native-async-storage/async-storage";

export const getAccessToken = async () => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  return accessToken;
};

export const changeAuthState = async (data: any) => {
  await AsyncStorage.setItem("accessToken", data?.accessToken);
  await AsyncStorage.setItem("refreshToken", data?.refreshToken);
  await AsyncStorage.setItem("user", JSON.stringify(data?.user));
};

export const getAuthState = async () => {
  const accessToken: any = await AsyncStorage.getItem("accessToken");
  const refreshToken: any = await AsyncStorage.getItem("refreshToken");
  const user: any = await AsyncStorage.getItem("user");
  return {
    accessToken,
    refreshToken,
    user: JSON.parse(user),
  };
};

export const deleteAuthState = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
  await AsyncStorage.removeItem("user");
};
