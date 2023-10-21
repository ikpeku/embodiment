import {
    View,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { Card, Text as Paper_Text } from 'react-native-paper';
import { AntDesign, FontAwesome5, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
// import { Avatar, DoctorCard, UseDrawer } from '../../components';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useState } from 'react';

// import { Appointment, Candle, Exit, Questionnaire, Users } from '../../assets';
// import { Avatar } from '../../../components';
// import { Appointment } from '../../../assets';
import { Appointment, Candle, Exit, Questionnaire, Users } from '../../../assets';
import ProfileAvatar from '../../../components/Avatar';
import DoctorCard from '../../../components/Doctorcard';
import { useNavigation } from '@react-navigation/native';
import { AdminHomeScreenProp } from '../../../types';
import { useGetAllAppointments, useGetAllDoctors, useGetAllUsers } from '../../../services';
import { useAppSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/features/useSlice';
import { useGetAdminNotification, useGetAdminnQuestionnaire } from '../../../services/doctorApi';
import dayjs from 'dayjs';
// import { Avatar, DoctorCard, UseDrawer } from '../../../components';


interface IItem {
    item: {
        message: string,
        timestamp: string
        notificationType: "appointment" | "questionnaire",
        senderName: string,
        diseaseTitle: string
    }
}

const Item = ({ item }:IItem) => {

    return (
        <Card mode='contained' style={styles.item} >
            <Card.Content style={{width: "100%"}}>
                {item.notificationType === "appointment" ? 
                <Paper_Text style={[styles.title, {fontSize: 15}]}>{item.message}</Paper_Text>
            :
            <Paper_Text style={[styles.title, {fontSize: 15}]}>{item.diseaseTitle}</Paper_Text>
            }
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                {item.notificationType === "appointment" ? 
                <Text style={{ color: "#0665CB", opacity: 0.8 }}>{dayjs(item.timestamp).format('hh:mm a')}</Text>
                :
                <Text style={{ color: "#000", opacity: 0.8 }}> From 
                   <Text style={{ color: "#000", fontWeight: "bold" }}> {item.senderName}</Text>
                </Text>
        }
                    <Text style={{ color: "#0665CB", opacity: 0.8 }}>{dayjs(item.timestamp).format('MMMM D, YYYY')}</Text>
                </View>
            </Card.Content>

        </Card>
    )
};

const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Activity</Text>

        </View>
    )
}



export default function AdminHome() {

    const navigation = useNavigation<AdminHomeScreenProp>()
    const {user} = useAppSelector(UserState)

    const {data: doctors = []} = useGetAllDoctors()

    const {data: users = []} = useGetAllUsers()
    const {data: questionnaire, isLoading} = useGetAdminnQuestionnaire()


    const {data: appointment = []} = useGetAllAppointments(user._id)


    const {data: activities} = useGetAdminNotification(user._id)

    // console.log("acti:", activities?.notifications)
    // console.log("appiot:", appointment)


    return (
        <SafeAreaView style={styles.container}>
           

            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <ProfileAvatar
                onPress={() => {}}
                    type='Start'
                    text={user?.firstName}
                    photoUrl={user.avatar} />
            </View>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <DoctorCard title={"Users"} onCardPress={() => navigation.navigate("Adminusers")} subTitle={users?.data ? users?.data?.length : 0} rightIcon={<Users color="white" size={20} />} />
                <DoctorCard title={"Doctors"} onCardPress={() => navigation.navigate("Admindoctor")} subTitle={doctors?.data ? doctors?.data?.length : 0} rightIcon={<FontAwesome name="stethoscope" size={24} color="white" />} />
            </View>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <DoctorCard title={"Questionnaires"} onCardPress={() => navigation.navigate("Questionnaires")} subTitle={questionnaire?.questionnaireTotalCount ? questionnaire?.questionnaireTotalCount : 0} rightIcon={<Questionnaire color="white" size={20} />} />
                <DoctorCard title={"Appointments"} onCardPress={() => navigation.navigate("Appointments")} subTitle={appointment?.data?.completedSchedules ? appointment?.data?.completedSchedules.length : 0} rightIcon={<Appointment color="white" size={20} />} />
            </View>

            <View style={{ width: "100%" }}>
                <Paper_Text variant='titleLarge'>Recent activities</Paper_Text>
            </View>


            <View style={{width: "100%", flex: 1}}>
            <FlatList
                data={activities?.notifications ? activities?.notifications.slice().reverse() : []}
                renderItem={({ item }) => <Item  item={item} />}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Empty />}
                contentContainerStyle={{gap: 10}}
                showsVerticalScrollIndicator={false}
            />
            </View>

        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        paddingVertical: 20,
        gap: 20,
        position: "relative"
    },
    item: {
        backgroundColor: '#fff',
        borderWidth: 0.4,
        borderColor: "rgba(0,0,0,0.1)",
    },
    title: {
        fontFamily: 'avenir',
        fontWeight: "500",
        // fontSize: 15,
        lineHeight: 22,
        color: "#000",
        opacity: 0.8
    },

});

