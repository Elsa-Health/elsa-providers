import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { ApplicationComponentsScreen } from "../screens"

// NOTE: Potentially create a new index.tsx screen in the ctc workflow that will export all the screens
import Dashboard from "../screens/ctc-workflow/Dashboard"
import VisitType from "../screens/ctc-workflow/VisitType"

type CTCParamList = {
    "ctc.Dashboard": undefined
    "ctc.VisitType": undefined
    "application-components": undefined
}

const Stack = createNativeStackNavigator<CTCParamList>()

const CTCNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="ctc.Dashboard"
        >
            <Stack.Screen name="application-components" component={ApplicationComponentsScreen} />
            <Stack.Screen name="ctc.Dashboard" component={Dashboard} />
            <Stack.Screen name="ctc.VisitType" component={VisitType} />
        </Stack.Navigator>
    )
}

export { CTCNavigator }
