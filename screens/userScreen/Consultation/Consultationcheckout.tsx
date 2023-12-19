import { Alert, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { CardTag, CustomButton } from '../../../components'
import { ActivityIndicator, Card, MD2Colors, Text } from 'react-native-paper'

import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ConfirmappiontmentBookScreenProps, ConsultationcheckoutRouteProp } from '../../../types';
import { BookAppointment, getSubscription, useDoctor } from '../../../services';
import dayjs from 'dayjs';
import { useAppSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/features/useSlice';
import { useQueryClient } from '@tanstack/react-query';
import useRevenueCat from '../../../hooks/useRevenueCat';

const Consultationcheckout = () => {
    const { user } = useAppSelector(UserState)
    const navigation = useNavigation<ConfirmappiontmentBookScreenProps>()
    const route = useRoute<ConsultationcheckoutRouteProp>()
    const queryClient = useQueryClient()


    const { data = [], isLoading } = useDoctor(route?.params.doctorId)

    const {isProMember, currentOffering} = useRevenueCat()
    const [consultationsCount, setConsultationsCount] = useState(0)


    const handleCheckout = async() => {

        try {
        const response = await BookAppointment({
            appointmentId:route.params.appointmentId,
             doctorId: route.params.doctorId,
             startTime: route.params.startTime, 
             userID: user._id
            })
            await queryClient.invalidateQueries({ queryKey: ["doctorbyid"] })
            navigation.navigate("ConfirmappiontmentBook")

            
        
    } catch (error:any) {
        Alert.alert("Error", error.response.data.message)
    }
      
    
    }


    useEffect(() => {
        (async() => {
          const response = await getSubscription(user._id)
          setConsultationsCount(response.data.subscription.consultationsCount)
        })()
    
      }, [])


      if (!currentOffering) {
        return (
            <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "#fff" }]}>
                <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
            </View>
        )
    }
    


    return (
        <View style={styles.container}>

            <View>
                <CardTag
                    title={`${data?.data?.user?.firstName} ${data?.data?.user?.lastName}`}
                    subTitle={data?.data?.specialty}
                    url={data?.data?.user?.avatar}

                />
                <View style={{ marginLeft: "20%", backgroundColor: "#fff", flexDirection: "row", alignItems: "center", gap: 10 }}>
                    <Ionicons name="md-star" size={24} color="#FFCE31" />
                    <Text variant='bodySmall'>{data?.data?.averageRating?.toFixed(1)}</Text>
                </View>
            </View>



            <View>
                <Card style={{ backgroundColor: "#fff" }} mode='contained' >
                    <Card.Content>
                        <Text variant='titleLarge' style={{ fontFamily: 'avenir', }} >Details</Text>
                        <View style={styles.detail}>
                            <Text variant='bodyLarge'>Date</Text>
                            <Text variant='bodyLarge'>{dayjs(route.params.startDate).format('D - M - YYYY')}</Text>
                        </View>

                        <View style={styles.detail}>
                            <Text variant='bodyLarge'>Time</Text>
                            <Text variant='bodyLarge'>{route.params.startTime}</Text>
                        </View>

                        {/* <View style={styles.detail}>
                            <Text variant='bodyLarge'>Fee</Text>
                            <Text variant='bodyLarge'>${data?.data?.rate}</Text>
                        </View> */}
                    </Card.Content>
                </Card>
            </View>

            <View style={{ width: "100%", marginTop: 30, }}>
                {(isProMember && consultationsCount > 0 ) && <CustomButton title="Book Appointment" onPress={() => Alert.alert("Book Appointment", `Proceed to book appointment with  Dr.${data?.data?.user?.firstName} ${data?.data?.user?.lastName}.`, [
                    {
                        style: "cancel",
                        text: "cancel",
                        onPress: () => {}
                    },
                    {
                        text: "Confirm",
                        onPress: handleCheckout
                    }
                ])} />
            }

            {(isProMember && consultationsCount == 0 ) && <CustomButton title="Subsquire" onPress={() => navigation.navigate("Subscribe", {isFromProfile: false})} />}
                
                {!isProMember && <CustomButton title="Subsquire" onPress={() => navigation.navigate("Subscribe", {isFromProfile: false})} />}
            
            
            </View>


            {isLoading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}
        </View>
    )
}

export default Consultationcheckout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        padding: 10,
        backgroundColor: "#fff",
        rowGap: 10,
        paddingTop: 20


    },
    detail: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingTop: 20,
        paddingBottom: 10
    }
})