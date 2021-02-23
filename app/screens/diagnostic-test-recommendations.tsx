import * as React from "react"
import { View } from "react-native"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { Screen, Row, Col, Text } from "../components"
import { Divider, Button } from "react-native-paper"
import { pickerOptionsFromList } from "../common/utils"
import { TESTSLIST } from "../common/constants"
import { color } from "../theme"
import BulletList from "../components/bullet-list/bullet-list"
import { useVisitStore } from "../models/ctc-store"
import { useNavigation } from "@react-navigation/native"

const DiagnosticTestRecommendations: React.FC = () => {
    const navigation = useNavigation()
    const investigationsOrdered = useVisitStore((state) => state.visit.investigationsOrdered)
    const setState = useVisitStore((state) => state.updateVisit)

    const submit = () => { navigation.goBack() }

    return (
        <Screen preset="scroll" title="Diagnostic Tests">
            <Text>Based on the assessment, we recommend the following diagnostic tests.</Text>

            <View style={{ marginTop: 20 }}>
                <Text size="h5" bold>
                    Test Recommendations
                </Text>

                <Text size="h5">It is recommended that you order the following tests:</Text>

                <BulletList
                    id="tests-recommendations"
                    items={["CrAG+", "CD4", "Viral Load", "Liver function tests"]}
                />

                <Divider style={{ marginVertical: 60 }} />

                <Text size="h5" bold>
                    Tests Ordered
                </Text>
                <Text size="h5">Which tests did you order for this patient?</Text>

                <SectionedMultiSelect
                    items={pickerOptionsFromList(TESTSLIST).map(({ label, value }) => ({
                        label,
                        value,
                        name: label,
                        id: value,
                    }))}
                    uniqueKey="id"
                    // subKey="children"
                    selectText="Choose some things..."
                    styles={{
                        item: { paddingVertical: 16 },
                        selectToggle: {
                            backgroundColor: "#F3F3F3",
                            borderColor: "#A8A8A8",
                            borderWidth: 1,
                            borderRadius: 2,
                            paddingVertical: 14,
                            paddingHorizontal: 10,
                            marginTop: 4,
                        },
                        itemText: {
                            color: color.text,
                            fontSize: 18,
                            fontWeight: "normal",
                        },
                        selectedItemText: {
                            color: color.primary,
                        },
                        chipContainer: {
                            borderRadius: 2,
                        },
                    }}
                    chipsPosition="top"
                    // showChips={false}
                    onSelectedItemsChange={(items) =>
                        // console.warn("selected", JSON.stringify(items))
                        setState({ investigationsOrdered: items })
                    }
                    selectedItems={investigationsOrdered}
                />
            </View>

            <Button style={{ margin: 10, marginBottom: 20, alignSelf: "flex-end", paddingHorizontal: 46, marginTop: "10%" }} onPress={submit} mode="contained">
                <Text color="white">Next</Text>
            </Button>
        </Screen>
    )
}

export { DiagnosticTestRecommendations }
