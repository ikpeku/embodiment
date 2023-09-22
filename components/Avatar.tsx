import * as React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Avatar, Text } from 'react-native-paper';

interface IProfileAvatar {
    text: string; 
    photoUrl: string; 
    type: "Center" | "Start",
    onPress: () => void
}

const ProfileAvatar = ({onPress, text, photoUrl, type = "Center" }:IProfileAvatar) => (
    <Pressable onPress={onPress} style={styles[`avatar${type}`]}>

        <Avatar.Image size={type === "Center" ? 70 : 40} source={{ uri: photoUrl }} />
        {text && 
        <Text variant={"bodyLarge"} style={{ paddingVertical: 10 }}>{type === "Start" ? " Hi," : ""} {" "}
        <Text variant={type === "Center" ? 'bodySmall' : "titleLarge"} style={{ paddingVertical: 10 }}>{text}</Text>
        </Text>
        }
    </Pressable>
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