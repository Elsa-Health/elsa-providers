import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { ApplicationComponentsScreen } from "../screens"

// NOTE: Potentially create a new index.tsx screen in the ctc workflow that will export all the screens
import Dashboard from "../screens/ctc-workflow/Dashboard"
import VisitType from "../screens/ctc-workflow/VisitType"
import ScanQRCode from "../screens/ctc-workflow/ScanQRCode"
import PatientVisit from "../screens/ctc-workflow/PatientVisist"
import PatientNewVisit from "../screens/ctc-workflow/PatientNewVisit"
import { useRoute } from "@react-navigation/native"
import { useRouteStore } from "../stores"

type CTCParamList = {
    "ctc.Dashboard": undefined
    "ctc.VisitType": undefined
    "ctc.ScanQRCode": undefined
    "ctc.PatientVisit": undefined
    "ctc.PatientNewVisit": undefined
    "application-components": undefined
}

const Stack = createNativeStackNavigator<CTCParamList>()

const CTCNavigator = () => {
    // console.log("Rendering CTC Stack")
    const routeStore = useRouteStore()

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="application-components"
        >
            <Stack.Screen name="application-components" component={ApplicationComponentsScreen} />
            <Stack.Screen name="ctc.Dashboard" component={Dashboard} />
            <Stack.Screen name="ctc.VisitType" component={VisitType} />
            <Stack.Screen name="ctc.ScanQRCode" component={ScanQRCode} />
            <Stack.Screen name="ctc.PatientVisit" component={PatientVisit} />
            <Stack.Screen name="ctc.PatientNewVisit" component={PatientNewVisit} />
        </Stack.Navigator>
    )
}

export { CTCNavigator }
