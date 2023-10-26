import {useState, useEffect} from "react"
import { View , StyleSheet, FlatList} from "react-native";
import React from "react";
import * as Linking from 'expo-linking';
import { Avatar, Text } from "react-native-paper";
import { useGetAllDoctors, useGetAllUsers } from "../../../services";


interface IAllEmbodimentUsersState {
  firstName: string
  lastName: string
  phoneNumber: string
  avatar: string
  id: string
}

interface IAllEmbodimentUsers extends IAllEmbodimentUsersState  {
  
  _id: string
 
}



interface Iitems {
  item:IAllEmbodimentUsersState
}

export default function AdminSupport() {
  const [AllEmbodimentUsers, setAllEmbodimentUsers] = useState<IAllEmbodimentUsersState[]>([])
  // let AllEmbodimentUsers:[] = []

  const { data: doctors = [], isLoading } = useGetAllDoctors()
  const {data: users = []} = useGetAllUsers()

  const openWhatsApp = () => {
 
    // const [msg, setMsg] = useState()
    // const [mobile, setMobile] = useState()


    // if (mobile) {
      // if (msg) {
        let url =
          "whatsapp://send?text=" +
          "welcome to embodiment health-care. How may we help you?" +
          "&phone=+234" +
          "7067057396";
        Linking.openURL(url)
          .then(data => {
            // console.log("WhatsApp Opened successfully " + data);
            return data
          })
          .catch(() => {
            alert("Make sure WhatsApp installed on your device");
          });
      // } else {
      //   alert("Please enter message to send");
      // }

    // } else {
    //   alert("Please enter mobile no");
    // }
  };

  openWhatsApp()

  useEffect(() => {
    if(doctors) {
      console.log(doctors?.data.length)

      doctors?.data.forEach((doctor:IAllEmbodimentUsers) => {
     
        if(AllEmbodimentUsers.length > 0) {
          const ref = AllEmbodimentUsers.find(v => v.id === doctor._id)
         
          if(!ref){
            setAllEmbodimentUsers([...AllEmbodimentUsers, {id: doctor._id, firstName: doctor.firstName, lastName: doctor.lastName, phoneNumber: doctor.phoneNumber, avatar: doctor.avatar }])
          }
       
        } else {
          setAllEmbodimentUsers([...AllEmbodimentUsers, {id: doctor._id, firstName: doctor.firstName, lastName: doctor.lastName, phoneNumber: doctor.phoneNumber, avatar: doctor.avatar }])
        }

      })
    }
    if(users) {
      let set = users.data
  
     
    }
  }, [doctors.data, users.data])



const Item = ({item}:Iitems) => (
  <View style={{ flexDirection: "row", alignItems: "center", padding: 15, gap: 10, borderBottomWidth: StyleSheet.hairlineWidth }}>

  <Avatar.Image size={40}
      source={{ uri: item.avatar }} />
  <Text variant='titleMedium' style={{flex: 0.8}}>{`${item?.firstName} ${item?.lastName}`}</Text>
  {/* {status !== "unverified" && <Avatar.Image size={24} source={require('../../../assets/profileIcon.png')}
      style={{ backgroundColor: "#fff", marginLeft: "auto" }}
       />} */}
</View>

)


// console.log(AllEmbodimentUsers[0].firstName)
// console.log(AllEmbodimentUsers[0].lastName)
  return (
    <View style={styles.container}>

      <FlatList data={AllEmbodimentUsers}
       renderItem={({index, item}) => <Item item={item} />} 
       contentContainerStyle={{gap: 10}}
       />

    </View>
  );
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#fff"
  },
  
})