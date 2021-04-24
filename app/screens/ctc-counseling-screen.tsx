import React from "react"
import { Screen } from "../components/screen/screen"
import { Text } from "../components"
import { View } from "react-native"
import _ from "lodash"
import BulletList from "../components/bullet-list/bullet-list"
import { Divider, Button } from "react-native-paper"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { MEDICATIONSLIST, COUNSELINGTOPICS } from "../common/constants"
import { style } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { useVisitStore } from "../models/ctc-store"

const counselingTopics = COUNSELINGTOPICS.sort().map((topic) => ({
    label: topic,
    value: topic,
    name: topic,
    id: _.kebabCase(topic),
}))

const CTCCounseling: React.FC = () => {
    const navigation = useNavigation()
    const state = useVisitStore((state) => state.visit)
    const setState = useVisitStore((state) => state.updateVisit)

    const submit = () => { navigation.goBack() }
    return (
        <Screen preset="scroll" title="Counseling">
            <Text>Based on the assessment, we recommend the following topics for counseling.</Text>

            <View style={{ marginTop: 20 }}>
                <Text size="h5" bold>
                    Enhanced Adherence Counseling
                </Text>

                <Text size="h6" color="primary">
                    Your patients risk of non-adherence is 75%.
                </Text>
                <Text size="h6" color="angry">
                    This means that your patient is at a high risk of non-adherence or loss to
                    follow up.
                </Text>
                <Text size="h6" style={{ marginTop: 10 }}>
                    The main things to focus on during counseling to improve adherence of the
                    patient are:
                </Text>
                <BulletList
                    items={[
                        "Managing Side Effects",
                        "Drug sharing with family or friends",
                        "Job seeking",
                    ]}
                    textSize="h6"
                    id="counseling-topics"
                />

                <Text size="h5" bold style={{ marginTop: 10 }}>
                    Other Counseling
                </Text>
                <Text>These topics are also recommended for counseling:</Text>
                <BulletList
                    items={["Progression of disease", "Disclosure"]}
                    id="counseling-topics"
                    textSize="h6"
                />

                <Divider style={{ marginVertical: 60 }} />

                <Text size="h5" bold>
                    Counseling Offered
                </Text>
                <Text>Please select which types of counseling you provided during this visit:</Text>
                <SectionedMultiSelect
                    items={counselingTopics}
                    uniqueKey="id"
                    // subKey="children"
                    selectText="Choose the treatments dispensed..."
                    styles={style.multiSelect}
                    chipsPosition="top"
                    onSelectedItemsChange={(items) => setState({ counseling: items })}
                    selectedItems={state.counseling}
                />

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

export { CTCCounseling }
