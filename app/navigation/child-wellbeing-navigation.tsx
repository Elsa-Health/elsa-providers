import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { ApplicationComponentsScreen } from "../screens"

// NOTE: Potentially create a new index.tsx screen in the child wellness workflow that will export all the screens
import FormConsistency from "../screens/child-wellness-workflow/form-consistency-screen"
import VisualMotorProcessing from "../screens/child-wellness-workflow/visual-motor-processing-screen"

type CWParamList = {
    "cw.FormConsistency": undefined
    "cw.VisualMotorProcessing": undefined
}

const Stack = createNativeStackNavigator<CWParamList>()

const CWNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="cw.FormConsistency"
        >
            <Stack.Screen name="cw.FormConsistency" component={FormConsistency} />
            <Stack.Screen name="cw.VisualMotorProcessing" component={VisualMotorProcessing} />
        </Stack.Navigator>
    )
}

export { CWNavigator }
