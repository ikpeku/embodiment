import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { Platform, View } from 'react-native';
import { useEffect, useState } from 'react';


const ApiKeys = {
    andriod: "goog_FaWxeLAQgRWxxjcpWIkSgbpkpcv",
    ios: "appl_PTzdPFQWGxYAfDcWxXYLzedkkpN"
}

const memberShipType = {
    monthlyIndividual: "individual_monthly",
    monthlyFamily: "Monthly",
    annuallyIndividual: "Annual",
    annuallyFammily: "family_annual"
}

const useRevenueCat = () => {

    const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null)
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)

    const isProMember =
        customerInfo?.activeSubscriptions.includes(memberShipType.annuallyFammily) ||
        customerInfo?.activeSubscriptions.includes(memberShipType.annuallyIndividual) ||
        customerInfo?.activeSubscriptions.includes(memberShipType.monthlyFamily) ||
        customerInfo?.activeSubscriptions.includes(memberShipType.monthlyIndividual)





    useEffect(() => {

        const fetchData = async () => {
            Purchases.setLogLevel(Purchases.LOG_LEVEL.DEBUG)
            if (Platform.OS === "ios") {
                await Purchases.configure({ apiKey: ApiKeys.ios })
            } else if (Platform.OS == "android") {
                await Purchases.configure({ apiKey: ApiKeys.andriod })
            }

            const offerings = await Purchases.getOfferings()
            const customerInfo = await Purchases.getCustomerInfo()
            setCurrentOffering(offerings.current)
            setCustomerInfo(customerInfo)

        }

        fetchData().catch(console.error)


    }, [])



    useEffect(() => {
        const customerInfoUpdated = async (purchaserInfo: CustomerInfo) => {
            setCustomerInfo(purchaserInfo)
        }

        Purchases.addCustomerInfoUpdateListener(customerInfoUpdated)
    }, [])


    return { currentOffering, customerInfo, isProMember }
};

export default useRevenueCat;


//
// get family access annually
// 1 Product
// 2023-11-01 11:24 AM UTC
// urinary_tract_infection
// urinary_tract_infection access
// 1 Product
// 2023-11-01 12:26 PM UTC
// Migraine
// Migraine access
// 1 Product
// 2023-11-01 12:30 PM UTC
// Anxiety treatment
// Anxiety treatment access
// 1 Product
// 2023-11-01 12:30 PM UTC
// Erectile Dyfunction
// Erectile Dyfunction access
// 1 Product
// 2023-11-01 12:30 PM UTC
// Premature ejaculation
// Premature ejaculation access
// 1 Product
// 2023-11-01 12:31 PM UTC
// Acne treatment
// Acne treatment access
// 1 Product
// 2023-11-01 12:32 PM UTC
// Gastritis
// Gastritis access
// 1 Product
// 2023-11-01 12:32 PM UTC
// Common Cold
// Common Cold access
// 1 Product
// 2023-11-01 12:32 PM UTC
// Malaria
// Malaria access
// 1 Product
// 2023-11-01 12:33 PM UTC
// Typhoid
// Typhoid access
// 1 Product
// 2023-11-01 12:33 PM UTC