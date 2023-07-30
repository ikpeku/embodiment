import { Pressable, ScrollView, StyleSheet, View, } from 'react-native'
import { Text, Checkbox, Divider, Card } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Button } from '../../../static';
import { useRouter } from 'expo-router';



const Render = ({ title }) => (
    <View style={{ width: "100%", flexDirection: "row", gap: 15 }}>
        <Octicons name="check" size={24} color="#0665CB" />
        <Text variant="bodyLarge">{title}</Text>
    </View>
)


const Subscribe = () => {
    const [annual, setAnnual] = useState("annual")

    const router = useRouter()


    const onSubsquire = () => {
        router.push("./Done")
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.root}>

                <View style={styles.boxContainer}>
                    <Pressable onPress={() => setAnnual("monthly")} style={[styles.box, annual == "monthly" ? { backgroundColor: "#0665CB", borderColor: "#0665CB" } : { backgroundColor: "#F4F4F4", borderColor: "#F4F4F4" }]}>
                        <Text variant="titleLarge" style={{ color: annual === "monthly" ? "#fff" : "#000" }}>Monthly</Text>
                    </Pressable>


                    <Pressable onPress={() => setAnnual("annual")} style={[styles.box, annual == "annual" ?
                        { backgroundColor: "#0665CB", borderColor: "#0665CB" } : { backgroundColor: "#F4F4F4", borderColor: "#F4F4F4" }]}>
                        <Text variant="titleLarge" style={{ color: annual !== "monthly" ? "#fff" : "#000" }} >Annual</Text>
                    </Pressable>

                </View>


                <Card style={{ backgroundColor: "#fff", }}>
                    <View style={{ alignItems: "center", padding: 20 }}>
                        <Text variant="titleLarge" style={{ fontFamily: "Avenir" }}>Individual</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 24, fontFamily: "Avenir" }} variant="titleLarge">
                            {annual === "annual" ? "$120" : "$10"}
                            <Text style={{}} variant="titleLarge">
                                {annual === "annual" ? "/y" : "/m"}
                            </Text>
                        </Text>
                    </View>

                    <Divider style={{}} />

                    <View style={{ gap: 10, padding: 20 }}>
                        <Render title="1 appointment everyday" />
                        <Render title="Drug refill every week" />
                        <Render title="Free delivery" />
                    </View>

                    <View style={{ width: "75%", alignSelf: "center", paddingVertical: 20 }}>
                        <Button title="Subscribe" onPress={onSubsquire} />
                    </View>

                </Card>

                <Card style={{ backgroundColor: "#fff", }}>
                    <View style={{ alignItems: "center", padding: 20 }}>
                        <Text variant="titleLarge" style={{ fontFamily: "Avenir" }}>Family</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 24, fontFamily: "Avenir" }} variant="titleLarge">
                            {annual === "annual" ? "$180" : "$15"}
                            <Text style={{}} variant="titleLarge">
                                {annual === "annual" ? "/y" : "/m"}
                            </Text>
                        </Text>
                    </View>

                    <Divider style={{}} />

                    <View style={{ gap: 10, padding: 20 }}>
                        <Render title="Up to 3 appointments everyday " />
                        <Render title="Drug refill every week" />
                        <Render title="Free delivery" />
                    </View>

                    <View style={{ width: "75%", alignSelf: "center", paddingVertical: 20 }}>
                        <Button title="Subscribe" onPress={onSubsquire} />
                    </View>

                </Card>

            </View>
        </ScrollView>
    )
}

export default Subscribe

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 20,
        rowGap: 25
    },
    boxContainer: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: "#F4F4F4",
        borderRadius: 5,
    },
    box: {
        borderWidth: 1,
        borderRadius: 8,
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 12
    }

})