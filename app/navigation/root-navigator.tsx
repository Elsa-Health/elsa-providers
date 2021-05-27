import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"

// import { createNativeStackNavigator } from "react-native-screens/native-stack"
// import { RootParamList } from "./types"
// import { PrimaryNavigator } from "./primary-navigator"
// import { CTCNavigator } from "./ctc-navigation"
import { ADDONavigator } from "./addo-navigation"
// import { dispensaryNavigator } from "./dispensary-navigation"
// import { CWNavigator } from "./child-wellbeing-navigation"
// import { authNavigator } from "./auth-navigation"

// const Stack = createNativeStackNavigator<RootParamList>()



export const RootNavigator = React.forwardRef<
    NavigationContainerRef,
    Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
    return (
        <NavigationContainer {...props} ref={ref}>
            <ADDONavigator />
        </NavigationContainer>
    )
})

RootNavigator.displayName = "RootNavigator"
