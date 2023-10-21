import React, { useState, ReactNode } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Feather, Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Switch, Text } from 'react-native-paper';
import { Exit } from '../../../assets';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AccountScreenProps} from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { UserState, logoutMutation } from '../../../redux/features/useSlice';


interface IItem {

    leftIcon: ReactNode,
     rightIcon?: ReactNode, 
     title: string, 
     signout?: boolean, 
     onPress: () => void, 
}


const AdminProfiles = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    const navigation = useNavigation<AccountScreenProps>()

    const {user} = useAppSelector(UserState)
    const {firstName, lastName, status} = user


    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

    const Item = ({ leftIcon, rightIcon, title, signout = false, onPress}:IItem) => {
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


    const HandleSignout = async () => {
        if (loading) return
        setLoading(true)
        dispatch(logoutMutation())
        setLoading(false)
    }





    return (
        <View style={styles.container}>

            <View style={{ flexDirection: "row", alignItems: "center", padding: 15, gap: 10, paddingBottom: 30 }}>

                <Avatar.Image size={40}
                    source={{ uri: user.avatar }} />
                <Text variant='titleMedium' style={{flex: 0.8}}>{`${firstName} ${lastName}  `}</Text>
                {status !== "unverified" && <Avatar.Image size={24} source={require('../../../assets/profileIcon.png')}
                    style={{ backgroundColor: "#fff", marginLeft: "auto" }}
                     />}
            </View>

            {/* Account */}
            <Item
                title="Account"
                leftIcon={<Feather name="user" size={20} color="#0665CB" />}
                rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" />}
                onPress={() => navigation.navigate("AdminEditprofile")}
            />


            {/* Password */}
            <Item
                title="Password"
                leftIcon={<MaterialCommunityIcons name="form-textbox-password" size={20} color="#0665CB" />}
                rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" />}
                onPress={() => navigation.navigate("AdminChangepassword")}
            />


            {/* help */}
            <Item
                title="Help & Support"
                leftIcon={<SimpleLineIcons name="earphones-alt" size={20} color="#0665CB" />}
                rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" />}
                onPress={() => navigation.navigate("AdminSupport")}
            />


            {/* Notification */}
            <Item
                title="Notification"
                leftIcon={<Feather name="bell" size={20} color="#0665CB" />}
                rightIcon={<Switch color='#0665CB' value={isSwitchOn} onValueChange={onToggleSwitch} />}
                onPress={() => {}}
            />



            {/* Exit */}
            <Pressable style={[{ marginTop: "auto" }]}>
                <Item
                    title="Sign out"
                    leftIcon={<Exit color="#EA4335" />}
                    signout={true}
                    onPress={HandleSignout}
                />
            </Pressable>

            {loading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.greenA700} />
                </View>
            )}

        </View>
    )
}

export default AdminProfiles

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    header: {
        padding: 20,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    title: {
        fontFamily: 'avenir',
        fontWeight: "500",
        fontSize: 24,
        lineHeight: 33,
    },
    subTitle: {
        fontFamily: 'avenir',
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 19,
        color: "rgba(0, 0, 0, 0.5)"
    },
    switchContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,

        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: "rgba(0, 0, 0, 0.1)",
        paddingVertical: 13
    }
})