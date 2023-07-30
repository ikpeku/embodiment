import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import { Button } from '../../../static'
import { useRouter } from 'expo-router'

const Done = () => {
    const route = useRouter()

    return (
        <View style={styles.root}>
            <View style={{ flex: 1, flexGrow: 1, justifyContent: "center", alignItems: "center" }}>
                <Image source={require("../../../assets/success.png")} style={{ width: 50, aspectRatio: 1 }} />
                <Text style={{ color: "#0665CB", textAlign: "center", fontFamily: "Avenir", fontWeight: "bold", fontSize: 24, lineHeight: 33 }}>Your monthly subscription was successfully</Text>
            </View>

            <Button onPress={() => route.replace("../../")} title={"Done"} />
        </View>
    )
}

export default Done

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 20
    }
})