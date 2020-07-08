import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import {
    PhoneAuthScreen,
    WelcomeScreen,
    DemoScreen,
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
} from "../screens"
import { PrimaryParamList } from "./types"

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="dashboard"
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
