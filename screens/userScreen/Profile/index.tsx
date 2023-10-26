import React, { useState } from 'react'
import { StyleSheet, View, Pressable } from 'react-native'
import { Feather, Ionicons, SimpleLineIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Avatar, Switch, Text } from 'react-native-paper';
import { Exit } from '../../../assets';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { AccountScreenProps} from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { UserState, logoutMutation } from '../../../redux/features/useSlice';
import { ProfileItem } from '../../../components';
import * as Linking from 'expo-linking';



const DoctorProfile = () => {
    const [loading, setLoading] = useState(false)
    const dispatch = useAppDispatch()

    const navigation = useNavigation<AccountScreenProps>()

    const {user} = useAppSelector(UserState)
    const {firstName, lastName, avatar} = user

  
    const [isSwitchOn, setIsSwitchOn] = useState(false);

    const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);

   

    const HandleSignout = async () => {
        if (loading) return
        setLoading(true)
        dispatch(logoutMutation())
        setLoading(false)
    }

    const openWhatsApp = () => {

            let url =
              "whatsapp://send?text=" +
              "welcome to embodiment health-care. How may we help you?" +
              "&phone=+234" +
              "7067057396";
            Linking.openURL(url)
              .then(data => {
                // console.log("WhatsApp Opened successfully " + data);
                return data
              })
              .catch(() => {
                alert("Make sure WhatsApp installed on your device");
              });
      };
    
      


    return (
        <View style={styles.container}>

            <View style={{ flexDirection: "row", alignItems: "center", padding: 15, gap: 10, paddingBottom: 30 }}>

                <Avatar.Image size={40}
                    source={{ uri: avatar}} />
                <Text variant='titleMedium' style={{flex: 0.8}}>{`${firstName} ${lastName}  `}</Text>
               
            </View>

            {/* Account */}
            <ProfileItem
                title="Account"
                leftIcon={<Feather name="user" size={20} color="#0665CB" />}
                rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" />}
                onPress={() => navigation.navigate("Account")}
            />

               {/* Bank details */}

               {user.role === "isDoctor" &&   <ProfileItem
                title="Bank details"
                leftIcon={<MaterialCommunityIcons name="bank" size={24} color="#0665CB" />}
                rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" />}              
                onPress={() => navigation.navigate("BankDetails")}
            />}


            {/* Password */}
            <ProfileItem
                title="Password"
                leftIcon={<MaterialCommunityIcons name="form-textbox-password" size={20} color="#0665CB" />}
                rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" />}
                onPress={() => navigation.navigate("Password")}
            />


            {/* help */}
            <ProfileItem
                title="Help & Support"
                leftIcon={<SimpleLineIcons name="earphones-alt" size={20} color="#0665CB" />}
                rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" />}
                // onPress={() => navigation.navigate("HelpandSupport")}
                onPress={openWhatsApp}
            />


             {/* Subscribe */}

            {user.role === "isUser" && <ProfileItem
                title="Subscribe"
                leftIcon={<Feather name="arrow-up-circle" size={24} color="#0665CB" />}
                rightIcon={<Ionicons name="chevron-forward" size={20} color="#0665CB" />}
              
                onPress={() => navigation.navigate("Subscribe")}
            />}

         

            {/* Notification */}
            <ProfileItem
                title="Notification"
                leftIcon={<Feather name="bell" size={20} color="#0665CB" />}
                rightIcon={<Switch color='#0665CB' value={isSwitchOn} onValueChange={onToggleSwitch} />}
                onPress={() => {}}
            />



            {/* Exit */}
            <Pressable style={[{ marginTop: "auto" }]}>
                <ProfileItem
                    title="Sign out"
                    leftIcon={<Exit color="#EA4335" />}
                    signout={true}
                    onPress={HandleSignout}
                />
            </Pressable>

            {loading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}

        </View>
    )
}

export default DoctorProfile

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
  
    subTitle: {
        fontFamily: 'avenir',
        fontWeight: "400",
        fontSize: 14,
        lineHeight: 19,
        color: "rgba(0, 0, 0, 0.5)"
    },


})