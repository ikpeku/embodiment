import { View, ScrollView, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Checkbox, ProgressBar, Text, TextInput } from "react-native-paper";
import CustomButton from "../Button";
import Paywall from "../paywall";

type IdiseaseId = { diseaseId: string }

const ANXIETYANDDEPRESSION = ({ diseaseId }: IdiseaseId) => {

    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState<"bookAppointment" | "payment">("payment")
    const [questionsAndAnswers, setquestionsAndAnswers] = useState< {
        question: string,
        answer: string | number
    }[]>([{answer: "", question: ""}])


    const [isLoading, setIsLoading] = useState(false)

    const [progress, setProgress] = useState(0.1)

    const [question1, setQuestion1] = useState<"Schizophrenia" | "Personalitity disorder( obessive compulsive disorder)" | "Mood disorder" | "Substance Abuse" | "No" | string>("")

    const [question2, setQuestion2] = useState<"Yes" | "No" | string>("")
    const [question3, setQuestion3] = useState<"Yes" | "No" | string>("")
    const [question4, setQuestion4] = useState<"Yes" | "No" | string>("")
    const [question5, setQuestion5] = useState<"Yes" | "No" | string>("")
    const [question6, setQuestion6] = useState<"Yes" | "No" | string>("")
    const [question7, setQuestion7] = useState<"Yes" | "No" | string>("")
    const [question8, setQuestion8] = useState<"Yes" | "No" | string>("")
    const [question9, setQuestion9] = useState<"I am safe let’s continue" | "Stop questions" | string>("")
    const [question10, setQuestion10] = useState<"Yes" | "No" | string>("")
    const [question11, setQuestion11] = useState<"Yes" | "No" | string>("")
    const [question12, setQuestion12] = useState<"Yes in the past" | "Yes currently" | "No" | string>("")
    const [question13, setQuestion13] = useState<"Less than 3 months" | "3 months to 6 months" | "More than 6 months" | string>("")

    const [question141, setQuestion141] = useState(false)
    const [question142, setQuestion142] = useState(false)
    const [question143, setQuestion143] = useState(false)
    const [question144, setQuestion144] = useState(false)
    const [question145, setQuestion145] = useState(false)
    const [question146, setQuestion146] = useState(false)
   
   
    const [question14a, setQuestion14a] = useState("")
    
    
    const [question15, setQuestion15] = useState<"Diabetes" | "High blood pressure" | "Heart problem" | "Seizures" | "Auto-immune disease" | "Others" | "None" | string>("")
    const [question15a, setQuestion15a] = useState("")
    const [question16, setQuestion16] = useState<"Yes" | "No" | string>("")
    const [question17, setQuestion17] = useState("")
    const [question18, setQuestion18] = useState<"Yes" | "No" | string>("")




    const result: {
        question: string,
        answer: string | number
    }[] = [
            {
                question: "Have you ever been diagnosed with any of the following by a Health professional?",
                answer: question1
            },
            {
                question: "Do you feel excessively worried or anxious about different aspects of your life, such as work, relationships, or health?",
                answer: question2
            },
            {
                question: "Do you have any issues falling asleep, staying asleep or sleeping too much?",
                answer: question3
            },
            {
                question: "Do you always feel tired or little energy?",
                answer: question4
            },
            {
                question: "Do you feel bad about yourself, that  you are not good enough and ;let yourself or or loved ones down?",
                answer: question5
            },
            {
                question: "Do you find it difficult concentrating on things such as completing a chore, reading newspaper or watching television?",
                answer: question6
            },
            {
                question: "Do you experience physical symptoms such as trembling, sweating, or a racing heartbeat when you feel anxious or worried?",
                answer: question7
            },
            {
                question: "Do you ever have thoughts about hurting yourself or that you will be better of dead?",
                answer: question8
            },
            {
                question: "If you have suicidal thoughts it is very important you call the lagos state emergency line on 112 or seek in-person care as soon as possible?",
                answer: question9
            },
            {
                question: "Do you often worry too much about different things?",
                answer: question10
            },
            {
                question: "Do you often feel you are not able to control or stop worrying?",
                answer: question11
            },
            {
                question: "Have you ever been treated of anxiety and depression?",
                answer: question12
            },
            {
                question: "How long have you been on treatment?",
                answer: question13
            },
            {
                question: "Is there any even related to your anxiety of depression?",
                answer: `${question141 ?  "Birth of a child, " : ""}  
                ${question141 ?  "Loss of loved one, " : ""}
                ${question142 ?  "Birth of a child, " : ""}
                ${question143 ?  "Relationship issues, " : ""}
                ${question144 ?  "financial issues, " : ""}
                ${question145 ?  "Other, " : ""}
                ${question146 ?  question14a : ""}
                `
            },
            {
                question: "Do you have any other medical diagnosis currently?",
                answer: question15 === "Others" ? question15a : question15
            },
            {
                question: "Are you currently on any prescription medication for anxiety and depression?",
                answer: question16
            },
            {
                question: "Please tell us the name of the medication, if it's working for you and if you will like to continue with it?",
                answer: question17
            },
            {
                question: "Do you have any drug allergies?",
                answer: question18
            }
        ]


    const handleStepOne = async () => {

        if (question1 === "Schizophrenia" || question1 === "Personalitity disorder( obessive compulsive disorder)" || question1 === "Mood disorder" || question1 === "Substance Abuse") {

            setType("bookAppointment")
            // setquestionsAndAnswers(result.slice(0, 1))
            setShowModal(true)
            
         
        } else {
            setProgress((current) => current + 0.1)

        }

    }

    const handleStepNine = async () => {

        if (question9 === "Stop questions") {

            setType("bookAppointment")
            // setquestionsAndAnswers(result.slice(0, 9))
            setShowModal(true)

        } else {
            setProgress((current) => current + 0.1)
        }

    }

    const handleStepTwelve = () => {
        if (question12 === "No") {
            setProgress((current) => current + 0.2)
        } else {
            setProgress((current) => current + 0.1)
        }

    }

    const handleStepSixteen = () => {
        if (question16 === "No") {
            setProgress((current) => current + 0.2)
        } else {
            setProgress((current) => current + 0.1)
        }

    }


    const handleSubmit = async () => {

        setType("payment")
        setquestionsAndAnswers(result)
        setShowModal(true)
      
    }




    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView >

            {showModal && <Paywall
                setShowModal={setShowModal}
                showModal={showModal}
                type={type}
                 diseaseId={diseaseId}
                  diseaseType="Anxiety treatment"
                  questionsAndAnswers={questionsAndAnswers}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                  />}

                <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 18</Text>

                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you ever been diagnosed with any of the following by a Health professional?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion1("Schizophrenia")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Schizophrenia</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Schizophrenia" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Personalitity disorder( obessive compulsive disorder)")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Personalitity disorder( obessive compulsive disorder)</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Personalitity disorder( obessive compulsive disorder)" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Mood disorder")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Mood disorder</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Mood disorder" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Substance Abuse")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Substance Abuse</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Substance Abuse" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <Pressable onPress={() => setQuestion1("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    {question1 && <CustomButton title={question1 === "No" ? "Next" : "Book Appointment"} onPress={handleStepOne} />}

                </View>}


                {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you feel excessively worried or anxious about different aspects of your life, such as work, relationships, or health?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion2("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question2 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question2 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>


                </View>}

                {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you have any issues falling asleep, staying asleep or sleeping too much?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion3("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question3 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you always feel tired or little energy
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion4("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question4 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion4("No")} style={[styles.box]}>
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

                        { question4 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 5 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you feel bad about yourself, that  you are not good enough and ;let yourself or or loved ones down?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion5("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question5 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion5("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question5 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question5 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 6 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you find it difficult concentrating on things such as completing a chore, reading newspaper or watching television?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion6("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question6 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question6 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                   <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question6 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 7 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you experience physical symptoms such as trembling, sweating, or a racing heartbeat when you feel anxious or worried?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion7("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question7 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion7("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question7 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question7 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>


                </View>}

                {+progress.toFixed(1) * 10 === 8 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you ever have thoughts about hurting yourself or that you will be better of dead?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion8("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question8 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question8 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question8 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 9 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            If you have suicidal thoughts it is very important you call the lagos state emergency line on 112 or seek in-person care as soon as possible
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion9("I am safe let’s continue")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I am safe let’s continue</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question9 === "I am safe let’s continue" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion9("Stop questions")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Stop questions</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question9 === "Stop questions" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                   
                   <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question9 && <View style={{ flex: 1 }}>
                        <CustomButton title={question9 === "Stop questions" ? "Book Appointment" : "Next"} onPress={handleStepNine} />
                        </View>}
                    </View>


                </View>}


                {+progress.toFixed(1) * 10 === 10 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you often worry too much about different things?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion10("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question10 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion10("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question10 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question10 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 11 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you often feel you are not able to control or stop worrying?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion11("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

               

                   <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question11 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 12 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you ever been treated of anxiety and depression?
                        </Text>
                    </View>


                    <Pressable onPress={() => setQuestion12("Yes in the past")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes in the past</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question12 === "Yes in the past" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion12("Yes currently")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes currently</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question12 === "Yes currently" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <Pressable onPress={() => setQuestion12("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question12 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question12 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={handleStepTwelve} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 13 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            How long have you been on treatment?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion13("3 months to 6 months")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">3 months to 6 months</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question13 === "3 months to 6 months" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion13("Less than 3 months")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Less than 3 months</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question13 === "Less than 3 months" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion13("More than 6 months")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">More than 6 months</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question13 === "More than 6 months" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                   <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question13 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 14 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Is there any even related to your anxiety of depression?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion141(v => !v)} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Birth of a child</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question141 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion142(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Loss of loved one</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question142 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion143(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Relationship issues</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question143 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion144(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">financial issues</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question144 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion145(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Other</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question145 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question145  && <Text>please specify</Text>}
                    {question145  && <TextInput placeholder="please specify" value={question14a} onChangeText={(e) => setQuestion14a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}




                    <Pressable onPress={() => setQuestion146(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question146 ? "checked" : "unchecked"}
                        /> 
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { (question141 || question142 || question143 || question144 || question14a || question146) && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}


                {+progress.toFixed(1) * 10 === 15 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you have any other medical diagnosis currently?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion15("Auto-immune disease")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Auto-immune disease</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question15 === "Auto-immune disease" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion15("Diabetes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Diabetes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question15 === "Diabetes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion15("Heart problem")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Heart problem</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question15 === "Heart problem" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion15("High blood pressure")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">High blood pressure</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question15 === "High blood pressure" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion15("Others")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Others</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question15 === "Others" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    {question15 === "Others" && <TextInput placeholder="please specify" value={question15a} onChangeText={(e) => setQuestion15a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}


                    <Pressable onPress={() => setQuestion15("None")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question15 === "None" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                   <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question15 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}


                {+progress.toFixed(1) * 10 === 16 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Are you currently on any prescription medication for anxiety and depression?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion16("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question16 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion16("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question16 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question16 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={handleStepSixteen} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 17 && <View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>Please tell us the name of the medication, if it's working for you and if you will like to continue with it</Text>

                    <TextInput placeholder="please specify" value={question17} onChangeText={(e) => setQuestion17(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>

                    <View style={{ marginTop: 20 }}>
                      

                       <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question17 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                    </View>
                </View>
                }



                {+progress.toFixed(1) * 10 === 18 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you have any drug allergies?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion18("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question18 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion18("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question18 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        { question18 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Treatment plan"} onPress={handleSubmit} />
                        </View>}
                    </View>

                </View>}

            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default ANXIETYANDDEPRESSION;

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
