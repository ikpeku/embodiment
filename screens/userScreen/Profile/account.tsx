import { useState } from 'react'
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { useForm } from "react-hook-form";
import { List, RadioButton } from 'react-native-paper';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { CustomButton, CustomInput } from '../../../components';
import ProfileAvatar from '../../../components/Avatar';
import { useAppSelector } from '../../../redux/hooks';
import { UserState } from '../../../redux/features/useSlice';
import { useHeaderHeight } from '@react-navigation/elements'

interface IForm {
    FirstName: string,
    LastName: string,
    Email: string,
    PhoneNumber: string,
    Address: string,
    Sex: string,
    Alergies: string
    Qualifications: string
    specialty: string,
    Years_of_experience: string,
    Rate: string,
}


export default function Editprofile() {
    const height = useHeaderHeight()

    const { user } = useAppSelector(UserState)

    const { firstName, lastName, email, phoneNumber, } = user


    const [sex, setSex] = useState("male")
    const [DOB, setDOB] = useState()

    const { handleSubmit, control } = useForm<IForm>({
        defaultValues: {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            PhoneNumber: phoneNumber,
            Address: "",
            Sex: "",
            Alergies: "",
            Qualifications: "",
            specialty: "",
            Years_of_experience: "",
            Rate: ""

        }
    });

    const onSavePress = (data: IForm) => { }



    return (
        // <KeyboardAvoidingView  
        // enabled
        //  behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={-500}
        //   style={{ paddingBottom: 20, flex: 1 }} >
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }} showsVerticalScrollIndicator={false} >


            <ProfileAvatar type='Center'
                text={"Upload your profile picture"}
                photoUrl={"https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960"} />



            <CustomInput control={control} name="FirstName" placeholder="Enter First Name" label="First Name" rules={{ required: "required" }} />
            <CustomInput control={control} name="LastName" placeholder="Enter Last Name" label="Last Name" rules={{ required: "required" }} />
            <CustomInput control={control} name="Email" placeholder="Enter Email" label="Email" rules={{
                required: "This field is required.", pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: 'Enter a valid e-mail address',
                }
            }} editable={false} />

            <CustomInput control={control} name="PhoneNumber" placeholder="Enter  Phone Number" label=" Phone Number" rules={{ required: "required" }} />

            {user.role[0] === "isDoctor" &&
                <>
                    <CustomInput control={control} name="Qualifications" placeholder="Enter your educational qualifications" label="Qualifications" rules={{ required: "required" }} />
                    <CustomInput control={control} name="specialty" placeholder="Enter your medical specialty" label=" Medical specialty" rules={{ required: "required" }} />
                    <CustomInput control={control} name="Years_of_experience" placeholder="Enter number of years of experience" label="Years of experience" rules={{ required: "required" }} />

                    <CustomInput control={control} name="Rate" placeholder="$0.00" label="Rate" rules={{ required: "required" }} />

                    <CustomInput control={control} multiline={true} numberOfLines={5} name="aboutYourself" placeholder="Write about yourself" rules={{ required: "required" }} />
                </>}

            {user.role[0] === "isUser" && <>
                <CustomInput control={control} name="Address" placeholder="Enter Address" label="Address" rules={{ required: "required" }} />

                <List.AccordionGroup>
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

                    <List.Accordion title="Date of Birth" id="2" style={styles.listcontainer}
                        right={props => <MaterialCommunityIcons {...props} name="calendar-month" size={24} color="gainsboro" />}
                    >

                    </List.Accordion>

                </List.AccordionGroup >

                <View style={{ marginTop: 8 }}>

                    <CustomInput control={control} multiline={true} numberOfLines={3} name="Alergies" placeholder="Enter Alergies" label="Alergies" rules={{ required: "required" }} />
                </View>

            </>}






            <View style={{ marginTop: 30 }}>
                <CustomButton title="Save" onPress={handleSubmit(onSavePress)} />
            </View>


        </ScrollView>
        // </KeyboardAvoidingView>
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

