
import { useEffect, useState } from 'react';
import {
    View,
    FlatList,
    StyleSheet,
    Pressable,
    Alert,
} from 'react-native';
import { Text as Text, Searchbar, Portal, Modal, TextInput, ActivityIndicator } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


import ProfileAvatar from '../../../components/Avatar';
import DoctorCard from '../../../components/Doctorcard';
import { useNavigation } from '@react-navigation/native';
import { AdminusersScreenNavigationProp } from '../../../types';
import { CustomButton } from '../../../components';
import { baseURL, useGetAllDoctors } from '../../../services';
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';


import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';


interface IData {
    firstName: string;
    lastName: string;
    email: string;
    _id: string

}

interface IItem {
    item: IData
}



export default function Admindoctor() {
    const [searchQuery, setSearchQuery] = useState('');
    const [showDeletemodal, setShowDeletemodal] = useState(false)
    const [showmodal, setShowmodal] = useState(false)
    const [item, setItem] = useState<IItem["item"]>()
    const navigation = useNavigation<AdminusersScreenNavigationProp>()

    const queryClient = useQueryClient()

    const { data = [], isLoading } = useGetAllDoctors()

    const [doctors, setDotors] = useState<IData[]>([])

    const { user } = useAppSelector(UserState)
    const [email, setEmail] = useState("")


    const handleRemoveDoctor = async () => {
        if (!item?.firstName || !item?.lastName) {
            if (!item) return
            try {
                await axios.delete(`${baseURL}/user/delete/${item._id}`)
                setShowDeletemodal(false)
                queryClient.invalidateQueries({ queryKey: ['doctors'] })
                queryClient.invalidateQueries({ queryKey: ['users'] })
                navigation.navigate("Admindoctorsuccess", { type: "remove" })

            } catch (error) {
                Alert.alert("Error", "Can't delete doctor try again")

            }

        } else {
            navigation.navigate("AdminDoctorprofile", { id: item._id })

        }
    }



    const Item = ({ item }: IItem) => {

        return (
            <Pressable onPress={() => {
                setItem(() => item)
                !item?.firstName ? setShowDeletemodal(true) : handleRemoveDoctor()
            }

            } style={{ borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10, borderBottomColor: "gainsboro" }}>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Text variant='titleMedium' style={[styles.title, { color: item?.firstName && item?.lastName ? "#000" : "red" }]}>{item?.firstName && item?.lastName ? `${item?.firstName} ${item?.lastName}` : "unclaimed email"}</Text>
                    <Text style={[styles.title,
                    { color: "#0665CB" }]}>{item?.firstName && item?.lastName ? "View" : "Delete"}</Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                    <Text style={[styles.title, { color: "#000", opacity: 0.5 }]}>{item?.email}</Text>
                </View>
            </Pressable>
        )
    };

    const Empty = () => {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No Doctor</Text>

            </View>
        )
    }



    const addADoctor = async () => {

        const newPost = {
            email: email?.trim(), adminUserId: user?._id?.trim()
        }

        try {
            const res = await axios.post(`${baseURL}/doctor/signupdoctor`, newPost).then((data) => data.data)

            if (res) {
                setShowmodal(false)
                await queryClient.invalidateQueries({ queryKey: ['doctors'] })
                setEmail("")
            }

        } catch (e) {
            setShowmodal(false)
            Alert.alert("unsuccesful", "Failed to invite email. try again")
        }
    }


    const filterItem = doctors?.slice().reverse()?.filter((item: IItem["item"]) => {
        if (!searchQuery) {
            return item
        }
        else {
            return item?.lastName.toLowerCase().includes(searchQuery.toLowerCase()) || item.firstName.toLowerCase().includes(searchQuery.toLowerCase())
        }

    })


    useEffect(() => {
        setDotors(data?.data)
    }, [data])



    return (
        <SafeAreaView style={styles.container}>

            <View style={{ width: "100%" }}>
                <ProfileAvatar
                    onPress={() => { }}
                    type='Start'
                    text={user.firstName}
                    photoUrl={user.avatar} />
            </View>


            <View style={{ width: "100%", flexDirection: "row" }}>
                <DoctorCard
                    title={"Doctors"}
                    isDoctor={true}
                    onPress={() => setShowmodal(true)}
                    subTitle={doctors ? doctors?.length : 0}
                    rightIcon={<FontAwesome name="stethoscope" size={22} color={"white"} />}
                />
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

            <View style={{ width: "100%", flex: 2 }}>

                <FlatList
                    data={filterItem}
                    renderItem={({ item }) => <Item item={item} />}
                    keyExtractor={item => item._id}
                    ListEmptyComponent={<Empty />}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{}}
                />
            </View>



            <Portal>
                <Modal visible={showmodal} onDismiss={() => setShowmodal(false)} contentContainerStyle={styles.modal}>
                    <Text variant="titleMedium" style={{ textAlign: "center", }}>Invite a new doctor</Text>
                    <TextInput mode='outlined' style={{ backgroundColor: "#fff" }} value={email} onChangeText={(e) => setEmail(e)} placeholder='Enter doctors email address' />
                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>

                        <View style={{ flexGrow: 1 }}>
                            <CustomButton onPress={() => setShowmodal(v => !v)} title='Cancel' type="secondary" />
                        </View>

                        <View style={{ flexGrow: 1 }}>
                            <CustomButton onPress={addADoctor} title='Add' />

                        </View>
                    </View>
                </Modal>
            </Portal>


            <Portal>
                <Modal visible={showDeletemodal} onDismiss={() => setShowDeletemodal(false)} contentContainerStyle={styles.modal}>
                    <Text variant="titleMedium" style={{ textAlign: "center", }}>You’re about to remove this email</Text>
                    <Text variant="titleMedium" style={{ textAlign: "center", opacity: 0.5 }}>Do you want to continue</Text>

                    <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>

                        <View style={{ flexGrow: 1 }}>
                            <CustomButton onPress={() => setShowDeletemodal(false)} title='Cancel' type="secondary" />
                        </View>


                        <View style={{ flexGrow: 1 }}>
                            <CustomButton onPress={handleRemoveDoctor} title='Remove Doctor' />
                        </View>
                    </View>
                </Modal>
            </Portal>

            {isLoading && <ActivityIndicator color='#0665CB' />}


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        paddingVertical: 20,
        gap: 20,
    },
    title: {
        fontFamily: 'avenir',
    }, modal: {
        backgroundColor: 'white',
        width: "80%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 15,
        gap: 10
    }

});

