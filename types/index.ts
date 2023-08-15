import { CompositeNavigationProp, RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

export type RootStackParamList = {
    Authenticateuser: undefined;
    Signup: undefined;
    Onboarding: undefined;
    User: undefined;
    Doctor: undefined;
    Admin: undefined;

    ConfirmUser: { id: string };
    ForgotPassword: { email: string };
    ConfirmForgotPassword: { email: string };
    UserHealthDetail: { id: number }
    Questionnaire: { id: number }
    ConfirmAppointment: undefined,
    Account: undefined;
    Password: undefined;
    HelpandSupport: undefined;
    Support: undefined;
    Subscribe: undefined;
    ConfirmSubscription: undefined;

    // consultation screen
    Consultationappointment: { id: string }
    Consultationcheckout: undefined,


    // Admin Screens
    AdminUserprofile: { id: string };
    Confirmremoveuser: undefined,
    AdminDoctorprofile: { id: string };
    Admindoctorsuccess: { type: "remove" | "invite" }
    AdminEditprofile: undefined;
    AdminChangepassword: undefined;
    AdminSupport: undefined;


    // Doctors screens
    DoctorAppointments: undefined
    Doctorearnings: undefined
    CreateDoctorSchedule: undefined
    Doctorviewuser: { id: string }
    BankDetails: undefined
};


export type OnboardingScreenProps = NativeStackNavigationProp<RootStackParamList, "Onboarding">
export type AuthenticateuserScreenProps = NativeStackNavigationProp<RootStackParamList, "Authenticateuser">
export type ConfirmForgotPasswordScreenProps = NativeStackNavigationProp<RootStackParamList, "ConfirmForgotPassword">
export type ForgotPasswordScreenProps = NativeStackNavigationProp<RootStackParamList, "ForgotPassword">
export type UserHealthDetailScreenProps = NativeStackNavigationProp<RootStackParamList, "UserHealthDetail">
export type ConfirmAppointmentScreenProps = NativeStackNavigationProp<RootStackParamList, "ConfirmAppointment">
export type QuestionnaireScreenProps = NativeStackNavigationProp<RootStackParamList, "Questionnaire">
export type AccountScreenProps = NativeStackNavigationProp<RootStackParamList, "Account">
export type SupportScreenProps = NativeStackNavigationProp<RootStackParamList, "Support">
export type SubscribeScreenProps = NativeStackNavigationProp<RootStackParamList, "Subscribe">

export type DoctorAppointmentsScreenProps = NativeStackNavigationProp<RootStackParamList, "DoctorAppointments">
export type CreateDoctorScheduleScreenProps = NativeStackNavigationProp<RootStackParamList, "CreateDoctorSchedule">
export type DoctorviewuserScreenProps = NativeStackNavigationProp<RootStackParamList, "Doctorviewuser">


// auth screen
export type ConfirmUserRouteProp = RouteProp<RootStackParamList, "ConfirmUser">



export type ForgotPasswordRouteProp = RouteProp<RootStackParamList, "ForgotPassword">
export type ConfirmForgotPasswordRouteProp = RouteProp<RootStackParamList, "ConfirmForgotPassword">
export type UserHealthDetailRouteProp = RouteProp<RootStackParamList, "UserHealthDetail">
export type QuestionnairelRouteProp = RouteProp<RootStackParamList, "Questionnaire">

export type AdminUserprofileRouteProp = RouteProp<RootStackParamList, "AdminUserprofile">

export type AdminConfirmremoveuserRouteProp = RouteProp<RootStackParamList, "Confirmremoveuser">
export type AdmindoctorsuccessRouteProp = RouteProp<RootStackParamList, "Admindoctorsuccess">
export type AdminDoctorprofileRouteProp = RouteProp<RootStackParamList, "AdminDoctorprofile">






// user bottom stack navigation

export type UserRootBottomStackParamList = {
    Home: undefined;
    Consultation: undefined;
    Notifications: undefined;
    Profile: undefined;
    Orders: undefined;

}
export type UserHomeScreenProp = BottomTabNavigationProp<UserRootBottomStackParamList, "Home">
export type UserProfileScreenProp = BottomTabNavigationProp<UserRootBottomStackParamList, "Profile">



// Doctor Screen
// user bottom stack navigation

export type DoctorRootBottomStackParamList = {
    Home: undefined;
    Schedule: undefined;
    Notifications: undefined;
    Profile: undefined;
}

// export type UserHomeScreenProp = BottomTabNavigationProp<UserRootBottomStackParamList, "Home">
// export type UserProfileScreenProp = BottomTabNavigationProp<UserRootBottomStackParamList, "Profile">





// Admin 
export type AdminRootBottomStackParamList = {
    Home: undefined,
    Adminusers: undefined,
    Admindoctor: undefined,
    Questionnaires: undefined,
    Appointments: undefined,
    AdminProfile: undefined
}

export type AdminHomeScreenProp = BottomTabNavigationProp<AdminRootBottomStackParamList, "Home">
// export type AdminProfileScreenProp = BottomTabNavigationProp<AdminRootBottomStackParamList, "AdminProfile">


export type AdminusersScreenNavigationProp = CompositeNavigationProp<
    BottomTabNavigationProp<AdminRootBottomStackParamList, 'Admindoctor'>,
    NativeStackNavigationProp<RootStackParamList>
>;

// export type AdminProfileScreenNavigationProp = CompositeNavigationProp<
//     BottomTabNavigationProp<AdminRootBottomStackParamList, 'AdminProfile'>,
//     CompositeNavigationProp<UserRootBottomStackParamList, "Profile" >
//     NativeStackNavigationProp<RootStackParamList> >



// AccountScreenProps


