import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { ApplicationComponentsScreen } from "../screens"

// NOTE: Potentially create a new index.tsx screen in the dispensary workflow that will export all the screens
import Dashboard from "../screens/dispensary-workflow/Dashboard"

import PatientIntake from "../screens/dispensary-workflow/PatientIntake"
import FurtherQuestions from "../screens/dispensary-workflow/FurtherQuestions"
// import FurtherAssessment from "../screens/ctc-workflow/FurtherAssessment"
import { FeedbackScreen as Feedback } from "../screens/feedback-screen"
import SystemAssessment from "../screens/dispensary-workflow/SystemAssessment"
import AssessmentSummary from "../screens/dispensary-workflow/AssessmentSummary"
import AssessmentFeedback from "../screens/dispensary-workflow/AssessmentFeedback"
import CTCAuthenticator from "../screens/ctc-workflow/CTCAuthenicator"
import { useAuthenticationStore } from "../models/ctc-store"
import PresentingSymptoms from "../screens/dispensary-workflow/PresentingSymptoms"

type dispensaryParamList = {
    "dispensary.Dashboard": undefined
    "dispensary.PatientIntake": undefined
    "dispensary.FurtherQuestions": undefined
    "dispensary.PresentingSymptoms": undefined
    "dispensary.SystemAssessment": undefined
    "dispensary.AssessmentSummary": undefined
    "dispensary.AssessmentFeedback": undefined
    "dispensary.CTCAuthenticator": undefined
    "dispensary.Feedback": undefined
    "application-components": undefined
}

const Stack = createNativeStackNavigator<dispensaryParamList>()

const dispensaryNavigator = () => {
    const authStore = useAuthenticationStore()

    if (!authStore.authenticated) {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                }}
                initialRouteName="dispensary.CTCAuthenticator"
            >
                <Stack.Screen
                    options={{ title: "Authenticator" }}
                    name="dispensary.CTCAuthenticator"
                    component={CTCAuthenticator}
                />
            </Stack.Navigator>
        )
    }

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="dispensary.Dashboard"
        >
            <Stack.Screen name="dispensary.Dashboard" component={Dashboard} />
            <Stack.Screen name="dispensary.PatientIntake" component={PatientIntake} />
            <Stack.Screen name="dispensary.PresentingSymptoms" component={PresentingSymptoms} />
            <Stack.Screen name="dispensary.SystemAssessment" component={SystemAssessment} />
            <Stack.Screen name="dispensary.FurtherQuestions" component={FurtherQuestions} />
            <Stack.Screen name="dispensary.AssessmentSummary" component={AssessmentSummary} />
            <Stack.Screen name="dispensary.AssessmentFeedback" component={AssessmentFeedback} />
            <Stack.Screen name="dispensary.Feedback" component={Feedback} />
        </Stack.Navigator>
    )
}

export { dispensaryNavigator }
