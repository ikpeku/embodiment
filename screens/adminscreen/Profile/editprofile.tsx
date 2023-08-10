
    // import { useState } from 'react'
    import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
    import { useForm } from "react-hook-form";
    // import { List, RadioButton } from 'react-native-paper';
    // import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
    import { CustomButton, CustomInput } from '../../../components';
    import ProfileAvatar from '../../../components/Avatar';
    import { useAppSelector } from '../../../redux/hooks';
    import { UserState } from '../../../redux/features/useSlice';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { baseUrl } from '../../../services';
import { json } from 'react-router-dom';
    
    
    interface IForm {
        FirstName: string,
                LastName: string,
                Email: string,
                PhoneNumber: string,      
    }
    
    
    export default function AdminEditprofile() {
        const navigation = useNavigation()
    
        const {user, token} = useAppSelector(UserState)
    
        const {firstName, lastName, email, phoneNumber, } = user
       
    
        const { handleSubmit, control } = useForm<IForm>({
            defaultValues: {
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                PhoneNumber: phoneNumber,
            }
        });
    
            const onSavePress = async({FirstName, LastName, PhoneNumber}: IForm) => {
                const userData = {
                  firstName: FirstName,
                  lastName: LastName,
                  phoneNumber: PhoneNumber
                }

              
                const response = await axios.patch(`${baseUrl}/admin/updateAdmin/${user._id}`, userData , {
                    headers: {
                        // Authorization: `Bearer ${token}`
                        "Access-Control-Allow-Origin" : "*",
            "Content-type": "Application/json",
            "Authorization": `Bearer ${token}`
                    }
                })
                // console.log(await response.data)

               

navigation.goBack()

            }

        return (
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >
                <KeyboardAvoidingView style={{ paddingBottom: 20 }} >
    
                   <ProfileAvatar type='Center'
                        text={"Upload your profile picture"}
                        photoUrl={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"} />
                   
                <CustomInput control={control} name="FirstName" placeholder="Enter First Name" label="First Name" rules={{ required: "required" }} />
                <CustomInput control={control} name="LastName" placeholder="Enter Last Name" label="Last Name"
                 rules={{ required: "required" }} />
                <CustomInput control={control} name="Email" placeholder="Enter Email" label="Email" rules={{ required: "This field is required.", pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Enter a valid e-mail address',
                    } }} editable={false} />

                <CustomInput control={control} name="PhoneNumber" placeholder="Enter  Phone Number" 
                label=" Phone Number" rules={{ required: "required" }} />
                
                <View style={{ marginTop: 30 }}>
                    <CustomButton title="Save" onPress={handleSubmit(onSavePress)} />
                </View>
    
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
    
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            backgroundColor: "#fff"
    
        },
        item: {
            flexDirection: "row",
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          
        }
    
    })
    
    
