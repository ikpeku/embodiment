import { useEffect, useState } from "react"
import { StyleSheet, View, Alert } from "react-native";
import { Modal, Portal, Text, Button, PaperProvider, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useNavigation } from "@react-navigation/native";
import { QuestionnaireScreenProps, UserConsultationScreenProp } from "../types";
import useRevenueCat from "../hooks/useRevenueCat";
import Purchases from "react-native-purchases";
import { SubmitQuetionnaire, getSubscription } from "../services";
import { UserState } from "../redux/features/useSlice";
import { useAppSelector } from "../redux/hooks";
import { Fontisto } from '@expo/vector-icons';



interface IPaywall {
  showModal: boolean,
  setShowModal: (e: boolean) => void,
  diseaseId: string,
  questionsAndAnswers: {
    question: string,
    answer: string | number
  }[],
  diseaseType: string,
  type: "bookAppointment" | "payment",
  isLoading: boolean,
  setIsLoading: (e: boolean) => void

}
const Paywall = ({ diseaseId, questionsAndAnswers, diseaseType, type, setShowModal, showModal, isLoading, setIsLoading }: IPaywall) => {

  const { currentOffering, isProMember } = useRevenueCat()
  const { user } = useAppSelector(UserState)

  const navigate = useNavigation<UserConsultationScreenProp>()
  const navigation = useNavigation<QuestionnaireScreenProps>()


  const [paymentAmount, setPrice] = useState<string | undefined>("")
  const [questionnairesCount, setQuestionnairesCount] = useState(0)






  const SendRequest = async () => {
    setIsLoading(true)
  
    
    try {
      if (!isProMember || (isProMember && questionnairesCount == 0)) {
        const disease = currentOffering?.availablePackages.find(offer => offer.identifier === diseaseType)
        if (disease) {
          const purchaseInfo = await Purchases.purchasePackage(disease)

          // console.log(purchaseInfo?.customerInfo?.entitlements)

          // if (purchaseInfo?.customerInfo?.entitlements?.active?.pro) {


            setShowModal(false)
            await SubmitQuetionnaire({ diseaseId, userId: user._id, questionsAndAnswers })
            navigation.navigate("ConfirmAppointment")
          // }
        }

      } else {
        await SubmitQuetionnaire({ diseaseId, userId: user._id, questionsAndAnswers })
        navigation.navigate("ConfirmAppointment")
      }

    } catch (error) {

    }

    setIsLoading(false)

  }

  useEffect(() => {
    if (currentOffering) {
      const offering = currentOffering?.availablePackages.find(offer => offer.identifier === diseaseType)
      setPrice(offering?.product?.priceString)
    }
  }, [currentOffering])


  useEffect(() => {
    (async() => {
      const response = await getSubscription(user._id)
    setQuestionnairesCount(response.data.subscription.questionnairesCount)
    })()

  }, [])



  const handleConsultation = () => {
    setShowModal(false)
    navigate.navigate("Consultation")
  }

  const handleSubscribe = () => {
    setShowModal(false)
    navigation.navigate("Subscribe", { isFromProfile: false })
  }

  const handleSubmitQuestionnnaire = async() => {
 
    await SubmitQuetionnaire({ diseaseId, userId: user._id, questionsAndAnswers })
    navigation.navigate("ConfirmAppointment")
    setShowModal(false)
  }



  if (!currentOffering) {
    return (
        <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "#fff" }]}>
            <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
        </View>
    )
}


  return (
    <Portal>
      <Modal visible={showModal} onDismiss={() => setShowModal(false)} contentContainerStyle={styles.containerStyle}>

        <Fontisto name="close" size={24} color="black" onPress={() => setShowModal(false)} />
        <Text variant="titleMedium" style={{ textAlign: "center" }}>Thank you for completing the AI questionnaire.</Text>

        {!isProMember || (isProMember && questionnairesCount == 0) ? <>

          {type === "payment" && <View style={{ alignItems: "center", marginTop: 20, backgroundColor: "#0665CB", padding: 10, width: "85%", alignSelf: "center" }}>

            <Text variant="titleMedium" style={{ textAlign: "center", color: "#fff" }}>Subscribe to our plan to get access to all the embodiment features at a discounted rate.</Text>
            <Button disabled={isLoading} loading={isLoading} onPress={handleSubscribe} style={{ backgroundColor: "#fff", borderRadius: 0, marginTop: 5 }}><Text style={{ fontWeight: "bold" }}>Proceed to Plans</Text></Button>
          </View>}


          {type === "payment" && <View style={{ width: 30, alignSelf: "center", backgroundColor: "#0665CB", aspectRatio: 1, borderRadius: 15, marginVertical: 6, alignItems: "center", justifyContent: "center" }}>
            <Text style={{ textAlign: "center", color: "#fff", fontWeight: "bold" }} >Or</Text>
          </View>}

          {type === "payment" && <View style={{ alignItems: "center", backgroundColor: "#0665CB", padding: 10, width: "85%", alignSelf: "center" }}>
            <Text variant="titleMedium" style={{ textAlign: "center", color: "#fff" }}>One time payment {paymentAmount}</Text>
            <Button disabled={isLoading} loading={isLoading} onPress={SendRequest} style={{ backgroundColor: "#fff", borderRadius: 0, marginTop: 5 }}><Text style={{ fontWeight: "bold" }}>Proceed to payment</Text></Button>
          </View>}
        </>
          :
          <>

            {type === "payment" && <View style={{ alignItems: "center", marginTop: 20, backgroundColor: "#0665CB", padding: 10, width: "85%", alignSelf: "center" }}>

              <Button disabled={isLoading} loading={isLoading} onPress={handleSubmitQuestionnnaire} style={{ backgroundColor: "#fff", borderRadius: 0, marginTop: 5 }}><Text style={{ fontWeight: "bold" }}>Submit Questionnaire</Text></Button>
            </View>}
          </>
        }

        {type === "bookAppointment" && <View style={{ alignItems: "center", marginTop: 10, backgroundColor: "#0665CB", padding: 10, width: "85%", alignSelf: "center" }}>
          <Text variant="titleMedium" style={{ textAlign: "center", color: "#fff" }}>Continue by booking appointment with any of our renowned doctor.</Text>
          <Button disabled={isLoading} loading={isLoading} onPress={handleConsultation} style={{ backgroundColor: "#fff", borderRadius: 0, marginTop: 5 }}><Text style={{ fontWeight: "bold" }}>Proceed</Text></Button>
        </View>}

      </Modal>
    </Portal>
  );
};

export default Paywall;

const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: 'white',
    padding: 20,
    margin: 5,
    borderRadius: 10
    //  aspectRatio: 1,

  }
});
