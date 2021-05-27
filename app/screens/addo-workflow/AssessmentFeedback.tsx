import { StackActions, useNavigation } from "@react-navigation/native"
import React, { useState } from "react"
import { View, Alert } from "react-native"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import _ from "lodash"
import {
    ADDO_MEDICATIONS_LIST,
    ADDO_TESTS_LIST,
    MEDICATIONSLIST,
    TESTSLIST,
} from "../../common/constants"
import { pickerOptionsFromList } from "../../common/utils"
import { Screen, Text, Checkbox, Card, TextInput, Button } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { useVisitStore, VisitState } from "../../models/addo-store"
import { style } from "../../theme"
import { saveADDOVisit } from "./api"
import { useAuthenticationStore } from "../../models/ctc-store"
import { useSystemSymptomStore } from "../../models/symptoms-store"

const AssessmentFeedback: React.FC = () => {
    const navigation = useNavigation()
    const [
        referred,
        referredForTesting,
        prescribedMedications,
        investigationsOrdered,
        dispensedMedications,
        recommendations,
        setState,
    ] = useVisitStore((state) => [
        state.referred,
        state.referredForTesting,
        state.prescribedMedications,
        state.investigationsOrdered,
        state.dispensedMedications,
        state.recommendations,
        state.updateVisit,
    ])
    const resetSystemSymptomsStore = useSystemSymptomStore(
        (state) => state.resetSystemSymptomsStore,
    )
    const [loading, setLoading] = useState(false)

    const submitPatient = () => {
        if (loading) {
            return Alert.alert("Please wait while loading")
        }
        setLoading(true)
        const visitState = _.omit(useVisitStore.getState(), [
            "updateVisit",
            "setDiagnoses",
            "resetVisit",
        ]) as VisitState

        const {
            facilityName,
            facilityId,
            firstName,
            lastName,
            id: providerId,
        } = useAuthenticationStore.getState()
        const providerName = `${firstName} ${lastName}`

        saveADDOVisit(visitState, providerId, providerName, facilityId, facilityName)
            .then((res) => {
                // setLoading(false)
                resetSystemSymptomsStore() // reset the patient visit
                // NEXT: should replace route instead of just navigate to it (??)
                // navigation.dispatch(StackActions.replace("addo.Dashboard"))
                // navigation.navigate("addo.Dashboard")
            })
            .catch((error) => {
                // setLoading(false)
                // Alert.alert("There has been an Error. Please check your network and try again.")
                // NEXT: Must add error logging mechanism
                console.log("Error: ", error)
            })

        navigation.dispatch(StackActions.replace("addo.Dashboard"))
    }
    return (
        <Screen preset="scroll" titleTx="addo.assessmentFeedback.title" title="Assessment Feedback">
            <Spacer size={20} />

            <Text size="default" tx="addo.assessmentFeedback.subtitle" bold>
                I provided the following recommendations:
            </Text>
            <Spacer size={20} />
            <Card>
                <Checkbox
                    rtl
                    value={referred}
                    onToggle={() => setState({ referred: !referred })}
                    multiline
                    tx="addo.assessmentFeedback.hospitalReferredText"
                    text="Referred to the nearest health facility"
                ></Checkbox>
            </Card>

            <Card>
                <Checkbox
                    rtl
                    value={referredForTesting}
                    onToggle={() =>
                        setState({
                            referredForTesting: !referredForTesting,
                        })
                    }
                    text="Referred to a laboratory for testing"
                    tx="addo.assessmentFeedback.labReferredText"
                ></Checkbox>

                {referredForTesting && (
                    <SectionedMultiSelect
                        items={pickerOptionsFromList(TESTSLIST).map(({ label, value }) => ({
                            label,
                            value,
                            name: label,
                            id: value,
                        }))}
                        uniqueKey="id"
                        selectText="Choose the tests..."
                        styles={style.multiSelect}
                        chipsPosition="top"
                        onSelectedItemsChange={(items) =>
                            setState({ investigationsOrdered: items })
                        }
                        selectedItems={investigationsOrdered}
                    />
                )}
            </Card>

            <Card>
                <Checkbox
                    rtl
                    value={prescribedMedications}
                    onToggle={() =>
                        setState({
                            prescribedMedications: !prescribedMedications,
                        })
                    }
                    text="Dispensed medication to the patient"
                    tx="addo.assessmentFeedback.dispensedMedication"
                ></Checkbox>
                {prescribedMedications && (
                    <SectionedMultiSelect
                        items={pickerOptionsFromList(ADDO_MEDICATIONS_LIST).map(
                            ({ label, value }) => ({
                                label,
                                value,
                                name: label,
                                id: value,
                            }),
                        )}
                        uniqueKey="id"
                        // subKey="children"
                        selectText="Choose the treatments dispensed..."
                        styles={style.multiSelect}
                        chipsPosition="top"
                        onSelectedItemsChange={(items) => setState({ dispensedMedications: items })}
                        selectedItems={dispensedMedications}
                    />
                )}
            </Card>

            <Card>
                <Text tx="addo.assessmentFeedback.additionalRecommendations">
                    Additional recommendations to the patient
                </Text>
                <TextInput
                    multiline
                    rows={5}
                    value={recommendations}
                    onChangeText={(text) => setState({ recommendations: text })}
                    placeholder="Your recommendations here ..."
                />
            </Card>

            <Spacer size={20} />

            <Button
                style={{ paddingHorizontal: 46, paddingVertical: 5, alignSelf: "flex-end" }}
                onPress={submitPatient}
                label={loading ? "Loading ..." : "Next"}
                disabled={loading}
                labelSize="default"
                mode="contained"
                labelTx="common.next"
            />
        </Screen>
    )
}

export default AssessmentFeedback
