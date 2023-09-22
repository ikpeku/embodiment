import {
    View,
    FlatList,
    StyleSheet,
} from 'react-native';
import { ActivityIndicator, Card, MD2Colors, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { CreateDoctorScheduleScreenProps } from '../../../types';
import { useAppSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/features/useSlice';
import { useDoctor, useDoctorAppiontment } from '../../../services';
import dayjs from 'dayjs'

interface IItem {
    index: number,
    data: {
        date: string
        schedules: {
            startTime: string;
        }[]
    }

}




const Empty = () => {
    return (
        <View style={{ alignItems: "center", justifyContent: "center", aspectRatio: 1, width: "100%" }}>
            <Entypo name="add-to-list" size={200} color="gainsboro" />

            <Text variant='headlineLarge' style={{ color: "gainsboro", textAlign: "center" }} >No Schedule</Text>
        </View>
    )
}


export default function DoctorSchedule() {

    const navigation = useNavigation<CreateDoctorScheduleScreenProps>()

    const { user } = useAppSelector(UserState)
    const { data = [], isLoading } = useDoctor(user._id)

console.log(data?.data.availableTimeSlots)

    const Item = ({ data , index}: IItem) => {
        console.log(data)

        return (
            <Card mode='contained' style={styles.item} >
                <Card.Content>
                    <View style={styles.titleContainer}>
                        <Text variant='titleMedium' style={[styles.title, { color: "#0665CB", }]}>{dayjs(data?.date).format('MMMM D, YYYY')}</Text>
                        <View style={{ width: 60, padding: 5 }}>
                            <Text onPress={() => navigation.navigate("CreateDoctorSchedule", {index })} variant='titleMedium' style={[styles.title, styles.btn]}>Edit</Text>
                        </View>
                    </View>


                    <View style={{ flexDirection: "row", paddingVertical: 5, gap: 6, flexWrap: "wrap", rowGap: 11, marginTop: 10 }}>
                        {
                            data?.schedules.map((time, index) => <Text variant='bodySmall' key={index} style={[styles.title, { color: "#000", backgroundColor: "#0665CB14", padding: 5, borderRadius: 8 }]}>{time.startTime}</Text>)
                        }
                    </View>
                </Card.Content>

            </Card>
        )
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: "50%", marginLeft: "auto" }}>
                <Text onPress={() => navigation.navigate("CreateDoctorSchedule", {index: 0})} style={[styles.btn, { paddingVertical: 8 }]}>+ Create free time</Text>
            </View>

         <View style={{width: "100%"}}>

         {/* .slice().reverse() */}
        
<FlatList
                 data={data?.data.availableTimeSlots ? data?.data.availableTimeSlots.slice().sort((a: any, b:any) =>  new Date(a.date).setHours(0, 0, 0, 0) - new Date(b.date).setHours(0, 0, 0, 0)).reverse() : []}
                 renderItem={({ item , index}) => <Item data={item} index={index} />}
                 keyExtractor={item => item?.date}
                 ListEmptyComponent={<Empty />}
                 showsVerticalScrollIndicator={false}
                 contentContainerStyle={{ gap: 5 }}
             />
         </View>

            {isLoading && (
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
        width: "100%"
    },
    title: {
        fontFamily: 'avenir',

    },
    titleContainer: {
        flexDirection: "row",
        flexShrink: 1,
        flexGrow: 1,
        flexWrap: "nowrap",
        justifyContent: "space-between",
        alignItems: "center",
    },
    btn: {
        backgroundColor: "#0665CB",
        color: "#fff",
        textAlign: "center",
        borderRadius: 5
    }
});

