import React from "react"
import { ViewStyle, ScrollView, View, Dimensions, StyleSheet } from "react-native"
import { Screen, Row, Col, Text } from "../components"
import { Card, Button } from "react-native-paper"
import Spacer from "../components/spacer/spacer"
import { color, style } from "../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"
import CustomPicker from "../components/custom-picker/custom-picker"
import { ARVRECOMMENDATIONOPTIONS, medicationReasons } from "../common/constants"
import { pickerOptionsFromList } from "../common/utils"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import ExtendedDatePicker from "../components/extended-date-picker/extended-date-picker"

const CTCMedicationOnlyRecord: React.FC = (props) => {
    const [state, setState] = React.useState({
        ARTDecision: "",
        ARTDecisionReason: [],
    }) // medication or checkup
    const navigation = useNavigation()

    const mode = props.route.params?.mode ? props.route.params.mode : "complete"

    const updateARVDecision = () => {}
    return (
        <Screen preset="scroll" title="Medication">
            <View style={{ marginTop: 16 }}>
                <CustomPicker
                    options={pickerOptionsFromList(ARVRECOMMENDATIONOPTIONS)}
                    onChange={updateARVDecision}
                    selectedValue={state.ARTDecision}
                    // defaultFirstItem="Choose from list"
                    labelSize="h6"
                    // defaultFirstItemValue={ARVRECOMMENDATIONOPTIONS[1]}
                    label="What decisions were made about the patients ARVs?"
                />
            </View>
            <View style={{ marginTop: 16 }}>
                <Text size="h6">What is the reason for this decision?</Text>
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
                        setState({ ...state, ARTDecisionReason: items })
                    }
                    selectedItems={state.ARTDecisionReason}
                />
            </View>

            <View style={{ marginTop: 16 }}>
                {/* FIXME: Update options to show the correct regimen */}
                <Text size="h6">What is their regimen?</Text>
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
                        setState({ ...state, ARTDecisionReason: items })
                    }
                    selectedItems={state.ARTDecisionReason}
                />
            </View>

            {/* {mode === "medicationOnly"} */}

            {/* FIXME: Show only when its not visible in the assessment summary screen */}

            <View style={{ paddingVertical: 26 }}>
                <Text size="h5" bold>
                    Next Visit
                </Text>
                <ExtendedDatePicker
                    label="When should the patient return for their next visit?"
                    onDateSet={() => {}}
                />
            </View>

            <View>
                <Button
                    style={styles.actionButtons}
                    onPress={() => {
                        // navigate here
                        // NOTE: This passes the params from the previous route, if any to the next screen
                        // this is done so that we can force the final screen to not have the diagnoses graphs and only show results relevant to adherence audits
                        if (mode === "medication-only" && !props.route.params?.adherence) {
                            return navigation.navigate("dashboard")
                        }
                        // navigation.navigate("ctc-assessment-summary-screen", props.route.params)
                        navigation.goBack()
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
        alignSelf: "flex-end",
        marginTop: 40,
        paddingHorizontal: 40,
    },
})

export { CTCMedicationOnlyRecord }
