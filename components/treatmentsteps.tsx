import { StyleSheet, View } from "react-native";
import React from "react";
import { Avatar, Card , Text} from "react-native-paper";
import { AvatarImageSource } from "react-native-paper/lib/typescript/components/Avatar/AvatarImage";


interface ITreatmentCard { 
    source: AvatarImageSource;
     title: string,
    text: string ,
    NB?: string
}

interface ITreatmentsteps {
    header?: string, 
    stepOneSubText: string,
    stepTwoSubText: string,
    stepThreeSubText: string,
    NB?: string
}

const Treatmentsteps = ({header,  stepOneSubText, stepThreeSubText, stepTwoSubText, NB}: ITreatmentsteps) => {

    const TreatmentCard = ({ source, title, text , NB}:ITreatmentCard) => (

        <Card>
            <Card.Content style={{ gap: 10 , backgroundColor: "#fff"}}>
                <Avatar.Image size={70} source={source} />
                {title &&<Text style={[styles.text, { fontWeight: "bold", }]} variant='titleMedium'>{title}</Text>}
                {text && <Text style={[styles.text, {opacity: 0.7}]} variant='bodyLarge'>{text}</Text>}
                {NB && <Text style={[styles.text, {opacity: 0.7}]} variant='bodyLarge'>{NB}</Text>}
            </Card.Content>
        </Card>
    )
  return (
    <View style={{gap:20, backgroundColor: "white"}}>
        {header && <Text style={[{marginTop : 5 }]} variant='bodyLarge'>{header}</Text>}

        <Text style={[styles.text, { fontWeight: "bold", textAlign: "center", marginVertical: 20 }]}
                    variant='titleLarge'>How it works!</Text>
       
       <TreatmentCard
        title={"Complete a virtual consultation"}
        text={stepOneSubText}
        source={require("../assets/homeDetail1.png")}
        
        />

    <TreatmentCard
        title={"Wait for your result to be examined by our experienced doctors"}
        text={stepTwoSubText}
        source={require("../assets/homeDetail2.png")} />

    <TreatmentCard
            title={"Make payment and get your treatment and prescription"}
            text={stepThreeSubText}
        source={require("../assets/homeDetail3.png")} 
        NB={NB}
        />

    </View>
  );
};

export default Treatmentsteps;


const styles = StyleSheet.create({
    text: {
        // fontFamily: 'avenir'
    },
})
