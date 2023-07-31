


import { useQuery } from '@tanstack/react-query'
import axios from 'axios';

const baseURL = "https://embodi-be.vercel.app"

// 

export const loginUser = async (user: { email: string; password: string }) => {
    const response = await axios.post("https://embodi-be.vercel.app/api/auth/login", user);
    return response.data
};

// {
//     firstName: string;
//     lastName: string;
//     email: string;
//     password: string;
//   }
export const registerUser = async (newUser: {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    email: string,
    password: string
}

) => {
    // const response = await axios.post(`${baseURL}/api/auth/register`, newUser);
    const response = await axios.post("https://embodi-be.vercel.app/api/auth/register", newUser);
    return response.data;
};



export const verifyEmail = async (token: { userId: string, verificationCode: string }) => {
    const response = await axios.post("https://embodi-be.vercel.app/api/auth/verifyotp", token);
    return response.data;
};





// const fetchU = async (postId) => {
//     const { data } = await axios.get(`${endpoint}=${postId}`);
//     return data;
// };

// const usePost = (postId) => useQuery([ 'posts', postId ], () => fetchPost(postId));





