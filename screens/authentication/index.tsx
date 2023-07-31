import { useState, useEffect } from "react";
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
import { loginUser, registerUser } from "../../services";
import { useAppDispatch } from "../../redux/hooks";
import { loginUserMutation } from "../../redux/features/useSlice";

export interface ISign {
    FirstName: string,
    LastName: string,
    Email_Address: string,
    Phone_Number: string,
    Password: string
}


export default function AuthUser() {


    const [loading, setLoadig] = useState(false)
    const [signup, setSignup] = useState(false)
    const navigation = useNavigation<AuthenticateuserScreenProps>()

    const dispatch = useAppDispatch()


    const { handleSubmit, control, watch } = useForm<ISign>(
    );



    const onFormSubmit = async ({ Email_Address, Password, Phone_Number, FirstName, LastName }: ISign) => {
        if (loading) return
        (async () => {
            setLoadig(true)
            if (!signup) {
                try {
                    const response = await loginUser({ email: Email_Address, password: Password })
                    if (response.status === "success") {
                        const { user } = response
                        dispatch(loginUserMutation({ isLogin: true, user , isFirst: false}))
                    } else {
                        throw new Error(response)
                    }
                } catch (error: any) {
                  
                    Alert.alert(error, error.message)

                } finally {
                    setLoadig(false)
                }

            }


            // siggin
            if (signup) {
               
                try {
                    const response = await registerUser({
                        email: Email_Address,
                        firstName: FirstName,
                        lastName: LastName,
                        password: Password,
                        phoneNumber: Phone_Number
                    })

                    if (response.status === "success") {
                        const { user } = response
                        dispatch(loginUserMutation({ isLogin: false, user , isFirst: true}))

                        navigation.navigate("ConfirmUser", {id: response.user._id})
                    }

                } catch (error: any) {
                    Alert.alert(error, error.message)

                } finally {
                    setLoadig(false)
                }
            }
        })()
    }




    const signwithgoogle = () => {}

    const email = watch("Email_Address")



    useEffect(() => {
        navigation.setOptions({
            title: signup ? 'Set up your profile' : "Welcome back",
        });
    }, [navigation, signup]);


    return (
        <View style={{ flex: 1 }}>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                {/* <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  > */}

                <View style={{ marginTop: 10 }}>

                    {signup &&
                        <>
                            <Text style={styles.label}>First Name </Text>
                            <CustomInput control={control} placeholder="John" name="FirstName" rules={{ required: "First Name is required" }} />

                            <Text style={styles.label}>Last Name </Text>
                            <CustomInput control={control} placeholder="Sam" name="LastName" rules={{ required: "Last Name is required" }} />
                        </>
                    }


                    <Text style={styles.label}>Email Address</Text>
                    <CustomInput control={control} placeholder="Enter Email" name="Email_Address" rules={{
                        required: "This field is required.", pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                            message: 'Enter a valid e-mail address',
                        }
                    }} />

                    {signup &&
                        <>
                            <Text style={styles.label}>Phone Number</Text>
                            <CustomInput control={control} placeholder="Enter Mobile Number" name="Phone_Number" rules={{ required: "This field is required" }} />
                        </>
                    }

                    <Text style={styles.label}>Password</Text>
                    <CustomInput control={control} placeholder="Enter Password" name="Password"
                        rules={{ required: "This field is required", minLength: { value: 7, message: "password should be atleast 7 characters." } }} passord={true}
                    />
                    <Text style={[styles.cta, { textAlign: "left", color: "#0665CB", paddingVertical: 10 }]}
                        onPress={() => navigation.navigate("ForgotPassword", { email })}
                    >Forget Password</Text>

                </View>


                {/*  Sinup btn*/}
                <View style={{ width: "80%", alignSelf: "center", marginVertical: 30 }}>
                    <CustomButton onPress={handleSubmit(onFormSubmit)}
                        title={!signup ? "Log In" : "Sign up"}
                    />
                </View>




                <View style={styles.ctaContainer}>
                    <Text style={styles.cta}>Don’t have an account</Text>
                    <Pressable onPress={() => setSignup(v => !v)}>
                        <Text style={styles.ctaBtn}>{!signup ? "Sign Up" : "Sign In"}</Text>
                    </Pressable>
                </View>

                {/* <View style={styles.ctaContainer}>
                    <Link href={pathname !== "/signup/login" ? "/doctor" : "/doctor"}>
                        <Text style={styles.ctaBtn}>{pathname !== "/signup/login" ? "Sign Up" : "Sign In"}</Text>
                    </Link>
                    <Text style={styles.cta}> as Doctor</Text>
                </View> */}
                {/*DOctor */}
                {/* <View style={styles.ctaContainer}>
                    <Text style={styles.cta}>Admin</Text>
                    <Link href={pathname !== "/signup/login" ? "/broad" : "/broad"}>
                        <Text style={styles.ctaBtn}>{pathname !== "/signup/login" ? "Sign Up" : "Sign In"}</Text>
                    </Link>
                </View> */}


                <View style={styles.lineContainer}>
                    <View style={styles.line} />
                    <Text style={{ color: "rgba(0, 0, 0, 0.5)" }}>or</Text>
                    <View style={styles.line} />
                </View>

                {/* Google btn */}
                <CustomButton
                    title={!signup ? "Log In with Google" : "Sign up with Google"}

                    icon={<Image source={require('../../assets/google.png')} style={{ width: 18, height: 18 }} />}
                    type="secondary"
                    onPress={signwithgoogle}
                />



                {/* </Pressable> */}
                {/* </KeyboardAvoidingView> */}
            </ScrollView>
            {loading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.greenA700} />
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