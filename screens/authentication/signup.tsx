import { useState, useEffect, useMemo } from "react";
import {
    Text, View, ScrollView, StyleSheet, KeyboardAvoidingView, Platform, Alert, Image,
    Pressable
} from "react-native";
// import { usePathname, useRouter, Stack, Link } from "expo-router";

import { useForm } from "react-hook-form";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { CustomButton, CustomInput } from "../../components";
import { useNavigation, useRoute } from "@react-navigation/native";

import { AuthenticateuserScreenProps } from "../../types";
// import { loginUser, registerUser } from "../../services";
import { useAppDispatch } from "../../redux/hooks";
import { loginUserMutation } from "../../redux/features/useSlice";
import { baseURL } from "../../services";
import { signup, useSignup } from "../../services/authenApi";
import axios from "axios";

export interface ISign {
    FirstName: string,
    LastName: string,
    Email_Address: string,
    Phone_Number: string,
    Password: string
}


export default function SignupUser() {


    const [loading, setLoading] = useState(false)
    // const [signup, setSignup] = useState(false)
    const [error, setError] = useState("")
    const navigation = useNavigation<AuthenticateuserScreenProps>()

    const dispatch = useAppDispatch()


    const { handleSubmit, control, watch } = useForm<ISign>(
    );


    // const {mutate, data, error, isLoading} = useSignup()

    // console.log("response: ",data.data)



    const onSignupSubmit = async ({ Email_Address, Password, Phone_Number, FirstName, LastName }: ISign) => {
        if (loading) return
        setLoading(true);
        // const data = {
        //             email: Email_Address,
        //             firstName: FirstName,
        //             lastName: LastName,
        //             password: Password,
        //             phoneNumber: Phone_Number
        //         }

        //     mutate(data)

    //            try {
    //             // const res = await signup(data)
    //             // console.log(res)

    //             const res =  JSON.stringify(data)
    //             console.log(res)

    //                 const response = await fetch(`${baseURL}/auth/register`, {
    //                     method: "POST",
    //                     headers: {
    //                         'Accept': 'application/json',
	// 'Content-Type': 'application/json; charset=utf-8',
    
    //                     //   "Content-Type": "application/json",
    //                     //   'Access-Control-Allow-Origin': '*',
    //                     //   'Access-Control-Allow-Headers': '*',
    //                     // 'Content-Type': 'multipart/form-data'
                        
    //                     },
    //                     body: res
    //                   })
    //                   const datas = await response.json()
    //         console.log(datas)

    //            } catch (error) {

    //             // if(axios.isAxiosError(error)) {

    //                 console.log(error)
    //             // }
    //            }


        


        
       
          
                try {
                    // const response = await registerUser({
                    //     email: Email_Address,
                    //     firstName: FirstName,
                    //     lastName: LastName,
                    //     password: Password,
                    //     phoneNumber: Phone_Number
                    // })

                    // if (response.status === "success") {
                    //     const { user } = response
                    //     dispatch(loginUserMutation({ isLogin: false, user , isFirst: false}))

                        // navigation.navigate("ConfirmUser", {id: response.user._id})
                    // }
                   
                    const data = {
                        email: Email_Address,
                        firstName: FirstName,
                        lastName: LastName,
                        password: Password,
                        phoneNumber: Phone_Number
                    }

                     const res =  JSON.stringify(data)

                    const response = await fetch(`${baseURL}/auth/register`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: res
                      })


                      const result = await response.json()
                    //   console.log("result: ",result)

                      if (result.status === "success") {
                        const { user , token} = result
                            // dispatch(loginUserMutation({ isLogin: false, user , isFirst: false, token}))
                            navigation.navigate("ConfirmUser", {id: result.user._id, email: result.user.email})

                      } else if(result.message == "An error occurred while signing up.") {

                        const response = await fetch(`${baseURL}/auth/requestotp`, {
                        method: "POST",
                        body: JSON.stringify({email: data.email})
                      })


                      const result = await response.json()

                    //   console.log("result: ",result)
                    Alert.alert("confirm", result.message)


                      } else{
                        throw new Error(result.message)
                      }

                } catch (error: any) {
                    Alert.alert("ERROR", error.message)
                    // console.log("err: ",error)
                } finally {
                    setLoading(false)
                }

                setLoading(false)
    }

    const signwithgoogle = () => {}
    const email = watch("Email_Address")


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  > */}

                <View style={{ marginTop: 10 }}>

                            <Text style={styles.label}>First Name </Text>
                            <CustomInput control={control} placeholder="Enter First Name" name="FirstName"
                             rules={{ required: "First Name is required" }}
                              />

                            <Text style={styles.label}>Last Name </Text>
                            <CustomInput control={control} placeholder="Enter Last Name" name="LastName"
                             rules={{ required: "Last Name is required" }}
                             />
                    

                    <Text style={styles.label}>Email Address</Text>
                    <CustomInput control={control} placeholder="Enter Email" name="Email_Address" rules={{
                        required: "This field is required.", pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Enter a valid e-mail address',
                        }
                    }} />

                            <Text style={styles.label}>Phone Number</Text>
                            <CustomInput control={control} placeholder="Enter Mobile Number" name="Phone_Number" rules={{ required: "This field is required" }} />
                    
                    <Text style={styles.label}>Password</Text>
                    <CustomInput control={control} placeholder="Enter Password" name="Password"
                        rules={{ required: "This field is required", minLength: { value: 8, message: "password should be atleast 7 characters." } }} passord={true}
                    />

                    <Text style={[styles.cta, { textAlign: "left", color: "#0665CB", paddingVertical: 10 }]}
                        onPress={() => navigation.navigate("ForgotPassword", { email })}
                    >Forget Password</Text>

                </View>


                {/*  Sinup btn*/}
                <View style={{ width: "80%", alignSelf: "center", marginVertical: 30 }}>
                    
                   <CustomButton onPress={handleSubmit(onSignupSubmit)}
                        title="Sign up"
                    />
                </View>

                <View style={styles.ctaContainer}>
                    <Text style={styles.cta}>Don’t have an account</Text>
                    <Pressable onPress={() => navigation.replace("Authenticateuser") }>
                        <Text style={styles.ctaBtn}>Sign In</Text>
                    </Pressable>
                </View>


                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                    <Text style={{ color: "rgba(0, 0, 0, 0.5)" }}>or</Text>
                    <View style={styles.line} />
                </View>

                {/* Google btn */}
                <CustomButton
                    title="Sign up with Google"

                    icon={<Image source={require('../../assets/google.png')} style={{ width: 18, height: 18 }} />}
                    type="secondary"
                    onPress={signwithgoogle}
                />

                {/* </Pressable> */}
                {/* </KeyboardAvoidingView> */}
            </ScrollView>
            {loading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}

        </View>

    )




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#fff"
    },
    title: {
        fontFamily: 'avenir',
        fontSize: 32,
        lineHeight: 44,
        color: "#0665CB",
        fontWeight: "500"
    },
    textInputContainer: {
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: "rgba(0, 0, 0, 0.08)",
        marginVertical: 24
    },
    input: {
        height: 40,
        flexGrow: 1,
    },
    password: {
        flexDirection: "row",
        alignItems: "center"
    },
    cta: {
        fontFamily: 'avenir',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 22,

        textAlign: "center",

        color: "rgba(0, 0, 0, 0.5)"
    },
    ctaContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 5
    },
    ctaBtn: {
        fontFamily: 'avenir',
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 22,
        color: "#0665CB"

    },
    line: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        flexGrow: 1,
        borderColor: "rgba(0, 0, 0, 0.15)",
        borderWidth: 1

    },
    lineContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
        // marginVertical: 40
        paddingVertical: 15

    },
    label: {
        fontWeight: "bold"
    }



})