import { Stack } from 'expo-router';
import CheckRoomScreen from '@/components/screens/CheckRoom';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="findRoom"
       
        options={{
          headerShown: false,
          title: "Tìm phòng",  
          headerBackTitle: "Quay lại", 
        }}
      />
    </Stack>
  );
}
