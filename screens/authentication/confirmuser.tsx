import {useState} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useForm } from "react-hook-form";
import { Snackbar } from 'react-native-paper';
import { CustomButton, CustomInput } from '../../components';
import { useNavigation } from '@react-navigation/native';

interface IConfirmUser {
   code: string
}

const ConfirmUser = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()

    const { handleSubmit, control } = useForm<IConfirmUser>();


    const onSubmit = async ({code}: IConfirmUser) => {
        if (loading) return
        setLoading(true)
        try {
            navigation.goBack()
        } catch (error) {
            // Alert.alert("Error", error.message)

        } finally {
            setLoading(false)
        }
    }

    const HandleResend = async () => {
        try {
            // await Auth.resendSignUp(user)
            setVisible(true)
        } catch (error) {
            // Alert.alert("Error", error.message)

        }
    }



    return (
        <View style={styles.root}>
           
            <>
            <Text style={{textAlign: "center", color: "#0665CB"}}>Check email for a confirmation code</Text>

            <CustomInput control={control} label="Confirmation Code" placeholder="Enter your confirmation code" name="code" rules={{
                required: "Confirmation code is required."
            }} />
            </>


            {!loading && <CustomButton  title="Confirm" onPress={handleSubmit(onSubmit)} />}
            {loading && <CustomButton title="loading" onPress={() => {}} />}

            <CustomButton title="Resend code" type='secondary' onPress={HandleResend} />

            <Text style={{ textAlign: "right", marginTop: 10 }} onPress={() => navigation.goBack()}>Back to Sign In</Text>

            <Snackbar
                visible={visible}
                onDismiss={() => setVisible(false)}
                duration={3000}
                // wrapperStyle={{backgroundColor: "#0665CB"}}
                // action={{
                //     label: 'x',
                //     onPress: () => setVisible(false)
                // }}
                >
                Code resend check your email.
            </Snackbar>
        </View>
    )
}
const styles = StyleSheet.create({
    root: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 15,
        gap: 10,
        paddingTop: 25
    }
})

export default ConfirmUser