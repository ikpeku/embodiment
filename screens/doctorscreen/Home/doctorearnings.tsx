import { StyleSheet, View , FlatList} from "react-native";
import React from "react";
import { ActivityIndicator, MD2Colors, Text } from "react-native-paper";
import { useDoctor } from "../../../services";
import { useAppSelector } from "../../../redux/hooks";
import { UserState } from "../../../redux/features/useSlice";
import dayjs from 'dayjs'

// interface IData {
    
//     title: string;
//     date: Date;
//     amount: number;
//     _id: string

// }


// interface IItem {
// item: IData
// }

interface IItem {
    data: {
        createdAt: string,
        updatedAt: string,
        endTime: string,
        _id: string,
        bookingId: string,
        patientFirstName: string,
        patientLastName: string,
        patientId: string,
        status: "Completed" | "Booked"
    }
}



const Doctorearnings = () => {

    const { user} = useAppSelector(UserState)
    const { data, isLoading } = useDoctor(user._id)


    const Item = ({ data }:IItem) => {
  
        return (
            // Adminusers
               <View style={{borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10, borderBottomColor: "gainsboro"}}>
                {/* <Card.Content> */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                        <Text variant='titleMedium' style={[styles.title, { color: "#000" }]}>{data?.patientFirstName} {data?.patientLastName}</Text>
                        <View>
                            <Text style={[styles.title,
                            { color: "#0665CB" }]}>$1.00</Text>
                        </View>
                    </View>
    
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                        <Text style={[styles.title, { color: "#000", opacity: 0.5 }]}>{dayjs(data?.updatedAt).format('MMMM D, YYYY')}</Text>
                    </View> 
               </View>  
        )
    };

    const Empty = () => {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                <Text>No Earning </Text>
    
            </View>
        )
    }


  return (
    <View style={styles.container}>
      

      <FlatList
                data={data?.data?.groupedSchedules?.completed}
                renderItem={({ item }) => <Item data={item} />}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ rowGap: 10}}
            />

{isLoading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}
    </View>
  );
};

export default Doctorearnings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
        paddingVertical: 20,
        gap: 20,
    },
    title: {
        fontFamily: 'avenir',
    },
});
