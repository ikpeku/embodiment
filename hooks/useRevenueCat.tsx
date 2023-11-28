import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { UserState } from '../redux/features/useSlice';
import { useAppSelector } from '../redux/hooks';


const ApiKeys = {
    andriod: "goog_FaWxeLAQgRWxxjcpWIkSgbpkpcv",
    ios: "appl_PTzdPFQWGxYAfDcWxXYLzedkkpN"
}

// const memberShipType = {
//     monthlyIndividual: "individual_monthly",
//     monthlyFamily: "Monthly",
//     annuallyIndividual: "Annual",
//     annuallyFammily: "family_annual"
// }

const useRevenueCat = () => {
    const {user} = useAppSelector(UserState)

    const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null)
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)

    const isProMember = customerInfo?.entitlements?.active?.pro
        // customerInfo?.activeSubscriptions.includes(memberShipType.annuallyFammily) ||
        // customerInfo?.activeSubscriptions.includes(memberShipType.annuallyIndividual) ||
        // customerInfo?.activeSubscriptions.includes(memberShipType.monthlyFamily) ||
        // customerInfo?.activeSubscriptions.includes(memberShipType.monthlyIndividual)


    useEffect(() => {

        const fetchData = async () => {
            // Purchases.setLogLevel(Purchases.LOG_LEVEL.VERBOSE)
            if (Platform.OS === "ios") {
                await Purchases.configure({ apiKey: ApiKeys.ios, appUserID: user.email })
            } else if (Platform.OS == "android") {
                await Purchases.configure({ apiKey: ApiKeys.andriod, appUserID: user.email })
            }

            const offerings = await Purchases.getOfferings()

            const customerInfo = await Purchases.getCustomerInfo()
            if (offerings.current !== null) {  
            setCurrentOffering(offerings.current)
            }
            setCustomerInfo(customerInfo)

        }

        fetchData().catch((error) => {
             console.log(JSON.stringify(error));
        }
        //  console.error
       
         )


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


