import { useState } from 'react';
import {
    View,
    StyleSheet,
    Pressable,
} from 'react-native';
import { Text, Searchbar} from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';



import { Appointment } from '../../../assets';
import ProfileAvatar from '../../../components/Avatar';
import DoctorCard from '../../../components/Doctorcard';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';
import CompletedAdminAppointment from './completed';
import UnCompletedAdminAppointment from './uncompleted';
import { useGetAllAppointments } from '../../../services';



export default function Appointments() {

    const [searchQuery, setSearchQuery] = useState('');
    const [completed, setCompleted] = useState(true)
    const {user} = useAppSelector(UserState)
    const {data: appointment = []} = useGetAllAppointments(user._id)


    return (
        <SafeAreaView style={styles.container}>
           
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <ProfileAvatar
                onPress={() => {}}
                    type='Start'
                    text={user.firstName}
                    photoUrl={user.avatar} />
               
            </View>

            <View style={{ width: "100%", flexDirection: "row" }}>
                <DoctorCard title={"Appointments"} subTitle={appointment?.data?.completedSchedules ? appointment?.data?.completedSchedules.length : 0} rightIcon={<Appointment color="#fff" size={20} />} />
            </View>

           { appointment?.data?.completedSchedules.length + appointment?.data?.bookedSchedules.length > 0 && 
            <>
           <View style={{ width: "100%" }}>

                <View style={{ borderRadius: 8, borderWidth: 1, borderColor: "gainsboro" }}>
                    <Searchbar
                        placeholder="Search for illness"
                        onChangeText={(event) => setSearchQuery(event)}
                        value={searchQuery}
                        style={{ width: "100%", backgroundColor: "#fff" }}
                    />
                </View>
            </View>

            <View style={{ width: "70%" , flexDirection: "row", justifyContent: "center", gap: 10}}>
                
                <Pressable onPress={() => setCompleted(v => !v)} style={{backgroundColor: completed ? "#00000014" : "#0665CB", padding: 10, borderRadius: 5, }}>
                    <Text variant='titleMedium' style={{color: completed ? "#000" : "#fff", textAlign: "center"}}>uncompleted</Text>
                </Pressable>
                <Pressable onPress={() => setCompleted(v => !v)} style={{backgroundColor: !completed ? "#00000014" : "#0665CB", padding: 10, borderRadius: 5, flexGrow: 1}}>
                    <Text variant='titleMedium' style={{color: !completed ? "#000" : "#fff", textAlign: "center"}}>Completed</Text>
                </Pressable>
            </View>
           </>

}


            {completed && <CompletedAdminAppointment searchQuery={searchQuery} />}
           {!completed && <UnCompletedAdminAppointment searchQuery={searchQuery} />
}
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
    }
});

