import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { FontAwesome } from '@expo/vector-icons';
import { AdminHome, AdminProfile, Admindoctor, Adminusers, Appointments, Questionnaires } from '../screens';
import { AdminRootBottomStackParamList } from '../types';
import { Users, Questionnaire , Appointment, HomeLog} from '../assets';
import {  MaterialIcons} from '@expo/vector-icons';


const Tabs = createBottomTabNavigator<AdminRootBottomStackParamList>();



export default function AdminScreenLayout() {


    return (<Tabs.Navigator screenOptions={{ headerShown: false, tabBarShowLabel: false }}>
        <Tabs.Screen name="Home" component={AdminHome} options={{
            tabBarIcon: ({ size, color }) => <HomeLog size={size} color={color} />,
        }} />

        <Tabs.Screen name="Adminusers" component={Adminusers} options={{
             tabBarIcon: ({ size, color }) => <Users color={color} size={size} />
             
             }} />

        <Tabs.Screen name="Admindoctor" component={Admindoctor} options={{
             tabBarIcon: ({ size, color }) => <FontAwesome name="stethoscope" size={size} color={color} /> 
             
             }} />

        <Tabs.Screen name="Questionnaires" component={Questionnaires} options={{
             tabBarIcon: ({ size, color }) => <Questionnaire size={size} color={color} /> 
             
             }} />

        <Tabs.Screen name="Appointments" component={Appointments} options={{
             tabBarIcon: ({ size, color }) => <Appointment size={size} color={color} /> 
             
             }} />

        <Tabs.Screen name="AdminProfile" component={AdminProfile} options={{
            headerShown: true,
            headerTitleAlign: "center",
            headerTintColor: "#0665CB",
            title: "Profile",
             tabBarIcon: ({  color }) => <MaterialIcons name="person-outline" size={25} color={color} /> }} />



    </Tabs.Navigator>)
}   