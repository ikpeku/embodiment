import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { ActivityIndicator, Card, MD2Colors, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DATA from "../../../dummy/data.json"
import { useNavigation } from '@react-navigation/native';

import { EvilIcons } from '@expo/vector-icons';
import { UserHealthDetailScreenProps } from '../../../types';
import { useGetAllDisease } from '../../../services';
import { QueryClient } from '@tanstack/react-query';



interface IrenderItem {
    item: {
        category: string,
        popular: boolean,
        title: string,
        _id: string
    }
}

const UserHome = () => {

    const queryClient = new QueryClient()
    const [searchQuery, setSearchQuery] = useState('');
    // const [data, setData] = useState(DATA)

    // const router = useRouter()
    const navigation = useNavigation< UserHealthDetailScreenProps>()

    const {data, isLoading, isSuccess} = useGetAllDisease()


    if(isSuccess) {
     queryClient.invalidateQueries({ queryKey: ['userNotification'] })
     queryClient.invalidateQueries({ queryKey: ['getDoctorVerifyDoctors'] })
    }

    // useEffect(() => {

    //     // if (!searchQuery) {
    //     //     setData(DATA)
    //     // } else {
    //     //     setData(DATA.filter(item => item.title.includes(searchQuery)))
    //     // }

    // }, [searchQuery])



    const renderItem = ({ item }:IrenderItem) => (
        // router.push(`./Home/${item.id}`)
        <Card style={styles.item} onPress={() => navigation.navigate("UserHealthDetail", {id: item._id})}>
            <Card.Content style={{ gap: 10 }} >
                <Text variant='bodyMedium' style={{ backgroundColor: "#E5F6FD", paddingHorizontal: 3, borderRadius: 50, width: 100 }} >{item.category}</Text>
                {item.popular && <Text variant='bodyMedium' style={{ backgroundColor: "#7EA5CE", paddingHorizontal: 3, borderRadius: 50, width: 70 }}>Popular</Text>}
                <Text variant='bodyMedium' style={{ backgroundColor: "#fff", paddingHorizontal: 3, borderRadius: 50, width: "100%" }}>{item.title}</Text>

            </Card.Content>
        </Card>
    );

    const HeaderTitle = () => <Text variant='headlineSmall'  >What we treat</Text>

    return (

        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <Image source={require('../../../assets/logo.png')} style={{ width: 40, aspectRatio: 1 }} resizeMode='contain' />
                <TextInput
                    placeholder="Search for illness"
                    outlineStyle={{ borderColor: "gainsboro", borderWidth: StyleSheet.hairlineWidth }}
                    contentStyle={{ paddingHorizontal: 10 }}

                    onChangeText={(event) => setSearchQuery(event)}
                    value={searchQuery} mode='outlined' style={{ height: 35, flexGrow: 1, }}
                    right={<TextInput.Icon icon={(properties) => <EvilIcons name="search" {...properties} />
                }/>}
                />
            </View>

            <FlatList
                data={data?.data}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<HeaderTitle />}
                contentContainerStyle={{paddingVertical: 10}}

            />

{isLoading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}
        </SafeAreaView>

    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 10,
        backgroundColor: "#fff"

    },
    item: {
        flex: 1,
        flexGrow: 1,
        margin: 10,
        backgroundColor: '#fff',
        maxWidth: "48%"
    },
    title: {
        fontSize: 32,
    },
});

export default UserHome;
