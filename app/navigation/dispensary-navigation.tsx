import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { ApplicationComponentsScreen } from "../screens"

// NOTE: Potentially create a new index.tsx screen in the dispensary workflow that will export all the screens
import Dashboard from "../screens/dispensary-workflow/Dashboard"

type dispensaryParamList = {
    "dispensary.Dashboard": undefined
    "dispensary.VisitType": undefined
    "application-components": undefined
}

const Stack = createNativeStackNavigator<dispensaryParamList>()

const dispensaryNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="dispensary.Dashboard"
        >
            <Stack.Screen name="application-components" component={ApplicationComponentsScreen} />
            <Stack.Screen name="dispensary.Dashboard" component={Dashboard} />
        </Stack.Navigator>
    )
}

export { dispensaryNavigator }
