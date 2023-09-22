import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import { Card, Text as Paper_Text } from 'react-native-paper';


const DATA = [

    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: "Jul 23, 2023",
        titles: [
            'You have scheduled an appointment with Dr. Jacob Jones.' ,
            'You have scheduled an appointment with Dr. Jacob Jones.',
            'Treatment for your birth control has been sent to your emailTreatment for your birth control has been sent to your email',
        ]
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        date: "Jul 22, 2023",
        titles: [
            'Treatment for your birth control has been sent to your emailTreatment for your birth control has been sent to your email',
        ]
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        date: "Jul 21, 2023",
        titles: [
            'Remember you have an appointment with Dr. Jacob Jones tommorow.',
            'Treatment for your Depression has been sent to your email',
        ]
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
        date: "Jul 20, 2023",
        titles: [
            'Treatment for your Depression has been sent to your email',
            'You have scheduled an appointment with Dr. Jacob Jones.',
            'Remember you have an appointment with Dr. Jacob Jones tommorow.',
        ]
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
        date: "Jul 18, 2023",
        titles: [
            'You have scheduled an appointment with Dr. Jacob Jones.',
            'Remember you have an appointment with Dr. Jacob Jones tommorow.',
            'You have scheduled an appointment with Dr. Jacob Jones.',
            'Treatment for your birth control has been sent to your emailTreatment for your birth control has been sent to your email',
    ]
    },

];

interface IItem {
     data: {
        id: string
        date: string,
        titles: string[]
     }
}

const Item = ({ data}: IItem) => {

    return (
        <View>
            <Paper_Text style={[styles.title, {fontWeight: "400", opacity: 0.4, paddingVertical: 20, textAlign: "center"}]}>{data.date}</Paper_Text>
       {
        data.titles.map((title, index) => (
            <Card key={index} mode='contained' style={styles.item}  >
            <Card.Content>
                <Paper_Text style={styles.title}>{title}</Paper_Text>
            </Card.Content>
        </Card>
        ))
       }

        </View>
    )
};

const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Order</Text>
        </View>
    )
}


export default function Orders() {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={[]}
                renderItem={({ item }) => <Item data={item} />}
                // keyExtractor={item => item.id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{padding: 10}}
            />
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

