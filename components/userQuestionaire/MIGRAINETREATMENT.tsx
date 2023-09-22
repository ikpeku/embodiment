import { Alert, KeyboardAvoidingView, Pressable, ScrollView, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Checkbox, MD2Colors, ProgressBar, Text } from "react-native-paper";
import CustomButton from "../Button";
import { useNavigation } from "@react-navigation/native";
import { QuestionnaireScreenProps, UserConsultationScreenProp } from "../../types";
import { SubmitQuetionnaire } from "../../services";
import { UserState } from "../../redux/features/useSlice";
import { useAppSelector } from "../../redux/hooks";

type IdiseaseId = { diseaseId:string}

const MIGRAINETREATMENT = ({diseaseId}:IdiseaseId) => {
    const {user} = useAppSelector(UserState)
    const navigation = useNavigation<QuestionnaireScreenProps>()
    const navigate = useNavigation<UserConsultationScreenProp>()

    const [progress, setProgress] = useState(0.1)
    const [isLoading, setIsLoading] = useState(false)

    const [question1, setQuestion1] = useState<"Yes" | "No">("Yes")

    const [question2sub1, setQuestion2Sub1] = useState<boolean>(false)
    const [question2sub2, setQuestion2Sub2] = useState<boolean>(false)
    const [question2sub3, setQuestion2Sub3] = useState<boolean>(false)
    const [question2sub4, setQuestion2Sub4] = useState<boolean>(false)
    const [question2sub5, setQuestion2Sub5] = useState<boolean>(false)
    const [question2sub6, setQuestion2Sub6] = useState<boolean>(false)

    const [question3, setQuestion3] = useState<"Fewer than 15 times per month" | "0nce or twice a week" | "Not sure">("0nce or twice a week")
    const [question4, setQuestion4] = useState<"Less than 1 year" | "1-5 years" | "More than 5 years">("More than 5 years")
    const [question5, setQuestion5] = useState<"Yes" | "No" >("No")
    const [question6, setQuestion6] = useState<"Yes" | "No" >("No")
    const [question7, setQuestion7] = useState<"Yes" | "No" >("No")


    const result: {
        question: string,
        answer: string | number
    }[] =  [
        {
            question: "Do you experience Intense, throbbing headache on one side of the head or both sides?",
            answer: question1
        },
        {
            question: "Have you experienced any of the following symptoms before or during a headache?",
            answer: `${question2sub1 ? "Sensitivity to light, noise, or smells," : ""} ${question2sub2 ? "Nausea or vomiting," : ""} ${question2sub3 ? "Blurred vision," : ""} ${question2sub4 ? "Lightheadedness, dizziness, or vertigo," : ""} ${question2sub5 ? "Tingling or numbness in your face or extremities," : ""} ${question2sub6 ? "None" : ""}
             `.trim()
        },
        {
            question: "How often do you experience these headaches?",
            answer: question3
        },
        {
            question: "How long have been having these headaches?",
            answer: question4
        },
        {
            question: "Have you been treated for migraine before?",
            answer: question5
        },
        {
            question: "Have you noticed a change in the frequency and or severity of your migraine in the last few months?",
            answer: question6
        },
        {
            question: "Now that we have a bit of your migraine history, how can our medical providers best help you today?",
            answer: "I want to renew my prescription"
        }
    ]


    useEffect(() => {
        if(question2sub6) {
            setQuestion2Sub1(false)
            setQuestion2Sub2(false)
            setQuestion2Sub3(false)
            setQuestion2Sub4(false)
            setQuestion2Sub5(false)
        } 

    }, [question2sub6])

    useEffect(() => {
           if(question2sub1 || question2sub2 || question2sub3 || question2sub4 || question2sub5) {
            setQuestion2Sub6(false)
        } 

    }, [question2sub1, question2sub2, question2sub3, question2sub4, question2sub5])


    const handleStepTwo = async() => {
        setIsLoading(true)
        if (question2sub6) {

            try {
                const response = await SubmitQuetionnaire({diseaseId, userId: user._id, questionsAndAnswers: result.slice(0,2)})

                Alert.alert("Done", response?.data?.message, [
                    {
                      text: 'Cancel',
                      onPress: () => navigation.goBack(),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () =>navigation.popToTop()},
                  ])

                // navigation.navigate("ConfirmAppointment")
            } catch (error) {
                // console.log(error)
                Alert.alert("Error", "please retry sending")
            }
            // navigation.navigate("ConfirmAppointment")
        } else {
            setProgress((current) => current + 0.1)

        }
        setIsLoading(false)
    }

    const handleStepSeven = async() => {
        setIsLoading(true)
        if (question7) {

            try {
                const response = await SubmitQuetionnaire({diseaseId, userId: user._id, questionsAndAnswers: result})

                Alert.alert("Done", response?.data?.message, [
                    {
                      text: 'Cancel',
                      onPress: () => navigation.goBack(),
                      style: 'cancel',
                    },
                    {text: 'OK', onPress: () =>navigation.popToTop()},
                  ])

                // navigation.navigate("ConfirmAppointment")
            } catch (error) {
                // console.log(error)
                Alert.alert("Error", "please retry sending")
            }


            // navigation.navigate("ConfirmAppointment")


        } else {
            navigate.navigate("Consultation")

        }

        setIsLoading(false)
    }




    return (
        <ScrollView showsVerticalScrollIndicator={false}>
        <KeyboardAvoidingView >
            <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
            <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 10</Text>

            {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>


                <View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        Do you experience Intense, throbbing headache on one side of the head or both sides?

                    </Text>
                </View>

                <Pressable onPress={() => setQuestion1("Yes")} style={[styles.box, { marginTop: 30 }]}>
                    <Text variant="titleLarge">Yes</Text>
                    <Checkbox
                        status={question1 === "Yes" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion1("No")} style={[styles.box, { marginBottom: 40 }]}>
                    <Text variant="titleLarge">NO</Text>
                    <Checkbox
                        status={question1 === "No" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

            </View>}


            {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>


                <View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        Have you experienced any of the following symptoms before or during a headache?
                    </Text>
                    <Text variant='bodySmall' style={{ textAlign: "center", fontFamily: 'avenir' }}>
                        ( you can select more than 1)
                    </Text>
                </View>

                <Pressable onPress={() => setQuestion2Sub1(v => !v)} style={[styles.box, { marginTop: 30 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Sensitivity to light, noise, or smells move to next question
                    </Text>
                    <Checkbox
                        status={question2sub1 ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion2Sub2(v => !v)} style={[styles.box]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Nausea or vomiting</Text>
                    <Checkbox
                        status={question2sub2 ? "checked" : "unchecked"}
                    />
                </Pressable>
                <Pressable onPress={() => setQuestion2Sub3(v => !v)} style={[styles.box]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Blurred vision</Text>
                    <Checkbox
                        status={question2sub3 ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion2Sub4(v => !v)} style={[styles.box]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Lightheadedness, dizziness, or vertigo</Text>
                    <Checkbox
                        status={question2sub4 ? "checked" : "unchecked"}
                    />
                </Pressable>
                <Pressable onPress={() => setQuestion2Sub5(v => !v)} style={[styles.box]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Tingling or numbness in your face or extremities
                    </Text>
                    <Checkbox
                        status={question2sub5 ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion2Sub6(v => !v)} style={[styles.box, { marginBottom: 40 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>None
                    </Text>
                    <Checkbox
                        status={question2sub6 ? "checked" : "unchecked"}
                    />
                </Pressable>

                <CustomButton title={question2sub6 ? "Submit" : "Next"} onPress={handleStepTwo} />

            </View>}


            {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>

                <View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                    How often do you experience these headaches?
                    </Text>
                </View>

                <Pressable onPress={() => setQuestion3("Fewer than 15 times per month")} style={[styles.box, { marginTop: 30 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Fewer than 15 times per month</Text>
                    <Checkbox
                        status={question3 === "Fewer than 15 times per month" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion3("0nce or twice a week")} style={[styles.box]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>0nce or twice a week</Text>
                    <Checkbox
                        status={question3 === "0nce or twice a week" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion3("Not sure")} style={[styles.box, { marginBottom: 40 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Not sure</Text>
                    <Checkbox
                        status={question3 === "Not sure" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

            </View>}

            {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>

                <View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                    How long have been having these headaches?
                    </Text>
                </View>

                <Pressable onPress={() => setQuestion4("Less than 1 year")} style={[styles.box, { marginTop: 30 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Less than 1 year</Text>
                    <Checkbox
                        status={question4 === "Less than 1 year" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion4("1-5 years")} style={[styles.box]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>1-5 years</Text>
                    <Checkbox
                        status={question4 === "1-5 years" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion4("More than 5 years")} style={[styles.box, { marginBottom: 40 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>More than 5 years</Text>
                    <Checkbox
                        status={question4 === "More than 5 years" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

            </View>}

            {+progress.toFixed(1) * 10 === 5 && <View style={{ marginVertical: 15, gap: 15 }}>

                <View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                    Have you been treated for migraine before?
                    </Text>
                </View>

                <Pressable onPress={() => setQuestion5("Yes")} style={[styles.box, { marginTop: 30 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Yes</Text>
                    <Checkbox
                        status={question5 === "Yes" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion5("No")} style={[styles.box, { marginBottom: 40 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>No</Text>
                    <Checkbox
                        status={question5 === "No" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

            </View>}

            {+progress.toFixed(1) * 10 === 6 && <View style={{ marginVertical: 15, gap: 15 }}>

                <View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                    Have you noticed a change in the frequency and or severity of your migraine in the last few months?
                    </Text>
                </View>

                <Pressable onPress={() => setQuestion6("Yes")} style={[styles.box, { marginTop: 30 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>Yes</Text>
                    <Checkbox
                        status={question6 === "Yes" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion6("No")} style={[styles.box, { marginBottom: 40 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>No</Text>
                    <Checkbox
                        status={question6 === "No" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

            </View>}

            {+progress.toFixed(1) * 10 === 7 && <View style={{ marginVertical: 15, gap: 15 }}>

                <View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                    Now that we have a bit of your migraine history, how can our medical providers best help you today?
                    </Text>
                </View>

                <Pressable onPress={() => setQuestion7("Yes")} style={[styles.box, { marginTop: 30 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>I need a new prescription</Text>
                    <Checkbox
                        status={question7 === "Yes" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <Pressable onPress={() => setQuestion7("No")} style={[styles.box, { marginBottom: 40 }]}>
                    <Text variant="titleLarge" style={{ flex: 1 }}>I want to renew my prescription</Text>
                    <Checkbox
                        status={question7 === "No" ? "checked" : "unchecked"}
                    />
                </Pressable>

                <CustomButton title={"Book Appointment"} onPress={handleStepSeven} />

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

export default MIGRAINETREATMENT;

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

