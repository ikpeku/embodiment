import { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import { useForm } from "react-hook-form";
import { CustomButton, CustomInput } from '../../../components';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import {baseUrl} from "../../../services";
import {ActivityIndicator} from "react-native-paper";
import { UserState } from '../../../redux/features/useSlice';
import { useAppSelector } from '../../../redux/hooks';


interface IForm {
    Old_Passord: "",
            New_Password: "",
            Confirm_Password: "",
}




export default function AdminChangepassword() {
    const [loading, setLoading] = useState(false)
    const { token} = useAppSelector(UserState)

    const navigation = useNavigation()


    const { handleSubmit, control, watch } = useForm<IForm>();

    const New_Password = watch("New_Password")


    const onSavePassword = async ({Confirm_Password, New_Password, Old_Passord}:IForm) => {
        if (loading) return
        setLoading(true)
        try {
const data = {
    currentPassword: Old_Passord,
    newPassword: New_Password
}
           const res = await axios.post(`${baseUrl}/user/changePassword`, data , {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${token}`,
                }
            })

            console.log(await res.data)


            // navigation.goBack()    
            
        } catch (error: any) {
            Alert.alert("Error", error.message)

        } finally {
            setLoading(false)
        }
    }


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ paddingBottom: 20 }} >

                <View style={{ paddingVertical: 15 }}>
                    <Text style={styles.title}>Change password</Text>
                </View>

              
                <CustomInput control={control} label=" Old Passord" placeholder=" Old Passord" name=" Old_Passord" passord={true}
                    rules={{ required: "required" }} />
                <CustomInput control={control} label="New password" placeholder="New password" name="New_Password" passord={true}
                    rules={{ required: "required", minLength: { value: 7, message: "password should be atleast 7 characters." } }} />
                <CustomInput control={control} label="Confirm password" placeholder="Confirm password" name="Confirm_Password" passord={true}
                    rules={{ required: "required", validate: (value: string) => value === New_Password || "password do not match" }}
                />

                <View style={{ marginTop: 60 }}>
                    <CustomButton onPress={handleSubmit(onSavePassword)} title="Save" />
                </View>

                {loading && <ActivityIndicator/>}

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
    title: {
        fontFamily: 'avenir',
        fontSize: 20,
        lineHeight: 27,
        color: "#000",
        fontWeight: "500"
    },
})