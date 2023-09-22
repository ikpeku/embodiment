
import { View, ScrollView, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Checkbox, ProgressBar, Text } from "react-native-paper";
import CustomButton from "../Button";
import { useNavigation } from "@react-navigation/native";
import { QuestionnaireScreenProps } from "../../types";

const MALARIA = () => {

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
    const [question8, setQuestion8] = useState<"Less than 3 days" | "More than 7 days" | "More than a month ago" | "Can’t remember">("Less than 3 days")



    const handleStepTwo = () => {

        if (question2 === "Yes") {
            navigation.navigate("ConfirmAppointment")
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
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 10</Text>


                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        Do you have a high fever?
                        </Text>
                    </View>

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
                        Have you taken any preventive measures against malaria, such as using insecticide-treated bed nets or taking antimalarial medication?
                        </Text>
                    </View>
            

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
                        Do you experience recurrent episodes of fever?
                        </Text>
                    </View>

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

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                </View>}

                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        Are you experiencing any of the following symptoms?
                        </Text>
                    </View>
                    <Text variant='titleMedium' style={{ textAlign: "left" }}>
                    Chills and sweating?
                        </Text>

                    <Pressable onPress={() => setQuestion4("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes: Malaria is likely.</Text>
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
                        Headache and body aches?
                        </Text>
                    </View>
                   
                    <Pressable onPress={() => setQuestion5("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes: Malaria is likely.</Text>
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
                        Fatigue and weakness?
                        </Text>
                    </View>
                   
                    <Pressable onPress={() => setQuestion6("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes: Malaria is likely.</Text>
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
                        Nausea, vomiting, or diarrhea?
                        </Text>
                    </View>
                   
                    <Pressable onPress={() => setQuestion7("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes: Malaria is likely.</Text>
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
                        When last did you take malaria medication
                        </Text>
                    </View>
                   
                    <Pressable onPress={() => setQuestion8("Can’t remember")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Can’t remember</Text>
                        <Checkbox
                            status={question8 === "Can’t remember" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("Less than 3 days")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Less than 3 days</Text>
                        <Checkbox
                            status={question8 === "Less than 3 days" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("More than 7 days")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">More than 7 days</Text>
                        <Checkbox
                            status={question8 === "More than 7 days" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("More than a month ago")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">More than a month ago</Text>
                        <Checkbox
                            status={question8 === "More than a month ago" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <CustomButton title={"Treatment plan"} onPress={handleSubmit} />
                </View>}

            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default MALARIA;

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


// Treatment Plan
// Tabs Arthether Lumefantrine (80/480 mg) II bd for 3 days
// Tabs Paracetamol 1 g tds for 3 days








