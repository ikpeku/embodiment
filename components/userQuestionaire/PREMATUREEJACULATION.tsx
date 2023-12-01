import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { Text, ProgressBar, Checkbox, ActivityIndicator, MD2Colors } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { QuestionnaireScreenProps, UserConsultationScreenProp } from "../../types";
import CustomButton from "../Button";
import { SubmitQuetionnaire } from "../../services";
import { useAppSelector } from "../../redux/hooks";
import { UserState } from "../../redux/features/useSlice";
import Purchases from "react-native-purchases";
import useRevenueCat from "../../hooks/useRevenueCat";


type IdiseaseId = { diseaseId: string }

const PREMATUREEJACULATION = ({ diseaseId }: IdiseaseId) => {
    const { currentOffering } = useRevenueCat()

    const { user } = useAppSelector(UserState)

    const navigation = useNavigation<QuestionnaireScreenProps>()
    const navigate = useNavigation<UserConsultationScreenProp>()

    const [progress, setProgress] = useState(0.1)
    const [isLoading, setIsLoading] = useState(false)

    const [question1, setQuestion1] = useState<"Yes I always ejaculate too soon" | "Yes , more than half the time" |
     "Yes less than half the time" | "No I never ejaculate too soon" | string>("")
    const [question2, setQuestion2] = useState<"Ejaculation within one minute of sexual activity" |
        "Persistent or recurrent ejaculation with minimal stimulation"
        | "Inability to delay ejaculation during sexual activity"
        | "Negative personal or interpersonal consequences due to premature ejaculation"
        | "None of the above"
        | string>("")

    const [question3, setQuestion3] = useState<"Within 1 min" | "1-3 min" | "5-10 min" | "More than 10 min" | string>("")
    const [question4, setQuestion4] = useState<"Yes" | "No" | string>("")


    const result: {
        question: string,
        answer: string | number
    }[] = [
            {
                question: "Have you been experiencing ejaculation during sexual activity sooner than you or your partner would like?",
                answer: question1
            },
            {
                question: "Have you been experiencing any of the following symptoms?",
                answer: question2
            },
            {
                question: "Select the option that best describes the average time you spend before ejaculation?",
                answer: question3
            },
            {
                question: "Have you been experiencing any other symptoms, such as anxiety or depression?",
                answer: question4
            },

        ]




    const handleStepFour = async () => {

        // if (question4 === "Yes") {
        //     navigate.navigate("Consultation")
        // } else {


            setIsLoading(true)
            try {
                const Premature_ejaculation = currentOffering?.availablePackages.find(offer => offer.identifier === "Premature ejaculation")
                if (Premature_ejaculation) {
                    const purchaseInfo = await Purchases.purchasePackage(Premature_ejaculation)
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

            } catch (error) {

                // Alert.alert("Error", "please retry sending")
            }
            setIsLoading(false)
            // navigation.navigate("ConfirmAppointment")

        // }
    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView >
                <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 10</Text>

                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing ejaculation during sexual activity sooner than you or your partner would like?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion1("Yes I always ejaculate too soon")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes I always ejaculate too soon</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question1 === "Yes I always ejaculate too soon" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Yes , more than half the time")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes , more than half the time</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question1 === "Yes , more than half the time" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Yes less than half the time")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes less than half the time</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question1 === "Yes less than half the time" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("No I never ejaculate too soon")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No I never ejaculate too soon</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question1 === "No I never ejaculate too soon" ? "checked" : "unchecked"}
                        />
                    </Pressable>



                   {question1 && <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />}

                </View>}

                {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing any of the following symptoms:
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion2("Ejaculation within one minute of sexual activity")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Ejaculation within one minute of sexual activity</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "Ejaculation within one minute of sexual activity" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("Persistent or recurrent ejaculation with minimal stimulation")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Persistent or recurrent ejaculation with minimal stimulation</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "Persistent or recurrent ejaculation with minimal stimulation" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("Inability to delay ejaculation during sexual activity")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Inability to delay ejaculation during sexual activity</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "Inability to delay ejaculation during sexual activity" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("Negative personal or interpersonal consequences due to premature ejaculation")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Negative personal or interpersonal consequences due to premature ejaculation</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "Negative personal or interpersonal consequences due to premature ejaculation" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <Pressable onPress={() => setQuestion2("None of the above")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None of the above</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "None of the above" ? "checked" : "unchecked"}
                        />
                    </Pressable>



                   { question2 && <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />}

                </View>}

                {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Select the option that best describes the average time you spend before ejaculation
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion3("Within 1 min")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Within 1 min</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "Within 1 min" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("1-3 min")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">1-3 min</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "1-3 min" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("5-10 min")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">5-10 min</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "5-10 min" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("More than 10 min")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">More than 10 min</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "More than 10 min" ? "checked" : "unchecked"}
                        />
                    </Pressable>



                    {question3 && <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />}

                </View>}

                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing any other symptoms, such as anxiety or depression?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion4("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question4 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion4("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question4 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    {question4 && <CustomButton title={"Submit"} onPress={handleStepFour} />}

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

export default PREMATUREEJACULATION;

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

