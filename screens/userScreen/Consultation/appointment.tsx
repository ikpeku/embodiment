import { useState, useEffect } from 'react'
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Card, Text, Modal, Portal, Provider } from 'react-native-paper';
import Doctors from "../../../dummy/doctors.json"
import { CardTag, CustomButton } from '../../../components';
import { useNavigation } from '@react-navigation/native';

const Consultationappointment = () => {
    const [visible, setVisible] = useState(false);
    const [star, setStar] = useState(0);
    const [data, setData] = useState<typeof Doctors>()

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const navigation = useNavigation()



    useEffect(() => {
        // setData(Doctors.find(value => value.id === 1))

    }, [])


  

    const [selecteddate, setSelectedDate] = useState(undefined)
    const [selectedtime, setSelectedTime] = useState("")

    const HandleAppointment = () => {
        if (selecteddate === undefined || selectedtime === "") {
            Alert.alert("Date/Time Error", "Select Date and Time of Appointment")
            return
        }

       navigation.navigate("Consultationcheckout")
    }

    return (

        <ScrollView style={styles.root}>

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
                    <CustomButton title="Done" onPress={() => setVisible(false)} />

                </Modal>

            </Portal>



            <View>
                <CardTag
                    title={"John Doe"}
                    subTitle={"ENDOMINII"}
                    url={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"}

                />

                <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center", gap: 15, backgroundColor: "#fff" }}>
                    <Ionicons name="md-star" size={24} color="#FFCE31" />
                    <Text variant='bodySmall'>{4}</Text>
                    <Text onPress={showModal} variant='bodyMedium' style={{ backgroundColor: "#0665CB", color: "#fff", borderRadius: 4, paddingHorizontal: 5 }}>Rate this doctor</Text>
                </View>
            </View>

            <View>
                <Card style={{ backgroundColor: "#fff", marginVertical: 20 }} mode='outlined' >
                    <Card.Content style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" }}>
                        <View style={{ alignItems: "center" }}>
                            <Text variant='titleMedium'>12</Text>
                            <Text>Years exp.</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text variant='titleMedium'>30</Text>
                            <Text>Patients</Text>
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <Text variant='titleMedium'>56</Text>
                            <Text>Rate</Text>
                        </View>

                    </Card.Content>
                </Card>
            </View>

            <View>
                <Card style={{ backgroundColor: "#fff" }} mode='contained' >
                    <Card.Content>
                        <Text variant='headlineMedium' style={{ fontFamily: 'avenir', }} >About</Text>
                        <Text variant='bodyLarge'>{"Lorem llllllllllllllllllllllllllllllll"}</Text>
                    </Card.Content>
                </Card>
            </View>



            <View>
                <Card style={{ backgroundColor: "#fff" }} mode='contained' >
                    <Card.Content >
                        <Text variant='titleLarge' style={styles.title} >Select Date</Text>
                        <View style={{}}>
                            <View style={{ flexDirection: "row", paddingVertical: 5, columnGap: 10, flexWrap: "wrap", rowGap: 11, marginTop: 10, }}>
                                {
                                    [{ day: "M", date: "19" }, { day: "W", date: "22" }, { day: "F", date: "12" }, { day: "S", date: "8" }, { day: "T", date: "4" },].map((day, index) => (
                                        <Pressable onPress={() => setSelectedDate(index)} key={index} style={[styles.title, { padding: 10, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1, width: 70, alignItems: "center" }, selecteddate === index ? { backgroundColor: "#0665CB", } : {  backgroundColor: "#fff" }]}>
                                            <Text style={[styles.title, selecteddate === index ? { color: "#fff" } : { color: "#000" }]}>{day.day}</Text>
                                            <Text style={[styles.title, selecteddate === index ? { color: "#fff" } : { color: "#000" }]}>{day.date}</Text>
                                        </Pressable>



                                    ))
                                }
                            </View>
                        </View>

                    </Card.Content>
                </Card>
            </View>



            <View>
                <Card style={{ backgroundColor: "#fff" }} mode='contained' >
                    <Card.Content>
                        <Text variant='titleLarge' style={styles.title} >Select time</Text>
                        <View>
                            <View style={{ flexDirection: "row", paddingVertical: 5, columnGap: 10, flexWrap: "wrap", rowGap: 11, marginTop: 10, justifyContent: "flex-start" }}>
                                {
                                    ["09:00 am", "10:00 am", "12:00 pm", "02:00 pm", "04:00 pm", "05:00 pm"].map((time, index) => (

                                        <Text onPress={() => setSelectedTime(time)} key={index} style={[styles.title, { padding: 10, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1 }, selectedtime === time ? { color: "#fff", backgroundColor: "#0665CB", } : { color: "#000", backgroundColor: "#fff" }]}>{time}</Text>


                                    ))
                                }
                            </View>
                        </View>

                    </Card.Content>
                </Card>
            </View>


            <View style={{ marginTop: 30, marginBottom: 20 }}>
                <CustomButton title="Continue" onPress={HandleAppointment} />
            </View>
        </ScrollView>


    )
}

export default Consultationappointment;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 9,
        rowGap: 20
    },
    title: {
        // fontFamily: 'avenir',

    },
})