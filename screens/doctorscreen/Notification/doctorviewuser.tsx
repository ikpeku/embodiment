import { Alert, StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Card, MD2Colors, Modal, Portal, Text } from "react-native-paper";
import { MarkAppointmentAsComplete, useUser } from "../../../services";
import { useRoute } from "@react-navigation/native";
import { DoctorviewuserRouteProps } from "../../../types";
import { CustomButton } from "../../../components";
import { UserState } from "../../../redux/features/useSlice";
import { useAppSelector } from "../../../redux/hooks";


interface IItem {
    title: string;
    subTitle: string;
}

export default function Doctorviewuser() {

    const {user} = useAppSelector(UserState)
    const [showmodal, setShowmodal] = useState(false)
    const route = useRoute<DoctorviewuserRouteProps>()
    const { data , isLoading} = useUser(route.params.id)
    const [loading , setLoading] = useState(false)

    const Item = ({title, subTitle}:IItem) => (
        <View style={styles.detail}>
                            <Text variant='bodyLarge' style={{color: "#0665CB"}}>{title}</Text>
                            <Text variant='bodyLarge'>{subTitle}</Text>
           
                        </View>
    )



    const handleCompleteAppointment = async() => {
        setLoading(true)
        try {
            const response = await MarkAppointmentAsComplete({appointmentId, doctorId: user._id, scheduleId})
            setShowmodal(false)

        console.log(response.data)
        //     Alert.alert("Done", response?.data?.message)

            // navigation.navigate("ConfirmAppointment")
        } catch (error) {
            setShowmodal(false)
            console.log(error)
            Alert.alert("Error", "please retry sending")
        }
        setLoading(false)

    }



  return (
    <View style={styles.container}>
      <View>
                <Card style={{ backgroundColor: "#fff" }} mode='contained' >
                    <Card.Content>

                        <Item title="Patient:" subTitle={data?.data ? `${data?.data?.firstName} ${data?.data?.lastName}` : ""} />
                        <Item title="Sex:" subTitle={data?.data?.gender ? data?.data?.gender : ""} />
                        <Item title="Date of birth:" subTitle={data?.data?.dob ? data?.data?.dob : ""}  />
                        <Item title="Allergies:" subTitle={data?.data?.allergies[0] ? data?.data?.allergies[0] : "" } />
                      
                        <View style={styles.detail}>
                            <Text variant='bodyLarge' style={{color: "#0665CB"}}>Past appointments:</Text>
                            {
                              data?.data?.pastAppointment &&  [...data?.data?.pastAppointment].map(subTitle =>  <Text key={subTitle} variant='bodyLarge'>{subTitle}</Text>)
                            }
                           
           
                        </View>

                        <View style={{paddingTop: 30}}>
                        {user.role === "isDoctor" && <CustomButton onPress={() => setShowmodal(true)} title="Mark Appointment as complete" />}
                        </View>
                    </Card.Content>
                </Card>
            </View>
            <Portal>
                    <Modal visible={showmodal} onDismiss={() => setShowmodal(false)} contentContainerStyle={styles.modal}>
                        <Text variant="titleMedium" style={{ textAlign: "center", }}>You’re about to mark appointment as complete.</Text>
                        <Text variant="titleMedium" style={{ textAlign: "center", }}>Do you wish to continue?</Text>

                        <View style={{ flexDirection: "row", justifyContent: "center", gap: 10 }}>

                            <View style={{ flexGrow: 1 }}>
                                <CustomButton onPress={() => setShowmodal(false)} title='Cancel' type="secondary" />
                            </View>

                            <View style={{ flexGrow: 1 }}>
                                <CustomButton onPress={handleCompleteAppointment} title='Continue' />
                            </View>
                        </View>
                    </Modal>
                </Portal>

            { isLoading || loading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        paddingVertical: 16
    },
    detail: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingTop: 20,
        paddingBottom: 10,
        borderColor: "#00000026"
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
});
