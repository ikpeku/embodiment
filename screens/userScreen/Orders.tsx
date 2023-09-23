import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import { ActivityIndicator, Card, MD2Colors, Text as Paper_Text } from 'react-native-paper';
import { useGetUserOrder } from '../../services/userApi';
import { useAppSelector } from '../../redux/hooks';
import { UserState } from '../../redux/features/useSlice';


interface IItem {
    title: string
}


const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Order</Text>
        </View>
    )
}


export default function Orders() {
    const { user } = useAppSelector(UserState)

    const {data = [], isLoading} = useGetUserOrder(user._id)

    const Item = ({ title}: IItem) => {


        return (
            <View style={{width: "100%"}}>
                <Paper_Text style={[styles.title, {fontWeight: "400", opacity: 0.4, paddingVertical: 20, textAlign: "center"}]}>{title}</Paper_Text>
           {
            data[title].map((title1: any, index: number) => (
                <Card key={index} mode='contained' style={styles.item}  >
                <Card.Content>
                    <Paper_Text style={styles.title}>{title1.message}</Paper_Text>
                </Card.Content>
            </Card>
            ))
           }
    
            </View>
        )
    };
    


    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={Object.keys(data)}
                renderItem={({ item }) => <Item title={item} />}
                // keyExtractor={item => item.id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{width: "100%"}}
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
        
    },
    item: {
        backgroundColor: '#fff',
        margin: 5
        
    },
    title: {
        fontFamily: 'avenir',
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 21,
        color: "#000",
    },
});

