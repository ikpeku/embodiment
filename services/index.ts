
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import axios from 'axios';
import { useQuery } from '@tanstack/react-query'


export const baseUrl = "https://embodie.vercel.app/api";
// http://localhost:3000/api/user/changePassword
// http://localhost:3000/api/doctor/removedoctor/:userId


export interface IDoctor {
    id: string
}
export interface IAddDoctor {

    email: string,
    adminUserId: string

}




export const diseaseApi = createApi({
    reducerPath: 'vendorApi',
    baseQuery: fetchBaseQuery({ baseUrl }),
    tagTypes: ["users"],
    endpoints: (builder) => ({

        getAllVendors: builder.query({
            query: () => "/api/disease/categories",
        }),
    }),

})


export const { useGetAllVendorsQuery,

} = diseaseApi



// REACT QEARY






// query endpoint
const endPoint = async (url: string) => {
    const response = await axios.get(`${baseUrl}/${url}`)
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
    return useQuery({ queryKey: ['doctor', id], queryFn: () => endPoint(`doctor/view/${id}`) })
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

// GET All APPOINTMENTs completed and uncompleted
export const useGetAllAppointments = () => {
    return useQuery({ queryKey: ['allappointments'], queryFn: () => endPoint(`appointment/viewAll`) })
}
















