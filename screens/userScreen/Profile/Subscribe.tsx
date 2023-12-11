import { FC, useEffect } from "react"
import { Alert, Pressable, ScrollView, StyleSheet, View } from 'react-native'
import { Text, Divider, Card, ActivityIndicator, MD2Colors } from 'react-native-paper';
import { Octicons } from '@expo/vector-icons';
import { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { CustomButton } from "../../../components";
import { SubscribeScreenProps, SubscriptiontRouteProp } from "../../../types";
import useRevenueCat from "../../../hooks/useRevenueCat";
import Purchases from "react-native-purchases";


const Render: FC<{ title: string }> = ({ title }) => (
    <View style={{ width: "100%", flexDirection: "row", gap: 15 }}>
        <Octicons name="check" size={24} color="#0665CB" />
        <Text variant="bodyLarge">{title}</Text>
    </View>
)

// isFromProfile
const Subscribe = () => {
    const { currentOffering, customerInfo, isProMember } = useRevenueCat()

    const [annual, setAnnual] = useState("annual")

    const navigation = useNavigation<SubscribeScreenProps>()
    const {params} = useRoute<SubscriptiontRouteProp>()

    const [monthlyIndividual, setMonthlyIndividual] = useState<string | undefined>("")
    const [yearlyIndividual, setYearlyIndividual] = useState<string | undefined>("")

    const [family_monthly, setFamily_monthly] = useState<string | undefined>("")
    const [family_annual, setFamily_annual] = useState<string | undefined>("")

    const [isLoading, setIsLoading] = useState(false)



    useEffect(() => {
        if (currentOffering) {
            const family_monthly = currentOffering?.availablePackages.find(offer => offer.identifier === "$rc_monthly")
            const annual = currentOffering?.availablePackages.find(offer => offer.identifier === "$rc_annual")
            const family_annual = currentOffering?.availablePackages.find(offer => offer.identifier === "family_annual")
            const monthly = currentOffering?.availablePackages.find(offer => offer.identifier === "individual_monthly")
            setMonthlyIndividual(monthly?.product?.priceString)
            setYearlyIndividual(annual?.product?.priceString)
            setFamily_monthly(family_monthly?.product?.priceString)
            setFamily_annual(family_annual?.product?.priceString)

        }
    }, [currentOffering])








    if (!currentOffering) {
        return (
            <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "#fff" }]}>
                <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
            </View>
        )
    }

   
    const handleMonthlyIndividualSubscription = async() => {
        setIsLoading(v => !v)
        const monthly = currentOffering?.availablePackages.find(offer => offer.identifier === "individual_monthly")
        if(monthly) {
            const purchaseInfo = await Purchases.purchasePackage(monthly)

            if(purchaseInfo?.customerInfo?.entitlements?.active?.pro){
                if(params.isFromProfile){
                navigation.navigate("ConfirmSubscription" , {type: "Monthly"})
            } else {
                Alert.alert("sucessfull", "Congratulation, you have sucessfully subsquire to embodiment monthly plan.", [
                    {
                        onPress: () => navigation.goBack()
                    }
                   ])
            } 
            }
        }
        setIsLoading(v => !v)
    }

    const handleYearlyIndividualSubscription = async() => {
        setIsLoading(v => !v)
        const annual = currentOffering?.availablePackages.find(offer => offer.identifier === "$rc_annual")
        if(annual) {
            const purchaseInfo = await Purchases.purchasePackage(annual)
 
            if(purchaseInfo?.customerInfo?.entitlements?.active?.pro){
                if(params.isFromProfile){

                    navigation.navigate("ConfirmSubscription", {type: "Yearly"})
                } else {
                    Alert.alert("sucessfull", "Congratulation, you have sucessfully subsquire to embodiment yearly plan.", [
                        {
                            onPress: () => navigation.goBack()
                        }
                       ])
                }
            }
        }
        setIsLoading(v => !v)
    }


    const handleMonthlyFamilySubscription = async() => {
        setIsLoading(v => !v)
        const family_monthly = currentOffering?.availablePackages.find(offer => offer.identifier === "$rc_monthly")
        if(family_monthly) {
            const purchaseInfo = await Purchases.purchasePackage(family_monthly)

            if(purchaseInfo?.customerInfo?.entitlements?.active?.pro){
                if(params.isFromProfile){
                navigation.navigate("ConfirmSubscription", {type: "Family Monthly"})
            } else {
                Alert.alert("sucessfull", "Congratulation, you have sucessfully subsquire to embodiment family monthly plan.", [
                    {
                        onPress: () => navigation.goBack()
                    }
                   ])
            }
            }
        }
        setIsLoading(v => !v)
    }

    const handleYearlyFamilySubscription = async() => {
        setIsLoading(v => !v)
        const family_annual = currentOffering?.availablePackages.find(offer => offer.identifier === "family_annual")
        if(family_annual) {
            const purchaseInfo = await Purchases.purchasePackage(family_annual)

            if(purchaseInfo?.customerInfo?.entitlements?.active?.pro){
                if(params.isFromProfile){
                navigation.navigate("ConfirmSubscription", {type: "Family Yearly"})
            } else {
               Alert.alert("sucessfull", "Congratulation, you have sucessfully subsquire to embodiment family yearly plan.", [
                {
                    onPress: () => navigation.goBack()
                }
               ])
            }

            }
        }
        setIsLoading(v => !v)
    }




    return (
        <ScrollView showsVerticalScrollIndicator={false}>

            <View style={styles.root}>

                <View style={styles.boxContainer}>
                    <Pressable onPress={() => setAnnual("monthly")} style={[styles.box, annual == "monthly" ? { backgroundColor: "#0665CB", borderColor: "#0665CB" } : { backgroundColor: "#F4F4F4", borderColor: "#F4F4F4" }]}>
                        <Text variant="titleLarge" style={{ color: annual === "monthly" ? "#fff" : "#000" }}>Monthly</Text>
                    </Pressable>


                    <Pressable onPress={() => setAnnual("annual")} style={[styles.box, annual == "annual" ?
                        { backgroundColor: "#0665CB", borderColor: "#0665CB" } : { backgroundColor: "#F4F4F4", borderColor: "#F4F4F4" }]}>
                        <Text variant="titleLarge" style={{ color: annual !== "monthly" ? "#fff" : "#000" }} >Annual</Text>
                    </Pressable>

                </View>


                <Card style={{ backgroundColor: "#fff", }}>
                    <View style={{ alignItems: "center", padding: 20 }}>
                        <Text variant="titleLarge" style={{ fontFamily: "avenir" }}>Individual</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 24, fontFamily: "avenir" }} variant="titleLarge">
                            {annual === "annual" ? yearlyIndividual : monthlyIndividual}
                            <Text style={{}} variant="titleLarge">
                                {annual === "annual" ? "/y" : "/m"}
                            </Text>
                        </Text>
                    </View>

                    <Divider style={{}} />

                    <View style={{ gap: 10, padding: 20 }}>
                        <Render title="1 appointment everyday" />
                        <Render title="Drug refill every week" />
                        <Render title="Free delivery" />
                    </View>

                    <View style={{ width: "75%", alignSelf: "center", paddingVertical: 20 }}>
                        {annual === "annual" ?
                            <CustomButton title="Subscribe" onPress={handleYearlyIndividualSubscription} />
                            :
                            <CustomButton title="Subscribe" onPress={handleMonthlyIndividualSubscription} />}
                    </View>

                </Card>

                <Card style={{ backgroundColor: "#fff", }}>
                    <View style={{ alignItems: "center", padding: 20 }}>
                        <Text variant="titleLarge" style={{ fontFamily: "avenir" }}>Family</Text>
                        <Text style={{ fontWeight: "bold", fontSize: 24, fontFamily: "avenir" }} variant="titleLarge">
                            {annual === "annual" ? family_annual : family_monthly}
                            <Text style={{}} variant="titleLarge">
                                {annual === "annual" ? "/y" : "/m"}
                            </Text>
                        </Text>
                    </View>

                    <Divider style={{}} />

                    <View style={{ gap: 10, padding: 20 }}>
                        <Render title="Up to 3 appointments everyday " />
                        <Render title="Drug refill every week" />
                        <Render title="Free delivery" />
                    </View>

                    <View style={{ width: "75%", alignSelf: "center", paddingVertical: 20 }}>
                    {annual === "annual" ?
                            <CustomButton title="Subscribe" onPress={handleYearlyFamilySubscription} />
                            :
                            <CustomButton title="Subscribe" onPress={handleMonthlyFamilySubscription} />}
                    </View>

                </Card>

            </View>

            {isLoading && (
                <View style={[{ flex: 1, alignItems: "center", justifyContent: "center", ...StyleSheet.absoluteFillObject, backgroundColor: "transparent" }]}>
                    <ActivityIndicator animating={true} size={"large"} color={MD2Colors.blue500} />
                </View>
            )}
        </ScrollView>
    )
}

export default Subscribe

const styles = StyleSheet.create({
    root: {
        backgroundColor: "#fff",
        flex: 1,
        padding: 20,
        rowGap: 25
    },
    boxContainer: {
        flexDirection: "row",
        gap: 10,
        paddingVertical: 7,
        paddingHorizontal: 15,
        backgroundColor: "#F4F4F4",
        borderRadius: 5,
    },
    box: {
        borderWidth: 1,
        borderRadius: 8,
        flexGrow: 1,
        alignItems: "center",
        paddingVertical: 12
    }

})