import React from "react"
import { Screen } from "../components/screen/screen"
import { Text } from "../components"
import { View } from "react-native"
import BulletList from "../components/bullet-list/bullet-list"
import { Divider, Button } from "react-native-paper"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import {
    MEDICATIONSLIST,
    ARVRECOMMENDATIONOPTIONS,
    ARVRECOMMENDATIONREASONS,
    medicationReasons,
} from "../common/constants"
import { pickerOptionsFromList, labelToValue } from "../common/utils"
import { color, style } from "../theme"
import CustomPicker from "../components/custom-picker/custom-picker"
import { useVisitStore } from "../models/ctc-store"
import { useNavigation } from "@react-navigation/native"

const CTCMedication: React.FC = () => {
    const navigation = useNavigation()
    const state = useVisitStore((state) => state.visit)
    const setState = useVisitStore((state) => state.updateVisit)

    // const [state, setState] = React.useState({
    //     dispensedMedications: [],
    //     arvDecision: labelToValue(ARVRECOMMENDATIONOPTIONS[0]),
    //     arvDecisionReason: "",
    // })

    const updateARVDecision = (decision: string) =>
        setState({ arvDecision: labelToValue(decision) })
    const updateARVDecisionReson = (reason: string) => setState({ arvDecisionReason: reason })

    const submit = () => {
        navigation.goBack()
    }

    // console.warn(labelToValue(ARVRECOMMENDATIONOPTIONS[1]), state.arvDecision)
    return (
        <Screen preset="scroll" title="Medication">
            <Text>
                Based on the assessment, we recommend the following medication for your patients.
            </Text>

            <View style={{ marginTop: 20 }}>
                <Text size="h5" bold>
                    Medication and Treatments
                </Text>

                <Text size="h5">To treat the patient dispense:</Text>

                <BulletList
                    id="medicine-recommendations"
                    items={[
                        "Fluconazole, 800mg/ day x 2 weeks",
                        "Liquid cough medicine",
                        "Paracetamol, 500mg",
                    ]}
                />

                <Divider style={{ marginVertical: 60 }} />

                <Text size="h5" bold>
                    ARV Recommendations
                </Text>

                <Text size="h5">Based on the assessment it is recommended to:</Text>

                <BulletList id="arv-recommendations" items={["Continue ARVs"]} />

                <Divider style={{ marginVertical: 60 }} />

                <Text size="h5" bold>
                    Medications and Treatments prescribed
                </Text>

                <Text size="h6" italic color="gray">
                    Please indicate which medications or treatments you prescribed:
                </Text>

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

                <View style={{ marginTop: 16 }}>
                    <CustomPicker
                        options={pickerOptionsFromList(ARVRECOMMENDATIONOPTIONS)}
                        onChange={updateARVDecision}
                        selectedValue={state.arvDecision}
                        // defaultFirstItem="Choose from list"
                        labelSize="h6"
                        // defaultFirstItemValue={ARVRECOMMENDATIONOPTIONS[1]}
                        label="What decisions were made about the patients ARVs?"
                    />
                </View>

                <View key={state.arvDecision} style={{ marginTop: 16 }}>
                    {/* <CustomPicker
                        options={ARVRECOMMENDATIONREASONS[state.arvDecision].map((option) => ({
                            value: option,
                            label: option,
                        }))}
                        onChange={updateARVDecisionReson}
                        selectedValue={state.arvDecisionReason}
                        defaultFirstItem="Choose from list"
                        labelSize="h6"
                        label="What is the reason for this decision?"
                    /> */}
                    <Text size="h6">
                        What is the reason for this decision?
                    </Text>
                    <SectionedMultiSelect
                        items={medicationReasons}
                        uniqueKey="id"
                        subKey="children"
                        selectText="Choose the treatments dispensed..."
                        styles={style.multiSelect}
                        showDropDowns={true}
                        readOnlyHeadings={true}
                        expandDropDowns
                        chipsPosition="top"
                        onSelectedItemsChange={(items) =>
                            setState({ ...state, arvDecisionReason: items })
                        }
                        selectedItems={state.arvDecisionReason}
                    />
                </View>

                <Button
                    style={{
                        margin: 10,
                        marginBottom: 20,
                        alignSelf: "flex-end",
                        paddingHorizontal: 46,
                        marginTop: "10%",
                    }}
                    onPress={submit}
                    mode="contained"
                >
                    <Text color="white">Next</Text>
                </Button>
            </View>
        </Screen>
    )
}

export { CTCMedication }
