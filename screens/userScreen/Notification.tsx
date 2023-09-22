import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import { ActivityIndicator, Card, MD2Colors, Text as Paper_Text } from 'react-native-paper';
import { useGetUserNotification } from '../../services/userApi';
import { UserState } from '../../redux/features/useSlice';
import { useAppSelector } from '../../redux/hooks';
import dayjs from 'dayjs';


interface IItem {
    data : {
        message: string; 
        timestamp: Date
    }
}

const Item = ({  data }:IItem) => {

    return (
        <Card mode='contained' style={styles.item}  >
            <Card.Content>
                <Paper_Text style={styles.title}>{data.message}</Paper_Text>
                <Paper_Text style={[styles.title, {fontWeight: "400", opacity: 0.4}]}>{dayjs(data.timestamp).format("MMM D, YYYY")} at {dayjs(data.timestamp).format("hh:mm a")}  </Paper_Text>
            </Card.Content>

        </Card>
    )
};

const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Notification</Text>
        </View>
    )
}


export default function Notification() {
    const { user } = useAppSelector(UserState)

    const {data, isLoading} = useGetUserNotification(user._id)
    // console.log(data)



    
    // const handleViewNotification = async({id, notificationId}:IhandleViewNotification ) => {

    //     try {
    //         await axios.put(`${baseURL}/notification/${user._id}/${notificationId}`)
           
    //     } catch (error: any) {
    //         // console.log(error.response.data.message)
    //         // Alert.alert()   
    //     } finally {
    //         queryClient.invalidateQueries({ queryKey: ['doctorNotification'] })
    //         navigation.navigate("Doctorviewuser", { id})
    //     }
    // }


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                renderItem={({ item }) => <Item  data={item} />}
                keyExtractor={item => item._id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding: 5}}
            />
             {isLoading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        // paddingHorizontal: 10,
        
    },
    item: {
        backgroundColor: '#fff',
        margin: 5
        // backgroundColor: "#fff",

    },
    title: {
        fontFamily: 'avenir',
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 21,
        color: "#000",
    },
});

