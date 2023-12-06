import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { ActivityIndicator, MD2Colors, Text } from 'react-native-paper'
import { Ionicons } from '@expo/vector-icons';
import { CustomButton } from '../../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { UserHealthDetailRouteProp, UserHealthDetailScreenProps } from '../../../types';
import { useGetSingleDisease } from '../../../services';
import Treatmentsteps from '../../../components/treatmentsteps';


const UserHealthDetail = () => {
    const navigation = useNavigation<UserHealthDetailScreenProps>()
    const router = useRoute<UserHealthDetailRouteProp>()
    const { id } = router.params

    const { data, isLoading, isRefetching } = useGetSingleDisease(id)


    if(isLoading || isRefetching) {
        return     (
            <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
            </View>
        )
    }



    return (
        <>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20, backgroundColor: "#fff" }} >
                {data?.data?.photo && <Image style={styles.banner} source={{ uri: `https://embodi-be.vercel.app/${data?.data?.photo}` }} />}
                <Ionicons style={styles.icon} name="chevron-back" size={30} color="white" onPress={() => navigation.goBack()} />

                <View style={{ padding: 10 }}>

                    {data?.data?.detailTitle ?
                        <Text style={[styles.text, { fontWeight: "bold", marginVertical: 20, textAlign: "center" }]}
                            variant='titleLarge'>{data?.data?.detailTitle}</Text>
                        :
                        <Text style={[styles.text, { fontWeight: "bold", marginVertical: 20, textAlign: "center" }]}
                            variant='titleLarge'>{data?.data?.title}</Text>
                    }

                    {data?.data?.detail && <Text variant='bodyLarge'>{data?.data?.detail}</Text>}

                    <View>
                        {/* Gastritis Treatment */}
                        {
                            id === "6504f973d4c2c22773c99357" &&
                            <Treatmentsteps
                                header='You are just a message away from getting treatment for all forms of gastritis from our licensed clinicians.'
                                stepOneSubText='You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms'
                                stepTwoSubText='A member of our medical team will evaluate your responses and approve a personalized treatment plan for you'
                                stepThreeSubText='We will pick up your medication at the pharmacy and deliver it to your doorstep, while our medical team follows up for ongoing care.'
                            />

                        }

                        {/* Acne Treatment */}
                        {
                            id === "6504f8d1d4c2c22773c99353" &&
                            <Treatmentsteps
                                header='You deserve spotless skin. We prescribe clinically proven treatment plans tailored to your skin. No appointment needed! Giving you enough time to glow.'
                                stepOneSubText='You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms.'
                                stepTwoSubText='A member of our medical team will evaluate your response and approve a personalized treatment plan for you.'
                                stepThreeSubText='We will pick up your medication at the pharmacy and deliver it to your doorstep, ensuring your convenience and privacy.'
                            />

                        }

                        {/* Common Cold Treatment: */}
                        {
                            id === "6504fa77d4c2c22773c99359" &&
                            <Treatmentsteps
                                header={`Feeling under the weather lately? Don't worry, we've got you covered. Don't self-medicate - get a clinically proven prescription delivered to your doorstep while you focus on improving your productivity.`}
                                stepOneSubText='You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms.'
                                stepTwoSubText='A member of our medical team will evaluate your responses and approve a personalized treatment plan for you'
                                stepThreeSubText='We will pick up your medication at the pharmacy and deliver it to your doorstep, while our medical team follows up for ongoing care.'
                            />

                        }

                        {/* Anxiety and depression treatment */}

                        {
                            id === "6504f92ad4c2c22773c99355" &&
                            <Treatmentsteps
                                header={`Take care of your mental health today`}
                                stepOneSubText='You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms and thought process'
                                stepTwoSubText='A member of our medical team will evaluate your responses and approve a personalized treatment plan for you'
                                stepThreeSubText='We will pick up your medication at the pharmacy and deliver it to your doorstep, while our medical team follows up for ongoing care.'
                                NB='N/B: We do not provide emergency treatment, if you are contemplating suicide call Lagos emergency hotline 767 or National emergency hotline 112'
                            />

                        }
                        {/* UTI Treatment */}
                        {
                            id === "6504f684d4c2c22773c99349" &&
                            <Treatmentsteps
                                stepOneSubText='You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms.'
                                stepTwoSubText='A member of our medical team will evaluate your responses and approve a personalized treatment plan for you'
                                stepThreeSubText='We will pick up your medication at the pharmacy and deliver it to your doorstep, while our medical team follows up for ongoing care.'
                                NB='N/B: UTI treatment is only available to biological females.'
                            />

                        }

                        {/* Migraine headache Online treatment */}
                        {
                            id === "6504f793d4c2c22773c9934c" &&
                            <Treatmentsteps
                                stepOneSubText='Complete a virtual consultation. Answer a few questions about your migraine and medical history. Our medical expert will assess your response and provide care.'
                                stepTwoSubText='Receive a treatment plan tailored to your needs'
                                stepThreeSubText='Get ongoing care and follow up'
                            />

                        }

                        {/* Erectile dysfunction treatment from Embodiment */}

                        {
                            id === "6504f7f0d4c2c22773c9934f" &&
                            <Treatmentsteps
                                header='Stop wasting your money on quacks!  Connect with our medical experts for discreet, affordable ED treatment online'
                                stepOneSubText='You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms'
                                stepTwoSubText='A member of our medical team will evaluate your responses and approve a personalized treatment plan for you'
                                stepThreeSubText='We will pick up your medication at the pharmacy and deliver it to your doorstep, while our medical team follows up for ongoing care.'
                            />

                        }

                        {/* Premature Ejaculation */}

                        {
                            id === "6504f87cd4c2c22773c99351" &&
                            <Treatmentsteps
                                header='Get clinically  proven treatment from our medical experts discreetly at the comfort of your home.'
                                stepOneSubText='You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms'
                                stepTwoSubText='A member of our medical team will evaluate your responses and approve a personalized treatment plan for you'
                                stepThreeSubText='We will pick up your medication at the pharmacy and deliver it to your doorstep, while our medical team follows up for ongoing care.'
                            />

                        }

                        {/* Malaria Treatment */}

                        {
                            id === "65666a47be61c51e8ffdf87b" &&
                            <Treatmentsteps
                                header='Are you feeling feverish or experiencing symptoms that feels familiar but not certain what to treat!
                            Get your malaria treatment within in short period.'
                                stepOneSubText='You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms'
                                stepTwoSubText='A member of our medical team will evaluate your responses and approve a personalized treatment plan for you'
                                stepThreeSubText='We will pick up your medication at the pharmacy and deliver it to your doorstep, while our medical team follows up for ongoing care.'
                            />

                        }

                        {/*TYPHOID FEVER */}

                        {
                            id === "6504fac9d4c2c22773c9935d" &&
                            <Treatmentsteps
                                header='Are feeling feverish or experiencing symptoms that feels familiar but not certain what to treat!
                            Get your typhoid fever treatment within in short period.'
                                stepOneSubText='You will answer a few questions to assess the right treatment plan for you and enable our medical providers to evaluate your symptoms'
                                stepTwoSubText='A member of our medical team will evaluate your responses and approve a personalized treatment plan for you'
                                stepThreeSubText='We will pick up your medication at the pharmacy and deliver it to your doorstep, while our medical team follows up for ongoing care.'
                            />

                        }

                    </View>

                    <View style={{ marginTop: 50 }}>

                        <CustomButton onPress={() => navigation.navigate("Questionnaire", { id })} title="Get started" />
                    </View>

                </View>

            </ScrollView>
            
        </>

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