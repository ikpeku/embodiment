import { useState, useEffect } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Card, Text, Modal, Portal, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { CardTag, CustomButton } from '../../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RateDoctor, useDoctor } from "../../../services";
import dayjs from 'dayjs';
import { ConsultationappointmentRouteProp, ConsultationcheckoutScreenProps } from '../../../types';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';
import { useQueryClient } from '@tanstack/react-query';

import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)

const Consultationappointment = () => {

    const queryClient = useQueryClient()
const today = dayjs(new Date());
const { user } = useAppSelector(UserState)

    const [visible, setVisible] = useState(false);
    const [star, setStar] = useState(0);

    const route = useRoute<ConsultationappointmentRouteProp>()

    const { data = [], isLoading } = useDoctor(route.params.id)




    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const navigation = useNavigation<ConsultationcheckoutScreenProps>()

    const [scheduleID, setScheduleID] = useState("")
    const [selecteddate, setSelectedDate] = useState(undefined)
    const [selectedtime, setSelectedTime] = useState("")
    const [scheduletime, setScheduletime] = useState([])


    const [scheduleDate, setScheduleDate] = useState([])


    const HandleAppointment = () => {
        if (selecteddate === undefined) {
            Alert.alert("Schedule date", "Please select Date of Appointment")
            return
        }

        if (selectedtime === "") {
            Alert.alert("Schedule Time", "Please select Time of Appointment")
            return
        }

        navigation.navigate("Consultationcheckout",
            {
                appointmentId: scheduleID,
                startTime: selectedtime,
                startDate: selecteddate,
                // patientId: user._id,
                routeId: data.data._id,
                doctorId: data.data.user._id

            }
        )
    }

    useEffect(() => {
        
        if(data?.data?.availableTimeSlots) {
            // const AllDate = data?.data?.availableTimeSlots.filter((v: any) => dayjs(v.date).isBefore(today) === true)
            // setScheduleDate(AllDate.sort((a: any, b:any) =>  new Date(a.date).setHours(0, 0, 0, 0) - new Date(b.date).setHours(0, 0, 0, 0)))
            setScheduleDate(data?.data?.availableTimeSlots.sort((a: any, b:any) =>  new Date(a.date).setHours(0, 0, 0, 0) - new Date(b.date).setHours(0, 0, 0, 0)).filter((v: any) => dayjs(v.date).isSameOrAfter(today,  "D") === true))
        }

     
        if (selecteddate) {
            const response = data?.data?.availableTimeSlots.slice().find((appointment: any) => appointment.date === selecteddate)
            if(response?.schedules) {
                setScheduletime(response["schedules"])

            }

        }


    }, [selecteddate, data, data?.data?.appointments])


    const handleStarRating = async() => {
        setVisible(false)
        
        try {
            const rating = await RateDoctor({ doctorId: data.data._id, starRating: star, userID: user._id})
            await queryClient.invalidateQueries({ queryKey: ["doctorbyid"] })
            Alert.alert("Done", rating?.data?.message)
        } catch (error) {
           
        }
    }


    useEffect(() => {

        if(data?.data){
           const userRate = [...data?.data?.ratings].find(v => v.user === user._id)
           setStar(userRate?.rating)
        }
    }, [])



    return (
        <View style={[styles.root, { padding: 9 }]}>
                 {!isLoading && <>
            <ScrollView style={styles.root} showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 20 }}>

                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, width: "90%", alignSelf: "center", borderRadius: 8 }}>
                        <Text variant='titleLarge' style={{ fontWeight: "bold", fontFamily: 'avenir' }}>Rate this doctor</Text>
                        <Text variant='bodyLarge'>Tell others what you think</Text>

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20 }}>
                            <Ionicons name="md-star" size={24} color={star === 0 ? "#D1D1D1" : "#0665CB"} onPress={() => setStar(1)} />
                            <Ionicons name="md-star" size={24} color={star === 2 || star === 3 || star === 4 || star === 5 ? "#0665CB" : "#D1D1D1"} onPress={() => setStar(2)} />
                            <Ionicons name="md-star" size={24} color={star === 3 || star === 4 || star === 5 ? "#0665CB" : "#D1D1D1"} onPress={() => setStar(3)} />
                            <Ionicons name="md-star" size={24} color={star === 4 || star === 5 ? "#0665CB" : "#D1D1D1"} onPress={() => setStar(4)} />
                            <Ionicons name="md-star" size={24} color={star === 5 ? "#0665CB" : "#D1D1D1"} onPress={() => setStar(5)} />
                        </View>
                        <CustomButton title="Done" onPress={handleStarRating} />
                    </Modal>
                </Portal>



                <View>
                    <CardTag
                        title={`${data?.data?.user?.firstName} ${data?.data?.user?.lastName}`}
                        subTitle={data?.data?.specialty}
                        url={data?.data?.user?.avatar}
                        isStar={true}
                        starRating={star}
                        onPress={showModal}
                    />

                </View>

                <View>
                    <Card style={{ backgroundColor: "#fff", }} mode='outlined' >
                        <Card.Content style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                            <View style={{ alignItems: "center" }}>
                                <Text variant='titleMedium'>{data?.data?.yearOfExperience}</Text>
                                <Text>Years exp.</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text variant='titleMedium'>{data?.data?.patientCount}</Text>
                                <Text>Patients</Text>
                            </View>
                            <View style={{ alignItems: "center" }}>
                                <Text variant='titleMedium'>${data?.data?.rate}</Text>
                                <Text>Rate</Text>
                            </View>
                        </Card.Content>
                    </Card>
                </View>

               {data?.data?.bio && <View>
                    <Text variant='titleLarge' style={{ fontFamily: 'avenir', }} >About</Text>
                    <Text variant='bodyLarge'>{data?.data?.bio}</Text>
                </View>}


                
               {scheduleDate?.length > 0 && <View>
                    <Text variant='bodyLarge' style={[styles.title, { fontSize: 16 }]}>Select Date</Text>
                    <View style={{
                        flexDirection: "row",
                        paddingVertical: 5,
                        columnGap: 10,
                        flexWrap: "wrap",
                        rowGap: 11,
                    }}>
                        {                 
                            scheduleDate.slice(0,7).map((appointment: any) => (
                                <Pressable onPress={() => {
                                    setScheduleID(appointment._id)
                                    setSelectedDate(appointment.date)
                                }} key={appointment.date}
                                    style={[{
                                        padding: 10,
                                        borderRadius: 8,
                                        borderColor: "rgba(0,0,0,0.3)",
                                        borderWidth: 1,
                                        width: 70,
                                        alignItems: "center"
                                    },
                                    selecteddate === appointment.date ? { backgroundColor: "#0665CB", } : { backgroundColor: "#fff" }
                                    ]}>
                                    <Text
                                        style={[styles.title, selecteddate === appointment.date ? { color: "#fff" } : { color: "#000" }]}
                                    >{dayjs(appointment.date).format("dd")}</Text>
                                    <Text
                                        style={[styles.title, selecteddate === appointment.date ? { color: "#fff" } : { color: "#000" }]}
                                    >{dayjs(appointment.date).format("D")}</Text>
                                </Pressable>
                            ))
                        }
                    </View>

                </View>
                }


                {scheduletime?.length > 0 && <View>
                    <Text variant='bodyLarge' style={[styles.title, { fontSize: 16 }]}>Select time</Text>
                    <View style={{
                        flexDirection: "row",
                        paddingVertical: 5,
                        columnGap: 10,
                        flexWrap: "wrap",
                        rowGap: 11,
                        justifyContent: "flex-start"
                    }}>
                        {
                          
                            [...scheduletime].map((time: any, index) => (

                                    <Text onPress={() => {
                                        setSelectedTime(time.startTime)  
                                    }} key={index} style={[styles.title, {
                                        padding: 10,
                                        borderRadius: 8,
                                        borderColor: "rgba(0,0,0,0.3)",
                                        borderWidth: 1
                                    }, selectedtime === time.startTime ? {
                                        color: "#fff",
                                        backgroundColor: "#0665CB",
                                    } : { color: "#000", backgroundColor: "#fff" }]}>
                                        {time.startTime}
                                    </Text>
                                ))
                        }
                    </View>
                </View>}


            </ScrollView>
            <View style={{}}>
                <CustomButton title="Continue" type={scheduleID === "" || selectedtime === ""  || data.data._id === undefined ? 'disable' : "primary"} onPress={HandleAppointment} />
            </View>
            </>}
            {isLoading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}
        </View>


    )
}

export default Consultationappointment;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",

    },
    title: {
        fontFamily: 'avenir',
    },
})