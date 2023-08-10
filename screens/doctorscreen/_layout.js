import { Tabs } from "expo-router";
import { SimpleLineIcons, MaterialIcons, AntDesign } from '@expo/vector-icons';

import Svg, { Path } from "react-native-svg"


export default function Layout() {

    const HomeLog = ({ color, size }) => {
        return (
            <Svg width={size} height={size} viewBox="0 0 18 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <Path d="M4.75 8.4998C5.44036 8.4998 6 9.0594 6 9.7498C6 10.4401 5.44036 10.9998 4.75 10.9998C4.05964 10.9998 3.5 10.4401 3.5 9.7498C3.5 9.0594 4.05964 8.4998 4.75 8.4998ZM9 8.4998C9.6904 8.4998 10.25 9.0594 10.25 9.7498C10.25 10.4401 9.6904 10.9998 9 10.9998C8.3096 10.9998 7.75 10.4401 7.75 9.7498C7.75 9.0594 8.3096 8.4998 9 8.4998ZM14.5 9.7498C14.5 9.0594 13.9404 8.4998 13.25 8.4998C12.5596 8.4998 12 9.0594 12 9.7498C12 10.4401 12.5596 10.9998 13.25 10.9998C13.9404 10.9998 14.5 10.4401 14.5 9.7498ZM6 13.7498C6 13.0594 5.44036 12.4998 4.75 12.4998C4.05964 12.4998 3.5 13.0594 3.5 13.7498C3.5 14.4401 4.05964 14.9998 4.75 14.9998C5.44036 14.9998 6 14.4401 6 13.7498ZM10.25 13.7498C10.25 13.0594 9.6904 12.4998 9 12.4998C8.3096 12.4998 7.75 13.0594 7.75 13.7498C7.75 14.4401 8.3096 14.9998 9 14.9998C9.6904 14.9998 10.25 14.4401 10.25 13.7498ZM13.25 12.4998C13.9404 12.4998 14.5 13.0594 14.5 13.7498C14.5 14.4401 13.9404 14.9998 13.25 14.9998C12.5596 14.9998 12 14.4401 12 13.7498C12 13.0594 12.5596 12.4998 13.25 12.4998ZM7.537 0.533732C8.3747 -0.174538 9.6012 -0.175398 10.4399 0.531702L17.2002 6.23095C17.7073 6.65846 18 7.28794 18 7.95121V17.2498C18 18.2163 17.2165 18.9998 16.25 18.9998H1.75C0.7835 18.9998 0 18.2163 0 17.2498V7.94993C0 7.28776 0.29168 6.65922 0.79734 6.23171L7.537 0.533732ZM9.4731 1.67853C9.1935 1.44284 8.7847 1.44312 8.5054 1.67921L1.76578 7.37719C1.59723 7.51969 1.5 7.72921 1.5 7.94993V17.2498C1.5 17.3878 1.61193 17.4998 1.75 17.4998H16.25C16.3881 17.4998 16.5 17.3878 16.5 17.2498V7.95121C16.5 7.73012 16.4024 7.52029 16.2334 7.37779L9.4731 1.67853Z" fill={color} />
            </Svg>
        )
    }


    return (<Tabs screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 11, }, }}>
        <Tabs.Screen name="Home" options={{ tabBarIcon: ({ color }) => <HomeLog size={20} color={color} /> }} />
        <Tabs.Screen name="Appointment" options={{
            tabBarIcon: ({ color }) =>
                <AntDesign name="calendar" size={25} color={color} />
        }} />
        <Tabs.Screen name="Notification" options={{
            headerShown: true,
            title: "Notifications",
            headerTintColor: "#0665CB",
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontFamily: 'Avenir',
                fontWeight: 900,
                fontSize: 20,
            },
            tabBarIcon: ({ size, color }) => <SimpleLineIcons name="bell" size={20} color={color} />
        }} />
        <Tabs.Screen name="Profile" options={{ tabBarIcon: ({ size, color }) => <MaterialIcons name="person-outline" size={25} color={color} /> }} />
    </Tabs>)
}   