import { useState } from "react"
import { StyleSheet, ScrollView, View, Alert, } from 'react-native'
import { CustomButton } from '../../../components'
import { ActivityIndicator, Modal, Portal, Text } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import { AdminUserprofileRouteProp } from "../../../types";
import { baseUrl, useUser } from "../../../services";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';

interface IUser {
    title: string,
    subtitle: string
}

export default function AdminUserprofile() {
    const queryClient = useQueryClient()


    const navigation = useNavigation<any>()

    const route = useRoute<AdminUserprofileRouteProp>()
    const { id } = route?.params

    const [showmodal, setShowmodal] = useState(false)

    const { data, isLoading } = useUser(id)

    const User = ({ title, subtitle }: IUser) => {
        return (
            <View style={styles.card}>
                <Text style={{ color: "#0665CB" }}>{title}: </Text>
                <Text style={{ textAlign: "right" }}>{subtitle}</Text>
            </View>
        )
    }

    // const handleRemoveUser = () => {
    //     setShowmodal(false)
    //     navigation.navigate("Confirmremoveuser")

    // }

    const handleRemoveUser = useMutation({
        mutationFn: async () => {
          return await axios.delete(`${baseUrl}/user/delete/${id}`)
        },
        onSuccess: async() => {
            await queryClient.invalidateQueries({ queryKey: ['users'] })
            navigation.navigate("Confirmremoveuser")
            // queryClient.invalidateQueries({ queryKey: ['reminders'] })
          },
         onError: () => {
            Alert.alert("Error",  "Can't delete user. try again")
         },
         onMutate: () => {
            setShowmodal(false)
         }
      })




    let dob = new Date(data?.data?.dob)

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false} >
            {data && <>
                {User({ title: "Name", subtitle: `${data?.data?.firstName} ${data?.data?.lastName}` })}
                {User({ title: "Email", subtitle: data?.data?.email })}
                {User({ title: "Phone number", subtitle: data?.data?.phoneNumber })}
                {User({ title: "Address", subtitle: data?.data?.address })}
                {User({ title: "Sex", subtitle: data?.data?.gender })}
                {User({ title: "Date of birth", subtitle: dob?.toLocaleDateString() !== "Invalid Date" ? dob?.toLocaleDateString() : "" })}
                {User({ title: "Allergies", subtitle: data?.data?.allergies[0] })}
                {User({ title: "Past appointments", subtitle: "0" })}


                <View style={{ marginTop: 30 }}>
                    <CustomButton onPress={() => setShowmodal(true)} title='Remove' />
                </View>


                <Portal>
                    <Modal visible={showmodal} onDismiss={() => setShowmodal(false)} contentContainerStyle={styles.modal}>
                        <Text variant="titleMedium" style={{ textAlign: "center", }}>You’re about to remove this user</Text>
                        <Text variant="titleMedium" style={{ textAlign: "center", }}>Do you want to continue</Text>

                        <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>

                            <View style={{ flexGrow: 1 }}>
                                <CustomButton onPress={() => setShowmodal(false)} title='Cancel' type="secondary" />
                            </View>

                            <View style={{ flexGrow: 1 }}>
                                <CustomButton onPress={() => handleRemoveUser.mutate()} title='Remove' />
                            </View>
                        </View>
                    </Modal>
                </Portal>
            </>}


            {!isLoading && !data && <Text style={{ color: "red", textAlign: "center" }}>Not a registered user</Text>}

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                {isLoading && <ActivityIndicator size={"large"} color='#0665CB' />}

            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"

    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "gainsboro",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 15,
    },
    modal: {
        backgroundColor: 'white',
        width: "80%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 15,
        gap: 10
    }

})