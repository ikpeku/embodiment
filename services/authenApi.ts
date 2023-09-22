
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Request from './Request';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { AuthenticateuserScreenProps } from '../types';
import { useAppDispatch } from '../redux/hooks';
import { loginUserMutation } from '../redux/features/useSlice';



// export const baseURL = "https://embodie.vercel.app/api";
export const baseURL = "https://embodi-be.vercel.app/api";

axios.defaults.withCredentials = true;

const client = axios.create({ baseURL })


export const request = async ({ ...options }) => {
    client.defaults.headers.common.Authorization = `Bearer token`
    const onSuccess = (response: any) => response
    const onError = (error: any) => error

    return await client(options).then(onSuccess).catch(onError)
}


interface ISignup {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phoneNumber: string
}

interface IVerify {
    userId: string,
    verificationCode: string
}

export const signup = (body: ISignup) => {
    // return axios.post(`${baseURL}/auth/register`, body)
    return request({
        method: "post", url: "/auth/register", data: body, headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        }
    })
}


interface ISignIn {
    email: string,
    password: string
}

export const signin = (body: ISignIn) => {
    // return axios.post(`${baseURL}/auth/register`, body)
    return request({
        method: "post", url: "/auth/login", data: body, headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        }
    })
}


export const verify = (body: IVerify) => {
    // console.log("body", body)
    return request({
        method: "post", url: "/auth/verifyotp", data: body, headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        }
    })
}

interface IResenOTP {
    email: string
}

export const resendOTP = (body: IResenOTP) => {

    return request({
        method: "post", url: "/auth/requestotp", data: body, headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        }
    })
}




export const useSignup = () => {
    const navigation = useNavigation<AuthenticateuserScreenProps>()
    return useMutation(signup, {
        onError: (error) => {
            // console.log("error: ", error)
        },
        onSuccess: (data) => {

            // console.log("res: ", data?.data)
            if (data) {
                navigation.navigate("ConfirmUser", { id: data?.data?.user._id, email: data?.data?.user?.email })
            }

        }
    })
}

export const useSignIn = () => {
    const dispatch = useAppDispatch()
    return useMutation({
        mutationFn: (data: ISignIn) => {
            return axios.post(`${baseURL}/auth/login`, data)
        },

        onSettled: (data, error) => {
            // console.log("setRes: ", data)
            // console.log("setErr: ", error)
        },
        onError: (error) => {
            // console.log("error: ", error)
        },
        onSuccess: (data) => {
            // console.log("res: ", data)
            // console.log("loginres: ", data?.data)
            if (data) {
                // dispatch(loginUserMutation({ isLogin: true, isFirst: false, token: data?.data?.token, user: data?.data?.user }))
            }

            // if (axios.isAxiosError(data.error)) {
            //     console.log(data.error)
            // }

        }
    })
}


export const useVerifyUser = () => {
    // const queryClient = useQueryClient()
    // const navigation = useNavigation<AuthenticateuserScreenProps>()
    const dispatch = useAppDispatch()
    return useMutation(verify, {
        onError: (error) => {
            // console.log("error: ", error)
        },
        onSuccess: (data) => {
            // console.log("verify:", data)
            dispatch(loginUserMutation({ isLogin: true, isFirst: false, token: data?.data?.token, user: data?.data?.user }))
            // if (data) {
            //     navigation.navigate("ConfirmUser", { id: data?.data?.user._id, email: data?.data?.user?.email })
            // }

        }
    })
}

// http://127.0.0.1:300/api/user/requestPasswordReset

export const useResendOTP = () => {
    return useMutation(resendOTP)
}




















