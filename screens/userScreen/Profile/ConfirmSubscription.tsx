import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { CustomButton } from '../../../components'
import { UserProfileScreenProp } from '../../../types'


const ConfirmSubscription = () => {
    const navigation = useNavigation< UserProfileScreenProp>()

    return (
        <View style={styles.root}>
            <View style={{ flex: 1, flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../../assets/success.png")} style={{ width: 50, aspectRatio: 1 }} />
                <Text style={{ color: "#0665CB", textAlign: "center", fontFamily: "avenir", fontWeight: "bold", fontSize: 24, lineHeight: 33 }}>Your monthly subscription was successfully</Text>
            </View>

            <CustomButton onPress={() => navigation.navigate("Profile")} title={"Done"} />
        </View>
    )
}

export default ConfirmSubscription

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    }
})