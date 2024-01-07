import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Pressable, Image } from "react-native";
import React, { useState } from "react";
import { Checkbox, ProgressBar, Text, TextInput } from "react-native-paper";
import CustomButton from "../Button";
import { UserState } from "../../redux/features/useSlice";
import { useAppSelector } from "../../redux/hooks";


// handle image
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from "../../utils/firebase";
import Image_Picker_Without_Blob from "../image_picker_without_blob";
import Paywall from "../paywall";


type IdiseaseId = { diseaseId: string }

const ACNETREATMENT = ({ diseaseId }: IdiseaseId) => {

    db

    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState<"bookAppointment" | "payment">("payment")
    const [questionsAndAnswers, setquestionsAndAnswers] = useState< {
        question: string,
        answer: string | number
    }[]>([{answer: "", question: ""}])


    
    const { image, pickImage, pickerImage } = Image_Picker_Without_Blob()

    const { user } = useAppSelector(UserState)
   
    const [isLoading, setIsLoading] = useState(false)

    const [progress, setProgress] = useState(0.1)

    const [question1, setQuestion1] = useState<"Male" | "Female" | string>("")
    const [question21, setQuestion21] = useState(false)
    const [question22, setQuestion22] = useState(false)
    const [question23, setQuestion23] = useState(false)
    const [question24, setQuestion24] = useState(false)
    const [question25, setQuestion25] = useState(false)




    const [question3, setQuestion3] = useState<"Oily" | "Dry" | "Combination(oil and dry)" | string>("")
    const [question4, setQuestion4] = useState<"Yes" | "No" | string>("")
    const [question5, setQuestion5] = useState<"Yes" | "No" | string>("")
    const [question6, setQuestion6] = useState<"Over a month but less than a year" | "Less than a month" | "More than a year" | string>("")

    const [question7, setQuestion7] = useState<"On the face" | "Back or shoulders" | "Chest" | string>("")
    const [question8, setQuestion8] = useState<"A few times a month" | "About once or twice a week" | "Mostly around the start of my period" | string>("")
    const [question9, setQuestion9] = useState<"Yes" | "No" | string>("")
    const [question9a, setQuestion9a] = useState("")

    
    const [question101, setQuestion101] = useState(false)
    const [question102, setQuestion102] = useState(false)
    const [question103, setQuestion103] = useState(false)
    const [question104, setQuestion104] = useState(false)
    const [question105, setQuestion105] = useState(false)
    const [question106, setQuestion106] = useState(false)
    const [question107, setQuestion107] = useState(false)


    const [question10a, setQuestion10a] = useState("")

    const [question11a, setQuestion11a] = useState(false)

    const [question11b, setQuestion11b] = useState(false)

    const [question11c, setQuestion11c] = useState(false)

    const [question11d, setQuestion11d] = useState(false)

    const [question11e, setQuestion11e] = useState(false)

    const [question11f, setQuestion11f] = useState(false)

    const [question11g, setQuestion11g] = useState(false)

    const [question11h, setQuestion11h] = useState(false)

    const [question11i, setQuestion11i] = useState(false)



    const [question12, setQuestion12] = useState<"Yes" | "No" | string>("")
    const [question12a, setQuestion12a] = useState("")

    const [question13, setQuestion13] = useState<"Yes" | "No" | string>("")
    const [question13a, setQuestion13a] = useState("")



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
                answer: `${question21 ? "I am pregnant, " : ""} 
                ${question22 ? "I am breastfeeding, " : ""}
                ${question23 ? "I had a child in the last 6 weeks, " : ""}
                ${question24 ? "I am planning on getting a child in the next year, " : ""}
                ${question25 ? "None, " : ""}`
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
                answer: `${question101 ? "Cleanser ," : ""} 
                ${question102 ? "Sunscreen ," : ""} 
                ${question103 ? "Moistuirizer/lotion ," : ""} 
                ${question104 ? "Toner ," : ""} 
                ${question105 ? "Tea tree oil ," : ""} 
                ${question106 ? "Scrubs ," : ""} 
                ${question107 ? question10a : ""} 
                `
            },
            {
                question: "Have you been diagnosed with any of the following disease?",
                answer: `${question11a ? "Polycystic ovarian symptoms  PCOSS," : ""}, ${question11b ? "Other endocrine diseases like cushings diseas, Addison disease," : ""}, ${question11c ? "Liver disease," : ""}, ${question11d ? "Kidney disease," : ""}, ${question11e ? "Auto-immune disease," : ""}, ${question11f ? "Severe ezcema or psoriasis," : ""}, ${question11g ? "Asthma or hay fever," : ""}, ${question11h ? "diabetes," : ""}, ${question11i ? "None." : ""} ` 
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

        if (question21) {
           
            setType("bookAppointment")
            // setquestionsAndAnswers(result.slice(0, 2))
            setShowModal(true)


        } else {
            setProgress((current) => current + 0.1)
        }
    }



    const handleSubmit = async () => {
       

        if (!image) return

        let avatarUrl = ""

        if (image) {
            const avatar = `${user.firstName}${user.lastName}`
            const reference = ref(getStorage(), avatar)
            await uploadBytesResumable(reference, image)
            const downloadURL = await getDownloadURL(reference);
            avatarUrl = downloadURL
        }


        const questionsAndAnswers = [...result, {
            question: "Affected skin area",
            answer: avatarUrl,
            isText: false
        }]

        setType("payment")
            setquestionsAndAnswers(questionsAndAnswers)
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
                  diseaseType="Acne treatment"
                  questionsAndAnswers={questionsAndAnswers}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                 
                  />}

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
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Male" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion1("Female")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Female</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question1 === "Female" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    {question1 && <CustomButton title={"Next"} onPress={handleStepOne} />}

                </View>}

                {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do any of the following apply to you Select all that apply?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion21(v => !v)} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I am pregnant</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question21  ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion22(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I am breastfeeding</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question22 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion23(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I am planning on getting a child in the next year</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question23  ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion24(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">I had a child in the last 6 weeks</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question24 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion25(v => !v)} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question25  ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {(question21 || question22 || question23 || question24 || question25) && <View style={{ flex: 1 }}>
                        <CustomButton title={question21  ? "Book Appointment" : "Next"} onPress={handleStepTwo} />
                        </View>}
                    </View>


                </View>}

                {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            What best describes your skin type?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion3("Oily")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Oily</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "Oily" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("Dry")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Dry</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "Dry" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("Combination(oil and dry)")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Combination(oil and dry)</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question3 === "Combination(oil and dry)" ? "checked" : "unchecked"}
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
                            Would you describe your skin as sensitive
                        </Text>
                        <Text variant='titleMedium' style={{ textAlign: "center", }}>
                            “Do you experience redness or burning with topical products or are you prone to itching or irritation when using cosmetics, lotions, creams, etc.?”
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
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 5 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            After your acne heals do you experience blackheads or dark spot
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion5("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question5 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion5("No")} style={[styles.box, { marginBottom: 40 }]}>
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

                        {question5 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 6 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            How long have you had acne
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion6("Over a month but less than a year")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Over a month but less than a year</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question6 === "Over a month but less than a year" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("Less than a month")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Less than a month</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question6 === "Less than a month" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("More than a year")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">More than a year</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question6 === "More than a year" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                   
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question6 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 7 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Where are you experiencing acne?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion7("On the face")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">On the face</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question7 === "On the face" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion7("Back or shoulders")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Back or shoulders</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question7 === "Back or shoulders" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion7("Chest")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Chest</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question7 === "Chest" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                   

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question7 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 8 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            How often do you experience breakouts?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion8("A few times a month")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">A few times a month</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question8 === "A few times a month" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("About once or twice a week")} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">About once or twice a week</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question8 === "About once or twice a week" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("Mostly around the start of my period")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Mostly around the start of my period</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question8 === "Mostly around the start of my period" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question8 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 9 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Are you currently on any medication for acne or have you taken any one in the past
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion9("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question9 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question9 === "Yes" && <TextInput placeholder="please specify" value={question9a} onChangeText={(e) => setQuestion9a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}

                    <Pressable onPress={() => setQuestion9("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question9 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question9 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 10 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            What do you use to care for your skin?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion101(v => !v)} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Cleanser</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question101 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion102(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Sunscreen</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question102 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion103(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Moistuirizer/lotion</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question103  ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion104(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Toner</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question104 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion105(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Tea tree oil</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question105 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion106(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Scrubs</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question106 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion107(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Others</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question107 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question107 && <Text variant="bodyLarge">please specify</Text>}

                    {question107 && <TextInput placeholder="please specify" value={question10a} onChangeText={(e) => setQuestion10a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}

               
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {(question101 || question102 ||  question103 || question104 || question105 || question106) && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                        {question10a && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>
               
                </View>}

                {+progress.toFixed(1) * 10 === 11 && <View style={{ marginVertical: 15, gap: 15 }}>
                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been diagnosed with any of the following disease?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion11a(v => !v)} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Polycystic ovarian symptoms  PCOSS</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11a  ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11b(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Other endocrine diseases like cushings diseas, Addison disease</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11b ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11c(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Liver disease</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11c ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11d(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Kidney disease</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11d ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11e(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Auto-immune disease</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11e ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11f(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Severe ezcema or psoriasis</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11f ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11g(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Asthma or hay fever</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11g ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11h(v => !v)} style={[styles.box]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">diabetes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11h ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11i(v => !v)} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">None</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question11i ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {(question11a || question11b || question11c || question11d || question11e || question11f || question11g || question11h || question11i )  && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 12 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Are you currently on birth control?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion12("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question12 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question12 === "Yes" && <TextInput placeholder="please specify" value={question12a} onChangeText={(e) => setQuestion12a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}

                    <Pressable onPress={() => setQuestion12("No")} style={[styles.box, { marginBottom: 40 }]}>
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

                        { question12 === "No" && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}

                        { question12a && question12 === "Yes" && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>


                </View>}

                {+progress.toFixed(1) * 10 === 13 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Do you have any drug allergies?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion13("Yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">Yes</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question13 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {question13 === "Yes" && <TextInput placeholder="please specify" value={question13a} onChangeText={(e) => setQuestion13a(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>
                    </TextInput>}

                    <Pressable onPress={() => setQuestion13("No")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text style={{ flex: 1 }} variant="titleLarge">No</Text>
                        <Checkbox.Android
                            color="#0665CB"
                            status={question13 === "No" ? "checked" : "unchecked"}
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
                            Add a clear picture of your affected skin
                        </Text>
                    </View>

                    {pickerImage && <Image source={{ uri: pickerImage }} style={{ width: "100%", aspectRatio: 4 / 3 }} />
                    }
                    <View>

                    </View>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {!pickerImage  && <View style={{ flex: 1 }}>
                        <CustomButton title={"Add Photo"} onPress={pickImage} />
                        </View>}

                        {pickerImage  && <View style={{ flex: 1 }}>
                        <CustomButton title={"submit"} onPress={handleSubmit} />
                        </View>}
                    </View>

                </View>}


                {/* {isLoading && (
                    <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                        <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                    </View>
                )} */}

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

