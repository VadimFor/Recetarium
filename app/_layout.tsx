import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack >
    <Stack.Screen
      name="(tabs)" 
      options={{ headerShown: false}} //para ocular lo de (tabs) en la pantalla
    />

    <Stack.Screen
      name="movie/[id]"
      options={{ headerShown: false}}
    />

  </Stack>
}
