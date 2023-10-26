import {useState, useEffect} from "react"
import { View , StyleSheet, FlatList, Pressable} from "react-native";
import React from "react";
import * as Linking from 'expo-linking';
import { Avatar, Text } from "react-native-paper";
import { useGetAllDoctors, useGetAllEmbodimentUsers, useGetAllUsers } from "../../../services";


interface IAllEmbodimentUsersState {
  firstName: string
  lastName: string
  phoneNumber: string
  avatar: string
  id: string
  role: string
}



interface Iitems {
  item:IAllEmbodimentUsersState
}

export default function AdminSupport() {
  const [AllEmbodimentUsers, setAllEmbodimentUsers] = useState<IAllEmbodimentUsersState[]>([])
  // let AllEmbodimentUsers:[] = []

  const { data: allEmbodimentUsers = [], isLoading } = useGetAllEmbodimentUsers()
  // const {data: users = []} = useGetAllUsers()

  const openWhatsApp = (phoneNumber: string) => {

 
    // const [msg, setMsg] = useState()
    // const [mobile, setMobile] = useState()


    // if (mobile) {
      // if (msg) {
        let url =
          "whatsapp://send?text=" +
          "welcome to embodiment health-care. How may we help you?" +
          "&phone=+234" +
          phoneNumber;
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

  // 


const Item = ({item}:Iitems) => (
  <Pressable onPress={() => openWhatsApp(item.phoneNumber)} style={{ flexDirection: "row", alignItems: "center", padding: 15, gap: 10, borderBottomWidth: StyleSheet.hairlineWidth }}>

  <Avatar.Image size={40}
      source={{ uri: item.avatar ? item.avatar : "https://imageio.forbes.com/specials-images/imageserve/609946db7c398a0de6c94893/Mid-Adult-Female-Entrepreneur-With-Arms-Crossed-/960x0.jpg?format=jpg&width=960" }} />
  <Text variant='titleMedium' style={{flex: 0.8}}>{`${item?.firstName} ${item?.lastName} (${item.role})`}</Text>
  {/* {status !== "unverified" && <Avatar.Image size={24} source={require('../../../assets/profileIcon.png')}
      style={{ backgroundColor: "#fff", marginLeft: "auto" }}
       />} */}
</Pressable>

)


// console.log(AllEmbodimentUsers[0].firstName)
// console.log(AllEmbodimentUsers[0].lastName)
  return (
    <View style={styles.container}>

      <FlatList data={allEmbodimentUsers?.data}
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