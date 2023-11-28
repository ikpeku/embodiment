import {useState} from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import { useForm } from "react-hook-form";
import { ActivityIndicator, MD2Colors, Snackbar } from 'react-native-paper';
import { CustomButton, CustomInput } from '../../components';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useAppDispatch } from '../../redux/hooks';
import { loginUserMutation } from '../../redux/features/useSlice';
import { ConfirmUserRouteProp } from '../../types';
import { useResendOTP} from '../../services/authenApi';
import { baseURL } from '../../services';
import axios from 'axios';
// import Purchases from 'react-native-purchases';


interface IConfirmUser {
   code: string
}

const ConfirmUser = () => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigation = useNavigation()
    const route = useRoute<ConfirmUserRouteProp>().params

    const dispatch = useAppDispatch()


    const resendotp = useResendOTP()

    const { handleSubmit, control } = useForm<IConfirmUser>();

    const onSubmit = async ({code}: IConfirmUser) => {
        // console.log("code: ",code)


        if (loading) return
        setLoading(true)
        const token = {userId: route.id.trim(), verificationCode: code.trim()}

        try {
           const res = await axios.post(`${baseURL}/auth/verifyotp`, token)
        //    console.log("res: ",res.data)
           const result = res.data
                 if (result.status === "success") {
                const { user, token } = result
                // dispatch(verifyOTP({isLogin: true}))
             
                const updatedData = {
                    _id: user?._id,
                    firstName: user?.firstName,
                    lastName: user?.lastName,
                    email: user?.email,
                    phoneNumber: user?.phoneNumber,
                    // isDoctor: user?.isDoctor,
                    status: user?.status,
                    allergies: user?.allergies,
                    createdAt: user?.createdAt,
                    updatedAt: user?.updatedAt,
                    role: user?.role,
                    // doctorId: user?.doctorId
                    avatar: user?.avatar ? user?.avatar  : "https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"
                }
                // await Purchases.logIn(user?.email)
                dispatch(loginUserMutation({ isLogin: true, user: updatedData, isFirst: false, token }))
            }
        } catch (error:any) {
            // console.log("err: ",error.response.data.message)
            Alert.alert("Error", error.response.data.message)
        }
            setLoading(false)

    }



    const HandleResend = async () => {
        setVisible(true)
        resendotp.mutate({email: route.email })
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
                duration={5000}
                // wrapperStyle={{backgroundColor: "#0665CB"}}
                // action={{
                //     label: 'x',
                //     onPress: () => setVisible(false)
                // }}
                >
                Code resend check your email.
            </Snackbar>

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
        gap: 10,
        paddingTop: 25
    }
})

export default ConfirmUser