import { StyleSheet, View } from 'react-native'
import React, {ReactNode} from 'react'
import { Avatar, Card, Text } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';


interface ICardTag {
    mode?: 'elevated' | 'outlined' | 'contained',
    rightIcon?: ReactNode,
    title: string,
    subTitle: string, 
    url: string, 
    // elevation?: 0 | 1 | 2 | 3 | 4 | 5 , 
    onPress?: () => void,
    isStar?: boolean,
    starRating?: number
}
// elevation,
// elevation={mode === "elevated" ? elevation : undefined}

const CardTag = ({ mode = "contained", rightIcon, title, subTitle, url,  onPress, isStar, starRating }:ICardTag) => {

  
    return (
        <Card onPress={onPress} mode={mode} style={[{ backgroundColor: "#fff" }, mode === "elevated" ? { marginBottom: 4, marginTop: 4, marginHorizontal: 3 } : {}]}  >
            <Card.Content style={styles.header}>
                <View style={styles.headerContainer}>
                    <Avatar.Image size={60}
                        source={{ uri: url }} />

                    <View style={{flex: 1, gap: 3}}>
                        <Text variant='titleSmall' style={[styles.title,{ fontFamily: 'avenir',}]}>{title}</Text>
                        <Text variant='bodyMedium' style={[styles.title, styles.subTitle]}>{subTitle}</Text>

                 { isStar &&  <View style={{ flexDirection: "row", alignItems: "center", gap: 7, backgroundColor: "#fff" }}>
                        <Ionicons name="md-star" size={24} color="#FFCE31" />
                        <Text variant='bodySmall'>{starRating}</Text>
                        <Text onPress={onPress} variant='bodyMedium' style={{ backgroundColor: "#0665CB", color: "#fff", borderRadius: 4, paddingHorizontal: 5 }}>Rate this doctor</Text>
                    </View>}

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
        width: "90%",
        flex: 1
    },
    title: {
        // fontFamily: 'avenir',
        textTransform: "capitalize"
    },
    subTitle: {
        color: "rgba(0, 0, 0, 0.5)"
    },
})