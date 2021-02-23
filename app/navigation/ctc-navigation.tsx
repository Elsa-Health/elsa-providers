import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { ApplicationComponentsScreen, FeedbackScreen } from "../screens"

// NOTE: Potentially create a new index.tsx screen in the ctc workflow that will export all the screens
import Dashboard from "../screens/ctc-workflow/Dashboard"
import VisitType from "../screens/ctc-workflow/VisitType"
import ScanQRCode from "../screens/ctc-workflow/ScanQRCode"
import PatientVisit from "../screens/ctc-workflow/PatientVisist"
import PresentingSymptoms from "../screens/ctc-workflow/PresentingSymptoms"
import PatientInformationManager from "../screens/ctc-workflow/PatientInformationManager"
import AdherenceAssessment from "../screens/ctc-workflow/AdherenceAssessment"
// import AdherenceSummary from "../screens/ctc-workflow/AdherenceSummary"
import MedicationOnlyVisit from "../screens/ctc-workflow/MedicationOnlyVisit"
import TreatmentOptions from "../screens/ctc-workflow/TreatmentOptions"
import Counseling from "../screens/ctc-workflow/Counseling"
import PatientFile from "../screens/ctc-workflow/PatientFile"
import ManagePatientVisit from "../screens/ctc-workflow/ManagePatientVisit"
import SystemAssessment from "../screens/ctc-workflow/SystemAssessment"
import FurtherAssessment from "../screens/ctc-workflow/FurtherAssessment"
import AssessmentSummary from "../screens/ctc-workflow/AssessmentSummary"
import TestRecommendations from "../screens/ctc-workflow/TestRecommendations"
import { useAuthenticationStore } from "../models/ctc-store"
import CTCAuthenticator from "../screens/ctc-workflow/CTCAuthenicator"

// import { useRouteStore } from "../stores"

type CTCParamList = {
    "ctc.Dashboard": undefined
    "ctc.VisitType": undefined
    "ctc.ScanQRCode": {
        nextRouteName: string
    }
    "ctc.PatientVisit": undefined
    "ctc.PresentingSymptoms": undefined
    "ctc.SystemAssessment": undefined
    "ctc.FurtherAssessment": undefined
    "ctc.PatientInformationManager": undefined
    "ctc.AdherenceAssessment": undefined
    "ctc.AssessmentSummary": undefined
    "ctc.AdherenceSummary": undefined
    "ctc.MedicationOnlyVisit": undefined
    "ctc.TreatmentOptions": undefined
    "ctc.TestRecommendations": undefined
    "ctc.Counseling": undefined
    "ctc.PatientFile": undefined
    "ctc.ManagePatientVisit": undefined
    "ctc.CTCAuthenticator": undefined
    "ctc.Feedback": undefined
    "application-components": undefined
}

const Stack = createNativeStackNavigator<CTCParamList>()

const CTCNavigator = () => {
    // console.log("Rendering CTC Stack")
    // const routeStore = useRouteStore()
    const authStore = useAuthenticationStore()

    if (!authStore.authenticated) {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                }}
                initialRouteName="ctc.CTCAuthenticator"
            >
                <Stack.Screen
                    options={{ title: "Authenticator" }}
                    name="ctc.CTCAuthenticator"
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
            initialRouteName="ctc.Dashboard"
        >
            <Stack.Screen name="ctc.Dashboard" component={Dashboard} />
            <Stack.Screen name="application-components" component={ApplicationComponentsScreen} />
            <Stack.Screen name="ctc.VisitType" component={VisitType} />
            <Stack.Screen name="ctc.ScanQRCode" component={ScanQRCode} />
            <Stack.Screen name="ctc.PatientVisit" component={PatientVisit} />
            <Stack.Screen name="ctc.PresentingSymptoms" component={PresentingSymptoms} />
            <Stack.Screen name="ctc.SystemAssessment" component={SystemAssessment} />
            <Stack.Screen name="ctc.FurtherAssessment" component={FurtherAssessment} />
            <Stack.Screen
                name="ctc.PatientInformationManager"
                component={PatientInformationManager}
            />
            <Stack.Screen name="ctc.AdherenceAssessment" component={AdherenceAssessment} />
            <Stack.Screen name="ctc.AssessmentSummary" component={AssessmentSummary} />
            {/* <Stack.Screen name="ctc.AdherenceSummary" component={AdherenceSummary} /> */}
            <Stack.Screen name="ctc.MedicationOnlyVisit" component={MedicationOnlyVisit} />
            <Stack.Screen name="ctc.TreatmentOptions" component={TreatmentOptions} />
            <Stack.Screen name="ctc.Counseling" component={Counseling} />
            <Stack.Screen name="ctc.TestRecommendations" component={TestRecommendations} />
            <Stack.Screen name="ctc.PatientFile" component={PatientFile} />
            <Stack.Screen name="ctc.ManagePatientVisit" component={ManagePatientVisit} />
            <Stack.Screen name="ctc.Feedback" component={FeedbackScreen} />
        </Stack.Navigator>
    )
}

export { CTCNavigator }
