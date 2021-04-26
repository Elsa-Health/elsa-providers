import React from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import DoctorsImg from "../../assets/icons/doctor.svg"
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native"
import { FAB } from "react-native-paper"
import { Text, Screen, Button } from "../../components"
import { changeLanguage } from "../../i18n"
import { useVisitStore } from "../../models/addo-store"
import { useSystemSymptomStore } from "../../models/symptoms-store"
import { color, md } from "../../theme"
import { useLocale } from "../../models/language"

const { width, height } = Dimensions.get("window")

const Dashboard: React.FC = () => {
    const navigation = useNavigation()
    const [locale, setLocale] = useLocale((state) => [state.locale, state.setLocale])

    const [resetVisitStore] = useVisitStore((state) => [state.resetVisit])
    const resetSystemSymptomsStore = useSystemSymptomStore(
        (state) => state.resetSystemSymptomsStore,
    )

    const setEnglish = React.useCallback(() => setLocale("en"), [])
    const setSwahili = React.useCallback(() => setLocale("sw"), [])
    const goToFeedback = React.useCallback(() => navigation.navigate("addo.Feedback"), [])
    const goToConfirmPatient = React.useCallback(() => navigation.navigate("addo.ConfirmPatientPresence"), [])

    // Ensure that the global state that contains private information is cleared.
    // This is a redundancy to guarantee that everyone going through the dashboard never see a previous patient
    useFocusEffect(
        React.useCallback(() => {
            console.log("Called here")
            resetVisitStore()
            resetSystemSymptomsStore()
        }, []),
    )

    return (
        <Screen preset="scroll" titleTx="title.welcome" title="Welcome">
            <View style={{ marginTop: height / 15 }}>
                <Text tx="dashboardScreen.addo.subTitle" align="center" size="h5">
                    Let's assess your patient {"\n"} together.
                </Text>
            </View>
            <DoctorsImg style={{ marginVertical: height / 15, alignSelf: "center" }} />
            <Text
                tx="dashboardScreen.addo.note"
                align="center"
                color="gray"
                style={{ lineHeight: 18 }}
                size="h7"
            >
                Note: The Elsa Health Assistant should not be used for emergency cases. Please refer
                your patient to a hospital immediately.
            </Text>
            <Button
                style={{ paddingVertical: 5, marginTop: height / 25 }}
                onPress={goToConfirmPatient}
                mode="contained"
                labelSize="default"
                labelTx="dashboardScreen.actions.beginAssessment"
                label="Begin Assessment"
            />

            <Button
                style={{ paddingVertical: 5 }}
                onPress={goToFeedback}
                mode="text"
                labelSize="default"
                labelTx="dashboardScreen.actions.feedback"
                label="Feedback / Report Problem"
            />

            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text tx="language">Language:</Text>
                <Text>:</Text>
                <Button
                    mode="text"
                    label="English"
                    onPress={setEnglish}
                    labelSize="default"
                    labelColor={locale === "sw" ? "gray" : "primary"}
                />
                <Text> &nbsp;| &nbsp;</Text>
                <Button
                    onPress={setSwahili}
                    label="Swahili"
                    labelSize="default"
                    labelColor={locale === "en" ? "gray" : "primary"}
                />
            </View>
        </Screen>
    )
}

Dashboard.whyDidYouRender = true

export default Dashboard
