import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { CustomButton } from '../../../components'
import {AdminusersScreenNavigationProp } from '../../../types'

const Confirmremoveuser = () => {
    const navigation = useNavigation<AdminusersScreenNavigationProp>()

    return (
        <View style={styles.root}>
            <View style={{ flex: 1, flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../../assets/success.png")} style={{ width: 50, aspectRatio: 1 }} />
                <Text style={{ color: "#0665CB", textAlign: "center", fontFamily: "avenir", fontWeight: "bold", fontSize: 24, lineHeight: 33 }}>You’ve successfully removed this user</Text>
            </View>

            <CustomButton onPress={() => navigation.navigate("Adminusers")} title={"Done"} />
        </View>
    )
}

export default Confirmremoveuser

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    }
})