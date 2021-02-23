import React from "react"
import { useNavigation } from "@react-navigation/native"
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

const FurtherQuestions: React.FC = () => {
    const { presentingSymptoms, presentSymptoms, absentSymptoms, sex, years } = useVisitStore(
        (state) => state,
    )
    const systemsSymptoms = useSystemSymptomStore<SystemSymptomMapping[]>(
        (state) => state.systemsSymptoms,
    )
    const updateVisit = useVisitStore((state) => state.updateVisit)
    const navigation = useNavigation()
    // console.log(visit)
    const [observationState, setObservationState] = React.useState({})
    const [interestingSymptoms, setInterestingSymptoms] = React.useState([])

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
            calculate(observations, sex),
            sex,
            observations,
            5,
            3,
        )
        interestingSymptoms.forEach((symptom) => (observations[symptom] = "absent"))

        // If there are no interesting symptoms to ask about, navigate to the next screens
        if (interestingSymptoms.length === 0) {
            return navigation.navigate("dispensary.AssessmentSummary")
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

export default FurtherQuestions
