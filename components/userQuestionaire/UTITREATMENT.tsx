import { View, StyleSheet, Pressable, ScrollView, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import CustomButton from "../Button";
import { ProgressBar, Text, Checkbox, TextInput} from 'react-native-paper';
import Paywall from "../paywall";



interface IUTITREATMENT {
    diseaseId: string
}





const UTITREATMENT = ({ diseaseId }: IUTITREATMENT) => {

    const [showModal, setShowModal] = useState(false)
    const [type, setType] = useState<"bookAppointment" | "payment">("payment")
    const [questionsAndAnswers, setquestionsAndAnswers] = useState< {
        question: string,
        answer: string | number
    }[]>([{answer: "", question: ""}])

  
    const [isLoading, setIsLoading] = useState(false)
    const [progress, setProgress] = useState(0.1)

    // Question 1
    const [sex, setSex] = useState<"Male" | "Female" | string>("")
    const [condition, setCondition] = useState<"Pregnant" | "Nursing mother" | "None" | string>("")
    const [question3, setQuestion3] = useState<"yes" | "no" | "I don’t know" | string>("")
    const [question4, setQuestion4] = useState<1 | 2 | "0" | undefined>()
    const [question5, setQuestion5] = useState<"Ciprofloxacin" | "Augmentin" | "Levofloxacin" | "Trimethoprim-sulphamethazole" | "Nitrofurantion" | "I don’t know" | string>("")
    const [question6, setQuestion6] = useState<"Yes and my symptoms disappeared" | "Yes and my symptoms persisted" | "I don’t know" | "No" | string>("")
    const [question7, setQuestion7] = useState<"Yes" | "No" | string>("")
    const [question8, setQuestion8] = useState<"Yes" | "No" | string>("")
    const [question9, setQuestion9] = useState<"Yes" | "No" | string>("")
    const [question10, setQuestion10] = useState<"Yes" | "No" | string>("")
    const [question11, setQuestion11] = useState<"Yes" | "No" | string>("")



    const result: {
        question: string,
        answer: string | number
    }[] = [
            {
                question: "What sex were you assigned to at birth?",
                answer: sex
            },
            {
                question: "Which of the following defines your condition?",
                answer: condition
            },
            {
                question: "Have you had UTI in the past?",
                answer: question3
            },
            {
                question: "How many times have you treated UTI In the past 6 months?",
                answer: question4 ? question4 : 0
            },
            {
                question: "If you were prescribed an antibiotic for UTI which of these antibiotics did you use?",
                answer: question5
            },
            {
                question: "For the UTI Treatment did you complete your antibiotics?",
                answer: question6
            },
            {
                question: "Have you been experiencing any pain or discomfort while urinating?",
                answer: question7
            },
            {
                question: "Have you been experiencing an increased urge to urinate?",
                answer: question8
            },
            {
                question: "Have you been experiencing pain or pressure in your lower abdomen or back?",
                answer: question9
            },
            {
                question: "Have you noticed any changes in your urine?",
                answer: question10
            },
            {
                question: "Have you been experiencing any other symptoms, such as fever or chills?",
                answer: question11
            },

        ]



    const handleStepOne = async () => {
        // setIsLoading(true)
        if (sex === "Female") {
            setProgress((current) => current + 0.1)
        } else {
            // navigate.navigate("Consultation")
            setType("bookAppointment")
            // setquestionsAndAnswers(result.slice(0, 1))
            setShowModal(true)
        }

        // setIsLoading(false)

    }

    const handleStepTwo = async () => {
        // setIsLoading(true)
        if (condition === "None") {
            setProgress((current) => current + 0.1)
        } else {
            
            setType("bookAppointment")
            // setquestionsAndAnswers(result.slice(0, 2))
            setShowModal(true)
            

        }

    }

    const handleStepThree = () => {
        if (question3 === "yes") {
            setProgress((current) => current + 0.1)
        } else {
            setProgress(0.6)
        }

    }

    const handleStepFour = () => {
        if (question4 === "0") {
            setProgress(0.6)
        } else {
            setProgress(0.5)

        }
    }

    const handleStepSix = async () => {
        // setIsLoading(true)
        if (question6 === "No") {

            setType("bookAppointment")
            // setquestionsAndAnswers(result.slice(0, 6))
            setShowModal(true)


        } else {
            setProgress((current) => current + 0.1)
        }
       
    }

    const handleStepSeven = async () => {
        if (question7 === "No") {
            // navigate.navigate("Consultation")

            setType("bookAppointment")
            // setquestionsAndAnswers(result.slice(0, 7))
            setShowModal(true)

            
        } else {
            setProgress((current) => current + 0.1)

        }
    }

    const handleStepElleven = async () => {
        // setIsLoading(true)
        if (question11 === "No") {

            
            setType("payment")
            setquestionsAndAnswers(result)
            setShowModal(true)

        } else {
            setType("bookAppointment")
            // setquestionsAndAnswers(result)
            setShowModal(true)

        }
        
    }




    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <KeyboardAvoidingView style={{ position: "relative" }}>
                {showModal && <Paywall
                setShowModal={setShowModal}
                showModal={showModal}
                type={type}
                 diseaseId={diseaseId}
                  diseaseType="urinary_tract_infection"
                  questionsAndAnswers={questionsAndAnswers}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                 
                  />}

                <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 10 }} />
                <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 11</Text>



                {+progress.toFixed(1) * 10 === 1 && <View style={{ marginVertical: 15, gap: 15 }}>


                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            What sex were you assigned to at birth
                        </Text>

                    </View>

                    <Pressable onPress={() => setSex("Male")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">Male</Text>
                        <Checkbox
                            color="#0665CB"
                            status={sex === "Male" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setSex("Female")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">Female</Text>
                        <Checkbox
                            color="#0665CB"
                            status={sex === "Female" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    {sex && <CustomButton title={sex === "Female" ? "Next" : "Book Appointment"} onPress={handleStepOne} />}

                </View>}


                {+progress.toFixed(1) * 10 === 2 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Which of the following defines your condition?
                        </Text>
                    </View>

                    <Pressable onPress={() => setCondition("Pregnant")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">Pregnant</Text>
                        <Checkbox
                            color="#0665CB"
                            status={condition === "Pregnant" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setCondition("Nursing mother")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Nursing mother (breast feeding your baby)</Text>
                        <Checkbox
                            color="#0665CB"
                            status={condition === "Nursing mother" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setCondition("None")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">None of the above </Text>
                        <Checkbox
                            color="#0665CB"
                            status={condition === "None" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {condition && <View style={{ flex: 1 }}>
                           <CustomButton title={condition === "None" ? "Next" : "Book Appointment"} onPress={handleStepTwo} />
                        </View>}
                    </View>


                </View>}


                {+progress.toFixed(1) * 10 === 3 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you had UTI in the past?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion3("yes")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("no")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "no" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion3("I don’t know")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">I don’t know</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question3 === "I don’t know" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question3 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={handleStepThree} />
                        </View>}
                    </View>

                </View>}



                {+progress.toFixed(1) * 10 === 4 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleLarge' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            How many times have you treated UTI In the past 6 months?
                        </Text>

                    </View>

                    <Pressable onPress={() => setQuestion4(1)} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">1</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question4 === 1 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion4(2)} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>2</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question4 === 2 ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion4("0")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">0</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question4 === "0" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                   

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question4 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={handleStepFour} />
                        </View>}
                    </View>

                </View>}


                {+progress.toFixed(1) * 10 === 5 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            If you were prescribed an antibiotic for UTI which of these antibiotics did you use
                        </Text>

                    </View>

                    <Pressable onPress={() => setQuestion5("Ciprofloxacin")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">Ciprofloxacin</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question5 === "Ciprofloxacin" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion5("Augmentin")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Augmentin(Amoxicillin-Clavunate)</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question5 === "Augmentin" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion5("Levofloxacin")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">Levofloxacin</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question5 === "Levofloxacin" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion5("Trimethoprim-sulphamethazole")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Trimethoprim-sulphamethazole</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question5 === "Trimethoprim-sulphamethazole" ? "checked" : "unchecked"}
                        />
                    </Pressable>
                    <Pressable onPress={() => setQuestion5("Nitrofurantion")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">Nitrofurantion</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question5 === "Nitrofurantion" ? "checked" : "unchecked"}
                        />
                    </Pressable>
                    <Pressable onPress={() => setQuestion5("I don’t know")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge">I don’t know</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question5 === "I don’t know" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <TextInput onChangeText={(e) => setQuestion5(e)} multiline numberOfLines={6} mode="outlined" style={{ backgroundColor: "#fff", borderColor: "blue" }}>

                    </TextInput>

                    {question5 && <CustomButton type={question5 ? "primary" : "disable"} title={"Next"} onPress={() => setProgress((current) => question5 === "I don’t know" ? current + 0.2 : current + 0.1)} />}

                
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question5 && <View style={{ flex: 1 }}>
                      <CustomButton type={question5 ? "primary" : "disable"} title={"Next"} onPress={() => setProgress((current) => question5 === "I don’t know" ? current + 0.2 : current + 0.1)} />
                        </View>}
                    </View>
                
                
                </View>}

                {+progress.toFixed(1) * 10 === 6 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            For the UTI Treatment did you complete your antibiotics?
                        </Text>
                       
                    </View>

                    <Pressable onPress={() => setQuestion6("No")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question6 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("Yes and my symptoms disappeared")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Yes and my symptoms disappeared</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question6 === "Yes and my symptoms disappeared" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("Yes and my symptoms persisted")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Yes and my symptoms persisted</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question6 === "Yes and my symptoms persisted" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion6("I don’t know")} style={[styles.box, { marginBottom: 40 }]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>I don’t know</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question6 === "I don’t know" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question6 && <View style={{ flex: 1 }}>
                        <CustomButton title={question6 === "No" ? "Book Appointment" : "Next"} onPress={handleStepSix} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 7 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing any pain or discomfort while urinating?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion7("No")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question7 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion7("Yes")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question7 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                

                    
                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question7 && <View style={{ flex: 1 }}>
                        <CustomButton title={question7 === "No" ? "Book appointment" : "Next"} onPress={handleStepSeven} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 8 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing an increased urge to urinate?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion8("No")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question8 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion8("Yes")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question8 === "Yes" ? "checked" : "unchecked"}
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
                            Have you been experiencing pain or pressure in your lower abdomen or back?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion9("No")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question9 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion9("Yes")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question9 === "Yes" ? "checked" : "unchecked"}
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
                            Have you noticed any changes in your urine?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion10("No")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>No, my urine looks normal</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question10 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion10("Yes")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Yes, my urine is cloudy, dark, bloody, or has a strong odor.</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question10 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                   

                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question10 && <View style={{ flex: 1 }}>
                        <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
                        </View>}
                    </View>

                </View>}

                {+progress.toFixed(1) * 10 === 11 && <View style={{ marginVertical: 15, gap: 15 }}>

                    <View>
                        <Text variant='titleMedium' style={{ textAlign: "center", fontFamily: 'avenir', fontWeight: "bold" }}>
                            Have you been experiencing any other symptoms, such as fever or chills?
                        </Text>
                    </View>

                    <Pressable onPress={() => setQuestion11("No")} style={[styles.box, { marginTop: 30 }]}>
                        <Text variant="titleLarge">No</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "No" ? "checked" : "unchecked"}
                        />
                    </Pressable>

                    <Pressable onPress={() => setQuestion11("Yes")} style={[styles.box]}>
                        <Text variant="titleLarge" style={{ flex: 1 }}>Yes</Text>
                        <Checkbox
                            color="#0665CB"
                            status={question11 === "Yes" ? "checked" : "unchecked"}
                        />
                    </Pressable>


                    <View style={{ flexDirection: "row", gap: 10 }}>
                        <View style={{ flex: 1 }}>
                            <CustomButton title={"Prev"} onPress={() =>  setProgress((current) => current - 0.1)} />
                        </View>

                        {question11 && <View style={{ flex: 1 }}>
                        <CustomButton title={question11 === "No" ? "Treatment plan" : "Book appointment"} onPress={handleStepElleven} />
                        </View>}
                    </View>

                </View>}


            </KeyboardAvoidingView>
        </ScrollView>
    );
};

export default UTITREATMENT;

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
