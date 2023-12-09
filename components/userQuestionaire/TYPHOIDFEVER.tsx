import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  Pressable,
  StyleSheet,
  Alert,
} from "react-native";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Checkbox,
  MD2Colors,
  ProgressBar,
  Text,
} from "react-native-paper";
import CustomButton from "../Button";
import { useNavigation } from "@react-navigation/native";
import { QuestionnaireScreenProps } from "../../types";
import { SubmitQuetionnaire } from "../../services";
import { useAppSelector } from "../../redux/hooks";
import { UserState } from "../../redux/features/useSlice";
import useRevenueCat from "../../hooks/useRevenueCat";
import Purchases from "react-native-purchases";

type IdiseaseId = { diseaseId: string };
const TYPHOIDFEVER = ({ diseaseId }: IdiseaseId) => {
  const { currentOffering, isProMember } = useRevenueCat();

  const { user } = useAppSelector(UserState);

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<QuestionnaireScreenProps>();
  // const navigate = useNavigation<UserConsultationScreenProp>()

  const [progress, setProgress] = useState(0.1);

  const [question1, setQuestion1] = useState<"Yes" | "No" | string>("");
  const [question2, setQuestion2] = useState<"Yes" | "No" | string>("");
  const [question3, setQuestion3] = useState<"Yes" | "No" | string>("");
  const [question4, setQuestion4] = useState<"Yes" | "No" | string>("");
  const [question5, setQuestion5] = useState<"Yes" | "No" | string>("");
  const [question6, setQuestion6] = useState<"Yes" | "No" | string>("");
  const [question7, setQuestion7] = useState<"Yes" | "No" | string>("");
  const [question8, setQuestion8] = useState<"Yes" | "No" | string>("");
  const [question9, setQuestion9] = useState<"Yes" | "No" | string>("");
  const [question10, setQuestion10] = useState<"Yes" | "No" | string>("");

  const result: {
    question: string;
    answer: string | number;
  }[] = [
      {
        question:
          "Have you recently traveled to or lived in an area with poor sanitation or limited access to clean water?",
        answer: question1,
      },
      {
        question:
          "Are you experiencing a high fever that gradually increases over several days?",
        answer: question2,
      },
      {
        question: "Headache and body aches?",
        answer: question3,
      },
      {
        question: "Abdominal pain and discomfort?",
        answer: question4,
      },
      {
        question: "Loss of appetite and weight loss?",
        answer: question5,
      },
      {
        question: "Diarrhea or constipation?",
        answer: question6,
      },
      {
        question:
          "Have you noticed a rash of rose-colored spots on your abdomen or chest?",
        answer: question7,
      },
      {
        question:
          "Do you experience persistent fever and tenderness in the right lower quadrant of your abdomen?",
        answer: question8,
      },
      {
        question: "Have you been feeling weak and fatigued?",
        answer: question9,
      },
      {
        question:
          "Have you noticed a change in the color of your stool or urine?",
        answer: question10,
      },
    ];

  const handleSubmit = async () => {
    setIsLoading(true);
    try {

      if (!isProMember) {
        const Typhoid = currentOffering?.availablePackages.find(
          (offer) => offer.identifier === "Typhoid"
        );
        if (Typhoid) {
          const purchaseInfo = await Purchases.purchasePackage(Typhoid);
          if (purchaseInfo?.customerInfo?.entitlements?.active) {
            const response = await SubmitQuetionnaire({
              diseaseId,
              userId: user._id,
              questionsAndAnswers: result,
            });

            Alert.alert("Done", response?.data?.message, [
              {
                text: "Cancel",
                onPress: () => navigation.goBack(),
                style: "cancel",
              },
              { text: "OK", onPress: () => navigation.popToTop() },
            ]);
          }
        }

      } else {
        const response = await SubmitQuetionnaire({
          diseaseId,
          userId: user._id,
          questionsAndAnswers: result,
        });

        Alert.alert("Done", response?.data?.message, [
          {
            text: "Cancel",
            onPress: () => navigation.goBack(),
            style: "cancel",
          },
          { text: "OK", onPress: () => navigation.popToTop() },
        ]);
      }

    } catch (error) {

    }
    setIsLoading(false);
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <KeyboardAvoidingView>
        <ProgressBar
          progress={progress}
          color={"#0665CB"}
          style={{ marginVertical: 10 }}
        />
        <Text variant="bodyLarge" style={{ textAlign: "center" }}>
          {+progress.toFixed(1) * 10} / 10
        </Text>

        {+progress.toFixed(1) * 10 === 1 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Have you recently traveled to or lived in an area with poor
                sanitation or limited access to clean water?
              </Text>
            </View>

            <Pressable onPress={() => setQuestion1("Yes")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question1 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion1("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question1 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>

            {question1 && <CustomButton
              title={"Next"}
              onPress={() => setProgress((current) => current + 0.1)}
            />}
          </View>
        )}

        {+progress.toFixed(1) * 10 === 2 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Are you experiencing a high fever that gradually increases over
                several days?
              </Text>
            </View>

            <Pressable onPress={() => setQuestion2("Yes")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question2 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion2("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question2 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
              </View>

              {question2 && <View style={{ flex: 1 }}>
                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
              </View>}
            </View>



          </View>
        )}

        {+progress.toFixed(1) * 10 === 3 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Do you experience any of the following symptoms?
              </Text>
            </View>
            <Text variant="titleMedium" style={{ textAlign: "left" }}>
              *Headache and body aches?
            </Text>

            <Pressable onPress={() => setQuestion3("Yes")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question3 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion3("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question3 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
              </View>

              {question3 && <View style={{ flex: 1 }}>
                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
              </View>}
            </View>
          </View>
        )}

        {+progress.toFixed(1) * 10 === 4 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Abdominal pain and discomfort?
              </Text>
            </View>

            <Pressable onPress={() => setQuestion4("Yes")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question4 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion4("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question4 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
              </View>

              {question4 && <View style={{ flex: 1 }}>
                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
              </View>}
            </View>
          </View>
        )}

        {+progress.toFixed(1) * 10 === 5 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Loss of appetite and weight loss?
              </Text>
            </View>

            <Pressable onPress={() => setQuestion5("Yes")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question5 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion5("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question5 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
              </View>

              {question5 && <View style={{ flex: 1 }}>
                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
              </View>}
            </View>
          </View>
        )}

        {+progress.toFixed(1) * 10 === 6 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Diarrhea or constipation?
              </Text>
            </View>

            <Pressable onPress={() => setQuestion6("Yes")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question6 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion6("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question6 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
              </View>

              {question6 && <View style={{ flex: 1 }}>
                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
              </View>}
            </View>
          </View>
        )}

        {+progress.toFixed(1) * 10 === 7 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Have you noticed a rash of rose-colored spots on your abdomen or
                chest?
              </Text>
            </View>

            <Pressable onPress={() => setQuestion7("Yes")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question7 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion7("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question7 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
              </View>

              {question7 && <View style={{ flex: 1 }}>
                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
              </View>}
            </View>
          </View>
        )}

        {+progress.toFixed(1) * 10 === 8 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Do you experience persistent fever and tenderness in the right
                lower quadrant of your abdomen?
              </Text>
            </View>

            <Pressable onPress={() => setQuestion8("Yes")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question8 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion8("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question8 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
              </View>

              {question8 && <View style={{ flex: 1 }}>
                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
              </View>}
            </View>

          </View>
        )}

        {+progress.toFixed(1) * 10 === 9 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Have you been feeling weak and fatigued?
              </Text>
            </View>

            <Pressable onPress={() => setQuestion9("Yes")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question9 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion9("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question9 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>

            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
              </View>

              {question9 && <View style={{ flex: 1 }}>
                <CustomButton title={"Next"} onPress={() => setProgress((current) => current + 0.1)} />
              </View>}
            </View>
          </View>
        )}

        {+progress.toFixed(1) * 10 === 10 && (
          <View style={{ marginVertical: 15, gap: 15 }}>
            <View>
              <Text
                variant="titleMedium"
                style={{
                  textAlign: "center",
                  fontFamily: "avenir",
                  fontWeight: "bold",
                }}
              >
                Have you noticed a change in the color of your stool or urine?
              </Text>
            </View>

            <Pressable
              onPress={() => setQuestion10("Yes")}
              style={[styles.box]}
            >
              <Text style={{ flex: 1 }} variant="titleLarge">
                Yes
              </Text>
              <Checkbox
                color="#0665CB"
                status={question10 === "Yes" ? "checked" : "unchecked"}
              />
            </Pressable>

            <Pressable onPress={() => setQuestion10("No")} style={[styles.box]}>
              <Text style={{ flex: 1 }} variant="titleLarge">
                No
              </Text>
              <Checkbox
                color="#0665CB"
                status={question10 === "No" ? "checked" : "unchecked"}
              />
            </Pressable>


            <View style={{ flexDirection: "row", gap: 10 }}>
              <View style={{ flex: 1 }}>
                <CustomButton title={"Prev"} onPress={() => setProgress((current) => current - 0.1)} />
              </View>

              {question10 && <View style={{ flex: 1 }}>
                <CustomButton title={"Treatment Plan"} onPress={handleSubmit} />
              </View>}
            </View>
          </View>
        )}

        {isLoading && (
          <View
            style={[
              {
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                ...StyleSheet.absoluteFillObject,
                backgroundColor: "transparent",
              },
            ]}
          >
            <ActivityIndicator
              animating={true}
              size={"large"}
              color={MD2Colors.blue500}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default TYPHOIDFEVER;

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
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
    marginVertical: 5,
  },
});

