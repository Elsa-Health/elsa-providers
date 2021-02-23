import React, { useEffect, useState } from "react"
import { createNativeStackNavigator } from "react-native-screens/native-stack"
import {
    DrawerContentScrollView,
    DrawerItemList,
    createDrawerNavigator,
    DrawerItem,
} from "@react-navigation/drawer"
import { ApplicationComponentsScreen, FeedbackScreen } from "../screens"
import ConfirmPatientPresence from "../screens/addo-workflow/ConfirmPatientPresence"
import ElsaLogo from "../assets/elsa-logo.svg"
import { Linking, View, Dimensions, Alert } from "react-native"

import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"

// NOTE: Potentially create a new index.tsx screen in the ctc workflow that will export all the screens
import Dashboard from "../screens/addo-workflow/Dashboard"
import PatientConsent from "../screens/addo-workflow/PatientConsent"
import PatientIntake from "../screens/addo-workflow/PatientIntake"
import FurtherAssessment from "../screens/addo-workflow/FurtherAssessment"
import AssessmentSummary from "../screens/addo-workflow/AssessmentSummary"
import AssessmentFeedback from "../screens/addo-workflow/AssessmentFeedback"
import ReferPatient from "../screens/addo-workflow/ReferPatient"
import { FeedbackScreen as Feedback } from "../screens/feedback-screen"
import { useAuthenticationStore } from "../models/ctc-store"
import CTCAuthenticator from "../screens/ctc-workflow/CTCAuthenicator"
import VisitHistory from "../screens/addo-workflow/VisitHistory"
import AssessmentAnalysis from "../screens/addo-workflow/AssessmentsAnalysis"
import ConditionAssessmentAnalysis from "../screens/addo-workflow/ConditionAssessmentAnalysis"
import { Text } from "../components"
import Spacer from "../components/spacer/spacer"
import { Divider } from "react-native-paper"
import { color } from "../theme"
import { useLocale } from "../models/language"
import { useUIState } from "../models/ui-state"

const { width, height } = Dimensions.get("window")
const Drawer = createDrawerNavigator()

type CTCParamList = {
    "addo.Authenticator": undefined
    "addo.Dashboard": undefined
    "addo.ConfirmPatientPresence": undefined
    "addo.PatientConsent": undefined
    "addo.PatientIntake": undefined
    "addo.VisitHistory": undefined
    "addo.FurtherAssessment": undefined
    "addo.AssessmentSummary": undefined
    "addo.AssessmentFeedback": undefined
    "addo.ReferPatient": undefined
    "addo.AssessmentAnalysis": undefined
    "addo.ConditionAssessmentAnalysis": undefined
    "addo.FeedbackScreen": undefined
    "addo.Feedback": undefined
}

const Stack = createNativeStackNavigator<CTCParamList>()

const ADDONavigator = () => {
    const authStore = useAuthenticationStore()

    if (!authStore.authenticated) {
        return (
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: true,
                }}
                initialRouteName="addo.Authenticator"
            >
                <Stack.Screen
                    options={{ title: "Authenticator" }}
                    name="addo.Authenticator"
                    component={CTCAuthenticator}
                />
            </Stack.Navigator>
        )
    }
    return (
        <Drawer.Navigator
            screenOptions={{
                headerShown: false,
                gestureEnabled: true,
            }}
            initialRouteName="addo.Dashboard"
            drawerPosition="right"
            drawerType="back"
            drawerContent={(props) => (
                <CustomDrawerContent {...props} setAuthenticated={authStore.setAuthenticated} />
            )}
            edgeWidth={150}
        >
            <Drawer.Screen name="addo.Dashboard" component={Dashboard} />
            <Drawer.Screen name="addo.ConfirmPatientPresence" component={ConfirmPatientPresence} />
            <Drawer.Screen name="addo.PatientConsent" component={PatientConsent} />
            <Drawer.Screen name="addo.PatientIntake" component={PatientIntake} />
            <Drawer.Screen name="addo.VisitHistory" component={VisitHistory} />
            <Drawer.Screen name="addo.FurtherAssessment" component={FurtherAssessment} />
            <Drawer.Screen name="addo.AssessmentSummary" component={AssessmentSummary} />
            <Drawer.Screen name="addo.AssessmentFeedback" component={AssessmentFeedback} />
            <Drawer.Screen name="addo.FeedbackScreen" component={FeedbackScreen} />
            <Drawer.Screen name="addo.ReferPatient" component={ReferPatient} />
            <Drawer.Screen name="addo.AssessmentAnalysis" component={AssessmentAnalysis} />
            <Drawer.Screen
                name="addo.ConditionAssessmentAnalysis"
                component={ConditionAssessmentAnalysis}
            />
            <Drawer.Screen name="addo.Feedback" component={Feedback} />
        </Drawer.Navigator>
    )
}

const CustomDrawerContent = (props) => {
    const renderSpacer = <Spacer size={10} horizontal />
    const [locale, setLocale] = useLocale((state) => [state.locale, state.setLocale])

    const signOut = () => {
        // TODO: confirm that the dispenser wants to sign out
        props.setAuthenticated(false, {})
    }
    return (
        <DrawerContentScrollView
            {...props}
            style={{ flexGrow: 1 }}
            contentContainerStyle={{ flexGrow: 1 }}
        >
            {/* <DrawerItemList {...props} /> */}
            <DrawerItem
                label=""
                icon={() => <ElsaLogo width="230" height="100" />}
                onPress={() => null}
            />
            <DrawerItem
                label={({ focused, color }) => (
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcon name="message-alert" size={22} />
                        {renderSpacer}
                        <Text
                            tx="dashboardScreen.actions.feedback"
                            size="default"
                            style={{ color }}
                            bold
                        ></Text>
                    </View>
                )}
                onPress={() => props.navigation.navigate("addo.Feedback")}
            />
            <DrawerItem
                label={({ focused, color }) => (
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcon name="view-list" size={22} />
                        {renderSpacer}
                        <Text bold size="default" style={{ color }}>
                            Disease Library
                        </Text>
                    </View>
                )}
                onPress={() => props.navigation.navigate("addo.FeedbackScreen")}
            />
            <DrawerItem
                label={({ focused, color }) => (
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcon name="google-analytics" size={22} />
                        {renderSpacer}
                        <Text bold size="default" style={{ color }}>
                            Analytics
                        </Text>
                    </View>
                )}
                onPress={() => props.navigation.navigate("addo.AssessmentAnalysis")}
            />

            <Divider style={{ marginVertical: 6, marginHorizontal: 13 }} />

            <DrawerItem
                label={({ focused, color }) => (
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcon name="translate" size={22} />
                        {renderSpacer}
                        <Text bold size="default" style={{ color }}>
                            Change Language
                        </Text>
                    </View>
                )}
                pressOpacity="0"
                onPress={() => null}
            />
            <View style={{ marginLeft: "10%" }}>
                <DrawerItem
                    style={{ marginTop: -16 }}
                    label={({ focused }) => (
                        <View style={{ flexDirection: "row" }}>
                            <MaterialIcon
                                name="check-circle"
                                color={locale === "en" ? color.primary : "transparent"}
                                size={22}
                            />
                            {renderSpacer}
                            <Text size="default" color={locale === "en" ? "primary" : "default"}>
                                English
                            </Text>
                        </View>
                    )}
                    onPress={() => setLocale("en")}
                />
                <DrawerItem
                    style={{ marginTop: -16 }}
                    label={({ focused }) => (
                        <View style={{ flexDirection: "row" }}>
                            <MaterialIcon
                                name="check-circle"
                                color={locale === "sw" ? color.primary : "transparent"}
                                size={22}
                            />
                            {renderSpacer}
                            <Text size="default" color={locale === "sw" ? "primary" : "default"}>
                                Swahili
                            </Text>
                        </View>
                    )}
                    onPress={() => setLocale("sw")}
                />
            </View>

            <Divider style={{ marginVertical: 6, marginHorizontal: 13 }} />

            <DrawerItem
                label={({ focused, color }) => (
                    <View style={{ flexDirection: "row" }}>
                        <MaterialIcon name="location-exit" size={22} />
                        {renderSpacer}
                        <Text bold size="default" style={{ color }}>
                            Logout
                        </Text>
                    </View>
                )}
                onPress={signOut}
            />

            <View style={{ alignSelf: "flex-end", position: "absolute", bottom: 20, padding: 10 }}>
                <Text lineHeight={20}>
                    This application is a part of the AfyaTek consoritum, focused on delivering high
                    quality healthcare services in Tanzania.
                </Text>
            </View>
        </DrawerContentScrollView>
    )
}

export { ADDONavigator }
