import { Text, View, Image } from "react-native";
import { styles } from "../../../Global/globalstyles";

import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { CustomButton } from "../../../components";
import { ConfirmAppointmentScreenProps } from "../../../types";


export default function ConfirmAppointment() {

    const navigation = useNavigation<ConfirmAppointmentScreenProps>()


    return (
        <SafeAreaView style={styles.container} >

            <View style={[styles.splashPhotoContainer, { marginTop: 50 }]}>

                {/* <StatusBar style="dark" /> */}


                <Image source={require('../../../assets/confirmappointment.png')} style={styles.splashPhoto} resizeMethod="scale" resizeMode="contain" />
            </View>


            <View style={styles.layout}>


                <View style={styles.bottomContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>All done!</Text>
                        <Text style={styles.text}>Our medical expertise will review your questionnaire and send treatment for your condition</Text>
                    </View>

                    <CustomButton title="Processed to make payment" onPress={() => navigation.popToTop()} />
                </View>

            </View>

        </SafeAreaView>
    );
}


