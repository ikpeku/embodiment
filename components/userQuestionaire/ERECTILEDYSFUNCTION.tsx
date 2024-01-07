import React, { useEffect, useState } from "react";
import { View, ScrollView, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native";
import { Checkbox, ProgressBar, Text, TextInput } from "react-native-paper";
import CustomButton from "../Button";
import Paywall from "../paywall";

type IdiseaseId = { diseaseId: string }

const ERECTILEDYSFUNCTION = ({ diseaseId }: IdiseaseId) => {
    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState<"bookAppointment" | "payment">("payment")
    const [questionsAndAnswers, setquestionsAndAnswers] = useState<{
        question: string,
        answer: string | number
    }[]>([{ answer: "", question: "" }])


    const [progress, setProgress] = useState(0.1)
    const [isLoading, setIsLoading] = useState(false)

    const [question1, setQuestion1] = useState<"Yes" | "No" | string>("")
    const [question2, setQuestion2] = useState<"Yes occasionally" | "Yes more than half the time" | "Yes, everytime" | string>("")
    const [question3, setQuestion3] = useState<"Yes" | "No" | string>("")
    const [question4a, setQuestion4a] = useState(false)
    const [question4b, setQuestion4b] = useState(false)
    const [question4c, setQuestion4c] = useState(false)

    const [question5, setQuestion5] = useState<"No, it starts hard but never remains hard" | "Yes but only rarely" | "Yes always" | string>("")
    const [question6, setQuestion6] = useState<"Rarely" | "Sometimes" | "Everytime" | string>("")
    const [question7, setQuestion7] = useState<"Yes" | "No" | string>("")
    const [question7a, setQuestion7a] = useState("")



    const result: {
        question: string,
        answer: string | number
    }[] = [
            {
                question: "Are you diabetic or hypertensive?",
                answer: question1
            },
            {
                question: "Have you been experiencing difficulty achieving or maintaining an erection during sexual activity?",
                answer: question2
            },
            {
                question: "Have you been experiencing a decreased interest in sexual activity?",
                answer: question3
            },
            {
                question: "Do you get erection?",
                answer: `${question4a ? "When Masturbating," : ""} ${question4b ? "When you wake," : ""} ${question4c ? "Neither When Masturbating nor When you wake," : ""} }
            `.trim()
            },
            {
                question: "When masturbating, does your erection remain hard until orgasm or as long as you would like?",
                answer: question5
            },
            {
                question: "How often do you wake up with erection?",
                answer: question6
            },
            {
                question: "Are there any other symptoms you will like to share?",
                answer: question7 === "Yes" ? question7a : question7
            }
        ]


    const handleStepOne = async () => {

        if (question1 === "Yes") {

            setType("bookAppointment")
            // setquestionsAndAnswers(result.slice(0, 1))
            setShowModal(true)


        } else {
            setProgress((current) => current + 0.1)
        }

    }

    const handleStepFour = () => {

        if (question4a) {
            setProgress((current) => current + 0.1)
        } else {
            setProgress(0.6)
        }
    }


    const handleStepSeven = async () => {

        setType("payment")
        setquestionsAndAnswers(result)
        setShowModal(true)

    }



    useEffect(() => {
        if (question4c) {
            setQuestion4a(false)
            setQuestion4b(false)
            return
        }

    }, [question4c])

    useEffect(() => {

        if (question4a || question4b) {
            setQuestion4c(false)
            return
        }

    }, [question4a, question4b])




    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView >
                {showModal && <Paywall
                    setShowModal={setShowModal}
                    showModal={showModal}
                    type={type}
                    diseaseId={diseaseId}
                    diseaseType="Erectile Dyfunction"
                    questionsAndAnswers={questionsAndAnswers}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}

                />}

                <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 7</Text>

                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Are you diabetic or hypertensive?

                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion1("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">NO</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question1 && <CustomButton title={question1 === "Yes" ? "Book Appointment" : "Next"} onPress={handleStepOne} />}

                </View>}


                {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing difficulty achieving or maintaining an erection during sexual activity?

                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion2("Yes, everytime")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">Yes, everytime</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2 === "Yes, everytime" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("Yes more than half the time")} style={[styles.box]}>
                        <Text variant="titleLarge">Yes more than half the time</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2 === "Yes more than half the time" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("Yes occasionally")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">Yes occasionally</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2 === "Yes occasionally" ? "checked" : "unchecked"}
                        />
                    </Pressable>



                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
                        </View>

                        {question2 && <View style={{ flex: 1 }}>
                            <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}


                {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing a decreased interest in sexual activity?

                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion3("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">NO</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
                        </View>

                        {question3 && <View style={{ flex: 1 }}>
                            <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}



                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you get erection?
                        </Text>
                        <Text variant="bodyMedium" style={{ textAlign: "center", fontFamily: 'avenir' }}>(You can choose more than one)</Text>
                    </View>

                    <Pressable onPress={() => setQuestion4a(v => !v)} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">When Masturbating</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question4a ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion4b(v => !v)} style={[styles.box]}>
                        <Text variant="titleLarge">When you wake</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question4b ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion4c(v => !v)} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">Neither</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question4c ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
                        </View>

                        {(question4a || question4b || question4c) && <View style={{ flex: 1 }}>
                            <CustomButton title={"Next"} onPress={handleStepFour} />
                        </View>}
                    </View>

                </View>}



                {+progress.toFixed(1) * 10 === 5 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            When masturbating, does your erection remain hard until orgasm or as long as you would like?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion5("No, it starts hard but never remains hard")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">No, it starts hard but never remains hard</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question5 === "No, it starts hard but never remains hard" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion5("Yes but only rarely")} style={[styles.box]}>
                        <Text variant="titleLarge">Yes but only rarely</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question5 === "Yes but only rarely" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion5("Yes always")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">Yes always</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question5 === "Yes always" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
                        </View>

                        {question5 && <View style={{ flex: 1 }}>
                            <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}


                {+progress.toFixed(1) * 10 === 6 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            How often do you wake up with erection?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion6("Rarely")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">Rarely</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question6 === "Rarely" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("Sometimes")} style={[styles.box]}>
                        <Text variant="titleLarge">Sometimes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question6 === "Sometimes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("Everytime")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">Everytime</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question6 === "Everytime" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
                        </View>

                        {question6 && <View style={{ flex: 1 }}>
                            <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 7 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Are there any other symptoms you will like to share?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion7("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question7 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question7 === "Yes" && <Text variant="bodyLarge">please specify</Text>}
                    {question7 === "Yes" && <TextInput value={question7a} onChangeText={(e) => setQuestion7a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>

                    </TextInput>}

                    <Pressable onPress={() => setQuestion7("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">NO</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question7 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
                        </View>

                        {question7 === "No" && <View style={{ flex: 1 }}>
                            <CustomButton title={"Treatment plan"} onPress={handleStepSeven} />
                        </View>}

                        {question7 === "Yes" && question7a && <View style={{ flex: 1 }}>
                            <CustomButton title={"Treatment plan"} onPress={handleStepSeven} />
                        </View>}


                    </View>

                </View>}


            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default ERECTILEDYSFUNCTION;


const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10
    },
    box: {
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



