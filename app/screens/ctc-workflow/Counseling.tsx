import React from "react"
import { Screen } from "../../components/screen/screen"
import { Card, Notification, Text } from "../../components"
import { View } from "react-native"
import _ from "lodash"
import BulletList from "../../components/bullet-list/bullet-list"
import { Divider, Button } from "react-native-paper"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { MEDICATIONSLIST, COUNSELINGTOPICS } from "../../common/constants"
import { style } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { useVisitStore } from "../../models/ctc-store"
import Spacer from "../../components/spacer/spacer"

const counselingTopics = COUNSELINGTOPICS.sort().map((topic) => ({
    label: topic,
    value: topic,
    name: topic,
    id: _.kebabCase(topic),
}))

const Counseling: React.FC = () => {
    const navigation = useNavigation()
    const state = useVisitStore((state) => state.visit)
    const setState = useVisitStore((state) => state.updateVisit)

    const submit = () => {
        navigation.goBack()
    }
    return (
        <Screen preset="scroll" title="Counseling">
            <Spacer size={20} />
            {/* <Text>Based on the assessment, we recommend the following topics for counseling.</Text> */}

            {/* <Spacer size={20} /> */}
            <Card leftIcon="list-alt" title=" Enhanced Adherence Counseling">
                <View style={{}}>
                    {/* determine the notification to render before */}
                    <Notification
                        title="Your patients risk of non-adherence is 75%."
                        variation="danger"
                    >
                        <Text size="h6">
                            This means that your patient is at a high risk of non-adherence or loss
                            to follow up.
                        </Text>
                    </Notification>

                    <Spacer size={12} />
                    <Text size="h6" style={{}}>
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
                </View>
            </Card>
            <Spacer size={16} />
            <Card leftIcon="list-alt" title=" Other Counseling">
                <Text>These topics are also recommended for counseling:</Text>
                <BulletList
                    items={["Progression of disease", "Disclosure"]}
                    id="counseling-topics"
                    textSize="h6"
                />
            </Card>
            <Spacer size={16} />
            <Card leftIcon="list-alt" title="Counseling Offered">
                <View>
                    <Text>
                        Please select which types of counseling you provided during this visit:
                    </Text>
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
            </Card>
            <Spacer size={20} />
        </Screen>
    )
}

export default Counseling
