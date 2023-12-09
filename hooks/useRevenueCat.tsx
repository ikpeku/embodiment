import Purchases, { CustomerInfo, PurchasesOffering } from 'react-native-purchases';
import { Platform } from 'react-native';
import { useEffect, useState } from 'react';
import { UserState } from '../redux/features/useSlice';
import { useAppSelector } from '../redux/hooks';


const ApiKeys = {
    andriod: "goog_FaWxeLAQgRWxxjcpWIkSgbpkpcv",
    ios: "appl_PTzdPFQWGxYAfDcWxXYLzedkkpN"
}


const useRevenueCat = () => {
    const {user} = useAppSelector(UserState)

    const [currentOffering, setCurrentOffering] = useState<PurchasesOffering | null>(null)
    const [customerInfo, setCustomerInfo] = useState<CustomerInfo | null>(null)

    const isProMember = customerInfo?.entitlements?.active?.pro
      

    useEffect(() => {

        const fetchData = async () => {
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
            //  console.log(JSON.stringify(error));
        } )

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


