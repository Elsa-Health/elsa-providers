import { useNavigation } from "@react-navigation/native"
import React from "react"
import { View } from "react-native"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { MEDICATIONSLIST, TESTSLIST } from "../../common/constants"
import { pickerOptionsFromList } from "../../common/utils"
import { Screen, Text, Checkbox, Card, TextInput, Button } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { style } from "../../theme"

const AssessmentFeedback: React.FC = () => {
    const navigation = useNavigation()
    const [state, setState] = React.useState({
        referred: false,
        referredForTesting: false,
        prescribedMedications: false,
        investigationsOrdered: [],
        dispensedMedications: [],
    })
    return (
        <Screen preset="scroll" title="Assessment Feedback">
            <Spacer size={20} />

            <Text size="default" bold>
                I provided the following recommendations:
            </Text>
            <Card>
                <Checkbox
                    rtl
                    value={state.referred}
                    onToggle={() => setState((state) => ({ ...state, referred: !state.referred }))}
                    text="Referred to the nearest hospital"
                ></Checkbox>
            </Card>

            <Card>
                <Checkbox
                    rtl
                    value={state.referredForTesting}
                    onToggle={() =>
                        setState((state) => ({
                            ...state,
                            referredForTesting: !state.referredForTesting,
                        }))
                    }
                    text="Referred to a laboratory for testing"
                ></Checkbox>

                {state.referredForTesting && (
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
                            setState((state) => ({ ...state, investigationsOrdered: items }))
                        }
                        selectedItems={state.investigationsOrdered}
                    />
                )}
            </Card>

            <Card>
                <Checkbox
                    rtl
                    value={state.prescribedMedications}
                    onToggle={() =>
                        setState((state) => ({
                            ...state,
                            prescribedMedications: !state.prescribedMedications,
                        }))
                    }
                    text="Dispensed medication to the patient"
                ></Checkbox>
                {state.prescribedMedications && (
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
                        onSelectedItemsChange={(items) =>
                            setState({ ...state, dispensedMedications: items })
                        }
                        selectedItems={state.dispensedMedications}
                    />
                )}
            </Card>

            <Card>
                <Text>Additional recommendations to the patient</Text>
                <TextInput multiline rows={5} placeholder="Your recommendations here ..." />
            </Card>

            <Spacer size={20} />

            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Button
                    onPress={() => navigation.navigate("dispensary.Dashboard")}
                    label="Next"
                    labelSize="h6"
                    mode="contained"
                    style={{ paddingHorizontal: 72, paddingVertical: 8 }}
                />
            </View>
        </Screen>
    )
}

export default AssessmentFeedback
