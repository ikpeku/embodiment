import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Pressable, Alert } from "react-native";
import React, { useState } from "react";
import { ActivityIndicator, Checkbox, MD2Colors, ProgressBar, Text, TextInput } from "react-native-paper";
import CustomButton from "../Button";
import { QuestionnaireScreenProps } from "../../types";
import { useNavigation } from "@react-navigation/native";
import { SubmitQuetionnaire } from "../../services";
import { UserState } from "../../redux/features/useSlice";
import { useAppSelector } from "../../redux/hooks";
import Purchases from "react-native-purchases";
import useRevenueCat from "../../hooks/useRevenueCat";


type IdiseaseId = { diseaseId: string }

const ACNETREATMENT = ({ diseaseId }: IdiseaseId) => {
    const { currentOffering } = useRevenueCat()

    const { user } = useAppSelector(UserState)

    const navigation = useNavigation<QuestionnaireScreenProps>()
    const [isLoading, setIsLoading] = useState(false)

    const [progress, setProgress] = useState(0.1)

    const [question1, setQuestion1] = useState<"Male" | "Female">("Male")
    const [question2, setQuestion2] = useState<
        "I am pregnant"
        | "I am breastfeeding"
        | "I had a child in the last 6 weeks"
        | "I am planning on getting a child in the next year"
        | "None">("I am pregnant")


    const [question3, setQuestion3] = useState<"Oily" | "Dry" | "Combination(oil and dry)">("Oily")
    const [question4, setQuestion4] = useState<"Yes" | "No">("Yes")
    const [question5, setQuestion5] = useState<"Yes" | "No">("Yes")
    const [question6, setQuestion6] = useState<"Over a month but less than a year" | "Less than a month" | "More than a year">("More than a year")

    const [question7, setQuestion7] = useState<"On the face" | "Back or shoulders" | "Chest">("Back or shoulders")
    const [question8, setQuestion8] = useState<"A few times a month" | "About once or twice a week" | "Mostly around the start of my period">("A few times a month")
    const [question9, setQuestion9] = useState<"Yes" | "No">("Yes")
    const [question9a, setQuestion9a] = useState("")


    const [question10, setQuestion10] = useState<"Cleanser" | "Sunscreen" | "Moistuirizer/lotion" | "Toner" | "Tea tree oil" | "Scrubs" | "Others">("Sunscreen")
    const [question10a, setQuestion10a] = useState("")

    const [question11, setQuestion11] = useState<
        "Polycystic ovarian syndron PCOSS"
        | "Other endocrine diseases like cushings diseas, Addison disease"
        | "Liver disease" | "Kidney disease"
        | "Auto-immune disease" | "Severe ezcema or psoriasis" | "Asthma or hay fever" | "diabetes" | "None">("Auto-immune disease")

    const [question12, setQuestion12] = useState<"Yes" | "No">("No")
    const [question12a, setQuestion12a] = useState("")

    const [question13, setQuestion13] = useState<"Yes" | "No">("No")
    const [question13a, setQuestion13a] = useState("")


    const [question14Photo, setQuestion14Photo] = useState("")



    const result: {
        question: string,
        answer: string | number
    }[] = [
            {
                question: "What gender were you assigned to at birth?",
                answer: question1
            },
            {
                question: "Do any of the following apply to you Select all that apply?",
                answer: question2
            },
            {
                question: "What best describes your skin type?",
                answer: question3
            },
            {
                question: "Would you describe your skin as sensitive?",
                answer: question4
            },
            {
                question: "After your acne heals do you experience blackheads or dark spot?",
                answer: question5
            },
            {
                question: "How long have you had acne?",
                answer: question6
            },
            {
                question: "Where are you experiencing acne?",
                answer: question7
            },
            {
                question: "How often do you experience breakouts?",
                answer: question8
            },
            {
                question: "Are you currently on any medication for acne or have you taken any one in the past?",
                answer: question9 === "Yes" ? question9a : question9
            },
            {
                question: "What do you use to care for your skin?",
                answer: question10 === "Others" ? question10a : question10
            },
            {
                question: "Have you been diagnosed with any of the following disease?",
                answer: question11
            },
            {
                question: "Are you currently on birth control?",
                answer: question12 === "Yes" ? question12a : question12
            },
            {
                question: "Do you have any drug allergies?",
                answer: question13 === "Yes" ? question13a : question13
            }
        ]





    const handleStepOne = () => {

        if (question1 === "Male") {
            setProgress(0.3)
        } else {
            setProgress((current) => current + 0.1)

        }
    }

    const handleStepTwo = async () => {

        if (question2 === "I am pregnant") {
            // navigation.navigate("ConfirmAppointment")


            setIsLoading(true)
            try {
                const Acne_treatment = currentOffering?.availablePackages.find(offer => offer.identifier === "Acne treatment")
                if (Acne_treatment) {
                    const purchaseInfo = await Purchases.purchasePackage(Acne_treatment)
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
            // navigation.navigate("ConfirmAppointment")
            setIsLoading(false)

        } else {
            setProgress((current) => current + 0.1)
        }
    }

    const handleSubmit = async () => {
        setIsLoading(true)
        try {
            const Acne_treatment = currentOffering?.availablePackages.find(offer => offer.identifier === "Acne treatment")
            if (Acne_treatment) {
                const purchaseInfo = await Purchases.purchasePackage(Acne_treatment)
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
        // navigation.navigate("ConfirmAppointment")
        setIsLoading(false)

    }


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView >
                <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 14</Text>

                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            What gender were you assigned to at birth?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion1("Male")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Male</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question1 === "Male" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Female")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Female</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question1 === "Female" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <CustomButton title={"Next"} onPress={handleStepOne} />

                </View>}


                {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do any of the following apply to you Select all that apply?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion2("I am pregnant")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I am pregnant</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "I am pregnant" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("I am breastfeeding")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I am breastfeeding</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "I am breastfeeding" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("I am planning on getting a child in the next year")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I am planning on getting a child in the next year</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "I am planning on getting a child in the next year" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("I had a child in the last 6 weeks")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I had a child in the last 6 weeks</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "I had a child in the last 6 weeks" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion2("None")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question2 === "None" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={question2 === "I am pregnant" ? "Book Appointment" : "Next"} onPress={handleStepTwo} />

                </View>}


                {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            What best describes your skin type?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion3("Oily")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Oily</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "Oily" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("Dry")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Dry</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "Dry" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("Combination(oil and dry)")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Combination(oil and dry)</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "Combination(oil and dry)" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}


                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Would you describe your skin as sensitive
                        </Text>
                        <Text variant='titleMedium' style={{ textAlign: "center", }}>
                            “Do you experience redness or burning with topical products or are you prone to itching or irritation when using cosmetics, lotions, creams, etc.?”
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


                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 5 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            After your acne heals do you experience blackheads or dark spot
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion5("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question5 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion5("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question5 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 6 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            How long have you had acne
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion6("Over a month but less than a year")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Over a month but less than a year</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question6 === "Over a month but less than a year" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("Less than a month")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Less than a month</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question6 === "Less than a month" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("More than a year")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">More than a year</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question6 === "More than a year" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 7 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Where are you experiencing acne?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion7("On the face")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">On the face</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question7 === "On the face" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion7("Back or shoulders")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Back or shoulders</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question7 === "Back or shoulders" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion7("Chest")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Chest</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question7 === "Chest" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 8 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            How often do you experience breakouts?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion8("A few times a month")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">A few times a month</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question8 === "A few times a month" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("About once or twice a week")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">About once or twice a week</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question8 === "About once or twice a week" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("Mostly around the start of my period")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Mostly around the start of my period</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question8 === "Mostly around the start of my period" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}



                {+progress.toFixed(1) * 10 === 9 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Are you currently on any medication for acne or have you taken any one in the past
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion9("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question9 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question9 === "Yes" && <TextInput placeholder="please specify" value={question9a} onChangeText={(e) => setQuestion9a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}

                    <Pressable onPress={() => setQuestion9("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question9 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}



                {+progress.toFixed(1) * 10 === 10 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            What do you use to care for your skin?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion10("Cleanser")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Cleanser</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question10 === "Cleanser" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion10("Sunscreen")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Sunscreen</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question10 === "Sunscreen" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion10("Moistuirizer/lotion")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Moistuirizer/lotion</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question10 === "Moistuirizer/lotion" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion10("Toner")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Toner</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question10 === "Toner" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion10("Tea tree oil")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Tea tree oil</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question10 === "Tea tree oil" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion10("Scrubs")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Scrubs</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question10 === "Scrubs" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion10("Others")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Others</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question10 === "Others" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question10 === "Others" && <TextInput placeholder="please specify" value={question10a} onChangeText={(e) => setQuestion10a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 11 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been diagnosed with any of the following disease?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion11("Polycystic ovarian syndron PCOSS")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Polycystic ovarian syndron PCOSS</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "Polycystic ovarian syndron PCOSS" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("Other endocrine diseases like cushings diseas, Addison disease")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Other endocrine diseases like cushings diseas, Addison disease</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "Other endocrine diseases like cushings diseas, Addison disease" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("Liver disease")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Liver disease</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "Liver disease" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("Kidney disease")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Kidney disease</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "Kidney disease" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("Auto-immune disease")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Auto-immune disease</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "Auto-immune disease" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("Severe ezcema or psoriasis")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Severe ezcema or psoriasis</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "Severe ezcema or psoriasis" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("Asthma or hay fever")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Asthma or hay fever</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "Asthma or hay fever" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("diabetes")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">diabetes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "diabetes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("None")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "None" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 12 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Are you currently on birth control?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion12("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question12 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question12 === "Yes" && <TextInput placeholder="please specify" value={question12a} onChangeText={(e) => setQuestion12a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}

                    <Pressable onPress={() => setQuestion12("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question12 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 13 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you have any drug allergies?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion13("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question13 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question13 === "Yes" && <TextInput placeholder="please specify" value={question13a} onChangeText={(e) => setQuestion13a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}

                    <Pressable onPress={() => setQuestion13("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question13 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />

                </View>}

                {+progress.toFixed(1) * 10 === 14 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Add a clear picture of your affected skin
                        </Text>
                    </View>

                    <View>

                    </View>



                    {question14Photo === "" && <CustomButton title={"Add Photo"} onPress={handleSubmit} />}
                    {question14Photo !== "" && <CustomButton title={"Next"} onPress={handleSubmit} />}

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

export default ACNETREATMENT;

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

