import { Stack } from 'expo-router';
import CheckRoomScreen from '@/components/screens/booking/CheckRoom';

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
         <Stack.Screen
        name="guestInfo"
       
        options={{
          headerShown: false,
        }}
      />
        <Stack.Screen
        name="payment"
       
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
