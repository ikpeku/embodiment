import { StyleSheet, View, TouchableOpacity, Pressable } from 'react-native'
import React, { ReactNode } from 'react'
import { Avatar, Card, Text } from 'react-native-paper';

interface IDoctorcard {
    title: string, 
    rightIcon: ReactNode, 
    subTitle: number, 
    isDoctor?: boolean,
    onPress?: () => void,
    onCardPress?: () => void
}


const DoctorCard = ({ title,onCardPress, rightIcon, subTitle, isDoctor = false, onPress }: IDoctorcard) => {
    return (
        <Card onPress={onCardPress} style={styles.header}>
            <Card.Content >
                <View style={[styles.headerContainer]}>
                    <Text  style={[styles.title, { color: "white" , fontWeight: "400", fontSize: 14}]}>{title}</Text>
                    {rightIcon}
                </View>
                <View style={styles.headerContainer}>
                    <Text variant='titleLarge' style={[styles.title, {  color: "white" }]}>{subTitle}</Text>

                    {isDoctor && < Pressable onPress={onPress}>
                        <Text style={[styles.title,
                        { color: "#0665CB", backgroundColor: "white", borderRadius: 15, paddingVertical: 10, paddingHorizontal: 18 }]}>+ Invite Doctor</Text>
                    </Pressable>}
                </View>
            </Card.Content>
        </Card >
    )
}

export default DoctorCard


const styles = StyleSheet.create({
    header: {
        backgroundColor: "#0665CB",
        flexGrow: 1,
        width: "100%",
        flex: 1
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "nowrap",
        gap: 5,
        paddingBottom: 10
    },
    title: {
        fontFamily: 'avenir',

    },
})