import React,{useEffect,useState} from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import auth from '@react-native-firebase/auth';

import {
    PhoneAuthScreen,
    AppointmentsListScreen,
    AppointmentExtendedScreen,
    Covid19PresentationScreen,
    AssessmentQuestionsScreen,
    AssessmentResultsScreen,
    HospitalRecommendationScreen,
    FollowUpRegistrationScreen,
    CompletedReferralScreen,
    CompletedFollowUpSubscriptionScreen,
    AppointmentPersonScreen,
    DashboardScreen,
    FeedbackScreen,
    ClientPresentScreen,
    SymptomAssessmentScreen,
    AssessmentSummaryScreen,
    ClientFeedbackScreen,
    DiseaseLibraryScreen,
    CtcQrcodeScanScreen,
    CtcNewPatientScreen,
    CtcPatientAssessmentScreen,
    CtcAssessmentQuestionsScreen,
    CtcAssessmentSummaryScreen,
    CtcAssessmentFeedbackScreen
} from "../screens"
import { PrimaryParamList } from "./types"

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {

     // Set an initializing state whilst Firebase connects
//   const [initializing, setInitializing] = useState(true);
//   const [user, setUser] = useState();

//   // Handle user state changes
//   function onAuthStateChanged(user) {
//     setUser(user);
//     console.log("User is Logged in here ",user)
//     if (initializing) setInitializing(false);
//   }

//   useEffect(() => {
//     const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
//     return subscriber; // unsubscribe on unmount
//   }, []);

//   if (initializing) return null;

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="phone-auth"
        >
            <Stack.Screen name="phone-auth" component={PhoneAuthScreen} />
            <Stack.Screen name="dashboard" component={DashboardScreen} />
            <Stack.Screen name="appointments-list" component={AppointmentsListScreen} />
            <Stack.Screen name="appointment-extended" component={AppointmentExtendedScreen} />
            <Stack.Screen name="appointment-person" component={AppointmentPersonScreen} />
            <Stack.Screen name="respiratory-presentation" component={Covid19PresentationScreen} />
            <Stack.Screen name="assessment-questions" component={AssessmentQuestionsScreen} />
            <Stack.Screen name="assessment-results" component={AssessmentResultsScreen} />
            <Stack.Screen name="hospital-recommendation" component={HospitalRecommendationScreen} />
            <Stack.Screen name="follow-up-registration" component={FollowUpRegistrationScreen} />
            <Stack.Screen name="completed-referral" component={CompletedReferralScreen} />
            <Stack.Screen name="feedback" component={FeedbackScreen} />
            <Stack.Screen name="client-present" component={ClientPresentScreen} />
            <Stack.Screen name="symptom-assessment" component={SymptomAssessmentScreen} />
            <Stack.Screen name="assessment-summary" component={AssessmentSummaryScreen} />
            <Stack.Screen name="client-feedback" component={ClientFeedbackScreen} />
            <Stack.Screen name="disease-library" component={DiseaseLibraryScreen} />

            {/* CTC WORKFLOW SCREENS  */}
            <Stack.Screen name="ctc-qrcode-scan-screen" component={CtcQrcodeScanScreen} />
            <Stack.Screen name="ctc-new-patient-screen" component={CtcNewPatientScreen} />
            <Stack.Screen name="ctc-assessment-screen" component={CtcPatientAssessmentScreen} />
            <Stack.Screen name="ctc-assessment-questions-screen" component={CtcAssessmentQuestionsScreen} />

            <Stack.Screen name="ctc-assessment-summary-screen" component={CtcAssessmentSummaryScreen} />
            <Stack.Screen name="ctc-assessment-feedback-screen" component={CtcAssessmentFeedbackScreen} />

            
            <Stack.Screen
                name="completed-follow-up-subscription"
                component={CompletedFollowUpSubscriptionScreen}
            />
            {/* <Stack.Screen name="welcome" component={WelcomeScreen} /> */}
        </Stack.Navigator>
    )
}

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 */
export const exitRoutes: string[] = ["welcome"]

// TODO: Make a new "home" route that is called by different permission levels and just renders the correct home page
