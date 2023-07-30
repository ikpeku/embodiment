import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, Keyboard, Image } from 'react-native'
import { Text, Searchbar } from 'react-native-paper';
import CardTag from '../../../components/CardTag';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Doctors } from '../../../components/data';




export default function Consultation() {
    const router = useRouter()
    const [searchQuery, setSearchQuery] = useState('');

    const [data, setData] = useState(Doctors)


    useEffect(() => {

        if (!searchQuery) {
            setData(Doctors)
        } else {
            setData(Doctors.filter(item => item.Name.toLowerCase().includes(searchQuery.toLowerCase()) || item.expert.toLowerCase().includes(searchQuery.toLowerCase())))
        }

    }, [searchQuery])

    return (
        <SafeAreaView style={styles.root} >

            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Image source={require('../../../assets/logo.png')} style={{}} />
                <View style={{ borderRadius: 8, borderWidth: 1, borderColor: "gainsboro", flex: 1 }}>
                    <Searchbar
                        placeholder="Search for a doctor"
                        onChangeText={(event) => setSearchQuery(event)}
                        value={searchQuery}
                        style={{ width: "100%", backgroundColor: "#fff" }}
                    />
                </View>
            </View>

            <Text variant='titleMedium'
                onPress={Keyboard.dismiss}
                style={{ textAlign: "center", fontWeight: "bold", fontFamily: 'Avenir', paddingHorizontal: 5, paddingVertical: 10 }}
            >Book an appointment with a doctor</Text>


            <FlatList
                data={data}
                renderItem={({ item }) => <CardTag
                    mode='elevated'
                    // elevation={1}
                    onPress={() => router.push({ pathname: "./Consultation/appointment", params: { id: item.id } })}
                    title={item.Name}
                    subTitle={item.expert}
                    url={item.img}
                    rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" style={{ opacity: 0.5 }} />}
                />}
                // keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 10 }}
            />


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