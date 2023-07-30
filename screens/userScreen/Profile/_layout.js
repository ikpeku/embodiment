import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{ headerTitleAlign: "center", headerTintColor: "#0665CB", }}>
            <Stack.Screen name="index" options={{ headerTitle: "Profile", headerBackVisible: false }} />
            <Stack.Screen name="editprofile" options={{ headerTitle: "Edit Profile" }} />
            <Stack.Screen name="help" options={{ headerTitle: "Help & Support" }} />
            <Stack.Screen name="password" options={{ headerTitle: "Password" }} />
            <Stack.Screen name="Subscribe" options={{ headerTitle: "Subscribe" }} />
            <Stack.Screen name="Done" options={{ headerShown: false }} />
        </Stack>)
}

