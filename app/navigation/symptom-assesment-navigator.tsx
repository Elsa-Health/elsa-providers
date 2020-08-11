// IGNORED;
// TODO: To be deleted
import React from "react"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { PhoneAuthScreen, AppointmentExtendedScreen } from "../screens"
import { PrimaryParamList } from "./types"

const Stack = createNativeStackNavigator<PrimaryParamList>()

export function PrimaryNavigator() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="phone-auth"
        >
            <Stack.Screen name="phone-auth" component={PhoneAuthScreen} />
            <Stack.Screen name="appointment-extended" component={AppointmentExtendedScreen} />
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
