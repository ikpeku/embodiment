import { useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    // Text,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { Card, Text as Text, Searchbar, Button } from 'react-native-paper';
import { AntDesign, FontAwesome5, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



import { Appointment, Candle, Exit, Questionnaire, Users } from '../../../assets';
import ProfileAvatar from '../../../components/Avatar';
import DoctorCard from '../../../components/Doctorcard';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        name: "Wade Warren",
        email: 'wadwarren@gmail.com',
        phone: "08108744355"
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        name: "Guy Hawkins",
        email: 'hawkins56@gmail.com',
        phone: "(603) 555-0123"
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
        name: "Edward Cuff",
        email: 'cuffwardd@gmail.comm',
        phone: "(684) 555-0102"
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d722',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },


    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba111',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63222',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72333',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2444',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632555',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d722666',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    }, {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba777',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63888',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72999',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2000',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63211111',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d7222222222',
        name: "Jeff Samson",
        email: 'jeffamson@gmail.com',
        phone: "08108744355"
    },
];

interface IItem {
    item: typeof DATA[0]
}

const Item = ({ item, }: IItem) => {


    return (
        <Card mode='contained' style={styles.item} >
            <Card.Content>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Text variant='titleMedium' style={[styles.title, { color: "#000" }]}>{item.name} </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                    <Text style={[styles.title, { color: "#000", opacity: 0.7 }]}><Text>From </Text>Sam</Text>
                    <Text style={[styles.title, { color: "#0665CB" }]}>March 10, 2034</Text>
                </View>
            </Card.Content>


        </Card>
    )
};


const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Notification</Text>

        </View>
    )
}



export default function Questionnaires() {

    const [searchQuery, setSearchQuery] = useState('');
    const [completed, setCompleted] = useState(true)
    const {user} = useAppSelector(UserState)


    return (
        <SafeAreaView style={styles.container}>
           
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <ProfileAvatar
                    type='Start'
                    text={user.firstName}
                    photoUrl={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"} />
               
            </View>

            <View style={{ width: "100%", flexDirection: "row" }}>
                <DoctorCard title={"Questionnaires"} subTitle={0} rightIcon={<Questionnaire color="#fff" size={20} />} />
            </View>

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
                
                <Pressable onPress={() => setCompleted(v => !v)} style={{backgroundColor: completed ? "#fff" : "#0665CB", padding: 10, borderRadius: 5,}}>
                    <Text variant='titleMedium' style={{color: completed ? "#000" : "#fff", textAlign: "center"}}>uncompleted</Text>
                </Pressable>
                <Pressable onPress={() => setCompleted(v => !v)} style={{backgroundColor: !completed ? "#fff" : "#0665CB", padding: 10, borderRadius: 5, flexGrow: 1}}>
                    <Text variant='titleMedium' style={{color: !completed ? "#000" : "#fff", textAlign: "center"}}>Completed</Text>
                </Pressable>
            </View>


          <View style={{width: "100%"}}>
          <FlatList
                data={DATA}
                renderItem={({ item }) => <Item item={item} />}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ rowGap: 10 }}
            />
          </View>

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
    },
    item: {
        backgroundColor: '#fff',
        borderWidth: 0.4,
        borderColor: "rgba(0,0,0,0.1)",
    },
    title: {
        fontFamily: 'avenir',
    },

});

