import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View } from "react-native"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { ADDO_TESTS_LIST, MEDICATIONSLIST, TESTSLIST } from "../../common/constants"
import { pickerOptionsFromList } from "../../common/utils"
import { Screen, Text, Checkbox, Card, TextInput, Button } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { useVisitStore } from "../../models/addo-store"
import { style } from "../../theme"

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
    return (
        <Screen preset="scroll" title="Assessment Feedback">
            <Spacer size={20} />

            <Text size="default" bold>
                I provided the following recommendations:
            </Text>
            <Spacer size={20} />
            <Card>
                <Checkbox
                    rtl
                    value={referred}
                    onToggle={() => setState({ referred: !referred })}
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
                ></Checkbox>
                {prescribedMedications && (
                    <SectionedMultiSelect
                        items={pickerOptionsFromList(MEDICATIONSLIST).map(({ label, value }) => ({
                            label,
                            value,
                            name: label,
                            id: value,
                        }))}
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
                <Text>Additional recommendations to the patient</Text>
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
                onPress={() => navigation.navigate("addo.Dashboard")}
                    label="Next"
                    labelSize="default"
                    mode="contained"
                />
        </Screen>
    )
}

export default AssessmentFeedback
