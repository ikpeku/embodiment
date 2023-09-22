import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import { useForm } from "react-hook-form";
import { CustomButton, CustomInput } from '../../../components';
import { baseURL, useDoctor } from '../../../services';
import { useAppSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/features/useSlice';


interface IForm {
    Bank: string,
    Account_name: string,
    Account_number: string,
}




export default function BankDetails() {
    const [loading, setLoading] = useState(false)
    const { token, user} = useAppSelector(UserState)
    const { data } = useDoctor(user._id)


    const { handleSubmit, control, reset} = useForm<IForm>();

    

    const onBankDetail = async ({Account_name, Account_number, Bank}:IForm) => {
        if (loading) return
        setLoading(true)

        const bankForm = {
            bankName:  Bank,
            accountName: Account_name,
            accountNumber: Account_number
        }

        try {

            const response = await fetch(`${baseURL}/doctor/update/${user._id}`, {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json; charset=utf-8',
                    Authorization: `Token ${token}`,
                },
                body: JSON.stringify(bankForm)
            })

            const result = await response.json()

            if (result.status === "success") {
                // dispatch(updateUser({ ...result.data }))
                Alert.alert("Successful", "profile updated")

            } else {
                throw new Error(result.message)
            }
            
           
        } catch (error: any) {
            Alert.alert("Error", error.message)

        } finally {
            setLoading(false)
        }
    }


    useEffect(() => {
        // console.log("Bank: ", data)
        reset({
            Account_name: "",
            Account_number: "",
            Bank: ""
        })
    },[data])
    


    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >
            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ paddingBottom: 20 }} >

                {/* <View style={{ paddingVertical: 15 }}>
                    <Text style={styles.title}>Change password</Text>
                </View> */}

              
                <CustomInput control={control} label="Bank" placeholder="Enter your bank name" name="Bank"
                    rules={{ required: "required" }} />

                <CustomInput control={control} label="Account name" placeholder="Enter your account name" name="Account_name"
                    rules={{ required: "required" }} />
                
                <CustomInput control={control} label="Account number" placeholder="Enter your account number" name="Account_number"
                    rules={{ required: "required"}}
                />

                <View style={{ marginTop: 60 }}>
                    <CustomButton onPress={handleSubmit(onBankDetail)} title="Save" />
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