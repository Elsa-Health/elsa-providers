import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { ApplicationComponentsScreen, PhoneAuthScreen } from "../screens"

type AuthParamList = {
    phoneAuth: undefined
    "application-components": undefined
}

const Stack = createNativeStackNavigator<AuthParamList>()

const authNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="phoneAuth"
        >
            <Stack.Screen name="phoneAuth" component={PhoneAuthScreen} />
            <Stack.Screen name="application-components" component={ApplicationComponentsScreen} />
        </Stack.Navigator>
    )
}

export { authNavigator }
