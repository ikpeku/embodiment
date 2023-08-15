import { useState, useEffect } from 'react'
import { StyleSheet, View, FlatList } from 'react-native'
// import { Stack, useSearchParams } from 'expo-router'
import CardTag from '../../../components/CardTag'
import { Ionicons } from '@expo/vector-icons';
import { Card, Text, Modal, Portal, Provider } from 'react-native-paper';
// import Button from '../../../static/Button';
// import { Doctors } from '../../../components/data';
import { Feather, MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import { CustomButton } from '../../../components';



const CreateDoctorSchedule = () => {
    const [visible, setVisible] = useState(false);
    const [star, setStar] = useState(0);
    const [data, setData] = useState({})

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    // const { id } = useSearchParams()

    // console.log(Doctors.find(value => value.id === +id))

    // useEffect(() => {
    //     setData(Doctors.find(value => value.id === +id))

    // }, [])


    // console.log(data)

    const RenderItem = () => {
        return (
            <View style={styles.item} >

                <View style={styles.titleContainer}>
                    <Text variant='titleMedium' style={[styles.title, { color: "#000", }]}>March 12, 2023</Text>
                    <Feather name="plus-square" size={24} color="black" />
                </View>


                <View >
                    {
                        ["09:00 am", "10:00 am", "12:00 pm", "02:00 pm", "04:00 pm", "05:00 pm"].map((time, index) => (
                            <View key={index} style={{ flexDirection: "row", paddingVertical: 5, gap: 6, flexWrap: "wrap", rowGap: 11, marginTop: 10 }}>
                                <Text style={[styles.title, styles.date ]}>{time}</Text>
                                <AntDesign name="minus" size={24} color="black" />
                                <Text style={[styles.title, styles.date ]}>{time}</Text>
                                <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" style={{ marginLeft: "auto", opacity: 0.6 }} />
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
        < Provider >
            <View style={styles.root}>

                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{ backgroundColor: 'white', padding: 20, width: "90%", alignSelf: "center", borderRadius: 8 }}>
                        <Text variant='titleLarge' style={{ fontWeight: "bold", fontFamily: 'avenir' }}>Add Schedule</Text>
                        {/* <Text variant='bodyLarge'>Tell others what you think</Text> */}

                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 20 }}>

                            <Text variant='bodyLarge'>Pick Date: </Text>

                            <View style={{ flexDirection: "row", paddingVertical: 5, gap: 6, flexWrap: "wrap", rowGap: 11, marginTop: 10 }}>
                                <Text style={[styles.title, { color: "#000", backgroundColor: "#fff", padding: 5, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1 }]}>Select</Text>
                                <AntDesign name="minus" size={24} color="black" />
                                <Text style={[styles.title, { color: "#000", backgroundColor: "#fff", padding: 5, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1 }]}>Select</Text>
                                {/* <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" style={{ marginLeft: "auto" }} /> */}
                            </View>

                        </View>

                        <CustomButton title="Done" onPress={() => setVisible(false)} />

                    </Modal>

                </Portal>


                <FlatList
                    data={Array(4)}
                    renderItem={({ item }) => <RenderItem />}
                    // keyExtractor={item => item.id}
                    ListEmptyComponent={<Empty />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ gap: 10 }}
                />



                <View style={styles.btnContainer}>
                    <CustomButton title={"+  Add new date"} type='secondary' onPress={() => showModal()} />
                    <CustomButton title={"Save"} onPress={() => {}} />
                </View>
            </View>

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
        // flex: 1,
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
    date: { color: "#000", backgroundColor: "#fff", padding: 5, borderRadius: 8, borderColor: "rgba(0,0,0,0.3)", borderWidth: 1, opacity: 0.7 }
  

})