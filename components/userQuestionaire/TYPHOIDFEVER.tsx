
import { View, ScrollView, KeyboardAvoidingView, Pressable, StyleSheet } from "react-native";
import React, { useState } from "react";
import { Checkbox, ProgressBar, Text } from "react-native-paper";
import CustomButton from "../Button";
import { useNavigation } from "@react-navigation/native";
import { QuestionnaireScreenProps } from "../../types";

const TYPHOIDFEVER = () => {

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
    const [question8, setQuestion8] = useState<"Yes" | "No">("Yes")
    const [question9, setQuestion9] = useState<"Yes" | "No">("Yes")
    const [question10, setQuestion10] = useState<"Yes" | "No">("Yes")
    

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
                        Have you recently traveled to or lived in an area with poor sanitation or limited access to clean water?
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
                        Are you experiencing a high fever that gradually increases over several days?
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
                   Do you experience any of the following symptoms?
                        </Text>
                    </View>
                        <Text variant='titleMedium' style={{ textAlign: "left" }}>
                       
*Headache and body aches?
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

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                </View>}

                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        Abdominal pain and discomfort?
                        </Text>
                    </View>
                  
                    <Pressable onPress={() => setQuestion4("Yes")} style={[styles.box]}>
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
                        Loss of appetite and weight loss?
                        </Text>
                    </View>
                   
                    <Pressable onPress={() => setQuestion5("Yes")} style={[styles.box]}>
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
                        Diarrhea or constipation?
                        </Text>
                    </View>
                   
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
                        Have you noticed a rash of rose-colored spots on your abdomen or chest?
                        </Text>
                    </View>
                   
                    <Pressable onPress={() => setQuestion7("Yes")} style={[styles.box]}>
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
                         Do you experience persistent fever and tenderness in the right lower quadrant of your abdomen?
                        </Text>
                    </View>
                   
                    <Pressable onPress={() => setQuestion8("Yes")} style={[styles.box]}>
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
                        Have you been feeling weak and fatigued?
                        </Text>
                    </View>
                   
                    <Pressable onPress={() => setQuestion9("Yes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            status={question9 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion9("No")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            status={question9 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>
                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                </View>}

                {+progress.toFixed(1) * 10 === 9 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                        Have you been feeling weak and fatigued?
                        </Text>
                    </View>
                   
                    <Pressable onPress={() => setQuestion10("Yes")} style={[styles.box]}>
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
                    <CustomButton title={"Treatment Plan"} onPress={handleSubmit} />
                </View>}


               

            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default TYPHOIDFEVER;

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


// 7. Have you noticed a change in the color of your stool or urine?
// Yes: proceed to treatment plan. 
// No: proceed to treatment plan.
 
// Treatment Plan
// Tabs Ciproloxacin 500mg bd for 1 week
// Tabs Paracetamol 1gm tds for 3 days








