// 
import { request } from "./doctorApi";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'


// get doctor schedule
const getDoctorAppointment = (slug: string) =>
    request({ url: `/api/disease/viewdisease` });


// get doctor schedule
export const useGetDoctorAppointment = (slug: string) => {
    return useQuery(["getDoctorAppointment", slug], () => getDoctorAppointment(slug), {
        select(data) {
            return data;
        },
    });
};



// get doctor schedule
const getUserNotification = (slug: string) =>
    request({ url: `/notification/user/${slug}` });


export const useGetUserNotification = (slug: string) => {
    return useQuery(["userNotification", slug], () => getUserNotification(slug), {
        select(data) {
            return data?.data?.notifications;
        },
    });
};


// get doctor schedule
const getUseOrder = (slug: string) =>
    request({ url: `/user/orders/${slug}` });


export const useGetUserOrder = (slug: string) => {
    return useQuery(["userOrder", slug], () => getUseOrder(slug), {
        select(data) {
            return data?.data?.orders
        },
    });
};

// ?.notifications;







