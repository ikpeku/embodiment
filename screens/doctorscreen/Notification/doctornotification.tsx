import { useNavigation } from '@react-navigation/native';
import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
    Alert,
} from 'react-native';
import { ActivityIndicator, Card, MD2Colors, Text as Paper_Text } from 'react-native-paper';
import { DoctorviewuserScreenProps } from '../../../types';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';
import { useGetDoctorNotification } from '../../../services/doctorApi';
import dayjs from 'dayjs';
import axios from 'axios';
import { baseURL } from '../../../services';
import { useQueryClient } from '@tanstack/react-query';



interface IItem {
    data: {
        _id: string,
        sender: string
        appointmentDate: string,
        message: string,
        status: "unread" | "read"
        appointmentId: string,
        scheduleId: string,
    },

}
interface IhandleViewNotification {
    id: string,
    notificationId: string,
    appointmentId: string,
    scheduleId: string,
    status: "unread" | "read"
}


const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Notification</Text>
        </View>
    )
}


export default function DoctorNotification() {

    const { user } = useAppSelector(UserState)

    const { data: doctorNotification, isLoading: loading } = useGetDoctorNotification(user._id)

    const queryClient = useQueryClient()

    const navigation = useNavigation<DoctorviewuserScreenProps>()


    const Item = ({ data }: IItem) => {
        // console.log("resp: ",data)
        

        return (
            <Card mode='contained' style={styles.item}  >
                <Card.Content style={{ gap: 10 }}>
                    <Paper_Text style={[styles.title, { opacity: 0.8 }, data.status !== "unread" ? {opacity: 0.5} : {}]}>{data.message}</Paper_Text>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <Text style={{ color: "#0665CB", opacity: 0.8 }}>{dayjs(data.appointmentDate).format('hh:mm a')}</Text>
                        <Text onPress={() => handleViewNotification({id: data.sender, notificationId: data._id, appointmentId: data.appointmentId, scheduleId: data.scheduleId , status: data.status})} style={{ backgroundColor: "#0665CB14", borderRadius: 5, paddingHorizontal: 20, paddingVertical: 5, color: "#0665CB" }}>View</Text>
                    </View>
                </Card.Content>
            </Card>

        )
    };



    const handleViewNotification = async({id, notificationId, appointmentId, scheduleId, status}:IhandleViewNotification ) => {

        try {
            await axios.put(`${baseURL}/notification/${user._id}/${notificationId}`)
           
        } catch (error: any) {
            // console.log(error.response.data.message)
            // Alert.alert()   
        } finally {
            queryClient.invalidateQueries({ queryKey: ['doctorNotification'] })
            navigation.navigate("Doctorviewuser", { id, appointmentId, scheduleId, status})
        }
    }


// console.log(doctorNotification.notifications)
    return (
        <SafeAreaView style={styles.container}>

            <View style={{ flexGrow: 1 }}>


                <FlatList
                    data={[...Object.keys(doctorNotification.notifications).slice().reverse()]}
                    renderItem={({ item }) => {
                        return (
                            <View style={{ gap: 10 }}>
                                <Paper_Text style={[styles.title, { fontWeight: "400", fontSize: 14, color: "#0665CB", paddingVertical: 10, textAlign: "center" }]}>{item}</Paper_Text>
                                {
                                    doctorNotification.notifications[item].map((data: any) => <Item key={data._id} data={data} />)
                                }
                            </View>
                        )
                    }}
                    contentContainerStyle={{ width: "100%", gap: 10 }}
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={<Empty />}
                />

            </View>
            { loading && (
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
        padding: 10,

    },
    item: {
        backgroundColor: '#fff',
    },
    title: {
        fontFamily: 'avenir',
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 21,
        color: "#000",
    },
});

