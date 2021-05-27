import * as React from "react"
import { View } from "react-native"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { TESTSLIST } from "../../common/constants"
import { getTests } from "../../common/nextSteps"
import { pickerOptionsFromList } from "../../common/utils"
import { Screen, Card, Text, Checkbox } from "../../components"
import { useVisitStore } from "../../models/ctc-store"
import { color } from "../../theme"

const defaultTests = ["CrAG", "CD4", "Viral load", "Complete Blood Count"]

const TestRecommendations: React.FC = ({ route }) => {
    const [selectedTests, setSelectedTests] = React.useState<string[]>([])
    const investigationsOrdered = useVisitStore((state) => state.visit.investigationsOrdered)
    const setState = useVisitStore((state) => state.updateVisit)

    const toggleTest = (value: string) => {
        console.warn(value)
        if (selectedTests.includes(value)) {
            setSelectedTests(investigationsOrdered.filter((test) => test !== value))
            // setState({ investigationsOrdered: items })
        } else {
            setState({ investigationsOrdered: [...investigationsOrdered, value] })

            // setSelectedTests([...selectedTests, value])
        }
    }

    console.log(route.params?.diagnoses)

    const recommendedTests = route.params?.diagnoses
        ? getTests(route.params.diagnoses)
        : defaultTests
    return (
        <Screen preset="scroll" title="Diagnostic Tests">
            <Card marginVertical={20} title="Test Recommendations" leftIcon="format-list-bulleted">
                <Text size="h5">
                    It is recommended that you order the following tests. Tick the tests you are
                    ordering for this patient.
                </Text>

                <View style={{ paddingLeft: 40, marginVertical: 20 }}>
                    {recommendedTests.map((test) => (
                        <Checkbox
                            key={test}
                            text={test}
                            value={investigationsOrdered.includes(test)}
                            onToggle={() => toggleTest(test)}
                        />
                    ))}
                </View>

                <Text size="h5">Are there additional tests you would like to order?</Text>

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
            </Card>
        </Screen>
    )
}

export default TestRecommendations
