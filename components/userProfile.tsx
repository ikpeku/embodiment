import { useEffect, useState } from 'react'
import { StyleSheet, View, ScrollView, Pressable, Text, Alert } from 'react-native'
import { useForm } from "react-hook-form";
import { ActivityIndicator, List, MD2Colors, RadioButton } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
// import { UserState, updateUser } from '../../../redux/features/useSlice';
// import { DateTime } from '../../../components/DateTime';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { UserState, updateUser } from '../redux/features/useSlice';
import { baseURL, useDoctor, useUser } from '../services';
import ProfileAvatar from './Avatar';
import { DateTime } from './DateTime';
import CustomButton from './Button';
import CustomInput from './CustomInput';
import Image_Picker from './imagePicker';
// import axios from 'axios';
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


export default function UserProfile() {

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

    const [sex, setSex] = useState("male")
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

        // const form = new FormData();

        const formdata = {
            firstName: data.FirstName,
            lastName: data.LastName,
            email: data.Email,
            phoneNumber: data.PhoneNumber,
            dob: date,
            address: data.Address,
            gender: sex,
            allergies: [data.Alergies],
            // avatar: image

        }

        if (loading) return
        setLoading(true)
        


        if (user.role === "isUser") {
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
                dispatch(updateUser(updatedData))
                // 
                await queryClient.invalidateQueries({ queryKey: ['user'] })
                Alert.alert("Successful", "profile updated")

                // if (result.success === "true") {

                // } else {
                //     throw new Error(result.message)
                // }

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
        if (user.role === "isUser" && data?.data) {
            reset({
                Address: data?.data?.address,
                Email: data?.data?.email,
                Alergies: data?.data?.allergies[0],
                FirstName: data?.data?.firstName,
                LastName: data?.data?.lastName,
                PhoneNumber: data?.data?.phoneNumber
            })
            setDate(data?.data?.dob)
            setSex(data?.data?.gender)
            // setAvatar(data?.data?.avatar)
        }

    }, [data?.data?.address,
         data?.data?.email,data?.data?.allergies[0], 
         data?.data?.firstName ,  
         data?.data?.lastName,
         data?.data?.phoneNumber,
         data?.data?.dob,
         data?.data?.gender,
        //  data?.data?.avatar
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

                {/* {user.role === "isDoctor" &&
                    <>
                        <CustomInput editable={edit} control={control} name="Qualifications" placeholder="Enter your educational qualifications" label="Qualifications" rules={{ required: "required" }} />
                        <CustomInput editable={edit} control={control} name="specialty" placeholder="Enter your medical specialty" label=" Medical specialty" rules={{ required: "required" }} />
                        <CustomInput editable={edit} control={control} name="Years_of_experience" placeholder="Enter number of years of experience" label="Years of experience" rules={{ required: "required" }} />

                        <CustomInput editable={edit} control={control} name="Rate" placeholder="$0.00" label="Rate" rules={{ required: "required" }} />

                        <CustomInput editable={edit} control={control} multiline={true} numberOfLines={5} name="aboutYourself" placeholder="Write about yourself" rules={{ required: "required" }} />
                    </>} */}

                {user.role === "isUser" && <>
                    <CustomInput editable={edit} control={control} name="Address" placeholder="Enter Address" label="Address" rules={{ required: "required" }} />

                    <List.Accordion title="Sex Assigned at Birth" id="1" style={[styles.listcontainer, { marginBottom: 10 }]}
                        right={props => props.isExpanded
                            ? <MaterialIcons {...props} name="keyboard-arrow-up" size={24} color="#0665CB" />
                            : <MaterialIcons {...props} name="keyboard-arrow-down" size={24} color="#0665CB" />}
                    >
                        <View style={styles.item}>
                            <List.Item title="Male" style={{ flexGrow: 1 }} left={props =>
                                <RadioButton
                                    {...props}
                                    value="female"
                                    status={sex === "male" ? 'checked' : 'unchecked'}
                                    onPress={() => setSex("male")}
                                />} />
                            <List.Item title="Female" style={{ flexGrow: 1 }} left={props =>
                                <RadioButton
                                    value="female"
                                    {...props}
                                    status={sex === "female" ? 'checked' : 'unchecked'}
                                    onPress={() => setSex("female")}
                                />} />
                        </View>
                    </List.Accordion>


                    <Pressable style={{ borderWidth: 1, padding: 15, borderRadius: 5, flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                        <Text>Date of Birth ({dayjs(date ? date : new Date() ).format('DD/MM/YYYY')})</Text>
                        <MaterialCommunityIcons name="calendar-month" size={24} onPress={() => setShowDate(true)} color="gainsboro" />
                    </Pressable>


                    <View style={{ marginTop: 8 }}>

                        <CustomInput editable={edit} control={control} multiline={true} numberOfLines={3} name="Alergies" placeholder="Enter Alergies" label="Alergies" rules={{ required: "required" }} />
                    </View>

                </>}


                <DateTime currentMode={'date'} show={showDate}
                    setShow={setShowDate}
                    date={date ? date : new Date()}
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

