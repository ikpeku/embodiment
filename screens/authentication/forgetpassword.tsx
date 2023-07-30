import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { CustomButton, CustomInput } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ForgotPasswordScreenProps , ForgotPasswordRouteProp} from '../../types';

interface IForgotPassword{
    email: string,
}


const ForgotPassword = () => {
    
 
    const [loading, setLoadig] = useState(false)
    const navigation = useNavigation<ForgotPasswordScreenProps>()
    
    const route = useRoute<ForgotPasswordRouteProp>()
    const {email} = route?.params
    
    const { handleSubmit, control } = useForm<IForgotPassword>({
        defaultValues: {
            email: email
        }
    });


    const onSubmit = async ({email}: IForgotPassword) => {
        if (loading) return
        setLoadig(true)
        try {
            
            navigation.navigate("ConfirmForgotPassword", {email })
        } catch (error: any) {
            Alert.alert("Error", error.message)

        } finally {
            setLoadig(false)
        }
    }




    return (
        <View style={styles.root}>
            {/* <Stack.Screen options={{ title: "Forgot password", headerTintColor: "#0665CB" }} /> */}

            <CustomInput control={control} label="Email Address" placeholder="Enter Email" name="email" rules={{
                required: "This field is required.", pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Enter a valid e-mail address',
                }
            }} />

            <CustomButton title="Reset password" onPress={handleSubmit(onSubmit)} />


            <Text style={{ textAlign: "center", marginTop: 10, color: "#0665CB" }} onPress={() => navigation.goBack()}>Back to Log In</Text>

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

export default ForgotPassword