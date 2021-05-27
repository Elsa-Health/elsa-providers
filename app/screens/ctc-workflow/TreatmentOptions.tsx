import React from "react"
import { Screen } from "../../components/screen/screen"
import { Button, Card, Checkbox, Text } from "../../components"
import { View } from "react-native"
import BulletList from "../../components/bullet-list/bullet-list"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import {
    MEDICATIONSLIST,
    ARVRECOMMENDATIONOPTIONS,
    ARVRECOMMENDATIONREASONS,
    medicationReasons,
} from "../../common/constants"
import { pickerOptionsFromList, labelToValue } from "../../common/utils"
import { color, style } from "../../theme"
import CustomPicker from "../../components/custom-picker/custom-picker"
import { useVisitStore } from "../../models/ctc-store"
import { useNavigation } from "@react-navigation/native"
import Spacer from "../../components/spacer/spacer"
import { getTreatments } from "../../common/nextSteps"

const MedicationVisit: React.FC = ({ route }) => {
    const navigation = useNavigation()
    const state = useVisitStore((state) => state.visit)
    const setState = useVisitStore((state) => state.updateVisit)

    // const [state, setState] = React.useState({
    //     dispensedMedications: [],
    //     ARTDecision: labelToValue(ARVRECOMMENDATIONOPTIONS[0]),
    //     ARTDecisionReason: "",
    // })

    const updateARVDecision = (decision: string) =>
        setState({ ARTDecision: labelToValue(decision) })
    const updateARVDecisionReson = (reason: string) => setState({ ARTDecisionReason: reason })

    const submit = () => {
        navigation.goBack()
    }

    const recommendedMeds = getTreatments(route.params?.diagnoses || [])

    // console.warn(labelToValue(ARVRECOMMENDATIONOPTIONS[1]), state.ARTDecision)
    return (
        <Screen preset="scroll" title="Medication">
            <Card
                marginVertical={30}
                title="Treatment Recomendations"
                leftIcon="format-list-bulleted"
            >
                <Text size="h5">
                    It is recommended that you dispense the following medications. Tick the
                    medications you are prescribing to this patient.
                </Text>

                {recommendedMeds.map((list) => (
                    <View style={{ marginTop: 10, paddingHorizontal: 20 }} key={list.title}>
                        <Text size="h5" color="primary">
                            {list.title}
                        </Text>

                        <View style={{ paddingLeft: 30, marginVertical: 5, marginBottom: 10 }}>
                            {list.options.map((option) => (
                                <Checkbox
                                    key={option.medication}
                                    multiline
                                    secondaryText={
                                        option.days &&
                                        `${option.dailyFrequency} per day x ${option.days} days`
                                    }
                                    text={`${option.medication} ${option.concentration || ""}`}
                                />
                            ))}
                        </View>
                    </View>
                ))}

                <Spacer size={20} />

                <Text size="h5">Are there additional medication you would like to prescribe?</Text>
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
            </Card>

            <Card marginVertical={10} title="ARV Recomendations" leftIcon="format-list-bulleted">
                <Text size="h5">The following is recommended for the patient's ARV treatment:</Text>

                <View style={{ paddingLeft: 30, marginVertical: 20 }}>
                    {/* <Checkbox
                        text="Change ARVs to TDF+3TC/FT+EFV"
                        secondaryText="if creatinine clearence is > 50"
                    /> */}
                    <Text>...</Text>
                </View>

                <Text size="h6">
                    If you agree with the recommendation, please tick the box. If you do not, please
                    select your recommendations below.
                </Text>
                <Spacer size={20} />
                <CustomPicker
                    options={pickerOptionsFromList(ARVRECOMMENDATIONOPTIONS)}
                    onChange={updateARVDecision}
                    selectedValue={state.ARTDecision}
                    // defaultFirstItem="Choose from list"
                    // defaultFirstItemValue={ARVRECOMMENDATIONOPTIONS[1]}
                    // label="What decisions were made about the patients ARVs?"
                />
                <Spacer size={20} />

                <Text size="h6">What is the reason for your decision?</Text>
                <SectionedMultiSelect
                    items={medicationReasons}
                    uniqueKey="id"
                    subKey="children"
                    selectText="Choose the reason for your decision..."
                    styles={style.multiSelect}
                    showDropDowns={true}
                    readOnlyHeadings={true}
                    expandDropDowns
                    chipsPosition="top"
                    onSelectedItemsChange={(items) =>
                        setState({ ...state, ARTDecisionReason: items })
                    }
                    selectedItems={state.ARTDecisionReason}
                />
            </Card>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Button
                    contentStyle={{ marginHorizontal: 40 }}
                    label="Next"
                    mode="contained"
                    onPress={submit}
                />
            </View>

            {/* <Button
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
            </Button> */}
            <Spacer size={20} />
        </Screen>
    )
}

export default MedicationVisit
