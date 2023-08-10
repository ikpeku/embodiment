
import { StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native'
import { Avatar, DoctorProfile } from '../../../components';


export default function editprofile() {

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >
            <KeyboardAvoidingView style={{ paddingBottom: 20 }} >
                <Avatar
                    text={"Upload your profile picture"}
                    photoUrl={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"} />
                <DoctorProfile />
            </KeyboardAvoidingView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"

    },
    segmentContainer: {
        flexDirection: "row",
        paddingTop: 10,
        marginBottom: 15
    },
    segmentActive: {
        borderBottomColor: "#0665CB",
        borderBottomWidth: 4,
        paddingBottom: 8,
        flex: 1,
        textAlign: "center"
    },
    segmentInvalid: {
        borderBottomColor: "rgba(0, 0, 0, 0.15)",
        borderBottomWidth: 4,
        paddingBottom: 8,
        flex: 1,
        textAlign: "center"
    }

})