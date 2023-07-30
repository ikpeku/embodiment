import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack screenOptions={{ headerTitleAlign: "center", headerTintColor: "#0665CB", }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="appointment" options={{ title: "Book Appointment" }} />
            <Stack.Screen name="checkout" options={{ title: "Checkout" }} />
            <Stack.Screen name="confirmAppointment" options={{ headerShown: false }} />
        </Stack>
    )
}