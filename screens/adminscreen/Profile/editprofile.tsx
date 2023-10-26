
import {  useState } from 'react'
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
   

    const [edit, setEdit] = useState(false)

    const { user, token } = useAppSelector(UserState)
    const dispatch = useAppDispatch()
    

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
                   
                    const avatar = `${data.FirstName}${data.LastName}`
                    const reference = ref(getStorage(), avatar)
                    await uploadBytesResumable(reference, image)
                    const downloadURL = await getDownloadURL(reference);
              
                avatarUrl = downloadURL

               
                }

           
                const response = await fetch(`${baseURL}/admin/${user._id}/`, {
                    method: "PATCH",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8',
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify({...formdata, avatar: avatarUrl})
                })
             
                const result = await response.json()

                if (result.status === "failed") {
                    throw new Error(result.message)

                } else {
                    const updatedData = {
                        _id: result?.updatedAdmin?._id,
                        firstName: result?.updatedAdmin?.firstName,
                        lastName: result?.updatedAdmin?.lastName,
                        email: result?.updatedAdmin?.email,
                        phoneNumber: result?.updatedAdmin?.phoneNumber,
                    
                        status: result?.updatedAdmin?.status,
                        allergies: result?.updatedAdmin?.allergies,
                        createdAt: result?.updatedAdmin?.createdAt,
                        updatedAt: result?.updatedAdmin?.updatedAt,
                        role: result?.updatedAdmin?.role,
                     
                        avatar: result?.updatedAdmin?.avatar 
                    }
                    dispatch(updateUser(updatedData))
                    await queryClient.invalidateQueries({ queryKey: ['user'] })
                    Alert.alert("Successful", "profile updated")
                    
                }

            } catch (error: any) {
               
                Alert.alert("Error", error.message)

            } finally {
                setLoading(false)
                setEdit(false)
            }
        }

        setLoading(false)

    }



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

