import { View, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";
import { AuthUser, Changepassword, ConfirmAppointment, ConfirmForgotPassword, ConfirmSubscription, ConfirmUser, Consultationappointment, Consultationcheckout, Editprofile, ForgotPassword, HelpandSupport, OnboardingScreen, Questionnaire, Subscribe, Support, UserHealthDetail } from "../screens";
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import UserScreenLayout from "./UserBottomStackNavigation";
import { UserState } from "../redux/features/useSlice";
import { useAppSelector } from "../redux/hooks";

const Stack = createNativeStackNavigator<RootStackParamList>();





const Root = () => {
    const insets = useSafeAreaInsets();

    const { isLogin, isFirst } = useAppSelector(UserState)


   

    const Header = () => (
        <View style={{
            paddingTop: insets.top + 10,
            paddingLeft: 20,
        }}>
            <Image source={require('../assets//logo.png')} style={{}} />
        </View>
    )


    return (
        <NavigationContainer>
            <Stack.Navigator>


                {!isLogin && isFirst ?
                    <Stack.Screen name="Onboarding" component={OnboardingScreen} options={{
                        headerShadowVisible: false,
                        header: Header
                    }}
                    />
                    :
                    <>



                     { !isLogin && !isFirst ?  <Stack.Group screenOptions={
                            {
                                headerTintColor: "#0665CB", headerLargeTitleStyle: { color: "#0665CB" },
                                headerTitleStyle: { color: "#0665CB", fontWeight: "bold", fontFamily: "avenir" },
                                // headerBackVisible: false,
                                headerShadowVisible: false
                            }
                        }>
                            <Stack.Screen name="Authenticateuser" component={AuthUser}

                            />

                            <Stack.Screen name="ConfirmUser" component={ConfirmUser} options={{ title: "Confirm Your Email" }} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: "Forgot password" }} />
                            <Stack.Screen name="ConfirmForgotPassword" component={ConfirmForgotPassword} options={{ title: "Reset password" }} />
                        </Stack.Group>
:

<>
                        {/* user home */}
                        <Stack.Group>
                            <Stack.Screen name="User" component={UserScreenLayout} options={{ headerShown: false }} />
                            <Stack.Screen name="UserHealthDetail" component={UserHealthDetail} options={{ headerShown: false }} />
                            <Stack.Screen name="Questionnaire" component={Questionnaire}
                                options={{ title: "AI Questionnaire", headerTitleAlign: "center", headerTintColor: "#0665CB", }}
                            />
                            <Stack.Screen name="ConfirmAppointment" component={ConfirmAppointment} options={{ headerShown: false }} />
                        </Stack.Group>

                        {/* user profile */}
                        <Stack.Group screenOptions={{ headerTitleAlign: "center", headerTintColor: "#0665CB", }}>
                            <Stack.Screen name="Account" component={Editprofile} />
                            <Stack.Screen name="Password" component={Changepassword} />
                            <Stack.Screen name="HelpandSupport" component={HelpandSupport} options={{ title: "Help & Support" }} />
                            <Stack.Screen name="Support" component={Support} options={{ title: "Ongoing support" }} />
                            <Stack.Screen name="Subscribe" component={Subscribe} options={{ title: "Subscribe" }} />
                            <Stack.Screen name="ConfirmSubscription" component={ConfirmSubscription} options={{ headerShown: false }} />

                        </Stack.Group>

                        {/* user consultation */}
                        <Stack.Group screenOptions={{ headerTitleAlign: "center", headerTintColor: "#0665CB", }}>
                            <Stack.Screen name="Consultationappointment" component={Consultationappointment} options={{ title: "Book Appointment" }} />
                            <Stack.Screen name="Consultationcheckout" component={Consultationcheckout} options={{ title: "Checkout" }} />

                        </Stack.Group>

                        </>
                        }

                    </>
                }

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default Root;

