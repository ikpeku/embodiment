import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import { Card, Text as Text} from 'react-native-paper';
import { useGetAllAppointments, useGetCompletedAppointment } from '../../../services';
import dayjs from 'dayjs'
import { useAppSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/features/useSlice';
import { DoctorviewuserScreenProps } from '../../../types';
import { useNavigation } from '@react-navigation/native';

interface IItem {
    data: {
        createdAt: string,
        patient:  {
            _id: string,
            firstName: string,
            lastName: string,
        }
    }
}


interface ICompletedAdminAppointment {
    searchQuery: string
}


const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Appointment</Text>
        </View>
    )
}



export default function CompletedAdminAppointment({searchQuery}:ICompletedAdminAppointment) {

    // const navigation = useNavigation<any>()
    const navigation = useNavigation<DoctorviewuserScreenProps>()
    const {user} = useAppSelector(UserState)
    const {data: appointment = []} = useGetAllAppointments(user._id)

    // console.log(appointment?.data?.completedSchedules[0].patient)


    const filterItemCompleted = appointment?.data?.completedSchedules?.filter((item: IItem["data"]) => {
        if(!searchQuery) {
            return item
        } 
        else {
            return item?.patient.firstName.toLowerCase().includes(searchQuery.toLowerCase()) || item.patient.lastName.toLowerCase().includes(searchQuery.toLowerCase())
        }
    
    })


  
    const Item = ({data}:IItem) => {



        return (
            <Card mode='contained' style={styles.item} onPress={() => navigation.navigate("Doctorviewuser", { id: data?.patient?._id})} >
                <Card.Content>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                        <Text variant='titleMedium' style={[styles.title, { color: "#000" , opacity: 0.8}]}>
                            <Text style={[styles.title, {textTransform: "capitalize", color: "#000" , opacity: 0.8}]}>{`${data?.patient?.firstName} ${data?.patient?.lastName}`} </Text>
                            completed an appointment
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

    return (
          <View style={{width: "100%", flex: 1}}>
          <FlatList
                data={filterItemCompleted}
                renderItem={({ item }) => <Item  data={item} />}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ rowGap: 10 }}
            />
          </View>
    )
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        borderWidth: 0.4,
        borderColor: "rgba(0,0,0,0.1)",
    },
    title: {
        fontFamily: 'avenir',
    }
});

