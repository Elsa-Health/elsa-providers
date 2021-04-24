import React from "react"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Screen, Text, Button, Row, Col } from "../../components"
import _ from "lodash"
import { useVisitStore } from "../../models/ctc-store"
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

const FurtherAssessment: React.FC = () => {
    const { presentingSymptoms, presentSymptoms, absentSymptoms } = useVisitStore(
        (state) => state.visit,
    )
    const systemsSymptoms = useSystemSymptomStore<SystemSymptomMapping[]>(
        (state) => state.systemsSymptoms,
    )
    const [updateVisit, patientFile] = useVisitStore((state) => [
        state.updateVisit,
        state.patientFile,
    ])
    const navigation = useNavigation()
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
                if (newAssessmentStack.length === 0) {
                    // disableSelectionMode()
                    console.log("back pressed")
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
                    console.log("bac pressed false", poppedSymptoms, _assessmentStack)

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

    // console.log("some values", findAllSymptomsWithValue(systemsSymptoms, "present"))

    React.useEffect(() => {
        const presentDefault = findAllSymptomsWithValue(systemsSymptoms, "present")
        const absentDefault = findAllSymptomsWithValue(systemsSymptoms, "absent")

        // Prevent the re-asking of symptoms already revealed by setting them explicitly
        updateVisit({ presentSymptoms: presentDefault, absentSymptoms: absentDefault })
    }, [])

    React.useEffect(() => {
        const observations: Observations = getObservationsFromLists(
            _.uniq([...presentingSymptoms, ...presentSymptoms]),
            absentSymptoms,
        )
        const interestingSymptoms = getRelevantNextNodes(
            calculate(observations, patientFile.sex),
            patientFile.sex,
            observations,
            5,
            3,
        )

        console.log(
            "Observations: ",
            observations,
            _.uniq([...presentingSymptoms, ...presentSymptoms]),
            absentSymptoms,
        )

        interestingSymptoms.forEach((symptom) => (observations[symptom] = "absent"))
        setAssessmentStack((stack) => [...stack, interestingSymptoms])

        // If there are no interesting symptoms to ask about, navigate to the next screens
        if (interestingSymptoms.length === 0) {
            // onPress={() => navigation.navigate("ctc.FurtherAssessment")}
            return navigation.navigate("ctc.AdherenceAssessment")
        }

        setObservationState(observations)
        setInterestingSymptoms(interestingSymptoms)
    }, [presentSymptoms, absentSymptoms])

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
        // navigation.navigate("ctc-patient-adherence-audit")
    }

    return (
        <Screen preset="scroll" title="Further Assessment">
            <Row>
                <Col md={12}>
                    <Text style={{ fontStyle: "italic" }}>
                        Please input the following information about your patient.{" "}
                    </Text>
                </Col>
                <Col md={12}>
                    <QuestionsAssessment
                        interestingSymptoms={interestingSymptoms}
                        observationState={observationState}
                        setObservationState={setObservationState}
                    />
                </Col>
                {/* {getRandom(questions, 8).map((question, index) => (
                        <AssementQuestionCTC question={question} key={index} />
                    ))} */}
                <Col md={12} colStyles={[{}]}>
                    <Button
                        style={{ paddingHorizontal: 46, alignSelf: "flex-end" }}
                        onPress={submitObservations}
                        uppercase={false}
                        mode="contained"
                        label="Next"
                    />
                </Col>
            </Row>
        </Screen>
    )
}

export default FurtherAssessment
