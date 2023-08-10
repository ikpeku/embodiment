import { Pressable, StyleSheet, Text, View } from 'react-native'
import * as MailComposer from 'expo-mail-composer';
import { FontAwesome5, Feather } from '@expo/vector-icons';
import * as Linking from 'expo-linking';

const help = () => {

    const handleMailto = async () => {
        await MailComposer.composeAsync({
            recipients: ['lol@example.com'],
        });
    }

    const handleCall = async () => {
        await Linking.openURL('tel: +2348124458760')

    }

    return (
        <View style={styles.container}>
            <View style={{ paddingVertical: 20, paddingHorizontal: 10 }}>
                <Text style={styles.title} >Contact Us</Text>
            </View>
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

export default help

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    title: {
        fontFamily: 'Avenir',
        fontWeight: 500,
        fontSize: 24,
        lineHeight: 33,
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