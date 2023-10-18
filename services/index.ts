
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import axios from 'axios';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Request from './Request';
import axios from 'axios';
import { request } from './authenApi';
import { UserState } from '../redux/features/useSlice';
import { useAppSelector } from '../redux/hooks';


// export const baseURL = "https://embodie.vercel.app/api";
export const baseURL = "https://embodi-be.vercel.app/api";


// axios.defaults.withCredentials = true;

// const client = axios.create({ baseURL })


// const request = async ({ ...options }) => {
//     client.defaults.headers.common.Authorization = `Bearer token`
//     const onSuccess = (response: any) => response
//     const onError = (error: any) => error

//     return await client(options).then(onSuccess).catch(onError)
// }



export interface IDoctor {
    id: string
}
export interface IAddDoctor {

    email: string,
    adminUserId: string

}








// REACT QEARY






// query endpoint
const endPoint = async (url: string) => {
    const response = await Request({ url: `/${url}` })
    // await axios.get(`${baseUrl}/${url}`)
    return response.data
}


// get all users
export const useGetAllUsers = () => {
    return useQuery({ queryKey: ['users'], queryFn: () => endPoint("user/alluserson") })
}
// get single user
export const useUser = (id: string) => {
    return useQuery({ queryKey: ['user', id], queryFn: () => endPoint(`user/user/${id}`) })
}

// get all doctors
export const useGetAllDoctors = () => {
    return useQuery({ queryKey: ['doctors'], queryFn: () => endPoint("doctor/doctors") })
}


// get single doctor
export const useDoctor = (id: string) => {
    return useQuery({ queryKey: ['doctorbyid', id], queryFn: () => endPoint(`doctor/viewone/${id}`) })
}


// GET ALL THE BOOKED APPOINTMEN FOR ALL THE DOCTOR
export const useAdmingetBookAppiontement = () => {
    return useQuery({ queryKey: ['allAppointment'], queryFn: () => endPoint(`appointment/bookedAppointment`) })
}

// ALL BOOKED APPOINTMENT WITH INDIVIDUAL DOCTOR
export const useDoctorAppiontment = (id: string) => {
    return useQuery({ queryKey: ['individualAppointment', id], queryFn: () => endPoint(`appointment/bookedAppointment/${id}/view`) })
}


// GET ALL COMPLTED APPOINTMENT
// http://localhost:3001/api/appointment/getAllTheAppointment
export const useGetCompletedAppointment = () => {
    return useQuery({ queryKey: ['allcompletedappointment'], queryFn: () => endPoint(`appointment/getAllTheAppointment`) })
}


// GET COMPLTED APPOINTMENT FOR INDIVIDUAL DOCTOR
export const useGetCompletedIndividualAppointment = (id: string) => {
    return useQuery({ queryKey: ['individualcompletedappointment', id], queryFn: () => endPoint(`appointment/getAppointmentById/${id}`) })
}

// https://embodi-be.vercel.app/api/appointment/view-all/64f21548ef6142816e848fe7

// // GET All APPOINTMENTs completed and uncompleted
// export const useGetAllAppointments = () => {
//     return useQuery({ queryKey: ['allappointments'], queryFn: () => endPoint(`appointment/viewAll`) })
// }
// GET All APPOINTMENTs completed and uncompleted
export const useGetAllAppointments = (adminId: string) => {
    return useQuery({ queryKey: ['adminviewallappointments'], queryFn: () => endPoint(`appointment/view-all/${adminId}`) })
}


// GET All APPOINTMENTs completed and uncompleted
export const useGetAllDisease = () => {
    return useQuery({ queryKey: ['alldisease'], queryFn: () => endPoint(`disease/viewAll`) })
}

// GET All APPOINTMENTs completed and uncompleted
export const useGetSingleDisease = (id: string) => {
    return useQuery({ queryKey: ['singledisease'], queryFn: () => endPoint(`disease/${id}`) })
}



// Create Appointment

interface IcreateAppointmentApi {
    doctorId: string,
    date: string,
    startTime: string,
    endTime: string
}


export const createApointmentApi = ({ doctorId, date, startTime, endTime }: IcreateAppointmentApi) => {
    return axios.post(`${baseURL}/appointment/create/${doctorId}`,
        {
            doctorId,
            appointments: [
                {
                    date,
                    schedule: [
                        {
                            startTime,
                            endTime
                        }
                    ]
                }
            ]
        }

    )
}



interface IBookAppointmentApi {
    doctorId: string,
    appointmentId: string,
    startTime: string,
    userID: string,
    // token: string
}



export const BookAppointment = ({ appointmentId, startTime, doctorId, userID }: IBookAppointmentApi) => {
    return axios.post(`${baseURL}/appointment/book/${doctorId}/${userID}`,

        {
            appointmentId,
            startTime
            //   "patientId": "64f24a0a1265728bb140a638"
        }
    )
}


interface IRateDoctor {
    doctorId: string,
    starRating: number,
    userID: string,
}



export const RateDoctor = ({ starRating, doctorId, userID }: IRateDoctor) => {
    return axios.patch(`${baseURL}/doctor/${doctorId}/rate/${userID}`,

        {
            starRating
        }
    )
}

type IQuetionandAnswer = {
    question: string,
    answer: string | number
}

interface ISubmitQuetionnaire {
    userId: string;
    diseaseId: string;
    questionsAndAnswers: IQuetionandAnswer[]
}


type MarkQuestionnaireAsComplete = {
    diseaseId: string
    userId: string
}
type IMarkAppointmentAsComplete = {
    doctorId: string
    // appointmentId: string
    scheduleId: string
}



export const SubmitQuetionnaire = ({ diseaseId, userId, questionsAndAnswers }: ISubmitQuetionnaire) => {
    return axios.post(`${baseURL}/questionnaire/add/${userId}/${diseaseId}`,
        {
            questionsAndAnswers
        }
    )
}


// http://localhost:3000/api/appointment/completed/64efdd43878f77fd479f93f8/650488b951f562cb7b44e83b/650488b951f562cb7b44e83c

export const MarkAppointmentAsComplete = ({ doctorId, scheduleId }: IMarkAppointmentAsComplete) => {
    return axios.patch(`${baseURL}/appointment/completed/${doctorId}/${scheduleId}`)
}

export const MarkQuestionnaireAsComplete = ({ diseaseId, userId }: MarkQuestionnaireAsComplete) => {
    return axios.patch(`${baseURL}/questionnaire/completed/${userId}/${diseaseId}`)
}
// appointmentId,
// /${appointmentId}







