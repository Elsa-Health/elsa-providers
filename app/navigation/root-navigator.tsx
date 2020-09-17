import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"

import { createNativeStackNavigator } from "react-native-screens/native-stack"
import { RootParamList } from "./types"
import { PrimaryNavigator } from "./primary-navigator"
import { CTCNavigator } from "./ctc-navigation"
import { ADDONavigator } from "./addo-navigation"
import { dispensaryNavigator } from "./dispensary-navigation"
import { StatusBar } from "react-native"
import { authNavigator } from "./auth-navigation"

const Stack = createNativeStackNavigator<RootParamList>()

const RootStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,

                stackPresentation: "modal",
            }}
        >
            {/* Route for the Dispensary */}
            <Stack.Screen
                name="authStack"
                component={authNavigator}
                options={{
                    headerShown: false,
                }}
            />

            {/* Route for the Dispensary */}
            <Stack.Screen
                name="dispensaryStack"
                component={dispensaryNavigator}
                options={{
                    headerShown: false,
                }}
            />

            {/* Route for the ADDO */}
            <Stack.Screen
                name="ADDOStack"
                component={ADDONavigator}
                options={{
                    headerShown: false,
                }}
            />

            {/* Route for the CTC */}
            <Stack.Screen
                name="CTCStack"
                component={CTCNavigator}
                options={{
                    headerShown: false,
                }}
            />

            <Stack.Screen
                name="primaryStack"
                component={PrimaryNavigator}
                options={{
                    headerShown: false,
                }}
            />
        </Stack.Navigator>
    )
}

export const RootNavigator = React.forwardRef<
    NavigationContainerRef,
    Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
    return (
        <NavigationContainer {...props} ref={ref}>
            <RootStack />
        </NavigationContainer>
    )
})

RootNavigator.displayName = "RootNavigator"
