import { StyleSheet, Text, View , Pressable} from "react-native";
import React, { ReactNode } from "react";

interface IItem {

    leftIcon: ReactNode,
     rightIcon?: ReactNode, 
     title: string, 
     signout?: boolean, 
     onPress: () => void, 
}



    const ProfileItem = ({ leftIcon, rightIcon, title, signout = false, onPress}:IItem) => {
        return (
                <Pressable onPress={onPress}>
                    <View style={[styles.switchContainer, signout ? {} : { borderTopWidth: StyleSheet.hairlineWidth }]}>
                        <View style={{ flexDirection: "row", gap: 20, alignItems: "center", }}>

                            {leftIcon}
                            <Text style={[styles.title, { fontSize: 16 }, signout ? { color: "#EA4335", opacity: 0.8 } : {}]}>{title}</Text>
                        </View>


                        {rightIcon}

                    </View>
                </Pressable>
        )
    }



export default ProfileItem



const styles = StyleSheet.create({
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(0, 0, 0, 0.1)",
        paddingVertical: 13
    },
    title: {
        fontFamily: 'avenir',
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 33,
    },
});
