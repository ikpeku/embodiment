import { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native'
import { useForm } from "react-hook-form";
import { CustomButton, CustomInput } from '../../../components';


interface IForm {
    Bank: string,
    Account_name: string,
    Account_number: string,
}




export default function BankDetails() {
    const [loading, setLoading] = useState(false)


    const { handleSubmit, control} = useForm<IForm>();

    

    const onBankDetail = async ({Account_name, Account_number, Bank}:IForm) => {
        if (loading) return
        setLoading(true)
        try {
            
           
        } catch (error: any) {
            Alert.alert("Error", error.message)

        } finally {
            setLoading(false)
        }
    }


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