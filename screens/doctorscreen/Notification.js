import {
    SafeAreaView,
    View,
    FlatList,
    StyleSheet,
    Text,
} from 'react-native';
import { Card, Text as Paper_Text } from 'react-native-paper';
import Button from '../../static/Button';
import { AntDesign } from '@expo/vector-icons';

const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        date: new Date(),
        title: 'Treatment for your birth control has been sent to your emailTreatment for your birth control has been sent to your email',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2',
        date: new Date(),
        title: 'Treatment for your Depression has been sent to your email',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d722',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },


    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba111',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63222',
        date: new Date(),
        title: 'Treatment for your birth control has been sent to your emailTreatment for your birth control has been sent to your email',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72333',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2444',
        date: new Date(),
        title: 'Treatment for your Depression has been sent to your email',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f632555',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d722666',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    }, {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba777',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63888',
        date: new Date(),
        title: 'Treatment for your birth control has been sent to your emailTreatment for your birth control has been sent to your email',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72999',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba2000',
        date: new Date(),
        title: 'Treatment for your Depression has been sent to your email',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63211111',
        date: new Date(),
        title: 'You have scheduled an appointment with Dr. Jacob Jones.',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d7222222222',
        date: new Date(),
        title: 'Remember you have an appointment with Dr. Jacob Jones tommorow.',
    },
];

const Item = ({ title, date }) => {

    return (
        <Card mode='contained' style={styles.item} >
            <Card.Content>
                <Paper_Text style={styles.title}>{title}</Paper_Text>
                <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Paper_Text style={[styles.title, { color: "#0665CB" }]}>09:00 am</Paper_Text>
                    <Paper_Text style={[styles.title, { color: "#0665CB" }]}>March 12, 2023</Paper_Text>
                </View>
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
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: "100%" }}>
                <View style={{ width: 150, marginLeft: "auto", paddingVertical: 8 }}>
                    <Button title={'last 30 days'} icon={<AntDesign name="calendar" size={25} color={"#212121"} />} type='disable' />
                </View>
            </View>

            <FlatList
                data={DATA}
                renderItem={({ item }) => <Item title={item.title} data={item.date} />}
                keyExtractor={item => item.id}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        width: "100%",
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },
    item: {
        backgroundColor: '#fff',
        margin: 5,
        borderWidth: 0.4,
        borderColor: "rgba(0,0,0,0.1)",


    },
    title: {
        fontFamily: 'Avenir',
        fontWeight: 500,
        fontSize: 16,
        lineHeight: 22,
        color: "#000",
    },
});

