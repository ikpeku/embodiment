


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import Request from './Request';
import axios from 'axios';


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

// get doctor schedule
const getDoctorAppointment = (slug: string) =>
    request({ url: `/appointment/scheduledAppointment/${slug}` });


// get doctor schedule
export const useGetDoctorAppointment = (slug: string) => {
    return useQuery(["getDoctorAppointment", slug], () => getDoctorAppointment(slug), {
        select(data) {
            return data.data;
        },
    });
};


interface VerifyDoctors {
    firstName: string
    lastName: string,
    specialty: string
    avatar: string
}

const getverifyDoctors = () =>
    request({ url: `/doctor/doctors` });
export const useGetVerifyAllDoctors = () => {
    return useQuery(["getDoctorVerifyDoctors"], getverifyDoctors, {
        select(data) {
            return data?.data.data.filter((doctor: VerifyDoctors) => doctor.firstName && doctor.lastName && doctor.specialty && doctor.avatar);
        },
    });
};




// get doctor schedule
const getDoctorNotification = (slug: string) =>
    request({ url: `/notification/${slug}` });


export const useGetDoctorNotification = (slug: string) => {
    return useQuery(["doctorNotification", slug], () => getDoctorNotification(slug), {
        select(data) {
            // console.log(data.data)
            return data?.data;
        },
    });
};



// Amin notification
const getAdminNotification = (slug: string) =>
    request({ url: `/notification/admin/${slug}` });


export const useGetAdminNotification = (slug: string) => {
    return useQuery(["adminNotification", slug], () => getAdminNotification(slug), {
        select(data) {
            // console.log(data.data)
            return data?.data;
        },
    });
};

// Amin questionnaire
const getAdminQuestionnaire = () =>
    request({ url: `/questionnaire/questionnaires` });



export const useGetAdminnQuestionnaire = () => {
    return useQuery(["adminnQuestionnaire"], getAdminQuestionnaire, {
        select(data) {
            // console.log(data.data)
            return data?.data?.data;
        },
    });
};



// DoctorAppointments
const getDoctorAppointments = (slug: string) =>
    request({ url: `/appointment/completed-upcoming/${slug}` });


export const useGetDoctorAppointments = (slug: string) => {
    return useQuery(["DoctorAppointments"], () => getDoctorAppointments(slug), {
        select(data) {
            return data?.data?.data;
        },
    });
};
//


// http://localhost:3000/api/appointment/completed-upcoming/64efdd43878f77fd479f93f8



