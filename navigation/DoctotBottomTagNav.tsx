import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {  SimpleLineIcons, MaterialIcons } from '@expo/vector-icons';

import { Consultation, DoctorHome, DoctorSchedule, Notification, UserProfile } from '../screens';
import { DoctorRootBottomStackParamList} from '../types';
import { Appointment , HomeLog} from '../assets';


const Tabs = createBottomTabNavigator<DoctorRootBottomStackParamList>();


export default function DoctorScreenLayout() {

 

    return (<Tabs.Navigator screenOptions={{ headerShown: false, tabBarLabelStyle: { fontSize: 11, }, }}>
        <Tabs.Screen name="Home" component={DoctorHome} options={{
            tabBarIcon: ({ size, color }) => <HomeLog size={20} color={color} />,
            tabBarHideOnKeyboard: true
        }} />
        <Tabs.Screen name="Schedule" component={DoctorSchedule} options={{
            tabBarIcon: ({ size, color }) => <Appointment color={color} size={size} />,
            tabBarHideOnKeyboard: true

        }} />

        <Tabs.Group screenOptions={{
            headerShown: true,
            headerTintColor: "#0665CB",
            headerTitleAlign: "center",
            headerTitleStyle: {
                fontFamily: 'avenir',
                fontWeight: "900",
                fontSize: 20,
            },
        }}>
           

            <Tabs.Screen name="Notifications" component={Notification} options={{
                headerShown: true,
                tabBarIcon: ({ size, color }) => <SimpleLineIcons name="bell" size={20} color={color} />
            }} />
            <Tabs.Screen name="Profile" component={UserProfile} options={{ tabBarIcon: ({ size, color }) => <MaterialIcons name="person-outline" size={25} color={color} /> }} />
        </Tabs.Group>

    </Tabs.Navigator>)
}   