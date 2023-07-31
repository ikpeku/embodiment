import { StyleSheet, View } from 'react-native'
import React, {ReactNode} from 'react'
import { Avatar, Card, Text } from 'react-native-paper';

interface ICardTag {
    mode?: 'elevated' | 'outlined' | 'contained',
    rightIcon?: ReactNode,
    title: string,
    subTitle: string, 
    url: string, 
    // elevation?: 0 | 1 | 2 | 3 | 4 | 5 , 
    onPress?: () => void
}
// elevation,
// elevation={mode === "elevated" ? elevation : undefined}

const CardTag = ({ mode = "contained", rightIcon, title, subTitle, url,  onPress }:ICardTag) => {
    return (
        <Card onPress={onPress} mode={mode} style={[{ backgroundColor: "#fff" }, mode === "elevated" ? { marginBottom: 4, marginTop: 4, marginHorizontal: 3 } : {}]}  >
            <Card.Content style={styles.header}>
                <View style={styles.headerContainer}>
                    <Avatar.Image size={40}
                        source={{ uri: url }} />

                    <View>
                        <Text variant='titleMedium' style={styles.title}>{title}</Text>
                        <Text variant='bodyMedium' style={[styles.title, styles.subTitle]}>{subTitle}</Text>
                    </View>


                </View>

                {rightIcon}
            </Card.Content>
        </Card >
    )
}

export default CardTag

const styles = StyleSheet.create({
    header: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }, headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontFamily: 'avenir',
    },
    subTitle: {
        color: "rgba(0, 0, 0, 0.5)"
    },
})