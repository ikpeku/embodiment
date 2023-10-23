import { View, Text, StyleSheet, Alert } from 'react-native'
import React, { useState } from 'react'
import { useForm } from "react-hook-form";
import { CustomButton, CustomInput } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ForgotPasswordScreenProps , ForgotPasswordRouteProp} from '../../types';
import { useRequestPasswordReset } from '../../services/authenApi';
import { ActivityIndicator, MD2Colors } from 'react-native-paper';

interface IForgotPassword{
    email: string,
}


const ForgotPassword = () => {
    
 
    const [loading, setLoading] = useState(false)
    const navigation = useNavigation<ForgotPasswordScreenProps>()
    
    const route = useRoute<ForgotPasswordRouteProp>()
    const {email} = route?.params

    const resendotp = useRequestPasswordReset()
    
    const { handleSubmit, control } = useForm<IForgotPassword>({
        defaultValues: {
            email: email
        }
    });


    const onSubmit = async ({email}: IForgotPassword) => {
        if (loading) return
        setLoading(true)
        try {
      
            resendotp.mutate({email})
            navigation.navigate("ConfirmForgotPassword", {email })
        } catch (error: any) {
            Alert.alert("Error", error.message)

        } finally {
            setLoading(false)
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

            {loading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}

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