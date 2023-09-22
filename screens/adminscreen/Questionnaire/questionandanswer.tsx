
import { useState, useEffect } from "react"
import { StyleSheet, ScrollView, View, Alert, } from 'react-native'
import { CustomButton } from '../../../components'
import { ActivityIndicator, Modal, Portal, Text } from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import { AdminQuestionandanswerRouteProp } from "../../../types";
import { MarkQuestionnaireAsComplete, baseURL, useUser } from "../../../services";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { useGetAdminnQuestionnaire } from "../../../services/doctorApi";
import { UserState } from "../../../redux/features/useSlice";
import { useAppSelector } from "../../../redux/hooks";

interface IUser {
    title: string,
    subtitle: string
}

interface IItem {
    item: {
        _id: string,
        status: "completed" | "uncompleted",
        user: {
            firstName: string,
            lastName: string,
            email: string
        },
        diseaseId: {
            title: string
        },
        createdAt: string,
        questionsAndAnswers: {
            answer: string,
            question: string,
            _id: string,
        }[]

    }
}

export default function Questionandanswer() {
    const queryClient = useQueryClient()


    const navigation = useNavigation()

    const route = useRoute<AdminQuestionandanswerRouteProp>()
    const {user} = useAppSelector(UserState)
    const { id } = route?.params

    const [showmodal, setShowmodal] = useState(false)
    const [loading, setLoading] = useState(false)
    const [userInfo, setUserInfo] = useState<IItem["item"]>()

    // const { data, isLoading } = useUser(id)
    const {data, isLoading} = useGetAdminnQuestionnaire()


    const User = ({ title, subtitle }: IUser) => {
        return (
            <View style={styles.card}>
                <Text style={{ color: "#0665CB" }}>{title}: </Text>
                <Text style={{ textAlign: "right" }}>{subtitle}</Text>
            </View>
        )
    }

  
 

    const handleMarkAsComplete = async() => {
        setLoading(true)
        try {
            const response = await MarkQuestionnaireAsComplete({diseaseId: id, userId: user._id})
            setShowmodal(false)
            Alert.alert("Done", response?.data?.message , [
                {style: "default",
                    onPress: () => {
                        queryClient.invalidateQueries({ queryKey: ['adminnQuestionnaire'] })
                        navigation.goBack()
                    }
                }
            ])

            // navigation.navigate("ConfirmAppointment")
        } catch (error) {
            setShowmodal(false)
            // console.log(error)
            Alert.alert("Error", "please retry sending")
        }
        setLoading(false)
    }




    // let dob = new Date(data?.data?.dob)

 

    useEffect(() => {
        const resCompleted = data?.questionnaires.find((v: IItem["item"]) => v._id === id)
        setUserInfo(resCompleted)
    }, [data, data?.questionnaires])



    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false} >

            <Text variant="titleLarge" style={{textAlign: "center"}}>{userInfo?.diseaseId.title}</Text>
            {userInfo && <>
                {User({ title: "Name", subtitle: `${userInfo?.user?.firstName} ${userInfo?.user?.lastName}` })}


                {User({ title: "Email", subtitle: userInfo?.user?.email })}
                {/* {User({ title: "Phone number", subtitle: data?.data?.phoneNumber })} */}
                {/* {User({ title: "Address", subtitle: data?.data?.address })} */}
                {/* {User({ title: "Sex", subtitle: data?.data?.gender })} */}
                {/* {User({ title: "Date of birth", subtitle: dob?.toLocaleDateString() !== "Invalid Date" ? dob?.toLocaleDateString() : "" })} */}
                {/* {User({ title: "Allergies", subtitle: data?.data?.allergies[0] })} */}
                {/* {User({ title: "Past appointments", subtitle: "0" })} */}


             <View style={{gap:10, marginTop: 20}}>
             <Text variant="titleLarge" style={{ color: "#0665CB", textAlign: "center" }} >Questionnnaire</Text>
             {
                    userInfo?.questionsAndAnswers.map(v => (
                        <View key={v._id}>
                            <Text variant="titleMedium" >{v.question} : </Text>
                            <Text style={{ color: "#0665CB" }} variant="bodyMedium">-{v.answer}</Text>
                        </View>
                    ))
                }
             </View>


              {userInfo?.status === "uncompleted"  &&  <View style={{ marginTop: 30 }}>
                    <CustomButton onPress={() => setShowmodal(true)} title='Mark as completed' />
                </View>}


                <Portal>
                    <Modal visible={showmodal} onDismiss={() => setShowmodal(false)} contentContainerStyle={styles.modal}>
                        <Text variant="titleMedium" style={{ textAlign: "center", }}>You’re about to mark treatment as complete</Text>
                        <Text variant="titleMedium" style={{ textAlign: "center", }}>Do you want to continue</Text>

                        <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>

                            <View style={{ flexGrow: 1 }}>
                                <CustomButton onPress={() => setShowmodal(false)} title='Cancel' type="secondary" />
                            </View>

                            <View style={{ flexGrow: 1 }}>
                                <CustomButton onPress={handleMarkAsComplete} title='Continue' />
                            </View>
                        </View>
                    </Modal>
                </Portal>
            </>}


            {/* {!isLoading && !data && <Text style={{ color: "red", textAlign: "center" }}>Not a registered user</Text>} */}

            <View style={{ justifyContent: "center", alignItems: "center" }}>
                {isLoading || loading && <ActivityIndicator size={"large"} color='#0665CB' />}

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



