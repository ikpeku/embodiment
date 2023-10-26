
//     import { useState } from 'react'
//     import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native'
//     import { useForm } from "react-hook-form";
//     // import { List, RadioButton } from 'react-native-paper';
//     // import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
//     import { CustomButton, CustomInput } from '../../../components';
//     import ProfileAvatar from '../../../components/Avatar';
//     import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
//     import { UserState, updateUser } from '../../../redux/features/useSlice';
// // import { useNavigation } from '@react-navigation/native';
// import axios from 'axios';
// import { baseURL, useUser } from '../../../services';
// import Image_Picker from '../../../components/imagePicker';
// import { db } from '../../../utils/firebase';
// axios.defaults.withCredentials = true;
// // import { baseUrl } from '../../../services';
    
    
//     interface IForm {
//         FirstName: string,
//                 LastName: string,
//                 Email: string,
//                 PhoneNumber: string,      
//     }
    
    
//     export default function AdminEditprofile() {
//         // const navigation = useNavigation()
//         db
//     const {image, pickImage} = Image_Picker()
    
//         const {user, token} = useAppSelector(UserState)
//         const [edit, setEdit] = useState(false)
//         const [loading, setLoading] = useState(false)

//         const dispatch = useAppDispatch()
    
//         // const {data} = useUser(user._id)
    
//         const {firstName, lastName, email, phoneNumber, } = user
       
    
//         const { handleSubmit, control, reset } = useForm<IForm>({
//             defaultValues: {
//                 FirstName: firstName,
//                 LastName: lastName,
//                 Email: email,
//                 PhoneNumber: phoneNumber,
//             }
//         });
    
//             const onSavePress = async({FirstName, LastName, PhoneNumber}: IForm) => {
//                 const formdata = {
//                   firstName: FirstName,
//                   lastName: LastName,
//                   phoneNumber: PhoneNumber
//                 }

              

//         if (loading) return
//         setLoading(true)

//         try {

//             const response = await fetch(`${baseURL}/user/update/${user._id}/`, {
//                 method: "PUT",
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json; charset=utf-8',
//                     Authorization: `Token ${token}`,
//                 },
//                 body: JSON.stringify(formdata)
//             })

//             const result = await response.json()

//             if (result.status === 200) {
//                 dispatch(updateUser({ ...result.data }))
//                 Alert.alert("Successful", "profile updated")

//             } else {
//                 throw new Error(result.message)
//             }


//         } catch (error: any) {
//             Alert.alert("Error", error.error.message)

//         } finally {
//             setLoading(false)
//             setEdit(false)
//         }
       
//             }


     
//             const handleChangeAvatar = () => {
//                 setEdit(true)
//                 pickImage()
//             }

       

//         return (
//             <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >
//                 <KeyboardAvoidingView style={{ paddingBottom: 20 }} >
    
//                    <ProfileAvatar type='Center'
//                    onPress={handleChangeAvatar}
//                         text={"Upload your profile picture"}
//                         photoUrl={user.avatar} />
                   
//                 <CustomInput editable={edit} control={control} name="FirstName" placeholder="Enter First Name" label="First Name" rules={{ required: "required" }} />
//                 <CustomInput editable={edit} control={control} name="LastName" placeholder="Enter Last Name" label="Last Name"
//                  rules={{ required: "required" }} />
//                 <CustomInput control={control} name="Email" placeholder="Enter Email" label="Email" rules={{ required: "This field is required.", pattern: {
//                         value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
//                         message: 'Enter a valid e-mail address',
//                     } }} editable={false} />

//                 <CustomInput editable={edit} control={control} name="PhoneNumber" placeholder="Enter  Phone Number" 
//                 label=" Phone Number" rules={{ required: "required" }} />
                
//                 <View style={{ marginTop: 30 }}>
//                     {edit && <CustomButton title="Save" onPress={handleSubmit(onSavePress)} />}
//                     {!edit && <CustomButton title="Edit" onPress={() => setEdit(true)} />}
//                 </View>
    
//                 </KeyboardAvoidingView>
//             </ScrollView>
//         )
//     }
    
//     const styles = StyleSheet.create({
//         container: {
//             flex: 1,
//             padding: 20,
//             backgroundColor: "#fff"
    
//         },
//         item: {
//             flexDirection: "row",
//             flex: 1,
//             justifyContent: "center",
//             alignItems: "center",
          
//         }
    
//     })
    
    

import { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Alert } from 'react-native'
import { useForm } from "react-hook-form";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import {
    QueryClient
  } from '@tanstack/react-query'
import { db } from '../../../utils/firebase';
import Image_Picker from '../../../components/imagePicker';
import { UserState, updateUser } from '../../../redux/features/useSlice';
import { useAppDispatch, useAppSelector } from '../../../redux/hooks';
import { baseURL, useUser } from '../../../services';
import ProfileAvatar from '../../../components/Avatar';
import { CustomButton, CustomInput } from '../../../components';



interface IForm {
    FirstName: string,
    LastName: string,
    Email: string,
    PhoneNumber: string
}

export default function AdminEditprofile() {

  db
  const queryClient = new QueryClient()
    const {image, pickImage} = Image_Picker()
    // const [avatar, setAvatar] = useState("")

    const [edit, setEdit] = useState(false)

    const { user, token } = useAppSelector(UserState)
    const dispatch = useAppDispatch()
    
    const { data } = useUser(user._id)


    const { firstName, lastName, email, phoneNumber, } = user
    const [loading, setLoading] = useState(false)


    const { handleSubmit, control, reset } = useForm<IForm>({
        defaultValues: {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: phoneNumber,

        }
    });

    const onSavePress = async (data: IForm) => {

        // const form = new FormData();

        const formdata = {
            firstName: data.FirstName,
            lastName: data.LastName,
            email: data.Email,
            phoneNumber: data.PhoneNumber,

        }

        if (loading) return
        setLoading(true)
        


        if (user.role === "isAdmin") {
            try {

                let avatarUrl = ""
                if(image) {
                   
                    // const blobFile = await uriToBlob(image)

                    const avatar = `${data.FirstName}${data.LastName}`
                    const reference = ref(getStorage(), avatar)
                    await uploadBytesResumable(reference, image)
                    const downloadURL = await getDownloadURL(reference);
                //  console.log(downloadURL)
                //  form.append("avatar", downloadURL)
                avatarUrl = downloadURL

                // console.log(downloadURL)

                }

              
                const response = await fetch(`${baseURL}/user/update/${user._id}/`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8',
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({...formdata, avatar: avatarUrl})
                })
             
                const result = await response.json()
                // console.log(result)

                if (result.status === "failed") {
                    throw new Error(result.message)

                } else {
                    const updatedData = {
                        _id: result?.data?._id,
                        firstName: result?.data?.firstName,
                        lastName: result?.data?.lastName,
                        email: result?.data?.email,
                        phoneNumber: result?.data?.phoneNumber,
                        // isDoctor: result?.data?.isDoctor,
                        status: result?.data?.status,
                        allergies: result?.data?.allergies,
                        createdAt: result?.data?.createdAt,
                        updatedAt: result?.data?.updatedAt,
                        role: result?.data?.role,
                        // doctorId: result?.data?.doctorId,
                        avatar: result?.data?.avatar 
                    }
    
                    // console.log(updatedData)
                    dispatch(updateUser(updatedData))
                    // 
                    await queryClient.invalidateQueries({ queryKey: ['user'] })
                    Alert.alert("Successful", "profile updated")
                    
                }

            } catch (error: any) {
                // console.log("Error", error.message)
                Alert.alert("Error", error.message)

            } finally {
                setLoading(false)
                setEdit(false)
            }
        }

        setLoading(false)

    }


    useEffect(() => {
        if (user.role === "isAdmin" && data?.data) {
            reset({
           
                Email: data?.data?.email,
                FirstName: data?.data?.firstName,
                LastName: data?.data?.lastName,
                PhoneNumber: data?.data?.phoneNumber
            })
           
        }

    }, [
         data?.data?.firstName ,  
         data?.data?.lastName,
         data?.data?.phoneNumber,
        ])



// console.log("photo: ",data?.data)
// console.log("photo: ",avatar)



const handleChangeAvatar = () => {
    setEdit(true)
    pickImage()
}


    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >


                <ProfileAvatar type='Center'
                onPress={handleChangeAvatar}
                    text={"Upload your profile picture"}
                    photoUrl={user.avatar} 
                    />

                <CustomInput editable={edit} control={control} name="FirstName" placeholder="Enter First Name" label="First Name" rules={{ required: "required" }} />
                <CustomInput editable={edit} control={control} name="LastName" placeholder="Enter Last Name" label="Last Name" rules={{ required: "required" }} />
                <CustomInput control={control} name="Email" placeholder="Enter Email" label="Email" rules={{
                    required: "This field is required.", pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Enter a valid e-mail address',
                    }
                }} editable={false} />

                <CustomInput editable={edit} control={control} name="PhoneNumber" placeholder="Enter  Phone Number" label=" Phone Number" rules={{ required: "required" }} />

            

                <View style={{ marginTop: 30 }}>
                    {edit && <CustomButton title="Save" onPress={handleSubmit(onSavePress)} />}
                    {!edit && <CustomButton title="Edit" onPress={() => setEdit(true)} />}
                </View>


            </ScrollView>
            {loading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"

    },
    listcontainer: {
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius: 4,
        backgroundColor: "#fff"

    },

    item: {
        flexDirection: "row",
        flex: 1,
        justifyContent: "center",
        alignItems: "center",

    }

})

