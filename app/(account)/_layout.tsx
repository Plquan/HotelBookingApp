import { Stack } from 'expo-router';
import CheckRoomScreen from '@/components/screens/booking/CheckRoom';

export default function Layout() {
  return (
    <Stack>
        <Stack.Screen
        name="profile"
       
        options={{
          headerShown: false,
        }}
      />
         <Stack.Screen
        name="changePassword"
       
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
