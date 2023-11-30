
import { View, ScrollView, KeyboardAvoidingView, Pressable, StyleSheet, Alert } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Checkbox, MD2Colors, ProgressBar, Text } from "react-native-paper";
import CustomButton from "../Button";
import { useNavigation } from "@react-navigation/native";
import { QuestionnaireScreenProps } from "../../types";
import { useAppSelector } from "../../redux/hooks";
import { UserState } from "../../redux/features/useSlice";
import { SubmitQuetionnaire } from "../../services";
import Purchases from "react-native-purchases";
import useRevenueCat from "../../hooks/useRevenueCat";

type IdiseaseId = { diseaseId: string }
const COMMONCOLD = ({ diseaseId }: IdiseaseId) => {

    const { currentOffering } = useRevenueCat()
    const { user } = useAppSelector(UserState)


    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation<QuestionnaireScreenProps>()
    // const navigate = useNavigation<UserConsultationScreenProp>()

    const [progress, setProgress] = useState(0.1)

    const [question1, setQuestion1] = useState<"Yes" | "No">("Yes")
    const [question2, setQuestion2] = useState<"Yes" | "No">("Yes")
    const [question3, setQuestion3] = useState<"Yes" | "No">("Yes")



    const result: {
        question: string,
        answer: string | number
    }[] = [
            {
                question: `
            Have you been experiencing any of the following symptoms?
Runny or stuffy nose
Sneezing
Sore throat
Cough
Headache
Body aches
Mild fever
            `,
                answer: question1
            },
            {
                question: `
            Have you been experiencing any of the following symptoms?
Severe fever (above 38°C)
Chest pain or tightness
Shortness of breath
Difficulty breathing
Wheezing
            `,
                answer: question2
            },
            {
                question: `
            Have you been experiencing symptoms for less than 2 weeks?
            `,
                answer: question3
            },

        ]


    const handleStepTwo = async () => {

        if (question2 === "Yes") {
            setIsLoading(true)
            try {
                const Common_Cold = currentOffering?.availablePackages.find(offer => offer.identifier === "Common Cold")
                if (Common_Cold) {
                    const purchaseInfo = await Purchases.purchasePackage(Common_Cold)
                    if (purchaseInfo?.customerInfo?.entitlements?.active) {
                        const response = await SubmitQuetionnaire({ diseaseId, userId: user._id, questionsAndAnswers: result.slice(0, 2) })

                        Alert.alert("Done", response?.data?.message, [
                            {
                                text: 'Cancel',
                                onPress: () => navigation.goBack(),
                                style: 'cancel',
                            },
                            { text: 'OK', onPress: () => navigation.popToTop() },
                        ])
                    }
                }
                // navigation.navigate("ConfirmAppointment")
            } catch (error) {
                // console.log(error)
                Alert.alert("Error", "please retry sending")
            }
            setIsLoading(false)
        } else {
            setProgress((current) => current + 0.1)

        }

    }

    const handleSubmit = async () => {

        setIsLoading(true)
        try {
            const Common_Cold = currentOffering?.availablePackages.find(offer => offer.identifier === "Common Cold")
            if (Common_Cold) {
                const purchaseInfo = await Purchases.purchasePackage(Common_Cold)
                if (purchaseInfo?.customerInfo?.entitlements?.active) {
                    const response = await SubmitQuetionnaire({ diseaseId, userId: user._id, questionsAndAnswers: result })

                    Alert.alert("Done", response?.data?.message, [
                        {
                            text: 'Cancel',
                            onPress: () => navigation.goBack(),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => navigation.popToTop() },
                    ])
                }
            }
            // navigation.navigate("ConfirmAppointment")
        } catch (error) {
            // console.log(error)
            Alert.alert("Error", "please retry sending")
        }

        setIsLoading(false)

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView >
                <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 3</Text>


                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing any of the following symptoms?
                        </Text>
                    </View>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Runny or stuffy nose
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Sneezing
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Sore throat
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Cough
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Headache
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Body aches
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Mild fever
                    </Text>

                    <Pressable onPress={() => setQuestion1("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question1 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question1 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing any of the following symptoms?
                        </Text>
                    </View>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Severe fever (above 38°C)
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Chest pain or tightness
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Shortness of breath
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Difficulty breathing
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        *Wheezing
                    </Text>

                    <Pressable onPress={() => setQuestion2("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={handleStepTwo} />
                </View>}

                {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing symptoms for less than 2 weeks?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion3("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Book Appointment"} onPress={handleSubmit} />
                </View>}


                {isLoading && (
                    <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                        <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                    </View>
                )}

            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default COMMONCOLD;

const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10
    },
    box: {
        // flex: 1,
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "gainsboro",
        borderRadius: 8,
        padding: 10,
        marginVertical: 5
    }
})

