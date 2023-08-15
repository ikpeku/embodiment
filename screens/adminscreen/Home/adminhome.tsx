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
// import { Avatar, DoctorCard, UseDrawer } from '../../../components';


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        date: new Date(),
        title: 'Treatment for your birth control has been sent to your emailTreatment for your birth control has been sent to your email',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
        date: new Date(),
        title: 'Treatment for your Depression has been sent to your email',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d722',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },


    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba111',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63222',
        date: new Date(),
        title: 'Treatment for your birth control has been sent to your emailTreatment for your birth control has been sent to your email',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72333',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2444',
        date: new Date(),
        title: 'Treatment for your Depression has been sent to your email',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632555',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d722666',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    }, {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba777',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63888',
        date: new Date(),
        title: 'Treatment for your birth control has been sent to your emailTreatment for your birth control has been sent to your email',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72999',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2000',
        date: new Date(),
        title: 'Treatment for your Depression has been sent to your email',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63211111',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d7222222222',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },
];

interface IItem {
    item: typeof DATA[0]
}

const Item = ({ item }:IItem) => {

    return (
        <Card mode='contained' style={styles.item} >
            <Card.Content>
                <Paper_Text style={[styles.title, {fontSize: 15}]}>{item.title}</Paper_Text>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Paper_Text style={[styles.title, { color: "#0665CB" , opacity: 0.7}]}>09:00 am</Paper_Text>
                    <Paper_Text style={[styles.title, { color: "#0665CB" , opacity: 0.7}]}>March 12, 2023</Paper_Text>
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
    const {data: appointment = []} = useGetAllAppointments()


    return (
        <SafeAreaView style={styles.container}>
           

            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <ProfileAvatar
                    type='Start'
                    text={user?.firstName}
                    photoUrl={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"} />
            </View>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <DoctorCard title={"Users"} onCardPress={() => navigation.navigate("Adminusers")} subTitle={users ? users?.data?.length : 0} rightIcon={<Users color="white" size={20} />} />
                <DoctorCard title={"Doctors"} onCardPress={() => navigation.navigate("Admindoctor")} subTitle={doctors ? doctors?.data?.length : 0} rightIcon={<FontAwesome name="stethoscope" size={24} color="white" />} />
            </View>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <DoctorCard title={"Questionnaires"} onCardPress={() => navigation.navigate("Questionnaires")} subTitle={0} rightIcon={<Questionnaire color="white" size={20} />} />
                <DoctorCard title={"Appointments"} onCardPress={() => navigation.navigate("Appointments")} subTitle={appointment ? appointment?.data?.length : 0} rightIcon={<Appointment color="white" size={20} />} />
            </View>

            <View style={{ width: "100%" }}>
                <Paper_Text variant='titleLarge'>Recent activities</Paper_Text>
            </View>


            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item  item={item} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
            />
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
        margin: 5,
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

