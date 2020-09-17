import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { ApplicationComponentsScreen } from "../screens"

// NOTE: Potentially create a new index.tsx screen in the ctc workflow that will export all the screens
import Dashboard from "../screens/addo-workflow/Dashboard"

type CTCParamList = {
    "addo.Dashboard": undefined
    "addo.VisitType": undefined
    "application-components": undefined
}

const Stack = createNativeStackNavigator<CTCParamList>()

const ADDONavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="addo.Dashboard"
        >
            <Stack.Screen name="application-components" component={ApplicationComponentsScreen} />
            <Stack.Screen name="addo.Dashboard" component={Dashboard} />
        </Stack.Navigator>
    )
}

export { ADDONavigator }
