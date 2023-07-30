import { StyleSheet, View } from 'react-native'
import React from 'react'
import { CardTag } from '../../../components'
import { Card, Text } from 'react-native-paper'
import { Button } from '../../../static'
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router'


const Checkout = () => {
    const router = useRouter()

    const handleCheckout = () => {
        router.push("./confirmAppointment")
    }



    return (
        <View style={styles.container}>
            <View>
                <CardTag
                    title={"Dr. Benjamin John"}
                    subTitle={"Dr. Benjamin John"}
                    url={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"}

                />
                <View style={{ marginLeft: "20%", backgroundColor: "#fff" }}>
                    <Ionicons name="md-star" size={24} color="#FFCE31" />
                    <Text variant='bodySmall'>4.5</Text>
                </View>
            </View>



            <View>
                <Card style={{ backgroundColor: "#fff" }} mode='contained' >
                    <Card.Content>
                        <Text variant='headlineMedium' style={{ fontFamily: 'Avenir', }} >Details</Text>
                        <View style={styles.detail}>
                            <Text variant='bodyLarge'>Date</Text>
                            <Text variant='bodyLarge'>16-6-2034</Text>
                        </View>

                        <View style={styles.detail}>
                            <Text variant='bodyLarge'>Time</Text>
                            <Text variant='bodyLarge'>11: 00 am</Text>
                        </View>

                        <View style={styles.detail}>
                            <Text variant='bodyLarge'>Fee</Text>
                            <Text variant='bodyLarge'>$15</Text>
                        </View>
                    </Card.Content>
                </Card>
            </View>

            <View style={{ width: "100%", marginTop: 30, }}>
                <Button title="Pay" onPress={handleCheckout} />
            </View>
        </View>
    )
}

export default Checkout

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