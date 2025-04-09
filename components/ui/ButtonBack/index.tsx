import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

const ButtonBack = () => {
    const router = useRouter();
    const handleBack = () => {
        router.back();
    };

  return (
    <TouchableOpacity style={styles.backButton} onPress={handleBack}>
    <FontAwesome name="arrow-left" size={20} color="#fff" />
    <Text style={styles.backButtonText}>Quay lại</Text>
   </TouchableOpacity>

  );
}
const styles = StyleSheet.create({
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'transparent',
    marginBottom: 10,
    marginTop: 10,
  },
  backButtonText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ButtonBack;