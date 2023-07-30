import { RouteProp } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs"

export type RootStackParamList = {
    Authenticateuser: undefined;
    Onboarding: undefined;
    User: undefined;
    Doctor: undefined;
    Admin: undefined;
    ConfirmUser: undefined;
    ForgotPassword: { email: string };
    ConfirmForgotPassword: { email: string };
    UserHealthDetail: { id: number }
    Questionnaire: { id: number }
    ConfirmAppointment: undefined,
    Account: undefined;
    Password: undefined;
    HelpandSupport: undefined;
    Support: undefined;
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


export type ForgotPasswordRouteProp = RouteProp<RootStackParamList, "ForgotPassword">
export type ConfirmForgotPasswordRouteProp = RouteProp<RootStackParamList, "ConfirmForgotPassword">
export type UserHealthDetailRouteProp = RouteProp<RootStackParamList, "UserHealthDetail">
export type QuestionnairelRouteProp = RouteProp<RootStackParamList, "Questionnaire">



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
