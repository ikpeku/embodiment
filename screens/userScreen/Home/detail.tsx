import React,{useState} from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { Card, Text, Avatar } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components';
import Data from "../../../dummy/data.json"
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserHealthDetailRouteProp, UserHealthDetailScreenProps } from '../../../types';
import { AvatarImageSource } from 'react-native-paper/lib/typescript/src/components/Avatar/AvatarImage';



interface ITreatmentCard { 
    source: AvatarImageSource;
     title: string,
    text: string 
}


const UserHealthDetail = () => {
    const navigation = useNavigation<UserHealthDetailScreenProps>()
    const router = useRoute<UserHealthDetailRouteProp>()
    const {id} = router.params
    const [DATA, setData] = useState(Data)

    const currentUser = DATA.filter(user => user.id === id)

    if (!currentUser[0]) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <Text>Article not found</Text>

            </View>
        )
    }



    const TreatmentCard = ({ source, title, text }:ITreatmentCard) => (

        <Card>
            <Card.Content style={{ gap: 10 }}>
                <Avatar.Image size={70} source={source} />
                <Text style={[styles.text, { fontWeight: "bold", }]} variant='titleMedium'>{title}</Text>
                <Text style={[styles.text,]} variant='bodyLarge'>{text}</Text>
            </Card.Content>
        </Card>
    )


    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{paddingBottom: 20, backgroundColor: "#fff"}} >
            {currentUser[0]?.photo  && <Image  style={styles.banner} source={{uri: currentUser[0]?.photo}} />}
            <Ionicons style={styles.icon} name="chevron-back" size={30} color="white" onPress={() => navigation.goBack()} />


            <View style={{ padding: 10 }}>


                <Text style={[styles.text, { fontWeight: "bold", marginVertical: 20 }]}
                    variant='titleLarge'>{currentUser[0]?.detailTitle.toLocaleLowerCase()}</Text>

                {currentUser[0]?.detail && <Text variant='bodyLarge'>{currentUser[0]?.detail}</Text>}

                <Text style={[styles.text, { fontWeight: "bold", textAlign: "center", marginVertical: 20 }]}
                    variant='titleLarge'>How it works!</Text>

                <View style={{ gap: 20 }}>
                    <TreatmentCard
                        title="Complete a virtual consultation"
                        text="You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms and thought process"
                        source={require("../../../assets/homeDetail1.png")} />

                    <TreatmentCard
                        title="Wait for your result to be examined by our experienced doctors"
                        text="A member of our medical team will evaluate your response and approve a personalized treatment plan for you."
                        source={require("../../../assets/homeDetail2.png")} />

                    <TreatmentCard
                        title="Make payment and get your treatment and prescription"
                        text="We pick your medication at the pharmacy and deliver at your doorstep while our medical team follow up for ongoing care"
                        source={require("../../../assets/homeDetail3.png")} />
                </View>

                <View style={{ marginTop: 50 }}>

                    <CustomButton onPress={() => navigation.navigate("Questionnaire", { id })} title="Get started" />
                </View>

            </View>

        </ScrollView>
        
    )
}

export default UserHealthDetail

const styles = StyleSheet.create({
    text: {
        fontFamily: 'avenir'
    },
    banner: {
        width: "100%",
        aspectRatio: 4 / 3
    },
    icon: {
        position: "absolute",
        top: 40,
        left: 10
    }
})