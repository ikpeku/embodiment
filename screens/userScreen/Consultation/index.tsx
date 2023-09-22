import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Keyboard, Image } from 'react-native'
import { ActivityIndicator, MD2Colors, Text, TextInput } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
// import Doctors from "../../../dummy/doctors.json"
import { useNavigation } from '@react-navigation/native';
import { CardTag } from '../../../components';
import { EvilIcons } from '@expo/vector-icons';
import {useGetVerifyAllDoctors} from "../../../services/doctorApi";
import {ConsultationappointmentScreenProps} from "../../../types";





export default function Consultation() {
    const navigation = useNavigation<ConsultationappointmentScreenProps>()
    const [searchQuery, setSearchQuery] = useState('');

    const { data = [], isLoading } = useGetVerifyAllDoctors()

    // const [data, setData] = useState(Doctors)


    // useEffect(() => {
    //
    //     if (!searchQuery) {
    //         setData(Doctors)
    //     } else {
    //         setData(Doctors.filter(item => item.Name.toLowerCase().includes(searchQuery.toLowerCase()) || item.expert.toLowerCase().includes(searchQuery.toLowerCase())))
    //     }
    //
    // }, [searchQuery])

    // console.log("allDoctors: ",data)

    return (
        <SafeAreaView style={styles.root} >

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Image source={require('../../../assets/logo.png')} style={{ width: 40, aspectRatio: 1 }} resizeMode='contain' />
                <TextInput
                    placeholder="Search for illness"
                    outlineStyle={{ borderColor: "gainsboro", borderWidth: StyleSheet.hairlineWidth }}
                    contentStyle={{ paddingHorizontal: 10 }}

                    onChangeText={(event) => setSearchQuery(event)}
                    value={searchQuery} mode='outlined' style={{ height: 35, flexGrow: 1, }}
                    right={<TextInput.Icon icon={(properties) => <EvilIcons name="search" {...properties} />
                    } />}
                />
            </View>



            <Text variant='titleMedium'
                onPress={Keyboard.dismiss}
                style={{ textAlign: "center", fontWeight: "bold", fontFamily: 'avenir', paddingHorizontal: 5, paddingVertical: 10 }}
            >Book an appointment with a doctor
            </Text>


            <FlatList
                data={data}
                renderItem={({ item }) => <CardTag
                    mode='elevated'
                    // elevation={1}
                    onPress={() => navigation.navigate("Consultationappointment", { id: item._id })}
                    title={`Dr. ${item.firstName} ${item.lastName}`}
                    subTitle={item.specialty}
                    url={item.img}
                    rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" style={{ opacity: 0.5 }} />}
                />}
                // keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
            />


{isLoading && (
        <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
            <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
        </View>
    )}

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10
    }
})