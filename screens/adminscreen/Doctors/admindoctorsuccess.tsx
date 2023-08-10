import React from 'react'
import { Image, StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'
import { CustomButton } from '../../../components'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AdmindoctorsuccessRouteProp } from '../../../types'

const Admindoctorsuccess = () => {
    const navigation = useNavigation<any>()

    const route = useRoute< AdmindoctorsuccessRouteProp>()
    const {type} = route.params


  

    return (
        <View style={styles.root}>
            <View style={{ flex: 1, flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../../assets/success.png")} style={{ width: 50, aspectRatio: 1 }} />

                {type === "invite" && <Text variant='titleLarge' style={{ color: "#0665CB", textAlign: "center", fontFamily: "avenir", paddingVertical: 5 }}>You’ve successfully sent an invite</Text>}

                {type === "remove" && <Text variant='titleLarge' style={{ color: "#0665CB", textAlign: "center", fontFamily: "avenir", paddingVertical: 5 }}>You’ve successfully removed this doctor</Text>}
                {type === "invite" && <Text variant='bodyLarge' style={{ color: "#000000", textAlign: "center", fontFamily: "avenir", }}>You will be able to see the doctor’s details once they set up their account</Text>}
            </View>

            <CustomButton onPress={() => navigation.popToTop()} title={"Done"} />
        </View>
    )
}

export default Admindoctorsuccess

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    }
})