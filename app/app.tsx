// Welcome to the main entry point of the app.
//
// In this file, we'll be kicking off our app or storybook.

import "./i18n"
import React, { useState, useEffect, useRef } from "react"
import { YellowBox } from "react-native"
import { NavigationContainerRef } from "@react-navigation/native"
import { contains } from "ramda"
import { enableScreens } from "react-native-screens"
import { SafeAreaProvider, initialWindowSafeAreaInsets } from "react-native-safe-area-context"
import EStyleSheet from "react-native-extended-stylesheet"
import { Provider as PaperProvider, DefaultTheme } from "react-native-paper"
import auth from "@react-native-firebase/auth"
import firestore from "@react-native-firebase/firestore"

import { RootNavigator, exitRoutes, setRootNavigation } from "./navigation"
import { useBackButtonHandler } from "./navigation/use-back-button-handler"
import { RootStore, RootStoreProvider, setupRootStore, initialUser } from "./models/root-store"
import * as storage from "./utils/storage"
import getActiveRouteName from "./navigation/get-active-routename"
import { color } from "./theme"

function authListener(rootStore: RootStore) {
    auth().onAuthStateChanged((user) => {
        if (user) {
            firestore()
                .collection("providers")
                .doc(user.uid)
                .onSnapshot((snap) => {
                    if (snap.exists) {
                        const user = { id: snap.id, ...snap.data() }
                        rootStore.account.setUser({
                            ...initialUser,
                            ...user,
                            loading: false,
                            authenticated: true,
                        })

                        // @ts-ignore
                        if (user.role === "clinician") {
                            // @ts-ignore
                            rootStore.loadCenterAppointments(user.hospitalId)
                        }
                        // setAccount()
                        // self.loading = false
                        // console.log("USER: ", user)
                        // self = { ...initialUser, ...user, loading: false }
                    } else {
                        rootStore.account.setUser({
                            ...initialUser,
                            loading: false,
                            authenticated: false,
                        })
                        auth().signOut()
                    }
                })
        } else {
            rootStore.account.setUser({ ...initialUser, loading: false, authenticated: false })
        }
    })
}

const theme = {
    ...DefaultTheme,
    roundness: 5,
    colors: {
        ...DefaultTheme.colors,
        primary: color.primary,
        accent: color.primary, // made this wa to allow the FAB to be primary color
    },
}

// Initialize the extended-stylesheets
EStyleSheet.build({
    // always call EStyleSheet.build() even if you don't use global variables!
    // $textColor: "#0275d8",
})

// This puts screens in a native ViewController or Activity. If you want fully native
// stack navigation, use `createNativeStackNavigator` in place of `createStackNavigator`:
// https://github.com/kmagiera/react-native-screens#using-native-stack-navigator
enableScreens()

/**
 * Ignore some yellowbox warnings. Some of these are for deprecated functions
 * that we haven't gotten around to replacing yet.
 */
YellowBox.ignoreWarnings([
    "componentWillMount is deprecated",
    "componentWillReceiveProps is deprecated",
    "Require cycle:",
])

/**
 * Are we allowed to exit the app?  This is called when the back button
 * is pressed on android.
 *
 * @param routeName The currently active route name.
 */
const canExit = (routeName: string) => contains(routeName, exitRoutes)

export const NAVIGATION_PERSISTENCE_KEY = "NAVIGATION_STATE"

/**
 * This is the root component of our app.
 */
const App: React.FunctionComponent<{}> = () => {
    const navigationRef = useRef<NavigationContainerRef>()
    const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined)
    const [initialNavigationState, setInitialNavigationState] = useState()

    // CHANGE THE BOTTOM TO DETERMINE WHETHER TO PERSIST NAVIGATION STATE OR NOT
    const [isRestoringNavigationState, setIsRestoringNavigationState] = useState(false)

    setRootNavigation(navigationRef)
    useBackButtonHandler(navigationRef, canExit)

    /**
     * Keep track of state changes
     * Track Screens
     * Persist State
     */
    const routeNameRef = useRef()
    const onNavigationStateChange = (state) => {
        const previousRouteName = routeNameRef.current
        const currentRouteName = getActiveRouteName(state)

        if (previousRouteName !== currentRouteName) {
            // track screens.
            __DEV__ && console.tron.log(currentRouteName)
        }

        // Save the current route name for later comparision
        routeNameRef.current = currentRouteName

        // Persist state to storage
        storage.save(NAVIGATION_PERSISTENCE_KEY, state)
    }

    useEffect(() => {
        ;(async () => {
            setupRootStore().then(setRootStore)
        })()
    }, [])

    useEffect(() => {
        const restoreState = async () => {
            try {
                const state = await storage.load(NAVIGATION_PERSISTENCE_KEY)

                if (state) {
                    setInitialNavigationState(state)
                }
            } finally {
                setIsRestoringNavigationState(false)
            }
        }

        if (isRestoringNavigationState) {
            restoreState()
        }
    }, [isRestoringNavigationState])

    // Before we show the app, we have to wait for our state to be ready.
    // In the meantime, don't render anything. This will be the background
    // color set in native by rootView's background color.
    //
    // This step should be completely covered over by the splash screen though.
    //
    // You're welcome to swap in your own component to render if your boot up
    // sequence is too slow though.
    if (!rootStore) {
        return null
    }

    authListener(rootStore)

    // otherwise, we're ready to render the app
    return (
        <RootStoreProvider value={rootStore}>
            <PaperProvider theme={theme}>
                <SafeAreaProvider initialSafeAreaInsets={initialWindowSafeAreaInsets}>
                    <RootNavigator
                        ref={navigationRef}
                        initialState={initialNavigationState}
                        onStateChange={onNavigationStateChange}
                    />
                </SafeAreaProvider>
            </PaperProvider>
        </RootStoreProvider>
    )
}

export default App
