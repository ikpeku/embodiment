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

type IdiseaseId = { diseaseId:string}
const GASTRITIS = ({diseaseId}:IdiseaseId) => {

    const { currentOffering } = useRevenueCat()
    const {user} = useAppSelector(UserState)


    const [isLoading, setIsLoading] = useState(false)

    const navigation = useNavigation<QuestionnaireScreenProps>()
    // const navigate = useNavigation<UserConsultationScreenProp>()

    const [progress, setProgress] = useState(0.1)

    const [question1, setQuestion1] = useState<"Yes" | "No">("Yes")
    const [question2, setQuestion2] = useState<"Yes" | "No">("Yes")
    const [question3, setQuestion3] = useState<"Yes" | "No">("Yes")
    const [question4, setQuestion4] = useState<"Yes" | "No">("Yes")
    const [question5, setQuestion5] = useState<"Yes" | "No">("Yes")
    const [question6, setQuestion6] = useState<"Yes" | "No">("Yes")
    const [question7, setQuestion7] = useState<"Yes" | "No">("Yes")




const result: {
    question: string,
    answer: string | number
}[] =  [
    {
        question: "Do you experience any of the following symptoms? Pain or discomfort in the upper abdomen:",
        answer: question1
    },
    {
        question: "How would you describe the pain or discomfort? Burning or gnawing sensation:",
        answer: question2
    },
    {
        question: `Do you experience any of the following
        ,chest pain that radiates to the back, arm, or jaw
        ,difficult or painful to swallow
        ,symptoms don’t wake you up at night
        ,coughing up blood or seeing blood in your stool`,
        answer: question3
    },
    {
        question: `
        When do you experience these symptoms?
        After eating or while hungry
        `,
        answer: question4
    },
    {
        question: "Are you pregnant?",
        answer: question5
    },
    {
        question: `
        Do you experience any of the following symptoms?
Nausea or vomiting
Loss of appetite
Bloating or feeling full quickly
Burping or belching
Dark, tarry stools or bloody vomit
        `,
        answer: question6
    },
    {
        question: `How severe are your symptoms?
        Mild to moderate`,
        answer: question7
    },
]




    const handleStepThree = async() => {

        if (question3 === "Yes") {

            setIsLoading(true)
            try {
                const Gastritis = currentOffering?.availablePackages.find(offer => offer.identifier === "Gastritis")
                if (Gastritis) {
                    const purchaseInfo = await Purchases.purchasePackage(Gastritis)
                    if (purchaseInfo?.customerInfo?.entitlements?.active) {
                const response = await SubmitQuetionnaire({diseaseId, userId: user._id, questionsAndAnswers: result.slice(0,3)})
    
                Alert.alert("Done", response?.data?.message, [
                    {
                      text: 'Cancel',
                      onPress: () => navigation.goBack(),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () =>navigation.popToTop()},
                  ])

                }}
    
                // navigation.navigate("ConfirmAppointment")
            } catch (error) {
                // console.log(error)
                Alert.alert("Error", "please retry sending")
            }
            // navigation.navigate("ConfirmAppointment")
            setIsLoading(false)
            // navigation.navigate("ConfirmAppointment")
        } else {
            setProgress((current) => current + 0.1)

        }

    }

    const handleSubmit = async() => {
        setIsLoading(true)
        try {
            const Gastritis = currentOffering?.availablePackages.find(offer => offer.identifier === "Gastritis")
            if (Gastritis) {
                const purchaseInfo = await Purchases.purchasePackage(Gastritis)
                if (purchaseInfo?.customerInfo?.entitlements?.active) {
            const response = await SubmitQuetionnaire({diseaseId, userId: user._id, questionsAndAnswers: result})

            Alert.alert("Done", response?.data?.message, [
                {
                  text: 'Cancel',
                  onPress: () => navigation.goBack(),
                  style: 'cancel',
                },
                {text: 'OK', onPress: () =>navigation.popToTop()},
              ])
            }}

            // navigation.navigate("ConfirmAppointment")
        } catch (error) {
            // console.log(error)
            Alert.alert("Error", "please retry sending")
        }
        // navigation.navigate("ConfirmAppointment")
        setIsLoading(false)
        // navigation.navigate("ConfirmAppointment")

    }

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView >
                <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 18</Text>

                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you experience any of the following symptoms?
                        </Text>
                    </View>
                    <Text variant='titleMedium' style={{ textAlign: "center", }}>
                        -Pain or discomfort in the upper abdomen
                    </Text>

                    <Pressable onPress={() => setQuestion1("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question1 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question1 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            How would you describe the pain or discomfort?
                        </Text>
                    </View>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        -Burning or gnawing sensation
                    </Text>

                    <Pressable onPress={() => setQuestion2("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question2 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question2 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                </View>}

                {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you experience any of the following
                        </Text>
                    </View>

                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        -chest pain that radiates to the back, arm, or jaw
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        -difficult or painful to swallow
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        -symptoms don’t wake you up at night
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "left", }}>
                        -coughing up blood or seeing blood in your stool
                    </Text>

                    <Pressable onPress={() => setQuestion3("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question3 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question3 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={question3 === "Yes" ? "Book Appointment" : "Next"} onPress={handleStepThree} />
                </View>}



                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            When do you experience these symptoms?

                        </Text>
                        <Text variant='titleMedium' style={{ textAlign: "center", }}>
                            Burning or gnawing sensation
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion4("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question4 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion4("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question4 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                </View>}


                {+progress.toFixed(1) * 10 === 5 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Are you pregnant?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion5("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question5 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion5("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question5 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                </View>}

                {+progress.toFixed(1) * 10 === 6 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you experience any of the following symptoms?
                        </Text>
                    </View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        -Nausea or vomiting
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        -Loss of appetite
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        -Bloating or feeling full quickly
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        -Burping or belching
                    </Text>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        -Dark, tarry stools or bloody vomit
                    </Text>

                    <Pressable onPress={() => setQuestion6("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question6 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question6 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                </View>}

                {+progress.toFixed(1) * 10 === 7 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>

                            How severe are your symptoms?
                        </Text>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Mild to moderate
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion7("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question7 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion7("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question7 === "No" ? "checked" : "unchecked"}
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

export default GASTRITIS;

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



