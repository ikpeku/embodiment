import {useEffect, useRef, useState} from 'react'
import { StyleSheet, View, FlatList, Pressable, Alert } from 'react-native'
import { Text, Modal, Portal, Provider, ActivityIndicator, MD2Colors} from 'react-native-paper';
import { Feather, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { CustomButton } from '../../../components';
import {DeleteAppointment, createApointmentApi, useDoctor} from '../../../services';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';
import { DateTime } from '../../../components/DateTime';
import dayjs from 'dayjs'
import {useRoute} from "@react-navigation/native";
import {CreateDoctorScheduleRouteProp} from "../../../types";
import { useQueryClient } from '@tanstack/react-query';


interface IItem {
    data: {
        date: string,
        schedules: {
            _id: string;
            startTime: string;
            endTime: string;
        }[]
    }
}

const CreateDoctorSchedule = () => {
    const queryClient = useQueryClient()
    const router = useRoute<CreateDoctorScheduleRouteProp>()

    const flatListRef = useRef<FlatList>(null);
    const [index, setIndex] = useState(0)

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const [showDate, setShowDate] = useState(false);
    const [showStartTime, setShowStartTime] = useState(false);

    const [showEndTime, setShowEndTime] = useState(false);

    const [date, setDate] = useState(new Date());
    const [endTime, setEndTime] = useState(new Date());
    const [startTime, setStartTime] = useState(new Date());

    const { user } = useAppSelector(UserState)
    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const showModal2 = () => setVisible2(true);
    const hideModal2 = () => setVisible2(false);

    const { data, isLoading } = useDoctor(user._id)
    const [loading, setLoading] = useState(false)
    const [existingDate, setExistingDate] = useState("")



    const handleCreateAppointment = async() => {
        setVisible(false)
        const appointmentDate = dayjs(date).format('YYYY-MM-DD')
        const appointmentEndTime = dayjs(endTime).format('hh:mm')
        const appointmentStartTime = dayjs(startTime).format('hh:mm')

        try {
            setLoading(true)
            await createApointmentApi({date: appointmentDate, doctorId: user._id, endTime:appointmentEndTime, startTime:appointmentStartTime })
            await queryClient.invalidateQueries({ queryKey: ["doctorbyid"] })
        } catch (error:any) {
            if(error.response){
                Alert.alert("Error", error.response.data.error)
            }
           
        } finally {
            setLoading(false)
        }
    }



    const handleCreateAppointmentWithExistingDate = async() => {
        
        setVisible2(false)
        const appointmentDate = dayjs(existingDate).format('YYYY-MM-DD')
        const appointmentEndTime = dayjs(endTime).format('hh:mm a')
        const appointmentStartTime = dayjs(startTime).format('hh:mm a')

        try {
            setLoading(true)
            await createApointmentApi({date: appointmentDate, doctorId: user._id, endTime:appointmentEndTime, startTime:appointmentStartTime })
            await queryClient.invalidateQueries({ queryKey: ["doctorbyid"] })
        } catch (error:any) {
            if(error.response){
                Alert.alert("Error", error.response.data.error)
            }
           
        } finally {
            setLoading(false)
        }
    }


    const handeleDeleteAppointment = async(id:string) => {
      
        try {
            setLoading(true)
            await DeleteAppointment({ doctorId: user._id, scheduleId: id})
            await queryClient.invalidateQueries({ queryKey: ["doctorbyid"] })
            Alert.alert("success", "Deleted successful.")
        } catch (error:any) {
            Alert.alert("Error", "delete failed try again")

        } finally {
            setLoading(false) 
        }
    }



    useEffect(() => {
            setIndex(router.params.index)
    }, [])

   
    const RenderItem = ({data}:IItem) => { 
        return (
            <View style={styles.item} >

                <View style={styles.titleContainer}>
                    <Text variant='titleMedium' style={[styles.title, { color: "#1e1f22", }]}>{dayjs(data?.date).format('MMMM D, YYYY')}</Text>
                    {/* <Text variant='titleMedium' style={[styles.title, { color: "#1e1f22", }]}>{data?.date}</Text> */}
                    <Feather name="plus-square" size={24} color="black" onPress={() => {
                        showModal2()
                        setExistingDate(data?.date)
                        }} />
                </View>


                <View >
                    {
                        data?.schedules.map((time, index) => (
                            <View key={index} style={{ flexDirection: "row", paddingVertical: 5, gap: 6, flexWrap: "wrap", rowGap: 11, marginTop: 10 }}>
                             
                                <Text style={[styles.title, styles.date]}>{time.startTime}</Text>
                                <AntDesign name="minus" size={24} color="black" />
                       
                                <Text style={[styles.title, styles.date]}>{time.endTime}</Text>
                                <MaterialCommunityIcons onPress={() => handeleDeleteAppointment(time._id)} name="trash-can-outline" size={24} color="black" style={{ marginLeft: "auto", opacity: 0.6 }} />
                            </View>
                        ))
                    }
                </View>

            </View>

        )
    }

    const Empty = () => {
        return (
            <View style={{ alignItems: "center", justifyContent: "center", aspectRatio: 1, width: "100%" }}>
                <Entypo name="add-to-list" size={200} color="gainsboro" />

                <Text variant='headlineLarge' style={{ color: "gainsboro", textAlign: "center" }} >No Appointment</Text>
            </View>
        )
    }



    return (
        < Provider>
            <View style={styles.root}>

                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, width: "90%", alignSelf: "center", borderRadius: 8 }}>
                        <Text variant='titleLarge' style={{ fontWeight: "bold", fontFamily: 'avenir' }}>Add Schedule</Text>

                        <Pressable onPress={() => setShowDate(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <Text variant='bodyLarge'>Pick Date: </Text>
                            <View style={{ flexDirection: "row", paddingVertical: 5, gap: 6, flexWrap: "wrap", rowGap: 11, marginTop: 10 }}>
                                <Text style={[styles.title, { color: "#000", backgroundColor: "#fff", padding: 5, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1 }]}>{dayjs(date).format('D MMMM, YYYY')}</Text>     
                            </View>
                        </Pressable>

                        <Pressable onPress={() => setShowStartTime(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <Text variant='bodyLarge'>Pick Start Time: </Text>
                            <View style={{ flexDirection: "row", paddingVertical: 5, gap: 6, flexWrap: "wrap", rowGap: 11, marginTop: 10 }}>
                                <Text style={[styles.title, { color: "#000", backgroundColor: "#fff", padding: 5, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1 }]}>{dayjs(startTime).format('h : m a')}</Text>     
                            </View>
                        </Pressable>

                        <Pressable onPress={() => setShowEndTime(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" , marginBottom: 10}}>
                            <Text variant='bodyLarge'>Pick End Time: </Text>
                            <View style={{ flexDirection: "row", paddingVertical: 5, gap: 6, flexWrap: "wrap", rowGap: 11, marginTop: 10 }}>
                                <Text style={[styles.title, { color: "#000", backgroundColor: "#fff", padding: 5, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1 }]}>{dayjs(endTime).format('h : m a')}</Text>     
                            </View>
                        </Pressable>


                        <CustomButton title="Done" onPress={handleCreateAppointment} />
                    </Modal>

{/* modal 2 */}
                    <Modal visible={visible2} onDismiss={hideModal2} contentContainerStyle={{ backgroundColor: 'white', padding: 20, width: "90%", alignSelf: "center", borderRadius: 8 }}>
                        <Text variant='titleLarge' style={{ fontWeight: "bold", fontFamily: 'avenir' }}>Add Schedule</Text>

                        <Pressable onPress={() => setShowStartTime(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center"}}>
                            <Text variant='bodyLarge'>Pick Start Time: </Text>
                            <View style={{ flexDirection: "row", paddingVertical: 5, gap: 6, flexWrap: "wrap", rowGap: 11, marginTop: 10 }}>
                                <Text style={[styles.title, { color: "#000", backgroundColor: "#fff", padding: 5, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1 }]}>{dayjs(startTime).format('h : m a')}</Text>
                            </View>
                        </Pressable>

                        <Pressable onPress={() => setShowEndTime(true)} style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" , marginBottom: 10}}>
                            <Text variant='bodyLarge'>Pick End Time: </Text>
                            <View style={{ flexDirection: "row", paddingVertical: 5, gap: 6, flexWrap: "wrap", rowGap: 11, marginTop: 10 }}>
                                <Text style={[styles.title, { color: "#000", backgroundColor: "#fff", padding: 5, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1 }]}>{dayjs(endTime).format('h : m a')}</Text>
                            </View>
                        </Pressable>


                        <CustomButton title="Done" onPress={handleCreateAppointmentWithExistingDate} />
                    </Modal>
                </Portal>


                <FlatList
                    ref={flatListRef}
                    initialScrollIndex={index}

                    data={data?.data.availableTimeSlots ?  data?.data.availableTimeSlots.slice().sort((a: any, b:any) =>  new Date(a.date).setHours(0, 0, 0, 0) - new Date(b.date).setHours(0, 0, 0, 0)).reverse() : []}
                    renderItem={({ item }) => <RenderItem data={item} />}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={<Empty />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10 }}
                    onScrollToIndexFailed={info => {
                        const wait = new Promise(resolve => setTimeout(resolve, 100));
                        wait.then(() => {
                            flatListRef?.current?.scrollToIndex({ index: info.index, animated: true,
                                viewPosition:5, viewOffset: 10
                            });
                        });
                    }}
                />

                 <DateTime currentMode={'date'} show={showDate}
                    setShow={setShowDate}
                    date={date}
                    setDate={setDate}
                />

                <DateTime currentMode={'time'}
                    show={showStartTime} setShow={setShowStartTime}
                    date={startTime}
                    setDate={setStartTime}
                />

                <DateTime currentMode={'time'}
                    show={showEndTime} setShow={setShowEndTime}
                    date={endTime}
                    setDate={setEndTime}
                />

                <View style={styles.btnContainer}>
                    <CustomButton title={"+  Add new date"} type='secondary' onPress={() => showModal()} />
                </View>

                {isLoading && (
                    <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                        <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                    </View>
                )}

            </View>
            {isLoading || loading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}

        </ Provider >
    )
}

export default CreateDoctorSchedule

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",

    },
    item: {
        backgroundColor: '#fff',
        borderColor: "rgba(0,0,0,0.3)",
        width: "100%",
        padding: 20,
        borderBottomWidth: StyleSheet.hairlineWidth
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
    btnContainer: {
        padding: 20,
        rowGap: 20
    },
    date: { color: "#000", 
    backgroundColor: "#fff", 
    padding: 5, 
    borderRadius: 8, 
    borderColor: "rgba(0,0,0,0.3)", 
    borderWidth: 1, 
    opacity: 0.7 
}
})