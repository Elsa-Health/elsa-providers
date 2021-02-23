import React from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Screen, Text, Button, Row, Col } from "../../components"
import _ from "lodash"
import { useVisitStore } from "../../models/addo-store"
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
import { BackHandler } from "react-native"
import Spacer from "../../components/spacer/spacer"

const FurtherQuestions: React.FC = () => {
    const [
        sex,
        years,
        presentingSymptoms,
        presentSymptoms,
        absentSymptoms,
        updateVisit,
    ] = useVisitStore((state) => [
        state.sex,
        state.years,
        state.presentingSymptoms,
        state.presentSymptoms,
        state.absentSymptoms,
        state.updateVisit,
    ])
    const systemsSymptoms = useSystemSymptomStore<SystemSymptomMapping[]>(
        (state) => state.systemsSymptoms,
    )
    const navigation = useNavigation()
    // console.log(visit)
    const [observationState, setObservationState] = React.useState({})
    const [interestingSymptoms, setInterestingSymptoms] = React.useState([])

    // Store the assessment stack for navigation
    const [assessmentStack, setAssessmentStack] = React.useState<string[][]>([])

    // console.log("some values", findAllSymptomsWithValue(systemsSymptoms, "present"))

    useFocusEffect(
        React.useCallback(() => {
            const onBackPress = () => {
                const _assessmentStack = _.cloneDeep(assessmentStack)
                const poppedSymptoms = _assessmentStack.pop()
                const newAssessmentStack = _assessmentStack.splice(0, _assessmentStack.length - 1)
                // console.log("Back pressed: ", newAssessmentStack.length)
                if (newAssessmentStack.length === 0) {
                    // disableSelectionMode()
                    // console.log("back pressed")
                    return false
                } else {
                    // When navigating back, remove the current symptoms from the observed states
                    const filteredPresent = presentSymptoms.filter(
                        (sym) => !poppedSymptoms.includes(sym),
                    )
                    const filteredAbsent = absentSymptoms.filter(
                        (sym) => !poppedSymptoms.includes(sym),
                    )
                    updateVisit({
                        presentSymptoms: filteredPresent,
                        absentSymptoms: filteredAbsent,
                    })
                    setAssessmentStack(newAssessmentStack)
                    // console.log(
                    //     "bac pressed false",
                    //     poppedSymptoms,
                    //     _assessmentStack,
                    //     newAssessmentStack[newAssessmentStack.length - 1],
                    // )

                    setInterestingSymptoms(newAssessmentStack[newAssessmentStack.length - 1])

                    const updatedObservations = {}
                    _.keys(observationState)
                        .filter((sym) => !poppedSymptoms.includes(sym))
                        .forEach((sym) => (updatedObservations[sym] = observationState[sym]))
                    setObservationState(updatedObservations)

                    return true
                }
            }

            BackHandler.addEventListener("hardwareBackPress", onBackPress)

            return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress)
        }, [assessmentStack, interestingSymptoms]),
    )

    React.useEffect(() => {
        const presentDefault = findAllSymptomsWithValue(systemsSymptoms, "present")
        // const absentDefault = findAllSymptomsWithValue(systemsSymptoms, "absent")

        // Prevent the re-asking of symptoms already revealed by setting them explicitly
        updateVisit({ presentSymptoms: presentDefault })
    }, [])

    React.useEffect(() => {
        const observations: Observations = getObservationsFromLists(
            _.uniq([...presentingSymptoms, ...presentSymptoms]),
            absentSymptoms,
        )
        const interestingSymptoms = getRelevantNextNodes(
            calculate(observations, sex),
            sex,
            observations,
            5,
            6,
        )

        // console.log("HERE: ", interestingSymptoms, observations)

        interestingSymptoms.forEach((symptom) => (observations[symptom] = "absent"))
        setAssessmentStack((stack) => [...stack, interestingSymptoms])

        setObservationState(observations)
        setInterestingSymptoms(interestingSymptoms)
    }, [presentSymptoms, absentSymptoms])

    React.useEffect(() => {
        // console.log("Changed Interesting symptoms", interestingSymptoms.length)
        // If there are no interesting symptoms to ask about, navigate to the next screens
        if (interestingSymptoms.length === 0 && _.keys(observationState).length > 0) {
            // console.log("Routing o addo ")
            return navigation.navigate("addo.AssessmentSummary")
        }
    }, [interestingSymptoms])

    const submitObservations = () => {
        const present = [...presentSymptoms]
        const absent = [...absentSymptoms]
        _.keys(observationState).forEach((symptom) => {
            if (observationState[symptom] === "absent") {
                // if the symptom is present, remove it from the present symptoms and add it to the absent symptoms
                if (present.includes(symptom)) {
                    present.splice(present.indexOf(symptom), 1)
                }
                absent.push(symptom)
            } else {
                if (absent.includes(symptom)) {
                    absent.splice(absent.indexOf(symptom), 1)
                }
                present.push(symptom)
            }
        })
        updateVisit({ absentSymptoms: absent, presentSymptoms: present })
    }

    // console.log("observations: ", observationState)
    console.log("interestingSymptoms: ", interestingSymptoms)

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
                    <QuestionsAssessment
                        interestingSymptoms={interestingSymptoms}
                        observationState={observationState}
                        setObservationState={setObservationState}
                    />
                </Col>
            </Row>
            {/* <Row justifyContent="flex-end"> */}
            {/* <Col md={12} colStyles={{ alignContent: "flex-end" }}> */}
            <Button
                style={{ paddingHorizontal: 46, paddingVertical: 5, alignSelf: "flex-end" }}
                onPress={submitObservations}
                uppercase={false}
                mode="contained"
                label="Next"
                labelTx="common.next"
            />
            {/* </Col> */}
            {/* </Row> */}
        </Screen>
    )
}

export default FurtherQuestions
