
import { Text, View, Image, StyleSheet } from "react-native";


import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "../../../components";


export default function ConfirmappiontmentBook() {

const navigate = useNavigation<any>()


    return (
        <View style={rootstyles.root}>


            <View style={{flex: 2, justifyContent: "center"}}>
                <Image source={require("../../../assets/confirmappiontment.png")} style={[rootstyles.photos]} resizeMode="contain" />
            </View>


            <View style={rootstyles.bottomPart} >


                <Text style={[rootstyles.text, {fontSize: 20}]}>You have successfully booked an appointment</Text>

                <Text style={rootstyles.text}>
                The appointment details has been sent to your email address</Text>


            </View>

            <CustomButton title="Done" onPress={() => navigate.popToTop()} type={"primary"} />
        </View>

    );
}


const rootstyles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 10,
    },
    photos: {
        // aspectRatio: 4 / 4,
        width: "auto",
       
    },
    text: {
        color: "#0665CB",
        textAlign: "center",
        fontWeight: "500"
    },
    bottomPart: {
        gap: 20,
        flex:1,
        alignItems: "center",
        justifyContent: "center"
    }
})


