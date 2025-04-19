import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const accessToken = await AsyncStorage.getItem("accessToken");
    return accessToken ?? undefined;
  } catch (error) {
    console.error("Lỗi khi lấy accessToken:", error);
    return undefined;
  }
};

export const removeAccessToken = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("accessToken");
      console.log("Đã xóa accessToken thành công");
    } catch (error) {
      console.error("Lỗi khi xóa accessToken:", error);
    }
  };

