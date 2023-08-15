import { useState, useEffect } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from 'react-native';
import { Text, Searchbar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Users } from '../../../assets';
import ProfileAvatar from '../../../components/Avatar';
import DoctorCard from '../../../components/Doctorcard';
import { useNavigation } from '@react-navigation/native';
import { AdminusersScreenNavigationProp } from '../../../types';
import {  useGetAllUsers } from '../../../services';
import { useAppSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/features/useSlice';



const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Users</Text>

        </View>
    )
}

interface IData {
    
        firstName: string;
        lastName: string;
        email:string;
        _id: string
    
}


interface IItem {
    item: IData
}



export default function Adminusers() {
    const [searchQuery, setSearchQuery] = useState('');

    const {user} = useAppSelector(UserState)
    const {data = []} = useGetAllUsers()
    const [users, setUsers] = useState<IData[]>([])

    const navigation = useNavigation<AdminusersScreenNavigationProp>()
   


useEffect(() => {
setUsers(data?.data)
},[data])





    const Item = ({ item }:IItem) => {
        return (
        
               <Pressable onPress={() => navigation.navigate("AdminUserprofile", {id: item._id})} style={{borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10, borderBottomColor: "gainsboro"}}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                        <Text variant='titleMedium' style={[styles.title, { color: item?.firstName && item?.lastName ? "#000" : "red" }]}>{ item?.firstName && item?.lastName ? `${item?.firstName} ${item?.lastName}` : "unregister doctor" }</Text>
                        < TouchableOpacity onPress={() => navigation.navigate("AdminUserprofile", {id: item._id})}>
                            <Text style={[styles.title,
                            { color: "#0665CB" }]}>View</Text>
                        </TouchableOpacity>
                    </View>
    
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                        <Text style={[styles.title, { color: "#000", opacity: 0.5 }]}>{item.email}</Text>
                    </View> 
               </Pressable>  
        )
    };



    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: "100%" }}>
                <ProfileAvatar
                    type='Start'
                    text={user.firstName}
                    photoUrl={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"} />
            </View>

            <View style={{ width: "100%", flexDirection: "row" }}>
                <DoctorCard title={"Users"} subTitle={users ? users?.length : 0} rightIcon={<Users color="white" size={20} />} />
            </View>

            <View style={{ width: "100%" }}>
                <View style={{ borderRadius: 8, borderWidth: 1, borderColor: "gainsboro" }}>
                    <Searchbar
                        placeholder="Search for any user"
                        onChangeText={(event) => setSearchQuery(event)}
                        value={searchQuery}
                        style={{ width: "100%", backgroundColor: "#fff" }}
                    />
                </View>
            </View>

            <View style={{ width: "100%", flex: 1}}>
            <FlatList
                data={users?.slice()?.reverse()}
                renderItem={({ item }) => <Item  item={item} />}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ rowGap: 10}}
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
    title: {
        fontFamily: 'avenir',
    },

});

