import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import _ from "lodash"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, TextInput, RadioButton, Divider, Button } from "react-native-paper"
import { Screen, Row, Col } from "../components"
// import { useStores } from "../models/root-store"
import { color, style } from "../theme"
import { useVisitStore } from "../models/ctc-store"
import {
    getRelevantNextNodes,
    Observations,
    getRelevantNextQuestions,
    getObservationsFromLists,
} from "../elsa-local/curiosity.nb"
import RadioQuestion from "../components/radio-question/radio-question"
import { getQuestion } from "../elsa-local/questions"

export interface CtcAssessmentQuestionsScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

export const CtcAssessmentQuestionsScreen: React.FunctionComponent<CtcAssessmentQuestionsScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        const { presentingSymptoms, presentSymptoms, absentSymptoms } = useVisitStore(
            (state) => state.visit,
        )
        const updateVisit = useVisitStore((state) => state.updateVisit)
        const navigation = useNavigation()
        // console.log(visit)
        const [observationState, setObservationState] = React.useState({})
        const [interestingSymptoms, setInterestingSymptoms] = React.useState([])

        React.useEffect(() => {
            const observations: Observations = getObservationsFromLists(
                _.uniq([...presentingSymptoms, ...presentSymptoms]),
                absentSymptoms,
            )
            const interestingSymptoms = getRelevantNextNodes(undefined, "male", observations, 5, 3)
            interestingSymptoms.forEach((symptom) => (observations[symptom] = "absent"))

            if (interestingSymptoms.length === 0) {
                return navigation.navigate("ctc-patient-adherence-audit")
                // return navigation.navigate("ctc-assessment-summary-screen")
            }
            setObservationState(observations)
            setInterestingSymptoms(interestingSymptoms)
        }, [presentSymptoms, absentSymptoms])

        // const relevantNextQuestions = getRelevantNextQuestions(interestingSymptoms)

        const setSymptomStatus = (symptom: string, status: "present" | "absent") => {
            console.warn("setting", symptom, status)
            setObservationState({ ...observationState, [symptom]: status })
            // if (status === "absent") {
            //     setSymptomAbsent(symptom)
            // } else if (status === "present") {
            //     setSymptomPresent(symptom)
            // }
        }

        const setSymptomAbsent = (symptom) => {
            const present = [...presentSymptoms]
            const absent = [...absentSymptoms]
            // if the symptom is present, remove it from the present symptoms and add it to the absent symptoms
            if (present.includes(symptom)) {
                present.splice(present.indexOf(symptom), 1)
            }
            absent.push(symptom)
            updateVisit({ absentSymptoms: absent, presentingSymptoms: present })
        }

        const setSymptomPresent = (symptom) => {
            const present = [...presentSymptoms]
            const absent = [...absentSymptoms]
            // if the symptom is absent, remove it from the absemt symptoms and add it to the present symptoms
            if (absent.includes(symptom)) {
                absent.splice(absent.indexOf(symptom), 1)
            }
            present.push(symptom)
            updateVisit({ absentSymptoms: absent, presentingSymptoms: present })
        }

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

        console.log(presentSymptoms, absentSymptoms, interestingSymptoms)

        return (
            <Screen preset="scroll" title="Patient Assessment">
                <Row>
                    <Col md={12}>
                        <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                            Please input the following information about your patient.{" "}
                        </Text>
                    </Col>
                    <Col md={12}>
                        {interestingSymptoms.map((symptom, index) => {
                            const question = getQuestion(symptom)
                            return (
                                <RadioQuestion
                                    key={symptom + "__" + index}
                                    id={symptom + "__" + index}
                                    onPress={(status: "present" | "absent") => {
                                        setObservationState((observationState) => ({
                                            ...observationState,
                                            [symptom]: status,
                                        }))
                                    }}
                                    value={observationState[symptom]}
                                    question={question}
                                    marginVertical={16}
                                />
                            )
                        })}
                    </Col>
                    {/* {getRandom(questions, 8).map((question, index) => (
                        <AssementQuestionCTC question={question} key={index} />
                    ))} */}
                    <Col md={12} colStyles={[{}]}>
                        <Button
                            style={[
                                style.buttonFilled,
                                { paddingHorizontal: 46, alignSelf: "flex-end" },
                            ]}
                            onPress={submitObservations}
                            uppercase={false}
                        >
                            <Text style={style.buttonText}>Next</Text>
                        </Button>
                    </Col>
                </Row>
            </Screen>
        )
    },
)

// @ts-ignore
function getRandom(arr, n) {
    // @ts-ignore
    var result = new Array(n),
        len = arr.length,
        taken = new Array(len)
    if (n > len) throw new RangeError("getRandom: more elements taken than available")
    while (n--) {
        var x = Math.floor(Math.random() * len)
        result[n] = arr[x in taken ? taken[x] : x]
        taken[x] = --len in taken ? taken[len] : len
    }
    return result
}
