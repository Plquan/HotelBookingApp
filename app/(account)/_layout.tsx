import { Stack } from 'expo-router';

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
        name="language"
       
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
