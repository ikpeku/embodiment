import axios from 'axios';
// import { useAppSelector } from '../redux/hooks';
// import { UserState } from '../redux/features/useSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

// export const baseURL = "https://embodie.vercel.app/api";
export const baseURL = "https://embodi-be.vercel.app/api";


axios.defaults.withCredentials = true;

const client = axios.create({ baseURL })


 const Request = async ({ ...options }) => {

    const token = await AsyncStorage.getItem('token');
 
    if (token !== null) {
   
        client.defaults.headers.common.Authorization = `Bearer ${token}`
        const onSuccess = (response: any) => response
        const onError = (error: any) => error
        return await client(options).then(onSuccess).catch(onError)
    } else {
        client.defaults.headers.common.Authorization =  `Bearer token`
        const onSuccess = (response: any) => response
        const onError = (error: any) => error
        return await client(options).then(onSuccess).catch(onError)
    }
        // const {token} = useAppSelector(UserState)
        // console.log("isToken",token)
    }


export default Request;
