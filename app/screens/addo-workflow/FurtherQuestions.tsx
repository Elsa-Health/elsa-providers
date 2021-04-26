import React, { useRef } from "react"
import _ from "lodash"
import { useVisitStore } from "../../models/addo-store"
import { getQuestion } from "../../elsa-local/questions"
import { useLocale } from "../../models/language"
import {
    calculate,
    getObservationsFromLists,
    getRelevantNextNodes,
    Observations,
} from "../../elsa-local/curiosity.nb"
import { useSystemSymptomStore } from "../../models/symptoms-store"
import { SystemSymptomMapping } from "../../common/systemSymptoms"
import { findAllSymptomsWithValue } from "../../components/symptoms-picker/symptomsNetwork"
import QuestionsAssessment from "../../components/questions-assessment/questions-assessment"
import Spacer from "../../components/spacer/spacer"
import { Button, Col, Row, Screen, Text, withPreventDoubleClick } from "../../components"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { StackNavigationProp } from "@react-navigation/stack/lib/typescript/src/types"
import RadioQuestion from "../../components/radio-question/radio-question"
import { BackHandler } from "react-native"

const FurtherQuestions: React.FC = (props: any) => {
    const { params: { interestingSymptoms } = { interestingSymptoms: [] } } = props.route
    const [sex, years, presentSymptoms, absentSymptoms, updateVisit] = useVisitStore((state) => [
        state.sex,
        state.years,
        state.presentSymptoms,
        state.absentSymptoms,
        state.updateVisit,
    ])
    const [enabledNext, setEnabledNext] = React.useState(false)
    const [loading, setLoading] = React.useState(false)

    useFocusEffect(
        React.useCallback(() => {
            console.log("Setting up callback!")
            const onBackPress = () => {
                // Remove all the symptoms that this page is covering from the state
                updateVisit({
                    presentSymptoms: presentSymptoms.filter(
                        (symptom) => !interestingSymptoms.includes(symptom),
                    ),
                    absentSymptoms: absentSymptoms.filter(
                        (symptom) => !interestingSymptoms.includes(symptom),
                    ),
                })
                return false
            }

            // FIXME: NEXT: fix back navigation errors!
            BackHandler.addEventListener("hardwareBackPress", onBackPress)

            return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
        }, [presentSymptoms, absentSymptoms]),
    )

    const navigation = useNavigation()
    // const [observationState, setObservationState] = React.useState({})

    const submitObservations = React.useCallback(() => {
        if (!enabledNext || loading) return
        setLoading(true)
        const { presentSymptoms, absentSymptoms } = useVisitStore.getState()
        const observations: Observations = getObservationsFromLists(_.uniq([...presentSymptoms]), [
            ...absentSymptoms,
        ])

        const interestingSymptoms = getRelevantNextNodes(
            calculate(observations, sex),
            sex,
            observations,
            5,
            6,
        )

        if (interestingSymptoms.length === 0) {
            return navigation.navigate("addo.AssessmentSummary")
        }
        navigation.push("addo.FurtherAssessment", { interestingSymptoms })
        setLoading(false)
    }, [presentSymptoms, absentSymptoms])

    const toggleSymptom = (symptom: string, status: "present" | "absent") => {
        if (!enabledNext) setEnabledNext(true)
        // const isCurrentlyPresent = presentSymptoms.includes(symptom)
        // const isCurrentlyAbsent = absentSymptoms.includes(symptom)
        const { presentSymptoms, absentSymptoms } = useVisitStore.getState()
        console.log("Updating: ", symptom, status)

        let present = [...presentSymptoms]
        let absent = [...absentSymptoms]

        if (status === "present") {
            present.push(symptom)
            absent = absent.filter((sy) => sy !== symptom)
        } else {
            absent.push(symptom)
            present = present.filter((sy) => sy !== symptom)
        }

        updateVisit({ presentSymptoms: _.uniq(present), absentSymptoms: _.uniq(absent) })
    }

    const language = useLocale((state) => state.locale)

    console.log(presentSymptoms, absentSymptoms)

    return (
        <Screen preset="scroll" titleTx="addo.furtherAssessment.title" title="Further Assessment">
            <Spacer size={15} />
            <Row>
                <Text tx="addo.furtherAssessment.subTitle" bold size="h6">
                    Does your patient have any of the following symptoms or risk factors:
                </Text>
            </Row>
            <Spacer size={20} />
            <Row>
                <Col md={12}>
                    {interestingSymptoms.map((symptom, index) => {
                        const question = getQuestion(symptom, language)
                        const value = presentSymptoms.includes(symptom)
                            ? "present"
                            : absentSymptoms.includes(symptom)
                            ? "absent"
                            : "unknown"
                        // console.log("VALUE: ", symptom, value)
                        return (
                            <RadioQuestion
                                key={symptom + "__" + index}
                                id={symptom + "__" + index}
                                onPress={(status: "present" | "absent") =>
                                    toggleSymptom(symptom, status)
                                }
                                value={value}
                                question={question}
                                marginVertical={16}
                            />
                        )
                    })}
                </Col>
            </Row>
            <Button
                style={{ paddingHorizontal: 46, paddingVertical: 5, alignSelf: "flex-end" }}
                onPress={submitObservations}
                disabled={!enabledNext || loading}
                uppercase={false}
                mode="contained"
                label={loading ? "..." : "Next"}
                labelTx="common.next"
            />
        </Screen>
    )
}

// const DebouncedButton = withPreventDoubleClick(Button)

export default FurtherQuestions
