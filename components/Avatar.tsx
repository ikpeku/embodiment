import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

interface IProfileAvatar {
    text: string; 
    photoUrl: string; 
    type: "Center" | "Start"
}

const ProfileAvatar = ({ text, photoUrl, type = "Center" }:IProfileAvatar) => (
    <View style={styles[`avatar${type}`]}>

        <Avatar.Image size={type === "Center" ? 70 : 40} source={{ uri: photoUrl }} />
        {text && 
        <Text variant={"bodyLarge"} style={{ paddingVertical: 10 }}>{type === "Start" ? " Hi," : ""} {" "}
        <Text variant={type === "Center" ? 'bodySmall' : "titleLarge"} style={{ paddingVertical: 10 }}>{text}</Text>
        </Text>
        }
    </View>
);
export default ProfileAvatar


const styles = StyleSheet.create({
    avatarCenter: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 10
    },
    avatarStart: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10

    }

})