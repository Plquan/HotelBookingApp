import { Stack } from 'expo-router';
import CheckRoomScreen from '@/components/screens/booking';

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="findRoom"
       
        options={{
          headerShown: false,
        }}
      />
       <Stack.Screen
        name="roomDetail"
       
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
