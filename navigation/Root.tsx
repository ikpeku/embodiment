import { View, Image } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from "../types";
import { AdminChangepassword, AdminDoctorprofile, AdminEditprofile, AdminSupport, AdminUserprofile, Admindoctorsuccess, AuthUser, BankDetails, Changepassword, ConfirmAppointment, ConfirmForgotPassword, ConfirmSubscription, ConfirmUser, Confirmremoveuser, Consultationappointment, Consultationcheckout, CreateDoctorSchedule, DoctorAppointments, Doctorearnings, Doctorviewuser, Editprofile, ForgotPassword, HelpandSupport, OnboardingScreen, Questionnaire, Signup, Subscribe, Support, UserHealthDetail } from "../screens";
import {
    useSafeAreaInsets,
} from 'react-native-safe-area-context';
import UserScreenLayout from "./UserBottomStackNavigation";
import { UserState } from "../redux/features/useSlice";
import { useAppSelector } from "../redux/hooks";
import AdminScreenLayout from "./AdminBottomTagNavigation";
import DoctorScreenLayout from "./DoctotBottomTagNav";

const Stack = createNativeStackNavigator<RootStackParamList>();





const Root = () => {
    const insets = useSafeAreaInsets();

    const { isLogin, isFirst, user} = useAppSelector(UserState)

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



                        {!isLogin && !isFirst ? <Stack.Group screenOptions={
                            {
                                headerTintColor: "#0665CB", headerLargeTitleStyle: { color: "#0665CB" },
                                headerTitleStyle: { color: "#0665CB", fontWeight: "bold", fontFamily: "avenir" },
                                // headerBackVisible: false,
                                headerShadowVisible: false
                            }
                        }>
                            <Stack.Screen name="Authenticateuser" component={AuthUser}
                                options={{ title: "Welcome back" }}
                            />
                            <Stack.Screen name="Signup" component={Signup}
                                options={{ title: "Set up your profile" }}
                            />

                            <Stack.Screen name="ConfirmUser" component={ConfirmUser} options={{ title: "Confirm Your Email" }} />
                            <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ title: "Forgot password" }} />
                            <Stack.Screen name="ConfirmForgotPassword" component={ConfirmForgotPassword} options={{ title: "Reset password" }} />
                        </Stack.Group>
                            :

                            <>
                                {/* user home */}
                                {user.role[0] === "isUser" && <Stack.Group>

                                    <Stack.Group>
                                        <Stack.Screen name="User" component={UserScreenLayout}
                                                      options={{headerShown: false}}/>
                                        <Stack.Screen name="UserHealthDetail" component={UserHealthDetail}
                                                      options={{headerShown: false}}/>
                                        <Stack.Screen name="Questionnaire" component={Questionnaire}
                                                      options={{
                                                          title: "AI Questionnaire",
                                                          headerTitleAlign: "center",
                                                          headerTintColor: "#0665CB",
                                                      }}
                                        />
                                        <Stack.Screen name="ConfirmAppointment" component={ConfirmAppointment}
                                                      options={{headerShown: false}}/>
                                    </Stack.Group>

                                    {/* user profile */}
                                    <Stack.Group
                                        screenOptions={{headerTitleAlign: "center", headerTintColor: "#0665CB",}}>
                                        {/* <Stack.Screen name="Account" component={Editprofile}/>
                                        <Stack.Screen name="Password" component={Changepassword}/>
                                        <Stack.Screen name="HelpandSupport" component={HelpandSupport}
                                                      options={{title: "Help & Support"}}/>
                                        <Stack.Screen name="Support" component={Support}
                                                      options={{title: "Ongoing support"}}/> */}

                                        <Stack.Screen name="Subscribe" component={Subscribe}
                                                      options={{title: "Subscribe"}}/>
                                        <Stack.Screen name="ConfirmSubscription" component={ConfirmSubscription}
                                                      options={{headerShown: false}}/>

                                    </Stack.Group>

                                    {/* user consultation */}
                                    <Stack.Group
                                        screenOptions={{headerTitleAlign: "center", headerTintColor: "#0665CB",}}>
                                        <Stack.Screen name="Consultationappointment" component={Consultationappointment}
                                                      options={{title: "Book Appointment"}}/>
                                        <Stack.Screen name="Consultationcheckout" component={Consultationcheckout}
                                                      options={{title: "Checkout"}}/>

                                    </Stack.Group>

                                </Stack.Group>}


                                {/*user end*/}


                                {/*Admin screen start*/}
                                {user.role[0] === "isAdmin" && <Stack.Group>
                                    <Stack.Screen name="Admin" component={AdminScreenLayout}
                                                  options={{headerShown: false}}
                                    />
                                    <Stack.Screen name="Confirmremoveuser" component={Confirmremoveuser}
                                                  options={{headerShown: false}}/>

                                    <Stack.Screen name="Admindoctorsuccess" component={Admindoctorsuccess}
                                                  options={{headerShown: false}}/>


                                    <Stack.Group
                                        screenOptions={{headerTitleAlign: "center", headerTintColor: "#0665CB",}}>
                                        <Stack.Screen name="AdminUserprofile" component={AdminUserprofile}
                                                      options={{title: "User profile"}}/>

                                        <Stack.Screen name="AdminDoctorprofile" component={AdminDoctorprofile}
                                                      options={{title: "Doctor profile"}}/>

                                        <Stack.Screen name="AdminEditprofile" component={AdminEditprofile}
                                                      options={{title: "Account"}}/>

                                        <Stack.Screen name="AdminChangepassword" component={AdminChangepassword}
                                                      options={{title: "Password"}}/>

                                        <Stack.Screen name="AdminSupport" component={AdminSupport}
                                                      options={{title: "Support"}}/>

                                    </Stack.Group>
                                </Stack.Group>}


                                {/* DoctorScreenLayout */}
                                {user.role[0] === "isDoctor" && <Stack.Group
                                screenOptions={{headerTitleAlign: "center", headerTintColor: "#0665CB",}}
                                >
                                <Stack.Screen name="Doctor" component={DoctorScreenLayout}
                                                  options={{headerShown: false}}
                                    />

<Stack.Screen name="DoctorAppointments" component={DoctorAppointments}
                                                      options={{title: "Appointments"}}/>
<Stack.Screen name="Doctorearnings" component={Doctorearnings}
                                                      options={{title: "Earnings"}}/>
                                                      
<Stack.Screen name="CreateDoctorSchedule" component={CreateDoctorSchedule}
                                                      options={{title: "Create free time"}}/>

<Stack.Screen name="Doctorviewuser" component={Doctorviewuser}
                                                      options={{title: "User profile"}}/>





                                </Stack.Group>}



                                <Stack.Group
                                        screenOptions={{headerTitleAlign: "center", headerTintColor: "#0665CB",}}>
                                        <Stack.Screen name="Account" component={Editprofile}/>
                                        <Stack.Screen name="Password" component={Changepassword}/>
                                        <Stack.Screen name="HelpandSupport" component={HelpandSupport}
                                                      options={{title: "Help & Support"}}/>
                                        <Stack.Screen name="Support" component={Support}
                                                      options={{title: "Ongoing support"}}/>
                                                      
                                        <Stack.Screen name="BankDetails" component={BankDetails}
                                                                    options={{title: "Bank Details"}}/>
                                        {/* 
                                        <Stack.Screen name="ConfirmSubscription" component={ConfirmSubscription}
                                                      options={{headerShown: false}}/> */}

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

