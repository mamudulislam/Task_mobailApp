import { Stack } from "expo-router";
import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="login" options={{ title: 'Login', headerShadowVisible: false }} />
        <Stack.Screen name="register" options={{ title: 'Register', headerShadowVisible: false }} />
      </Stack>
    </ThemeProvider>
  );
}
