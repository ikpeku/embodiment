import { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    // Text,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { Card, Text as Text, Searchbar, Button, ActivityIndicator, MD2Colors } from 'react-native-paper';
// import { AntDesign, FontAwesome5, MaterialCommunityIcons, Feather, FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';



import { Appointment, Candle, Exit, Questionnaire, Users } from '../../../assets';
import ProfileAvatar from '../../../components/Avatar';
import DoctorCard from '../../../components/Doctorcard';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';
import { useGetAdminnQuestionnaire } from '../../../services/doctorApi';
import dayjs from 'dayjs';
import { useNavigation } from '@react-navigation/native';
import { AdminQuestionandanswerScreenProps } from '../../../types';




interface IItem {
    item: {
        _id: string,
        status: "completed" | "uncompleted",
        user: {
            firstName: string
        },
        diseaseId: {
            title: string
        },
        createdAt: string

    }
}





const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Notification</Text>

        </View>
    )
}



export default function Questionnaires() {

    const navigation = useNavigation<AdminQuestionandanswerScreenProps>()

    const [searchQuery, setSearchQuery] = useState('');
    const [completed, setCompleted] = useState(true)
    const {user} = useAppSelector(UserState)

    const {data, isLoading} = useGetAdminnQuestionnaire()
    const [completedQuestionnaire, setCompletedQuestionnaire] = useState<IItem["item"][]>([])
    const [unCompletedQuestionnaire, setUnCompletedQuestionnaire] = useState<IItem["item"][]>([])




    

const Item = ({ item, }: IItem) => {
        

    return (
        <Card mode='contained' style={styles.item} onPress={() => navigation.navigate("AdminQuestionandanswer", {id: item._id})} >
            <Card.Content>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Text variant='titleMedium' style={[styles.title, { color: "#000" }]}>{item.diseaseId.title}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                    <Text style={[styles.title, { color: "#000", opacity: 0.7 }]}><Text>From </Text>{item?.user?.firstName}</Text>
                    <Text style={[styles.title, { color: "#0665CB" }]}>{dayjs(item.createdAt).format('MMMM DD, YYYY')}</Text>
                </View>
            </Card.Content>


        </Card>
    )
};


   
    useEffect(() => {
        if(!data && !data?.questionnaires) return

        const resCompleted = data?.questionnaires.filter((v: IItem["item"]) => v.status === "completed")
        setCompletedQuestionnaire(resCompleted)

        const resUnCompleted = data?.questionnaires.filter((v: IItem["item"]) => v.status === "uncompleted")
        setUnCompletedQuestionnaire(resUnCompleted)

    },[data?.questionnaires])

 
    return (
        <SafeAreaView style={styles.container}>
           
            <View style={{ width: "100%", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                <ProfileAvatar
                onPress={() => {}}
                    type='Start'
                    text={user.firstName}
                    photoUrl={user.avatar}
                     />
               
            </View>

            <View style={{ width: "100%", flexDirection: "row" }}>
                <DoctorCard title={"Questionnaires"} subTitle={data?.questionnaireTotalCount ? data?.questionnaireTotalCount : 0 } rightIcon={<Questionnaire color="#fff" size={20} />} />
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

            {completed && 
          <View style={{width: "100%"}}>
         <FlatList
                data={completedQuestionnaire.slice().reverse()}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <Item item={item} />}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ rowGap: 10 }}
            />
          </View>}


            {!completed && 
          <View style={{width: "100%"}}>
         <FlatList
                data={unCompletedQuestionnaire.slice().reverse()}
                keyExtractor={item => item._id}
                renderItem={({ item }) => <Item item={item} />}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ rowGap: 10 }}
            />
          </View>}


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

