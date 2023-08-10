import {
    View,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import { Card, Text as Paper_Text } from 'react-native-paper';
import {  MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import DoctorCard from '../../../components/Doctorcard';
import ProfileAvatar from '../../../components/Avatar';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';
import { Appointment } from '../../../assets';
import { useNavigation } from '@react-navigation/native';
import { DoctorAppointmentsScreenProps } from '../../../types';
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
    data: typeof DATA[0]
}

const Item = ({ data }: IItem) => {

    return (
        <Card mode='contained' style={styles.item} >
            <Card.Content>
                <Paper_Text variant='bodyMedium' style={styles.title}>{data.title}</Paper_Text>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Paper_Text style={[styles.title, { color: "#0665CB" }]}>09:00 am</Paper_Text>
                    <Paper_Text style={[styles.title, { color: "#0665CB" }]}>March 12, 2023</Paper_Text>
                </View>
            </Card.Content>

        </Card>
    )
};

const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Notification</Text>
        </View>
    )
}


export default function DoctorHome() {
    const navigation = useNavigation<DoctorAppointmentsScreenProps>()

    const { user} = useAppSelector(UserState)

    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: "100%" }}>
                <ProfileAvatar
                    type='Start'
                    text={user?.lastName}
                    photoUrl={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"} />
            </View>

            <View style={{ width: "100%", flexDirection: "row", gap: 10 }}>
                <DoctorCard onCardPress={() => navigation.navigate("DoctorAppointments")} title={"Appointments"} subTitle={132} rightIcon={<Appointment color={"white"} size={20} />} />
                <DoctorCard onCardPress={() => navigation.navigate("Doctorearnings")} title={"Earnings"} subTitle={1980} rightIcon={<MaterialCommunityIcons name="cash-multiple" size={20} color="white" />} />
            </View>

            <View style={{ width: "100%" }}>
                <Paper_Text variant='titleLarge'>Recent appointments</Paper_Text>
            </View>


            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{gap: 10}}
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

