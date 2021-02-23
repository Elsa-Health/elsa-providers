import React from "react"
import { StyleSheet, View, Dimensions } from "react-native"
import { Button, Screen, Text } from "../../components"
import DoctorsImg from "../../assets/icons/doctor.svg"
import { color, md, xs } from "../../theme"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { usePatientFile, useVisitStore } from "../../models/dispensary-store"
import { useSystemSymptomStore } from "../../models/symptoms-store"

const { width, height } = Dimensions.get("window")

const Dashboard = () => {
    const navigation = useNavigation()
    const resetSystemSymptomsStore = useSystemSymptomStore(
        (state) => state.resetSystemSymptomsStore,
    )
    const [resetVisitStore] = useVisitStore((state) => [state.resetVisit])
    const [resetFile] = usePatientFile((state) => [state.resetFile])
    // Ensure that the global state that contains private information is cleared.
    // This is a redundancy to guarantee that everyone going through the dashboard never see a previous patient
    useFocusEffect(
        React.useCallback(() => {
            resetVisitStore()
            resetSystemSymptomsStore()
            resetFile()
            // return () => unsubscribe();
        }, []),
    )

    return (
        <Screen preset="scroll" titleTx="title.welcome" title="Welcome">
            <View style={{ marginTop: height / 15 }}>
                <Text tx="dashboardScreen.addo.subTitle" align="center" size="h2">
                    Let's assess your patient {"\n"} together.
                </Text>
            </View>
            <DoctorsImg
                width={width / 1.6}
                height={width / 1.6}
                style={{
                    // marginVertical: height / 28,
                    alignSelf: "center",
                }}
            />
            <Text
                tx="dashboardScreen.addo.note"
                align="center"
                color="gray"
                style={{ lineHeight: 32 }}
                size="h4"
            >
                Note: The Elsa Health Assistant should not be used for emergency cases. Please refer
                your patient to a hospital immediately.
            </Text>
            <Button
                style={{ paddingVertical: 5, marginTop: height / 25 }}
                onPress={() => navigation.navigate("dispensary.PatientIntake")}
                mode="contained"
                labelSize="default"
                labelTx="dashboardScreen.actions.beginAssessment"
                label="Begin Assessment"
            />

            {/* <Button
                style={{ paddingVertical: 5 }}
                onPress={() => navigation.navigate("dispensary.PatientIntake")}
                mode="contained"
                labelSize="default"
                label="Begin Milestones Assessment"
            /> */}

            <Button
                style={{ paddingVertical: 5 }}
                onPress={() => navigation.navigate("dispensary.Feedback")}
                mode="text"
                labelSize="default"
                labelTx="dashboardScreen.actions.feedback"
                label="Feedback / Report Problem"
            />

            {/* <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
                <Text tx="language">Language:</Text>
                <Text>:</Text>
                <Button
                    mode="text"
                    label="English"
                    onPress={() => setLocale("en")}
                    labelSize="default"
                    labelColor={locale === "sw" ? "gray" : "primary"}
                />
                <Text> &nbsp;| &nbsp;</Text>
                <Button
                    onPress={() => setLocale("sw")}
                    label="Swahili"
                    labelSize="default"
                    labelColor={locale === "en" ? "gray" : "primary"}
                />
            </View> */}
        </Screen>
    )
}

const styles = StyleSheet.create({
    actionButton: {
        backgroundColor: color.primary,
        bottom: 36,
        height: 60,
        position: "absolute",
        right: 36,
        width: 60,
    },
})

export default Dashboard
