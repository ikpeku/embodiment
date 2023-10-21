import { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Alert } from 'react-native'
import { useForm } from "react-hook-form";
import { ActivityIndicator, MD2Colors } from 'react-native-paper';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserState, updateUser } from '../redux/features/useSlice';
import { baseURL, useDoctor } from '../services';
import CustomInput from './CustomInput';
import { DateTime } from './DateTime';
import CustomButton from './Button';
import ProfileAvatar from './Avatar';
import Image_Picker from './imagePicker';


import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db } from '../utils/firebase';

import {
    QueryClient
  } from '@tanstack/react-query'

interface IForm {
    FirstName: string,
    LastName: string,
    Email: string,
    PhoneNumber: string,
    Address: string,
    Alergies: string
    Qualifications: string
    specialty: string,
    Years_of_experience: string,
    Rate: string,
    aboutYourself: string
}


export default function DoctorProfile() {
    db
    const {image, pickImage} = Image_Picker()
    const queryClient = new QueryClient()

    const [edit, setEdit] = useState(false)

    const { user, token } = useAppSelector(UserState)
    const dispatch = useAppDispatch()
    

    const { data: doctor } = useDoctor(user._id)


// console.log("Doctor-Pro", doctor)

    const { firstName, lastName, email, phoneNumber, } = user
    const [loading, setLoading] = useState(false)

    // const [sex, setSex] = useState("male")
    const [showDate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());

    const { handleSubmit, control, reset } = useForm<IForm>({
        defaultValues: {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: phoneNumber,
            Address: "",
            Alergies: "",
            Qualifications: "",
            specialty: "",
            Years_of_experience: "",
            Rate: "",
            aboutYourself: ""

        }
    });

    const onSavePress = async (data: IForm) => {
        if (loading) return
        setLoading(true)


        if (user.role === "isDoctor") {

            const doctorForm = {

                firstName: data.FirstName,
                lastName: data.LastName,
                email: data.Email,
                phoneNumber: data.PhoneNumber,
                qualification: data.Qualifications,
                specialty: data.specialty,
                yearOfExperience: +data.Years_of_experience,
                rate: +data.Rate,
                bio: data.aboutYourself,
            }

          

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
        
                const response = await fetch(`${baseURL}/doctor/update/${user._id}`, {
                    method: "PUT",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json; charset=utf-8',
                        Authorization: `Token ${token}`,
                    },
                    body: JSON.stringify( {...doctorForm, avatar: avatarUrl})
                })

                const result = await response.json()

                // console.log(result)


                const updatedData = {
                    _id: result?.data?.user?._id,
                    firstName: result?.data?.user?.firstName,
                    lastName: result?.data?.user?.lastName,
                    email: result?.data?.user?.email,
                    phoneNumber: result?.data?.user?.phoneNumber,
                    // isDoctor: result?.data?.isDoctor,
                    status: result?.data?.user?.status,
                    allergies: result?.data?.user?.allergies,
                    createdAt: result?.data?.user?.createdAt,
                    updatedAt: result?.data?.user?.updatedAt,
                    role: result?.data?.user?.role,
                    // doctorId: result?.data?.doctorId,
                    avatar: result?.data?.user?.avatar 
                }

                dispatch(updateUser(updatedData))
                // 
                await queryClient.invalidateQueries({ queryKey: ['user'] })
                Alert.alert("Successful", "profile updated")


            } catch (error: any) {
                Alert.alert("Error", error.message)

            } finally {
                setLoading(false)
                setEdit(false)
            }
        }

        setLoading(false)
    }


    useEffect(() => {
     

        if (user.role === "isDoctor" && doctor?.data) {
            reset({
                FirstName: doctor?.data?.user?.firstName,
                LastName: doctor?.data?.user?.lastName,
                Email: doctor?.data?.user?.email,
                PhoneNumber: doctor?.data?.user?.phoneNumber,
                Qualifications: doctor?.data?.qualification,
                specialty: doctor?.data?.specialty,
                Years_of_experience: doctor?.data?.yearOfExperience?.toString(),
                Rate: doctor?.data?.rate?.toString(),
                aboutYourself: doctor?.data?.bio
            })
        }

    }, [
        doctor?.data?.user?.firstName,
        doctor?.data?.user?.lastName,
        doctor?.data?.user?.email,
        doctor?.data?.user?.phoneNumber,
        doctor?.data?.qualification,
        doctor?.data?.specialty,
        doctor?.data?.yearOfExperience,
        doctor?.data?.rate,
        doctor?.data?.bio
    ])

    const handleChangeAvatar = () => {
        setEdit(true)
        pickImage()
    }

    // console.log(user._id)

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >


                <ProfileAvatar
            onPress={handleChangeAvatar}
                type='Center'
                    text={"Upload your profile picture"}
                    photoUrl={user.avatar} />



                <CustomInput editable={edit} control={control} name="FirstName" placeholder="Enter First Name" label="First Name" rules={{ required: "required" }} />
                <CustomInput editable={edit} control={control} name="LastName" placeholder="Enter Last Name" label="Last Name" rules={{ required: "required" }} />
                <CustomInput control={control} name="Email" placeholder="Enter Email" label="Email" rules={{
                    required: "This field is required.", pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Enter a valid e-mail address',
                    }
                }} editable={false} />

                <CustomInput editable={edit} control={control} name="PhoneNumber" placeholder="Enter  Phone Number" label=" Phone Number" rules={{ required: "required" }} />

                {user.role === "isDoctor" &&
                    <>
                        <CustomInput editable={edit} control={control} name="Qualifications" placeholder="Enter your educational qualifications" label="Qualifications" rules={{ required: "required" }} />
                        <CustomInput editable={edit} control={control} name="specialty" placeholder="Enter your medical specialty" label=" Medical specialty" rules={{ required: "required" }} />
                        <CustomInput editable={edit} control={control} name="Years_of_experience" placeholder="Enter number of years of experience" label="Years of experience" rules={{ required: "required" }} />

                        <CustomInput editable={edit} control={control} name="Rate" placeholder="$0.00" label="Rate" rules={{ required: "required" }} />

                        <CustomInput editable={edit} control={control} multiline={true} numberOfLines={5} name="aboutYourself" placeholder="Write about yourself" rules={{ required: "required" }} />
                    </>}

        
                <DateTime currentMode={'date'} show={showDate}
                    setShow={setShowDate}
                    date={date}
                    setDate={setDate}
                />

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

