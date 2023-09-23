import { StyleSheet, View, FlatList } from "react-native";
import { ActivityIndicator, Card, MD2Colors, Text } from 'react-native-paper';
import { useDoctor, useDoctorAppiontment } from "../services";
import { UserState } from "../redux/features/useSlice";
import { useAppSelector } from "../redux/hooks";
import dayjs from 'dayjs'
import { useGetDoctorAppointments } from "../services/doctorApi";


interface IItem {
    data: {
        createdAt: string,
        startTime: string,
        patient: {
            firstName: string,
            lastName: string
        }
    }
}


const Item = ({ data }: IItem) => {
    
    return (
        <Card mode='contained' style={styles.item} >
        <Card.Content>
            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                <Text variant='titleMedium' style={[styles.title, { color: "#000", opacity: 0.8 }]}>
                    <Text style={[styles.title, { textTransform: "capitalize", color: "#000", opacity: 0.8 }]}>{`${data?.patient?.firstName} ${data?.patient?.lastName} `}</Text>
                    booked an appointment
                </Text>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                <Text style={[styles.title, { color: "#0665CB" }]}>{data?.startTime}</Text>
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

    const { user } = useAppSelector(UserState)

    const { data, isLoading } = useGetDoctorAppointments(user._id)
   

    // console.log(data.data.groupedSchedules)
    // 
    return (
        <View style={styles.container}>
            <FlatList
                data={data?.upcoming}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{gap: 10}}
            />

{isLoading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}

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
