import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomButton, CustomInput } from '../../components';
import { ConfirmForgotPasswordRouteProp, ConfirmForgotPasswordScreenProps } from '../../types';

interface IConfirmForgetPassword {
    Email: string,
    Confirm_Password: string,
    Password: string,
    code: string
}

const ConfirmForgotPassword = () => {
 
    const [loading, setLoadig] = useState(false)
    const navigation = useNavigation<ConfirmForgotPasswordScreenProps>()
    const route = useRoute<ConfirmForgotPasswordRouteProp>()
    const {email} = route?.params

    const { handleSubmit, control, watch } = useForm<IConfirmForgetPassword>({
        defaultValues: {
            Email: email,
        }
    });


    const password = watch("Password")


    const onSubmit = async ({Confirm_Password, Email, Password, code}: IConfirmForgetPassword) => {
        if (loading) return
        setLoadig(true)
        try {
         
            navigation.replace("Authenticateuser")
        } catch (error:any) {
            Alert.alert("Error", error.message)

        } finally {
            setLoadig(false)
        }
    }



    return (
        <View style={styles.root}>
    
            <CustomInput control={control} label="Confirmation Code" placeholder="Enter your confirmation code from your email" name="code" rules={{
                required: "This field is required."
            }} />

            <CustomInput control={control} label="Password" placeholder="Enter Password" name="Password"
                rules={{ required: "This field is required", minLength: { value: 7, message: "password should be atleast 7 characters." } }} passord={true}
            />
            <CustomInput control={control} label="Confirm Password" placeholder="Confirm Password" name="Confirm_Password"
                rules={{
                    required: "This field is required",
                    minLength: {
                        value: 7, message: "password should be atleast 7 characters."
                    },
                    validate: (value:string) => value === password || "password do not match"
                }} passord={true}
            />


            <CustomButton title="Change" onPress={handleSubmit(onSubmit)} />

        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        gap: 10
    }
})

export default ConfirmForgotPassword