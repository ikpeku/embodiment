import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import { Card, Text } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DoctorCard from '../../../components/Doctorcard';
import ProfileAvatar from '../../../components/Avatar';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';
import { Appointment } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import { DoctorAppointmentsScreenProps } from '../../../types';
import { useDoctorAppiontment, useGetCompletedIndividualAppointment } from '../../../services';
import dayjs from 'dayjs'


interface IItem {
    data: {
        createdAt: string,
        patient: {
            name: string
        }
    }
}

const Item = ({ data }: IItem) => {

    return (
        <Card mode='contained' style={styles.item} >
            <Card.Content>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Text variant='titleMedium' style={[styles.title, { color: "#000", opacity: 0.8 }]}>
                        <Text style={[styles.title, { textTransform: "capitalize", color: "#000", opacity: 0.8 }]}>{`${data?.patient?.name} `}</Text>
                        booked an appointment
                    </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                    <Text style={[styles.title, { color: "#0665CB" }]}>{dayjs(data?.createdAt).format('hh:mm a')}</Text>
                    <Text style={[styles.title, { color: "#0665CB" }]}>{dayjs(data?.createdAt).format('MMMM M, YYYY')}</Text>
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

    const { data } = useDoctorAppiontment(user?.doctorId)
    const {data: completedAppiontment} = useGetCompletedIndividualAppointment(user.doctorId)



    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: "100%" }}>
                <ProfileAvatar
                    type='Start'
                    text={user?.lastName}
                    photoUrl={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"} />
            </View>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <DoctorCard onCardPress={() => navigation.navigate("DoctorAppointments")} title={"Appointments"} subTitle={data ? data?.data?.length + completedAppiontment?.data?.length : 0} rightIcon={<Appointment color={"white"} size={20} />} />
                <DoctorCard onCardPress={() => navigation.navigate("Doctorearnings")} title={"Earnings"} subTitle={1980} rightIcon={<MaterialCommunityIcons name="cash-multiple" size={20} color="white" />} />
            </View>

            <View style={{ width: "100%" }}>
                <Text variant='titleLarge'>Recent appointments</Text>
            </View>



            <View style={{ width: "100%", flex: 1 }}>
                <FlatList
                    data={data?.data}
                    renderItem={({ item }) => <Item data={item} />}
                    ListEmptyComponent={<Empty />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ rowGap: 10 }}
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

