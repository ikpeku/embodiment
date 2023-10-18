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

    ConfirmUser: { id: string, email: string };
    ForgotPassword: { email: string };
    ConfirmForgotPassword: { email: string };
    UserHealthDetail: { id: string }
    Questionnaire: { id: string }
    ConfirmAppointment: undefined,
    Account: undefined;
    Password: undefined;
    HelpandSupport: undefined;
    Support: undefined;
    Subscribe: undefined;
    ConfirmSubscription: undefined;

    // consultation screen
    Consultationappointment: { id: string }
    Consultationcheckout: {
        appointmentId: string,
        startTime: string,
        // patientId: string,
        doctorId: string,
        routeId: string,
        startDate: string | undefined
    },


    // Admin Screens
    AdminUserprofile: { id: string };
    Confirmremoveuser: undefined,
    AdminDoctorprofile: { id: string };
    Admindoctorsuccess: { type: "remove" | "invite" }
    AdminEditprofile: undefined;
    AdminChangepassword: undefined;
    AdminSupport: undefined;
    AdminQuestionandanswer: { id: string }


    // Doctors screens
    DoctorAppointments: undefined
    Doctorearnings: undefined
    CreateDoctorSchedule: { index: number }
    Doctorviewuser: { id: string, scheduleId: string, status: "Completed" | "Booked" }
    BankDetails: undefined

    // 
    ConfirmappiontmentBook: undefined
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


// user Screen

export type ConsultationappointmentScreenProps = NativeStackNavigationProp<RootStackParamList, "Consultationappointment">
export type ConsultationcheckoutScreenProps = NativeStackNavigationProp<RootStackParamList, "Consultationcheckout">
export type ConfirmappiontmentBookScreenProps = NativeStackNavigationProp<RootStackParamList, "ConfirmappiontmentBook">


// doctor screen
export type DoctorAppointmentsScreenProps = NativeStackNavigationProp<RootStackParamList, "DoctorAppointments">
export type CreateDoctorScheduleScreenProps = NativeStackNavigationProp<RootStackParamList, "CreateDoctorSchedule">
export type DoctorviewuserScreenProps = NativeStackNavigationProp<RootStackParamList, "Doctorviewuser">


// Admin Screen
export type AdminQuestionandanswerScreenProps = NativeStackNavigationProp<RootStackParamList, "AdminQuestionandanswer">


// auth screen
export type ConfirmUserRouteProp = RouteProp<RootStackParamList, "ConfirmUser">


export type CreateDoctorScheduleRouteProp = RouteProp<RootStackParamList, "CreateDoctorSchedule">

export type ForgotPasswordRouteProp = RouteProp<RootStackParamList, "ForgotPassword">
export type ConfirmForgotPasswordRouteProp = RouteProp<RootStackParamList, "ConfirmForgotPassword">
export type UserHealthDetailRouteProp = RouteProp<RootStackParamList, "UserHealthDetail">
export type QuestionnairelRouteProp = RouteProp<RootStackParamList, "Questionnaire">

export type AdminUserprofileRouteProp = RouteProp<RootStackParamList, "AdminUserprofile">
export type AdminQuestionandanswerRouteProp = RouteProp<RootStackParamList, "AdminQuestionandanswer">

export type AdminConfirmremoveuserRouteProp = RouteProp<RootStackParamList, "Confirmremoveuser">
export type AdmindoctorsuccessRouteProp = RouteProp<RootStackParamList, "Admindoctorsuccess">
export type AdminDoctorprofileRouteProp = RouteProp<RootStackParamList, "AdminDoctorprofile">


// user route
export type ConsultationappointmentRouteProp = RouteProp<RootStackParamList, "Consultationappointment">
export type ConsultationcheckoutRouteProp = RouteProp<RootStackParamList, "Consultationcheckout">


// doctor
export type DoctorviewuserRouteProps = RouteProp<RootStackParamList, "Doctorviewuser">






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
export type UserConsultationScreenProp = BottomTabNavigationProp<UserRootBottomStackParamList, "Consultation">



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


