import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Pressable } from "react-native";
import React, { useState } from "react";
import { Text, ProgressBar, Checkbox } from "react-native-paper";

import CustomButton from "../Button";

import Paywall from "../paywall";


type IdiseaseId = { diseaseId: string }

const PREMATUREEJACULATION = ({ diseaseId }: IdiseaseId) => {


    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState<"bookAppointment" | "payment">("payment")
    const [questionsAndAnswers, setquestionsAndAnswers] = useState< {
        question: string,
        answer: string | number
    }[]>([{answer: "", question: ""}])



    const [progress, setProgress] = useState(0.1)
    const [isLoading, setIsLoading] = useState(false)

    const [question1, setQuestion1] = useState<"Yes I always ejaculate too soon" | "Yes , more than half the time" |
     "Yes less than half the time" | "No I never ejaculate too soon" | string>("")
     

    const [question2a, setQuestion2a] = useState(false)

    const [question2b, setQuestion2b] = useState(false)

    const [question2c, setQuestion2c] = useState(false)

    const [question2d, setQuestion2d] = useState(false)

    const [question2e, setQuestion2e] = useState(false)





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
                question: "Have you been experiencing any of the following symptoms? ",
                answer: `${question2a ? "Ejaculation within one minute of sexual activity, " : ""} 
                ${question2b ? "Persistent or recurrent ejaculation with minimal stimulation, " : "" }
                ${question2c ? "Inability to delay ejaculation during sexual activity, " : "" }
                ${question2d ? "Negative personal or interpersonal consequences due to premature ejaculation, " : "" }
                ${question2e ? "None of the above." : "" }
                `
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

            if(question4 === "Yes") {
                setType("bookAppointment")
                // setquestionsAndAnswers(result)
                setShowModal(true)

            } else {

                setType("payment")
                setquestionsAndAnswers(result)
                setShowModal(true)
            }

    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView >

            {showModal && <Paywall
                setShowModal={setShowModal}
                showModal={showModal}
                type={type}
                 diseaseId={diseaseId}
                  diseaseType="Premature ejaculation"
                  questionsAndAnswers={questionsAndAnswers}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  />}

                <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 4</Text>

                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing ejaculation during sexual activity sooner than you or your partner would like?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion1("Yes I always ejaculate too soon")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes I always ejaculate too soon</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Yes I always ejaculate too soon" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Yes , more than half the time")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes , more than half the time</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Yes , more than half the time" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Yes less than half the time")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes less than half the time</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Yes less than half the time" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("No I never ejaculate too soon")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No I never ejaculate too soon</Text>
                        <Checkbox.Android
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

                    <Pressable onPress={() => setQuestion2a(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Ejaculation within one minute of sexual activity</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2a ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2b(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Persistent or recurrent ejaculation with minimal stimulation</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2b ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2c(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Inability to delay ejaculation during sexual activity</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2c ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2d(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Negative personal or interpersonal consequences due to premature ejaculation</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2d  ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <Pressable onPress={() => setQuestion2e(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None of the above</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2e ? "checked" : "unchecked"}
                        />
                    </Pressable>

                
                   <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {(question2a || question2b || question2c || question2c || question2d || question2e) && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>
                
                </View>}

                {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Select the option that best describes the average time you spend before ejaculation
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion3("Within 1 min")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Within 1 min</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "Within 1 min" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("1-3 min")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">1-3 min</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "1-3 min" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("5-10 min")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">5-10 min</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "5-10 min" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("More than 10 min")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">More than 10 min</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "More than 10 min" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question3 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing any other symptoms, such as anxiety or depression?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion4("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question4 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion4("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question4 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question4 && <View style={{ flex: 1 }}>
                        <CustomButton title={question4 === "No" ? "Treatment Plan" : "Book Appointment"} onPress={handleStepFour} />
                        </View>}
                    </View>

                </View>}


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

