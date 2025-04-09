import { useNavigation } from "expo-router";
import { useEffect } from "react";
import UserInfoScreen from "@/components/screens/Payment/userInfo";
import { title } from "process";

export default function UserInfo() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
    title: "Thông tin người dùng",
      headerBackTitle: "Quay lại",
      headerBackTitleVisible: true,
    });
  }, [navigation]);

  return <UserInfoScreen />;
}
