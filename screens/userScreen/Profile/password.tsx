import { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import { useForm } from "react-hook-form";
import { CustomButton, CustomInput } from '../../../components';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { baseUrl } from '../../../services';
import { useAppSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/features/useSlice';
import { json } from 'react-router-dom';


interface IForm {
    Old_Passord: string,
            New_Password: string,
            Confirm_Password: string,
}




export default function Changepassword() {
    const [loading, setLoading] = useState(false)

    const { token, user} = useAppSelector(UserState)

    const { handleSubmit, control, watch } = useForm<IForm>();

    const New_Password = watch("New_Password")

    const changePassword = useMutation({
        mutationFn: (data: {}) => {
            return axios.post(`${baseUrl}/user/changePassword`, data, {
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Content-type": "Application/json",
                    Authorization: `Bearer ${token}`
                }
            })
        },
    })

    console.log(user)


    const onSavePassword = async ({Confirm_Password, New_Password, Old_Passord}:IForm) => {
        if (loading) return
        setLoading(true)

        console.log("token: ",token)
        console.log("token: ", Confirm_Password, Old_Passord)


        const response = await fetch(`${baseUrl}/user/changePassword`, {
            credentials: "include",
            headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                currentPassword: Old_Passord,
           newPassword: Confirm_Password
            }),
            method: "POST"
        })

        console.log("res: ",response)

        const result = response.ok
        console.log("result: ",result)


        // axios.post(`${baseUrl}/user/changePassword`, {
        //     currentPassword: Old_Passord,
        //    newPassword: Confirm_Password
        // }, {
        //     headers: {
        //         "Access-Control-Allow-Origin" : "*",
        //         "Content-type": "Application/json",
        //         Authorization: `Bearer ${token}`
        //     }
        // }).then(data => {
        //     console.log(data.data)
        // })

        // try {

        // //    const res = changePassword.mutate({
        // //         currentPassword: Old_Passord,
        // //         newPassword: Confirm_Password
        // //         })

        // //         console.log(res)

        // //         return res

        // axios.post(`${baseUrl}/user/changePassword`, {
        //     currentPassword: Old_Passord,
        //    newPassword: Confirm_Password
        // }, {
        //     headers: {
        //         "Access-Control-Allow-Origin" : "*",
        //         "Content-type": "Application/json",
        //         Authorization: `Bearer ${token}`
        //     }
        // })
            
           
        // } catch (error: any) {
        //     Alert.alert("Error", error.message)

        // } finally {
        //     setLoading(false)
        // }
    }


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ paddingBottom: 20 }} >

                <View style={{ paddingVertical: 15 }}>
                    <Text style={styles.title}>Change password</Text>
                </View>

              
                <CustomInput control={control} label="Old Passord" placeholder="Old Passord" name="Old_Passord" passord={true}
                    rules={{ required: "required" }} />
                <CustomInput control={control} label="New password" placeholder="New password" name="New_Password" passord={true}
                    rules={{ required: "required", minLength: { value: 7, message: "password should be atleast 7 characters." } }} />
                <CustomInput control={control} label="Confirm password" placeholder="Confirm password" name="Confirm_Password" passord={true}
                    rules={{ required: "required", validate: (value: string) => value === New_Password || "password do not match" }}
                />

                <View style={{ marginTop: 60 }}>
                    <CustomButton onPress={handleSubmit(onSavePassword)} title="Save" />
                </View>

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