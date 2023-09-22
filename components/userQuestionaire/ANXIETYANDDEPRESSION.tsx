import { View, ScrollView, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Checkbox, ProgressBar, Text, TextInput } from "react-native-paper";
import CustomButton from "../Button";
import { useNavigation } from "@react-navigation/native";
import { QuestionnaireScreenProps } from "../../types";

const ANXIETYANDDEPRESSION = () => {

    const navigation = useNavigation<QuestionnaireScreenProps>()
    // const navigate = useNavigation<UserConsultationScreenProp>()

    const [progress, setProgress] = useState(0.1)

    const [question1, setQuestion1] = useState<"Schizophrenia" | "Personalitity disorder( obessive compulsive disorder)" | "Mood disorder" | "Substance Abuse" | "No">("No")
    
    const [question2, setQuestion2] = useState<"Yes" | "No">("Yes")
    const [question3, setQuestion3] = useState<"Yes" | "No">("Yes")
    const [question4, setQuestion4] = useState<"Yes" | "No">("Yes")
    const [question5, setQuestion5] = useState<"Yes" | "No">("Yes")
    const [question6, setQuestion6] = useState<"Yes" | "No">("Yes")
    const [question7, setQuestion7] = useState<"Yes" | "No">("Yes")
    const [question8, setQuestion8] = useState<"Yes" | "No">("Yes")
    const [question9, setQuestion9] = useState<"I am safe let’s continue" | "Stop questions">("I am safe let’s continue")
    const [question10, setQuestion10] = useState<"Yes" | "No">("Yes")
    const [question11, setQuestion11] = useState<"Yes" | "No">("Yes")
    const [question12, setQuestion12] = useState<"Yes in the past" | "Yes currently" | "No">("No")
    const [question13, setQuestion13] = useState<"Less than 3 months" | "3 months to 6 months" | "More than 6 months">("Less than 3 months")
    const [question14, setQuestion14] = useState<"Birth of a child" | "Loss of loved one" | "Relationship issues" | "financial issues" | "Other" | "None">("Birth of a child")
    const [question14a, setQuestion14a] = useState("")
    const [question15, setQuestion15] = useState<"Diabetes" | "High blood pressure" | "Heart problem" | "Seizures" | "Auto-immune disease" | "Others" | "None">("Diabetes")
    const [question15a, setQuestion15a] = useState("")
    const [question16, setQuestion16] = useState<"Yes" | "No">("Yes")
    const [question17, setQuestion17] = useState("")
    const [question18, setQuestion18] = useState<"Yes" | "No">("Yes")


    const handleStepOne = () => {

        if (question1 === "Schizophrenia" || question1 === "Personalitity disorder( obessive compulsive disorder)" || question1 === "Mood disorder" || question1 === "Substance Abuse") {
            navigation.navigate("ConfirmAppointment")
        } else {
            setProgress((current) => current + 0.1)

        }

    }

    const handleStepNine = () => {

        if (question9 === "Stop questions") {
            navigation.navigate("ConfirmAppointment")
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

    const handleSubmit = () => {
        navigation.navigate("ConfirmAppointment")
    }




    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView >
                <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 18</Text>

                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you ever been diagnosed with any of the following by a haelath professional?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion1("Schizophrenia")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Schizophrenia</Text>
                        <Checkbox
                            status={question1 === "Schizophrenia" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Personalitity disorder( obessive compulsive disorder)")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Personalitity disorder( obessive compulsive disorder)</Text>
                        <Checkbox
                            status={question1 === "Personalitity disorder( obessive compulsive disorder)" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Mood disorder")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Mood disorder</Text>
                        <Checkbox
                            status={question1 === "Mood disorder" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Mood disorder")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Substance Abuse</Text>
                        <Checkbox
                            status={question1 === "Substance Abuse" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <Pressable onPress={() => setQuestion1("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question1 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <CustomButton title={question1 === "No" ? "Next" : "Book Appointment"} onPress={handleStepOne} />

                </View>}


                {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you feel excessively worried or anxious about different aspects of your life, such as work, relationships, or health?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion2("Yes")} style={[styles.box, { marginTop: 30 }]}>
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
                            Do you have any issues falling asleep, staying asleep or sleeping too much?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion3("Yes")} style={[styles.box, { marginTop: 30 }]}>
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

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you always feel tired or little energy
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
                            Do you feel bad about yourself, that  you are not good enough and ;let yourself or or loved ones down?
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
                            Do you find it difficult concentrating on things such as completing a chore, reading newspaper or watching television?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion6("Yes")} style={[styles.box, { marginTop: 30 }]}>
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
                            Do you experience physical symptoms such as trembling, sweating, or a racing heartbeat when you feel anxious or worried?
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

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 8 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you ever have thoughts about hurting yourself or that you will be better of dead?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion8("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question8 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question8 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 9 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            If you have suicidal thoughts it is very important you call the lagos state emergency line on 112 or seek in-person care as soon as possible
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion9("I am safe let’s continue")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I am safe let’s continue</Text>
                        <Checkbox
                            status={question9 === "I am safe let’s continue" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion9("Stop questions")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Stop questions</Text>
                        <Checkbox
                            status={question9 === "Stop questions" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={question9 === "Stop questions" ? "Book Appointment" : "Next"} onPress={handleStepNine} />

                </View>}


                {+progress.toFixed(1) * 10 === 10 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you often worry too much about different things?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion10("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question10 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion10("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question10 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 11 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you often fee you are not able to control or stop worrying?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion11("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question11 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question11 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 12 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you ever been treated of anxiety and depression?
                        </Text>
                    </View>


                    <Pressable onPress={() => setQuestion12("Yes in the past")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes in the past</Text>
                        <Checkbox
                            status={question12 === "Yes in the past" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion12("Yes currently")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes currently</Text>
                        <Checkbox
                            status={question12 === "Yes currently" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <Pressable onPress={() => setQuestion12("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question12 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <CustomButton title={"Next"} onPress={handleStepTwelve} />

                </View>}

                {+progress.toFixed(1) * 10 === 13 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            How long have you been on treatment?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion13("3 months to 6 months")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">3 months to 6 months</Text>
                        <Checkbox
                            status={question13 === "3 months to 6 months" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion13("Less than 3 months")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Less than 3 months</Text>
                        <Checkbox
                            status={question13 === "Less than 3 months" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion13("More than 6 months")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">More than 6 months</Text>
                        <Checkbox
                            status={question13 === "More than 6 months" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 14 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Is there any even related to your anxiety of depression?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion14("Birth of a child")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Birth of a child</Text>
                        <Checkbox
                            status={question14 === "Birth of a child" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion14("Loss of loved one")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Loss of loved one</Text>
                        <Checkbox
                            status={question14 === "Loss of loved one" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion14("Relationship issues")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Relationship issues</Text>
                        <Checkbox
                            status={question14 === "Relationship issues" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion14("financial issues")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">financial issues</Text>
                        <Checkbox
                            status={question14 === "financial issues" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion14("Other")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Other</Text>
                        <Checkbox
                            status={question14 === "Other" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    {question14 === "Other" && <TextInput placeholder="please specify" value={question14a} onChangeText={(e) => setQuestion14a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}




                    <Pressable onPress={() => setQuestion14("None")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None</Text>
                        <Checkbox
                            status={question14 === "None" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}


                {+progress.toFixed(1) * 10 === 15 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you have any other medical diagnosis currently?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion15("Auto-immune disease")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Auto-immune disease</Text>
                        <Checkbox
                            status={question15 === "Auto-immune disease" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion15("Diabetes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Diabetes</Text>
                        <Checkbox
                            status={question15 === "Diabetes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion15("Heart problem")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Heart problem</Text>
                        <Checkbox
                            status={question15 === "Heart problem" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion15("High blood pressure")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">High blood pressure</Text>
                        <Checkbox
                            status={question15 === "High blood pressure" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion15("Others")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Others</Text>
                        <Checkbox
                            status={question15 === "Others" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    {question15 === "Others" && <TextInput placeholder="please specify" value={question15a} onChangeText={(e) => setQuestion15a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}


                    <Pressable onPress={() => setQuestion15("None")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None</Text>
                        <Checkbox
                            status={question15 === "None" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}


                {+progress.toFixed(1) * 10 === 16 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Are you currently on any prescription medication for anxiety and depression?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion16("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question16 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion16("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question16 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 17 && <View>
                    <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>Please tell us the name of the medication, if ts working for you and if you will like t continue with it</Text>

                    <TextInput placeholder="please specify" value={question17} onChangeText={(e) => setQuestion17(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>

                    <View style={{ marginTop: 20 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

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
                        <Checkbox
                            status={question18 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion18("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question18 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Book Appointment"} onPress={handleSubmit} />

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
