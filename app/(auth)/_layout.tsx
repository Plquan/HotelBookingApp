import { Stack } from 'expo-router';
import CheckRoomScreen from '@/components/screens/booking/CheckRoom';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
       
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="register"
       
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
