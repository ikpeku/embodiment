import { StyleSheet, View } from "react-native";
import React from "react";
import { Card, Text } from "react-native-paper";


interface IItem {
    title: string;
    subTitle: string;
}

export default function Doctorviewuser() {

    const Item = ({title, subTitle}:IItem) => (
        <View style={styles.detail}>
                            <Text variant='bodyLarge' style={{color: "#0665CB"}}>{title}</Text>
                            <Text variant='bodyLarge'>{subTitle}</Text>
                        </View>
    )


  return (
    <View style={styles.container}>
      <View>
                <Card style={{ backgroundColor: "#fff" }} mode='contained' >
                    <Card.Content>

                        <Item title="Patient:" subTitle="" />
                        <Item title="Sex:" subTitle="" />
                        <Item title="Date of birth:" subTitle="" />
                        <Item title="Allergies:" subTitle="" />
                        <Item title="Past appointments:" subTitle="" />
                    </Card.Content>
                </Card>
            </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        padding: 5,
        paddingVertical: 16
    },
    detail: {
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingTop: 20,
        paddingBottom: 10,
        borderColor: "#00000026"
    }
});
