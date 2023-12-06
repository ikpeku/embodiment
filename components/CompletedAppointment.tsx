import { StyleSheet, View, FlatList } from "react-native";
import { ActivityIndicator, Card, MD2Colors, Text } from 'react-native-paper';
import { useDoctor, useGetCompletedIndividualAppointment } from "../services";
import { useAppSelector } from "../redux/hooks";
import { UserState } from "../redux/features/useSlice";
import dayjs from 'dayjs'
// import { useGetDoctorAppointments } from "../services/doctorApi";
import { useNavigation } from "@react-navigation/native";
import { DoctorviewuserScreenProps } from "../types";


interface IItem {
    data: {
        createdAt: string,
        endTime: string,
        _id: string,
        bookingId: string,
        patientFirstName: string,
        patientLastName: string,
        patientId: string,
        status: "Completed" | "Booked"
    }
}



const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Appointment</Text>
        </View>
    )
}

const CompletedAppointment = () => {
    const navigation = useNavigation<DoctorviewuserScreenProps>()

    const { user} = useAppSelector(UserState)
    const { data, isLoading } = useDoctor(user._id)
  

    const Item = ({ data }: IItem) => {
        // console.log(data)

        return (
            <Card mode='contained' style={styles.item} onPress={() =>  navigation.navigate("Doctorviewuser", { id: data.patientId, scheduleId: data._id, status: data.status})} >
            <Card.Content>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Text variant='titleMedium' style={[styles.title, { color: "#000", opacity: 0.8 }]}>
                    Appointment with
                        <Text style={[styles.title, { textTransform: "capitalize", color: "#000", opacity: 0.8 }]}>{` ${data?.patientFirstName} ${data?.patientLastName} `}</Text>
                         has ended
                    </Text>
                </View>
    
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                    <Text style={[styles.title, { color: "#0665CB" }]}>{data.endTime}</Text>
                    <Text style={[styles.title, { color: "#0665CB" }]}>{dayjs(data?.createdAt).format('MMMM D, YYYY')}</Text>
                </View>
            </Card.Content>
        </Card>
        )
    };
    
    
    return (
        <View style={styles.container}>

            <FlatList
                data={data?.data?.groupedSchedules?.completed}
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

export default CompletedAppointment;

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
