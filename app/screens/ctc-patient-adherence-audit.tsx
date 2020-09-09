import React, { useState } from "react"
import { Screen, Text } from "../components"
import { TextInput, Divider, Button } from "react-native-paper"
import CustomPicker from "../components/custom-picker/custom-picker"
import { EDUCATION_LEVELS, educationLevels, BOOLEAN_OPTIONS } from "../common/constants"
import { View, StyleSheet } from "react-native"
import RadioQuestion from "../components/radio-question/radio-question"
import { useNavigation } from "@react-navigation/native"
import { useAdherenceStore } from "../models/ctc-store"
import { color } from "../theme"
import Spacer from "../components/spacer/spacer"

// const initialState: AdherenceAudit = {
//     education: "no-education",
//     employed: false,
//     pastMonthMissedCount: 0,
//     frequentAlcoholUse: false,
//     shareDrugs: false,
//     sideEffects: false,
//     understandRegimen: true,
// }

const questionContainerStyle = { marginVertical: 15 }

const CTCPatientAdherenceAudit: React.FC = (props) => {
    const state = useAdherenceStore()
    const setState = useAdherenceStore((state) => state.updateAdherenceFactor)
    // const [state, setState] = React.useState({
    //     education: "no-education",
    //     employed: false,
    //     pastMonthMissedCount: 0,
    //     frequentAlcoholUse: false,
    //     shareDrugs: false,
    //     sideEffects: false,
    //     understandRegimen: true,
    // })
    const navigation = useNavigation()

    const mode = props.route.params?.mode ? props.route.params.mode : "complete"

    return (
        <Screen preset="scroll" title="Adherence Assessment">
            <Text size="small" italic style={{ marginBottom: 20 }}>
                Please input the following information about your patient to assess the risk of
                non-adherence.
            </Text>
            <CustomPicker
                selectedValue={state.education}
                label="What is your patient's education level?"
                options={[
                    { value: "no-education", label: "No Education" },
                    { value: "primary-school", label: "Primary School" },
                    { value: "secondary-school", label: "Secondary School" },
                    { value: "higher-education", label: "Higher Education" },
                ]}
                onChange={(value) => setState({ education: value as educationLevels })}
            />
            {/* FIXME: This value should not be above 30 */}
            <View style={{ marginVertical: 20 }}>
                <Text size="h5" style={{ marginBottom: 6 }}>
                    How many times has the patient forgotten to take their medication in the past
                    month?
                </Text>
                <TextInput
                    label="Number"
                    keyboardType="number-pad"
                    value={String(state.pastMonthMissedCount > 0 ? state.pastMonthMissedCount : "")}
                    mode="outlined"
                    onChangeText={(text) => setState({ pastMonthMissedCount: Number(text) })}
                />
            </View>
            <RadioQuestion
                question="Does the patient currently have a job?"
                containerStyle={questionContainerStyle}
                id="employmentStatus"
                onPress={(value) => setState({ employed: value as boolean })}
                value={state.employed}
                options={BOOLEAN_OPTIONS}
            />
            <RadioQuestion
                question="Does the patient use alcohol frequently (More than 4 times per week)?"
                containerStyle={questionContainerStyle}
                id="alcoholUse"
                onPress={(value) => setState({ frequentAlcoholUse: value as boolean })}
                value={state.frequentAlcoholUse}
                options={BOOLEAN_OPTIONS}
            />
            <RadioQuestion
                question="Does the patient share their HIV medication with their friends or family members?"
                containerStyle={questionContainerStyle}
                id="shareDrugs"
                onPress={(value) => setState({ shareDrugs: value as boolean })}
                value={state.shareDrugs}
                options={BOOLEAN_OPTIONS}
            />
            <RadioQuestion
                question="Is the patient experiencing side effects from their medication?"
                containerStyle={questionContainerStyle}
                id="sideEffects"
                onPress={(value) => setState({ sideEffects: value as boolean })}
                value={state.sideEffects}
                options={BOOLEAN_OPTIONS}
            />
            <RadioQuestion
                question="Does the patient fully understand their treatment regimen?"
                containerStyle={questionContainerStyle}
                id="understandRegimen"
                onPress={(value) => setState({ understandRegimen: value as boolean })}
                value={state.understandRegimen}
                options={BOOLEAN_OPTIONS}
            />

            <View style={{ flexDirection: "row", paddingHorizontal: 6, alignSelf: "flex-end" }}>
                <Button
                    style={styles.actionButtons}
                    mode="text"
                    uppercase={false}
                    color={color.primary}
                    onPress={() => {
                        // navigate here
                        // NOTE: This passes the params from the previous route, if any to the next screen
                        // this is done so that we can force the final screen to not have the diagnoses graphs and only show results relevant to adherence audits
                        if (mode === "medication-only") {
                            return navigation.navigate("ctc-medication-only-visit-screen", {
                                ...props.route.params,
                                adherence: false,
                            })
                        }
                        navigation.navigate("ctc-medication-only-visit-screen", props.route.params)
                    }}
                >
                    <Text color="primary">Skip</Text>
                </Button>
                <Spacer size={10} horizontal />
                <Button
                    style={styles.actionButtons}
                    onPress={() => {
                        // navigate here
                        // NOTE: This passes the params from the previous route, if any to the next screen
                        // this is done so that we can force the final screen to not have the diagnoses graphs and only show results relevant to adherence audits
                        navigation.navigate("ctc-assessment-summary-screen", props.route.params)
                    }}
                    mode="contained"
                    uppercase={false}
                >
                    <Text color="white">Next</Text>
                </Button>
            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    actionButtons: {
        borderWidth: 1,
        paddingHorizontal: 40,
        paddingVertical: 5,
    },
})

export { CTCPatientAdherenceAudit }
