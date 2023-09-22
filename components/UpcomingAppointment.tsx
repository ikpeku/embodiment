import { StyleSheet, View, FlatList } from "react-native";
import { Card, Text } from 'react-native-paper';
import { useDoctorAppiontment } from "../services";
import { UserState } from "../redux/features/useSlice";
import { useAppSelector } from "../redux/hooks";
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
                <Text style={[styles.title, { color: "#0665CB" }]}>{dayjs(data?.createdAt).format('MMMM D, YYYY')}</Text>
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

const UpcomingAppointment = () => {

    const { user} = useAppSelector(UserState)

    const {data} = useDoctorAppiontment(user?.doctorId)

    return (
        <View style={styles.container}>
            <FlatList
                data={data?.data}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{gap: 10}}
            />

        </View>
    );
};

export default UpcomingAppointment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        gap: 10
    },
    title: {
        fontFamily: 'avenir',
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 22,
        color: "#000",
        opacity: 0.7
    },
    item: {
        backgroundColor: '#fff',
        borderWidth: 0.4,
        borderColor: "rgba(0,0,0,0.1)",
    },
});
