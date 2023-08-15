import {
    View,
    FlatList,
    StyleSheet
} from 'react-native';
import { Card, Text as Text} from 'react-native-paper';
import { useGetCompletedAppointment } from '../../../services';
import dayjs from 'dayjs'

interface IItem {
    data: {
        createdAt: string,
        patient:  {
            firstName: string,
            lastName: string,
        }
    }
}


const Item = ({data}:IItem) => {

    return (
        <Card mode='contained' style={styles.item} >
            <Card.Content>
                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5 }}>
                    <Text variant='titleMedium' style={[styles.title, { color: "#000" , opacity: 0.8}]}>
                        <Text style={[styles.title, {textTransform: "capitalize", color: "#000" , opacity: 0.8}]}>{`${data?.patient?.firstName} ${data?.patient?.lastName}`} </Text>
                        completed an appointment
                        </Text>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", paddingVertical: 5, gap: 25 }}>
                    <Text style={[styles.title, { color: "#0665CB" }]}>{dayjs(data?.createdAt).format('hh:mm a')}</Text>
                    <Text style={[styles.title, { color: "#0665CB" }]}>{dayjs(data?.createdAt).format('MMMM M, YYYY')}</Text>
                </View>
            </Card.Content>
        </Card>
    )
};


const Empty = () => {
    return (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
            <Text>No Appointment</Text>
        </View>
    )
}



export default function CompletedAdminAppointment() {
    const {data} = useGetCompletedAppointment()

    return (
          <View style={{width: "100%", flex: 1}}>
          <FlatList
                data={data?.data}
                renderItem={({ item }) => <Item  data={item} />}
                ListEmptyComponent={<Empty />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ rowGap: 10 }}
            />
          </View>
    )
}


const styles = StyleSheet.create({
    item: {
        backgroundColor: '#fff',
        borderWidth: 0.4,
        borderColor: "rgba(0,0,0,0.1)",
    },
    title: {
        fontFamily: 'avenir',
    }
});

