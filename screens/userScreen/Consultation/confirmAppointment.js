import { Text, View, Image } from "react-native";
import { StatusBar } from 'expo-status-bar';
import { styles } from "../../../styles/Style";
import { useNavigation } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../../../static";


export default function Page() {

    const navigate = useNavigation()


    return (
        <SafeAreaView style={styles.container} >

            <View style={[styles.splashPhotoContainer, { marginTop: 50 }]}>

                <StatusBar style="dark" />


                <Image source={require('../../../assets/doctor.png')} style={styles.splashPhoto} resizeMethod="scale" resizeMode="contain" />
            </View>


            <View style={styles.layout}>


                <View style={styles.bottomContainer}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>You have successfully booked an appointment</Text>
                        <Text style={styles.text}>The appointment details has been sent to your email address</Text>
                    </View>

                    <Button title="Done" onPress={() => navigate.popToTop()} />
                </View>

            </View>

        </SafeAreaView>
    );
}


