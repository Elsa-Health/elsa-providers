import React, { useEffect, useState } from "react"
import _ from "lodash"
import { calculate, diagnosesList, getObservationsFromLists } from "../../elsa-local/curiosity.nb"
import { useVisitStore } from "../../models/addo-store"
import { Button, Card, Col, Notification, Row, Screen, Text } from "../../components"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import Spacer from "../../components/spacer/spacer"
import { DiseaseDistribution } from ".."
import { Divider } from "react-native-paper"
import { BackHandler, View, TouchableOpacity } from "react-native"
import { color, style } from "../../theme"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import BulletList from "../../components/bullet-list/bullet-list"
import { getDiagnosisNextSteps, NextStep } from "./nextSteps"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { pickerOptionsFromList } from "../../common/utils"
import { useLocale } from "../../models/language"

const diagnosisOptions = diagnosesList.sort().map((key, index) => {
    return {
        name: key
            .split("-")
            .map((word) => _.upperFirst(word))
            .join(" "),
        id: index,
        // children: pickerOptionsFromList(diagnosesList[key]).map(({ label, value }) => ({
        //     label,
        //     value,
        //     name: label,
        //     id: value,
        // })),
    }
})

const AssessmentSummary: React.FC = () => {
    const navigation = useNavigation()
    const translateChoice = useLocale((state) => state.translateChoice)
    const [viewMode, setViewMode] = useState<"bar" | "text">("text")
    const [
        presentSymptoms,
        absentSymptoms,
        dispenserDifferentialDiagnosis,
        setDiagnoses,
        setState,
    ] = useVisitStore((state) => [
        state.presentSymptoms,
        state.absentSymptoms,
        state.dispenserDifferentialDiagnosis,
        state.setDiagnoses,
        state.updateVisit,
    ])
    const [diagnosesLikelihoods, setDiagnosesLikelihoods] = React.useState<any[]>([])

    // useFocusEffect(
    //     React.useCallback(() => {
    //         const onBackPress = () => true

    //         BackHandler.addEventListener("hardwareBackPress", onBackPress)

    //         return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
    //     }, []),
    // )

    useEffect(() => {
        const causeLikelihoods = calculate(
            getObservationsFromLists(presentSymptoms, absentSymptoms),
            "male",
        )

        const diagnosesLikelihoods = _.sortBy(
            _.map(causeLikelihoods, (value, key) => ({
                diag: key,
                name: _.upperFirst(key),
                p: value.toFixed(2),
            })),
            ["p"],
        )
            .reverse()
            .slice(0, 10)

        setDiagnosesLikelihoods(diagnosesLikelihoods)
        setDiagnoses(diagnosesLikelihoods)
    }, [])

    const diagnosesNextSteps = diagnosesLikelihoods.map((likelihood) =>
        getDiagnosisNextSteps(likelihood.diag),
    )

    const riskLevel = presentSymptoms.some((sym) => dangerSigns.includes(sym))
        ? "high"
        : getRiskLevel(diagnosesNextSteps, diagnosesLikelihoods)

    console.log(riskLevel)
    if (diagnosesLikelihoods.length < 3) return <View />
    return (
        <Screen preset="scroll" titleTx="addo.assessmentSummary.title" title="Assessment Summary">
            {/* <Card title="Disease Assesment"> */}
            <Spacer size={25} />
            <Text bold tx="addo.assessmentSummary.diseaseAssessment" size="h6">
                Disease Assessment
            </Text>
            <Spacer size={15} />
            {viewMode === "text" ? (
                <Card containerStyle={{ paddingVertical: 10 }}>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 10,
                            padding: 10,
                            paddingTop: 5,
                        }}
                        onPress={() => setViewMode("bar")}
                    >
                        <MaterialIcon name="chart-bar" size={25} />
                    </TouchableOpacity>
                    <Text
                        size="h4"
                        text={`${diagnosesLikelihoods?.[0].name}: ${diagnosesLikelihoods?.[0].p}%`}
                    />
                    <Spacer size={20} />
                    <Text
                        size="h4"
                        text={`${diagnosesLikelihoods?.[1].name}: ${diagnosesLikelihoods?.[1].p}%`}
                    />
                    <Spacer size={20} />
                    <Text
                        size="h4"
                        text={`${diagnosesLikelihoods?.[2].name}: ${diagnosesLikelihoods?.[2].p}%`}
                    />
                </Card>
            ) : null}
            {viewMode === "bar" ? (
                <Card containerStyle={{ paddingVertical: 15 }}>
                    <TouchableOpacity
                        style={{
                            position: "absolute",
                            right: 10,
                            padding: 10,
                            paddingTop: 5,
                        }}
                        onPress={() => setViewMode("text")}
                        hitSlop={{ bottom: 10, right: 10, left: 10, top: 10 }}
                    >
                        <MaterialIcon name="text-subject" size={25} />
                    </TouchableOpacity>
                    <DiseaseDistribution
                        height={300}
                        diagnoses={diagnosesLikelihoods?.slice(0, 3)}
                    />
                </Card>
            ) : null}

            <Spacer size={25} />
            <Notification
                visible={true}
                variation={riskLevel === "high" ? "danger" : "info"}
                title={translateChoice(riskLevelNotification[riskLevel].title)}
            >
                <Text>{translateChoice(riskLevelNotification[riskLevel].description)}</Text>
            </Notification>

            <Spacer size={20} />
            <Divider />
            <Spacer size={20} />

            <View>
                <Text size="h6" tx="common.nextSteps" bold>
                    Next Steps
                </Text>
                <Text size="h7" tx="addo.assessmentSummary.nextStepsSubtitle">
                    Based on the most likely condition above, you should consider the following
                    recommendations.
                </Text>

                <Spacer size={5} />

                <DiseaseNextStepCard
                    title={diagnosesLikelihoods?.[0].name}
                    collapsible={false}
                    nextSteps={diagnosesNextSteps?.[0]}
                />
            </View>

            <Spacer size={20} />
            <Divider />
            <Spacer size={20} />

            <View>
                <Text tx="addo.assessmentSummary.otherConditionsHeading">
                    Recommendations for other possible conditions:
                </Text>
                <DiseaseNextStepCard
                    title={diagnosesLikelihoods?.[1].name}
                    collapsible={true}
                    nextSteps={diagnosesNextSteps?.[1]}
                />
                <DiseaseNextStepCard
                    title={diagnosesLikelihoods?.[2].name}
                    collapsible={true}
                    nextSteps={diagnosesNextSteps?.[2]}
                />
            </View>

            <Spacer size={20} />
            <Divider />
            <Spacer size={20} />

            <View>
                <Text tx="addo.assessmentSummary.conditionDecision" size="h6" bold>
                    Condition Decision
                </Text>
                <Text tx="addo.assessmentSummary.conditionDecisionSubTitle" size="h7">
                    Based on your knowledge and assessment, what is your opinion of the underlying
                    condition causing this patient’s symptoms?
                </Text>

                <Spacer size={5} />

                <SectionedMultiSelect
                    items={diagnosisOptions}
                    // items={[{ name: "hello", id: "1" }]}
                    uniqueKey="id"
                    // subKey="children"
                    selectText="Search..."
                    styles={style.multiSelect}
                    showDropDowns={false}
                    // readOnlyHeadings={true}
                    // expandDropDowns
                    // chipsPosition="top"
                    single
                    // displayKey="name"
                    onSelectedItemsChange={(items) => {
                        // console.warn(items[0])
                        setState({
                            dispenserDifferentialDiagnosis: diagnosisOptions.find(
                                (diag) => diag.id === items[0],
                            )?.name,
                        })
                    }}
                    selectedItems={[
                        diagnosisOptions.find(
                            (diag) => diag.name === dispenserDifferentialDiagnosis,
                        )?.id,
                    ]}
                />
            </View>

            <Spacer size={20} />

            <Button
                style={{ paddingHorizontal: 46, paddingVertical: 5, alignSelf: "flex-end" }}
                onPress={() => navigation.navigate("addo.AssessmentFeedback")}
                label="Next"
                labelSize="default"
                mode="contained"
                labelTx="common.next"
            />

            <Spacer size={5} />
        </Screen>
    )
}

interface DiseaseNextStepCardProps {
    title: string
    nextSteps: NextStep
    collapsible: boolean
}

export const DiseaseNextStepCard: React.FC<DiseaseNextStepCardProps> = ({
    title,
    nextSteps,
    collapsible,
}) => {
    const { recommendations, triageDescription, medications, tests } = nextSteps
    console.log(nextSteps)
    const listNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse()
    return (
        <Card title={title} collapsible={collapsible} defaultCollapsed={collapsible}>
            {nextSteps.triageDescription?.length > 0 && (
                <Row marginVertical={3}>
                    <Col xs={1} sm={1} md={1}>
                        <NumericBullet number={listNumbers.pop()} />
                    </Col>
                    <Col colStyles={{ paddingLeft: 5 }} xs={11} marginTop={2} sm={11} md={11}>
                        <Text bold lineHeight={18}>
                            {nextSteps.triageDescription}
                        </Text>
                    </Col>
                </Row>
            )}

            {nextSteps.medications.length > 0 && (
                <Row marginVertical={6}>
                    <Col xs={1} sm={1} md={1}>
                        <NumericBullet number={listNumbers.pop()} />
                    </Col>
                    <Col colStyles={{ paddingLeft: 5 }} xs={11} marginTop={2} sm={11} md={11}>
                        <Spacer size={10} horizontal />
                        <Text
                            tx="addo.assessmentSummary.recommendedMedicationsTitle"
                            bold
                            lineHeight={18}
                        >
                            For this condition, the medication often prescribed is:
                        </Text>
                    </Col>

                    <Col sm={12} md={12} xs={12}>
                        <BulletList
                            items={nextSteps.medications}
                            id="medicationsList"
                            textSize="default"
                        />
                    </Col>
                </Row>
            )}

            {nextSteps.tests.length > 0 && (
                <Row marginVertical={6}>
                    <Col xs={1} sm={1} md={1}>
                        <NumericBullet number={listNumbers.pop()} />
                    </Col>
                    <Col colStyles={{ paddingLeft: 5 }} xs={11} marginTop={2} sm={11} md={11}>
                        <Spacer size={10} horizontal />
                        <Text
                            tx="addo.assessmentSummary.recommendedTestsTitle"
                            bold
                            lineHeight={18}
                        >
                            For this condition, the tests typically completed are:
                        </Text>
                    </Col>

                    <Col xs={12} sm={12} md={12} xs={12}>
                        <BulletList items={nextSteps.tests} id="testsList" textSize="default" />
                    </Col>
                </Row>
            )}

            {recommendations?.length > 0 && (
                <Row marginVertical={6}>
                    <Col xs={1} sm={1} md={1}>
                        <NumericBullet number={listNumbers.pop()} />
                    </Col>
                    <Col colStyles={{ paddingLeft: 5 }} xs={11} marginTop={5} sm={11} md={11}>
                        <Spacer size={10} horizontal />
                        <Text bold lineHeight={18} style={{ flexWrap: "wrap" }}>
                            {nextSteps.recommendations}
                        </Text>
                    </Col>
                </Row>
            )}
        </Card>
    )
}

interface NumericBulletProps {
    number: string | number
}

const NumericBullet: React.FC<NumericBulletProps> = ({ number }) => (
    <View
        style={{
            height: 25,
            width: 25,
            borderRadius: 100,
            backgroundColor: color.primary,
            justifyContent: "center",
        }}
    >
        <Text align="center" size="small" color="white">
            {number}
        </Text>
    </View>
)

const dangerSigns = ["dyspnoea", "chest pain", "fever", "cyanosis", "seizures", "blurred vision"]

export function getRiskLevel(
    nextSteps: NextStep[],
    diagnosesLikelihoods,
): "high" | "medium" | "low" | "none" {
    const probabilities = diagnosesLikelihoods.map((likelyhood) => likelyhood.p)
    const immediateReferals = diagnosesLikelihoods.filter(
        (likelihood) => getDiagnosisNextSteps(likelihood.diag).triageLevel === "refer immediately",
    )

    const mediumReferrals = diagnosesLikelihoods.filter(
        (likelihood) =>
            getDiagnosisNextSteps(likelihood.diag).triageLevel === "refer within 2 weeks" ||
            getDiagnosisNextSteps(likelihood.diag).triageLevel === "refer within 2 days",
    )

    if (immediateReferals.find((condition) => Number(condition.p) > 40)) return "high"

    if (mediumReferrals.find((condition) => Number(condition.p) > 40)) return "medium"

    if (_.max(probabilities) < 15) return "none"
    if (_.max(probabilities) < 25) return "low"

    return "high"
}

interface RiskLevelNotification {
    [key: string]: {
        title: [string, string]
        description: [string, string]
    }
}

export const riskLevelNotification: RiskLevelNotification = {
    low: {
        title: ["Elsa's Recommendation", "Pendekezo la Elsa"],
        description: [
            "The patient’s condition is not severe. It is recommended that you dispense medication and advise them to rest at home.",
            "Hali ya mgonjwa sio kali. Inashauriwa utoe dawa na umshauri kupumzika nyumbani.",
        ],
    },
    medium: {
        title: ["Elsa's Recommendation", "Pendekezo la Elsa"],
        description: [
            "The patient is unwell. It is recommended that you refer them to a health facility for further investigations. Dispense medications as needed.",
            "Mgonjwa hana afya. Inashauriwa umuelekeze kwenye kituo cha afya kwa uchunguzi zaidi. Toa dawa kama zinahitajika.",
        ],
    },
    high: {
        title: ["Elsa's Recommendation", "Pendekezo la Elsa"],
        description: [
            "The patient’s condition is severe or they have one or more danger signs. It is recommended that you refer them to a health facility immediately.",
            "Hali ya mgonjwa ni kali au ana ishara moja au zaidi ya hatari. Inashauriwa umuelekeze kwenye kituo cha afya mara moja.",
        ],
    },
    none: {
        title: ["Elsa's Recommendation", "Pendekezo la Elsa"],
        description: [
            "The patient seems healthy or we do not cover the condition that they might have. If the patient has any symptoms or feels unwell, refer them to a facility.",
            "Mgonjwa anaonekana kuwa mzima au hatujazi hali ambayo anaweza kuwa nayo. Ikiwa mgonjwa ana dalili zozote au anajisikia vibaya, mpeleke kwenye kituo.",
        ],
    },
}

export default AssessmentSummary
