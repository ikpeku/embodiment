
import { useQuery } from '@tanstack/react-query'
import Request from './Request';
import axios from 'axios';

export const baseURL = "https://embodi-be.vercel.app/api";

export interface IDoctor {
    id: string
}
export interface IAddDoctor {
    email: string,
    adminUserId: string
}

// query endpoint
const endPoint = async (url: string) => {
    const response = await Request({ url: `/${url}` })
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

/**
 * 
 * @returns get all doctors, admins and users
 */
export const useGetAllEmbodimentUsers = () => {
    return useQuery({ queryKey: ['doctorsAdminUsers'], queryFn: () => endPoint("admin/all-users") })
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
export const useGetCompletedAppointment = () => {
    return useQuery({ queryKey: ['allcompletedappointment'], queryFn: () => endPoint(`appointment/getAllTheAppointment`) })
}

// GET COMPLTED APPOINTMENT FOR INDIVIDUAL DOCTOR
export const useGetCompletedIndividualAppointment = (id: string) => {
    return useQuery({ queryKey: ['individualcompletedappointment', id], queryFn: () => endPoint(`appointment/getAppointmentById/${id}`) })
}

// GET All APPOINTMENTs completed and uncompleted
export const useGetAllAppointments = (adminId: string) => {
    return useQuery({ queryKey: ['adminviewallappointments'], queryFn: () => endPoint(`appointment/view-all/${adminId}`) })
}

// GET All APPOINTMENTs completed and uncompleted
export const useGetAllDisease = () => {
    return useQuery({
        queryKey: ['alldisease'], queryFn: () => endPoint(`disease/viewAll`),
        cacheTime: Infinity
    })
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
    userID: string
}

export const BookAppointment = ({ appointmentId, startTime, doctorId, userID }: IBookAppointmentApi) => {
    return axios.post(`${baseURL}/appointment/book/${doctorId}/${userID}`,

        {
            appointmentId,
            startTime
        }
    )
}


interface IDeleteAppointmentApi {
    doctorId: string,
    scheduleId: string
}

export const DeleteAppointment = ({ doctorId, scheduleId }: IDeleteAppointmentApi) => {
    return axios.delete(`${baseURL}/appointment/delete/${doctorId}/${scheduleId}`)
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
    userId: string,
    prescription: string
}
type IMarkAppointmentAsComplete = {
    doctorId: string
    scheduleId: string
}

export const SubmitQuetionnaire = ({ diseaseId, userId, questionsAndAnswers }: ISubmitQuetionnaire) => {
    return axios.post(`${baseURL}/questionnaire/add/${userId}/${diseaseId}`,
        {
            questionsAndAnswers
        }
    )
}


export const MarkAppointmentAsComplete = ({ doctorId, scheduleId }: IMarkAppointmentAsComplete) => {
    return axios.patch(`${baseURL}/appointment/completed/${doctorId}/${scheduleId}`)
}

export const MarkQuestionnaireAsComplete = ({ diseaseId, userId, prescription }: MarkQuestionnaireAsComplete) => {
    return axios.patch(`${baseURL}/questionnaire/completed/${userId}/${diseaseId}`, { prescription })
}

// 

interface IcreateSubquiption {

    userId: string,
    type: string,
    duration: string,
    consultationsCount: number,
    questionnairesCount: number,
    subscriptionDate: string,
    expiryDate: string,
    remainingMonths: number,

}

export const createSubsquiption = (data: IcreateSubquiption) => {
    return axios.post(`${baseURL}/user/subscribe`, data)
}


export const getSubscription = (userId: string) => {
    return axios.get(`${baseURL}/user/subscribe/${userId}`,)
}





