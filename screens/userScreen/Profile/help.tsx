import { Pressable, StyleSheet, Text, View } from 'react-native'
// import * as MailComposer from 'expo-mail-composer';
import { FontAwesome5, Feather, MaterialIcons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import { useNavigation } from '@react-navigation/native';
import { SupportScreenProps } from '../../../types';

const HelpandSupport = () => {
    const navigation = useNavigation<SupportScreenProps>()

    const handleMailto = async () => {
        // await MailComposer.composeAsync({
        //     recipients: ['lol@example.com'],
        // });
        await Linking.openURL('mailto: info@embodimenthealthcare.com')
    }
    
    const handleCall = async () => {
        await Linking.openURL('tel: +2348124458760')
    }

    const handleChat = async () => {
        navigation.navigate("Support")
    }

    return (
        <View style={styles.container}>
           
            <Pressable onPress={handleChat}>
                <View style={[styles.textContainer, {paddingTop: 40}]}>
                    <MaterialIcons name="chat" size={24} color="#0665CB" />
                    <Text>Live  chat</Text>
                </View>
            </Pressable>

            <Pressable onPress={handleMailto}>
                <View style={styles.textContainer}>
                    <FontAwesome5 name="envelope" size={24} color="#0665CB" />
                    <Text>telemedicine@gmail.com</Text>
                </View>
            </Pressable>

            <Pressable onPress={handleCall}>
                <View style={styles.textContainer}>
                    <Feather name="phone" size={24} color="#0665CB" />
                    <Text>+2348124458760</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default HelpandSupport

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    textContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 20,
        paddingHorizontal: 10,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(0, 0, 0, 0.1)",
        paddingVertical: 18
    }
})