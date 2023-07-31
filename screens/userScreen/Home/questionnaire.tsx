import { useState } from 'react';

import { StyleSheet, View, Pressable } from 'react-native'
import { ProgressBar, Text, Checkbox } from 'react-native-paper';
import { CustomButton } from '../../../components';
import DATA from "../../../dummy/data.json"
import { useNavigation, useRoute } from '@react-navigation/native';
import { QuestionnaireScreenProps, QuestionnairelRouteProp } from '../../../types';


// const Questionnaire = ({ Data, status }) => {
//     return (
//         <View style={{ marginVertical: 15, gap: 15 }}>
//             <View>
//                 <Text variant='titleLarge' style={{ textAlign: "center", fontFamily: 'Avenir', fontWeight: "bold" }}>{Data?.title}</Text>
//                 <Text variant='bodyLarge' style={{ textAlign: "center", fontFamily: 'Avenir' }}>Select as many or few options as you like</Text>
//             </View>

//             <Pressable onPress={() => { }} style={[styles.box]}>
//                 <Text variant="titleLarge">{Data?.options[1]}</Text>
//                 <Checkbox
//                     status={status}
//                 />
//             </Pressable>

//             <Pressable onPress={() => { }} style={[styles.box]}>
//                 <Text variant="titleLarge">{Data?.options[2]}</Text>
//                 <Checkbox
//                     status={status}
//                 />
//             </Pressable>

//             <Pressable onPress={() => { }} style={[styles.box]}>
//                 <Text variant="titleLarge">{Data?.options[3]}</Text>
//                 <Checkbox
//                     status={status}
//                 />
//             </Pressable>

//             <Pressable onPress={() => { }} style={[styles.box]}>
//                 <Text variant="titleLarge">{Data?.options[4]}</Text>
//                 <Checkbox
//                     status={status}
//                 />
//             </Pressable>

//         </View>
//     )
// }

const Questionnaire = () => {
    const [progress, setProgress] = useState(0.1)
    const navigation = useNavigation<QuestionnaireScreenProps>()
    const {id} = useRoute<QuestionnairelRouteProp>().params
   

    // const currentUser = DATA.filter(user => user.id === id)


    

    return (
        <View style={styles.root} >
            {/* <ProgressBar progress={progress} color={"#0665CB"} style={{ marginVertical: 30 }} /> */}
            {/* <Text variant='bodyLarge' style={{ textAlign: "center" }}>{+progress.toFixed(1) * 10} / 10</Text> */}

            {/* <View>
                {+progress.toFixed(1) * 10 === 1 && <Questionnaire Data={currentUser[0]?.questionnaire[0]} />}
                {+progress.toFixed(1) * 10 === 2 && <Questionnaire Data={currentUser[0]?.questionnaire[1]} />}
                {+progress.toFixed(1) * 10 === 3 && <Questionnaire Data={currentUser[0]?.questionnaire[2]} />}
                {+progress.toFixed(1) * 10 === 4 && <Questionnaire Data={currentUser[0]?.questionnaire[3]} />}
                {+progress.toFixed(1) * 10 === 5 && <Questionnaire Data={currentUser[0]?.questionnaire[4]} />}
                {+progress.toFixed(1) * 10 === 6 && <Questionnaire Data={currentUser[0]?.questionnaire[5]} />}
                {+progress.toFixed(1) * 10 === 7 && <Questionnaire Data={currentUser[0]?.questionnaire[6]} />}
                {+progress.toFixed(1) * 10 === 8 && <Questionnaire Data={currentUser[0]?.questionnaire[7]} />}
                {+progress.toFixed(1) * 10 === 9 && <Questionnaire Data={currentUser[0]?.questionnaire[8]} />}
                {+progress.toFixed(1) * 10 === 10 && <Questionnaire Data={currentUser[0]?.questionnaire[9]} />}

            </View> */}


            {/* Buttons  */}

            {/* <View>
                {progress.toFixed(1) < 1 && <CustomButton onPress={() => setProgress((current) => current + 0.1)} title={"Next"} />}
                {progress.toFixed(1) >= 1 && <CustomButton title={"Done"} onPress={() => router.push("./confirm")} />}
            </View> */}
            <CustomButton title={"Done"} onPress={() => navigation.navigate("ConfirmAppointment")} />
        </View>

    )
}

export default Questionnaire

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
        justifyContent: "space-between",
        borderWidth: 1,
        borderColor: "gainsboro",
        borderRadius: 8,
        padding: 10,
        marginVertical: 5
    }
})