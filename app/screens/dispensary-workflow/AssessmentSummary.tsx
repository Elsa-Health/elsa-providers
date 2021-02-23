import React from "react"
import _ from "lodash"
import { calculate, diagnosesList, getObservationsFromLists } from "../../elsa-local/curiosity.nb"
import { useVisitStore } from "../../models/addo-store"
import { Button, Card, Notification, Screen, Text } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { DiseaseDistribution } from ".."
import { Divider } from "react-native-paper"
import { View } from "react-native"
import { color, md, style } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import {
    DiseaseNextStepCard,
    getRiskLevel,
    riskLevelNotification,
} from "../addo-workflow/AssessmentSummary"
import { getDiagnosisNextSteps } from "../addo-workflow/nextSteps"
import { useLocale } from "../../models/language"
import SectionedMultiSelect from "react-native-sectioned-multi-select"

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
    const [
        presentSymptoms,
        absentSymptoms,
        dispenserDifferentialDiagnosis,
        setState,
    ] = useVisitStore((state) => [
        state.presentSymptoms,
        state.absentSymptoms,
        state.dispenserDifferentialDiagnosis,
        state.updateVisit,
    ])

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
        .slice(0, md ? 4 : 3)

    const diagnosesNextSteps = diagnosesLikelihoods.map((likelihood) =>
        getDiagnosisNextSteps(likelihood.diag),
    )

    const riskLevel = presentSymptoms.some((sym) => dangerSigns.includes(sym))
        ? "high"
        : getRiskLevel(diagnosesNextSteps, diagnosesLikelihoods)

    // console.log(state.presentSymptoms)

    return (
        <Screen preset="scroll" title="Assessment Summary">
            <Spacer size={20} />
            <Card title="Disease Assessment">
                <Text style={[{ fontStyle: "italic" }]}>
                    Based on our assessment, these are the likely conditions for your patient.
                </Text>
                <Spacer size={25} />

                <DiseaseDistribution height={350} diagnoses={diagnosesLikelihoods} />
                <Spacer size={10} />
            </Card>
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
                <Text size="h6" bold>
                    Next Steps
                </Text>
                <Text size="h7">
                    Based on the most likely condition above, you should consider the following
                    recommendations.
                </Text>

                <Spacer size={5} />

                <DiseaseNextStepCard
                    title={diagnosesLikelihoods[0].name}
                    collapsible={false}
                    nextSteps={getDiagnosisNextSteps(diagnosesLikelihoods[0].diag)}
                />
            </View>

            <Spacer size={20} />
            <Divider />
            <Spacer size={20} />

            <View>
                <Text>Recommendations for other possible conditions:</Text>
                <DiseaseNextStepCard
                    title={diagnosesLikelihoods[1].name}
                    collapsible={true}
                    nextSteps={getDiagnosisNextSteps(diagnosesLikelihoods[1].diag)}
                />
                <DiseaseNextStepCard
                    title={diagnosesLikelihoods[2].name}
                    collapsible={true}
                    nextSteps={getDiagnosisNextSteps(diagnosesLikelihoods[2].diag)}
                />
            </View>

            <Spacer size={20} />

            <Card leftIcon="magnify-plus-outline" title="Condition Decision">
                {/* <Text tx="addo.assessmentSummary.conditionDecision" size="h6" bold>
                    Condition Decision
                </Text> */}
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
            </Card>

            <Spacer size={20} />

            <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                <Button
                    onPress={() => navigation.navigate("dispensary.AssessmentFeedback")}
                    label="Next"
                    labelSize="h6"
                    mode="contained"
                    style={{ paddingHorizontal: 72, paddingVertical: 8 }}
                />
            </View>
        </Screen>
    )
}

const dangerSigns = ["dyspnoea", "chest pain", "cyanosis"]

export default AssessmentSummary
