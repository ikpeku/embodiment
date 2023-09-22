import {useState} from "react"
import { StyleSheet, ScrollView, View, Alert,  } from 'react-native'
import { CustomButton } from '../../../components'
import { ActivityIndicator, Modal, Portal , Text} from 'react-native-paper';
import { useNavigation, useRoute } from "@react-navigation/native";
import { AdminDoctorprofileRouteProp, AdminusersScreenNavigationProp } from "../../../types";
import { baseURL, useDoctor} from "../../../services";
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';



interface IUser {
    title: string,
    subtitle: string
}

export default function AdminDoctorprofile() {
    const queryClient = useQueryClient()

    const navigation = useNavigation<AdminusersScreenNavigationProp>()
    const route = useRoute<AdminDoctorprofileRouteProp>()
    const {id} = route.params

    const [showmodal, setShowmodal] = useState(false)
   

    const {data, isLoading} = useDoctor(id)

    

    const User = ({ title, subtitle }: IUser) => {
        return (
            <View style={styles.card}>
                <Text style={{ color: "#0665CB" }}>{title}: </Text>
                <Text style={{ textAlign: "right" }}>{subtitle}</Text>
            </View>
        )
    }


const handleRemoveDoctor = useMutation({
    mutationFn: () => {
      return axios.put(`${baseURL}/doctor/removedoctor/${id}`)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['doctors'] })
        queryClient.invalidateQueries({ queryKey: ['users'] })
        setShowmodal(v => !v)
        navigation.navigate("Admindoctorsuccess", {type: "remove"})
      },
     onError: () => {
        Alert.alert("Error",  "Can't delete doctor try again")
     }
  })

    return (
        <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }} showsVerticalScrollIndicator={false} >
           
          {data && <>
            {User({ title: "Name", subtitle: data?.data?.user?.firstName ? data?.data?.user?.firstName : "unregister doctor" })}
            {User({ title: "Email", subtitle: data?.data?.user?.email })}
            {User({ title: "Phone number", subtitle: data?.data?.user?.phoneNumber })}
            {User({ title: "Qualifications", subtitle: data?.data?.doctorInfo?.qualification })}
            {User({ title: "Specialisation", subtitle: data?.data?.doctorInfo?.specialty })}
            {User({ title: "Years of experience", subtitle: data?.data?.doctorInfo?.yearOfExperience })}
            {User({ title: "Rate", subtitle: data?.data?.doctorInfo?.rate })}
            {User({ title: "Patients", subtitle: "0" })}
            {User({ title: "Earnings", subtitle: "0" })}


            <View style={{marginTop: 30}}>
                <CustomButton onPress={() => setShowmodal(true)} title='Remove' />
            </View>


            <Portal>
        <Modal visible={showmodal} onDismiss={() => setShowmodal(false)} contentContainerStyle={styles.modal}>
          <Text variant="titleMedium" style={{textAlign: "center", }}>You’re about to remove this doctor</Text>
          <Text variant="titleMedium" style={{textAlign: "center", opacity: 0.5 }}>Do you want to continue</Text>

          <View style={{flexDirection: "row" , justifyContent: "center", gap: 10}}>

          <View style={{flexGrow: 1}}>
          <CustomButton onPress={() => setShowmodal(false)} title='Cancel' type="secondary"  />
          </View>
          
          
          <View style={{flexGrow: 1}}>
          <CustomButton onPress={() => handleRemoveDoctor.mutate()} title='Remove' />
          </View>
          </View>
        </Modal>
      </Portal>
      </>}

      {!isLoading && !data && <Text style={{color: "red", textAlign: "center"}}>Not a registered user</Text>}

      <View style={{justifyContent: "center", alignItems: "center"}}>
      {isLoading && <ActivityIndicator size={"large"} color='#0665CB' />}

      </View>


        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff"

    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomColor: "gainsboro",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingVertical: 15,
    },
    modal: {
        backgroundColor: 'white',
        width: "80%",
        alignSelf: "center",
        borderRadius: 5,
        paddingVertical: 20,
        paddingHorizontal: 15,
        gap: 10
    }

})