import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import { ActivityIndicator, Card, MD2Colors, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DoctorCard from '../../../components/Doctorcard';
import ProfileAvatar from '../../../components/Avatar';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';
import { Appointment } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import { DoctorAppointmentsScreenProps } from '../../../types';
import { useDoctor,
    //  useDoctorAppiontment, useGetCompletedIndividualAppointment 
    } from '../../../services';
import dayjs from 'dayjs'
import { useGetDoctorNotification } from '../../../services/doctorApi';
// import { useEffect } from 'react';


interface IItem {
    data: {
        appointmentDate: string,
        appointmentTime: string,
        message: string
    }
}

const Item = ({ data }: IItem) => {

    return (
        <Card mode='contained' style={styles.item}  >
            <Card.Content style={{ gap: 10 }}>
                <Text style={[styles.title, { opacity: 0.7 }]}>{data.message}</Text>
                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                    <Text style={{ color: "#0665CB", opacity: 0.8 }}>{data.appointmentTime}</Text>
                    <Text style={{ color: "#0665CB", opacity: 0.8 }}>{dayjs(data.appointmentDate).format('MMMM D, YYYY')}</Text>
                    {/* <Text style={{ backgroundColor: "#0665CB14", borderRadius: 5, paddingHorizontal: 20, paddingVertical: 5, color: "#0665CB" }}>View</Text> */}
                </View>
            </Card.Content>
        </Card>

    )
};



const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Appointment</Text>
        </View>
    )
}


export default function DoctorHome() {
    const navigation = useNavigation<DoctorAppointmentsScreenProps>()

    const { user } = useAppSelector(UserState)

    const { data, isLoading } = useDoctor(user._id)
    const { data: doctorNotification, isLoading: loading } = useGetDoctorNotification(user._id)



    // console.log("doctor: ",data.data)


    return (
        <SafeAreaView style={styles.container}>
            <View style={{}}>

            <View style={{ width: "100%" }}>
                <ProfileAvatar
                onPress={() => {}}
                    type='Start'
                    text={user?.lastName}
                    photoUrl={user.avatar} />
            </View>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <DoctorCard onCardPress={() => navigation.navigate("DoctorAppointments")} title={"Appointments"} subTitle={data?.data?.total_number_of_appointment_completed ? data?.data?.total_number_of_appointment_completed : 0} rightIcon={<Appointment color={"white"} size={20} />} />
                <DoctorCard onCardPress={() => navigation.navigate("Doctorearnings")} title={"Earnings"} subTitle={0} rightIcon={<MaterialCommunityIcons name="cash-multiple" size={20} color="white" />} />
            </View>

            

            <View style={{ width: "100%" , paddingVertical: 10}}>
                <Text variant='titleLarge'>Recent appointments</Text>
                </View>
                </View>
                
           
           {doctorNotification?.notifications && 
           <FlatList
                    data={[...Object.keys(doctorNotification?.notifications).slice(0,10).reverse()]}
                    renderItem={({ item }) => {
                   
                        return (
                            <View style={{ gap: 10 }}>
                                {
                                  doctorNotification?.notifications && 
                                  doctorNotification?.notifications[item].map((data: any) => <Item key={data._id} data={data} />)
                                }
                            </View>
                        )
                    }}
                    contentContainerStyle={{ width: "100%", gap: 10 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Empty />}
                />
                }

{ loading || isLoading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}

            
           
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
        gap: 20
    },
    item: {
        backgroundColor: '#fff',
        borderWidth: 0.4,
        borderColor: "rgba(0,0,0,0.1)",
    },
    title: {
        fontFamily: 'avenir',
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 22,
        color: "#000",
        opacity: 0.7
    },
});

