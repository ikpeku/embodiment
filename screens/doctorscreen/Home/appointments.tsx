import { StyleSheet, View} from "react-native";
import React, {useState} from "react";
import { Text } from 'react-native-paper';
import { CompletedAppointment, UpcomingAppointment } from "../../../components";


const Appointments = () => {
    const [Completed, setCompleted] = useState(false)

    
    return (
        <View style={styles.container}>

            <View style={styles.btncontainer}>
                <Text onPress={() => setCompleted(false)} variant="titleSmall" style={[{padding: 10,}, !Completed ? {backgroundColor: "#0665CB" , color: "#fff"}: {backgroundColor: "#00000014" , color: "#000"}]}>Upcoming</Text>
                <Text onPress={() => setCompleted(true)} variant="titleSmall" style={[{padding: 10,}, Completed ? {backgroundColor: "#0665CB" , color: "#fff"}: {backgroundColor: "#00000014" , color: "#000"}]}>Completed</Text>
                
            </View>

            {!Completed && <UpcomingAppointment />}
            {Completed && <CompletedAppointment />}

        </View>
    );
};

export default Appointments;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        gap: 10
    },
    btncontainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        padding: 20,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "gainsboro"
    },
});
