import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { Card, Text, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import DATA from "../../../dummy/data.json"
import { useNavigation } from '@react-navigation/native';

import { EvilIcons } from '@expo/vector-icons';
import { UserHealthDetailScreenProps } from '../../../types';
import { useGetAllVendorsQuery } from '../../../services';


interface IrenderItem {
    item: {
        catergory: string,
        status: string,
        title: string,
        id: number
    }
}

const UserHome = () => {
    const [searchQuery, setSearchQuery] = useState('');
    // const [data, setData] = useState(DATA)

    // const router = useRouter()
    const navigation = useNavigation< UserHealthDetailScreenProps>()


    const {data} = useGetAllVendorsQuery(undefined)


    // console.log(data)



useEffect(() => {
    (async() => {
        const res = await fetch("https://embodi-be.vercel.app/api/disease/categories")

        const result = await res.json()
    })()
},[])


    // useEffect(() => {

    //     // if (!searchQuery) {
    //     //     setData(DATA)
    //     // } else {
    //     //     setData(DATA.filter(item => item.title.includes(searchQuery)))
    //     // }

    // }, [searchQuery])


    const renderItem = ({ item }:IrenderItem) => (
        // router.push(`./Home/${item.id}`)
        <Card style={styles.item} onPress={() => navigation.navigate("UserHealthDetail", {id: item.id})}>
            <Card.Content style={{ gap: 10 }} >
                <Text variant='bodyMedium' style={{ backgroundColor: "#E5F6FD", paddingHorizontal: 3, borderRadius: 50, width: 100 }} >{item.catergory}</Text>
                {item.status && <Text variant='bodyMedium' style={{ backgroundColor: "#7EA5CE", paddingHorizontal: 3, borderRadius: 50, width: 70 }}>Popular</Text>}
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
                data={data}
                renderItem={renderItem}
                numColumns={2}
                showsVerticalScrollIndicator={false}
                ListHeaderComponent={<HeaderTitle />}
                contentContainerStyle={{paddingVertical: 10}}

            />
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
