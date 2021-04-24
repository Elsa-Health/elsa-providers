import React from "react"
import { Screen } from "../../components/screen/screen"
import { Card, Notification, Text, Checkbox, Button } from "../../components"
import { View } from "react-native"
import _ from "lodash"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { COUNSELINGTOPICS } from "../../common/constants"
import { style } from "../../theme"
import shallow from "zustand/shallow"
import { useNavigation } from "@react-navigation/native"
import {
    AdherenceAudit,
    adherenceAuditVariables,
    useAdherenceStore,
    useVisitStore,
} from "../../models/ctc-store"
import Spacer from "../../components/spacer/spacer"
import { adherenceCategoryDescription, adherenceScoreToCategory } from "./AssessmentSummary"

const topicImportances: Partial<adherenceAuditVariables>[] = [
    "shareDrugs",
    "understandRegimen",
    "frequentAlcoholUse",
    "education", //
    "sideEffects",
    "employed",
]

const otherCounselingTopics = ["Disease progression", "Disclosure of HIV status"]

const Counseling: React.FC = ({ route }) => {
    const navigation = useNavigation()
    const state = useVisitStore((state) => state.visit)
    const setState = useVisitStore((state) => state.updateVisit)

    const adherence = useAdherenceStore()

    const principalComponents: string[] = [
        adherence.shareDrugs ? "Drug sharing with friends and family" : null,
        adherence.understandRegimen ? null : "Review ART regimen requirements",
        adherence.frequentAlcoholUse ? "Reducing alcohol intake" : null,
        adherence.sideEffects ? "Managing Side Effects" : null,
        adherence.employed ? "Looking for employment" : null,
    ].filter((pc) => pc !== null)

    const toggleCounseling = (topic: string) => {
        if (state.counseling.includes(topic)) {
            setState({ counseling: state.counseling.filter((counsel) => counsel !== topic) })
        } else {
            setState({ counseling: [...state.counseling, topic] })
        }
    }

    const submit = () => {
        navigation.goBack()
    }

    const counselingTopics = [...COUNSELINGTOPICS, ...principalComponents, ...otherCounselingTopics]
        .sort()
        .map((topic) => ({
            label: topic,
            value: topic,
            name: topic,
            id: _.kebabCase(topic),
        }))

    let risk = 0.0

    if (route.params?.risk) {
        risk = Number((route.params?.risk * 100).toFixed(2))
    }

    return (
        <Screen preset="scroll" title="Counseling">
            <Card
                marginVertical={20}
                leftIcon="format-list-bulleted"
                title="Enhanced Adherence Counseling"
            >
                <Notification
                    title={`Your patients risk of non-adherence is ${risk}%.`}
                    variation={risk > 70 ? "danger" : "info"}
                    visible={true}
                >
                    <Text size="h6">
                        {adherenceCategoryDescription[adherenceScoreToCategory(risk / 100)]}
                    </Text>
                </Notification>

                <Spacer size={10} />
                <Text size="h5">
                    Focus on the following during adherence counseling. Please tick the topics you
                    discuss.
                </Text>
                <View style={{ paddingLeft: 30, marginVertical: 10 }}>
                    {principalComponents.map((pc) => (
                        <View key={pc}>
                            <Checkbox
                                text={pc}
                                onToggle={() => toggleCounseling(pc)}
                                value={state.counseling.includes(pc)}
                            />
                            <Spacer size={10} />
                        </View>
                    ))}

                    {/* <Checkbox text="Drug sharing with friends or family" /> */}
                </View>
            </Card>

            <Card marginVertical={10} leftIcon="format-list-bulleted" title="Other Counseling">
                <Text size="h5">
                    These topics are also recommended for counseling. Please tick the topics you
                    discussed
                </Text>
                <View style={{ paddingLeft: 30, marginVertical: 10 }}>
                    {otherCounselingTopics.map((topic) => (
                        <View key={topic}>
                            <Checkbox
                                text={topic}
                                onToggle={() => toggleCounseling(topic)}
                                value={state.counseling.includes(topic)}
                            />
                            <Spacer size={10} />
                        </View>
                    ))}
                    {/* <Checkbox onToggle={() => toggleCounseling("DiseasePr")} text="Disease progression" value={true} />
                    <Spacer size={10} />
                    <Checkbox text="Disclosure of HIV status" /> */}
                </View>
                <Spacer size={10} />
                <Text size="h5" style={{}}>
                    Are there additional topics of counseling that you provided during this visit?
                </Text>

                {/* FIXME: This onSelectedItemsChange returns the id of the items ... this should be changed to the name */}
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
            </Card>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Button
                    contentStyle={{ marginHorizontal: 40 }}
                    label="Next"
                    mode="contained"
                    onPress={submit}
                />
            </View>

            <Spacer size={20} />
        </Screen>
    )
}

export default Counseling
