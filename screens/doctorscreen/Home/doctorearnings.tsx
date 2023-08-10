import { StyleSheet, View , FlatList} from "react-native";
import React from "react";
import { Text } from "react-native-paper";

interface IData {
    
    title: string;
    date: Date;
    amount: number;
    _id: string

}


interface IItem {
item: IData
}


const DATA = [
    {
        _id: "1",
        title: "Andrew Sam",
        date: new Date(),
        amount: 3500
    },
    {
        _id: "2",
        title: "Guy Hawkins",
        date: new Date(),
        amount: 300
    },
    {
        _id: "3",
        title: "Darlene Robertson",
        date: new Date(),
        amount: 500
    },
]

const Doctorearnings = () => {


    const Item = ({ item }:IItem) => {
        return (
            // Adminusers
               <View style={{borderBottomWidth: StyleSheet.hairlineWidth, paddingBottom: 10, borderBottomColor: "gainsboro"}}>
                {/* <Card.Content> */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                        <Text variant='titleMedium' style={[styles.title, { color: "#000" }]}>{item.title}</Text>
                        <View>
                            <Text style={[styles.title,
                            { color: "#0665CB" }]}>${item.amount}</Text>
                        </View>
                    </View>
    
                    <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                        <Text style={[styles.title, { color: "#000", opacity: 0.5 }]}>{item.date.toDateString()}</Text>
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
                data={DATA}
                renderItem={({ item }) => <Item  item={item} />}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ rowGap: 10}}
            />
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
