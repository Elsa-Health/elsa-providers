import React from "react"
import { Screen, Row, Col } from "../components"
import { Divider, Button } from "react-native-paper"
import { Text } from "../components/text/text"
import SearchAndSelectBar from "../components/search-and-select-bar/search-and-select-bar"
import { style, color, md } from "../theme"
import { useNavigation } from "@react-navigation/native"
import { fullFormatDate } from "../common/utils"
import RadioQuestion from "../components/radio-question/radio-question"
import { BOOLEAN_OPTIONS, SYMPTOMS } from "../common/constants"
import { useVisitStore } from "../models/ctc-store"
import { calculate, getObservationsFromLists } from "../elsa-local/curiosity.nb"

interface CtcPatientAssessmentSymptomsProps {}

const CtcPatientAssessmentSymptoms: React.FC<CtcPatientAssessmentSymptomsProps> = ({}) => {
    // const [state, setState] = React.useState({
    //     presentingSymptoms: [],
    //     newSymptoms: false,
    // })

    const state = useVisitStore((state) => state.visit)
    const setState = useVisitStore((state) => state.updateVisit)

    const navigation = useNavigation()

    const toggleSymptom = (symptom: string) => {
        const sym = [...state.presentingSymptoms]
        if (sym.includes(symptom)) {
            setState({ presentingSymptoms: sym.filter((sy) => sy !== symptom) })
        } else {
            setState({ presentingSymptoms: [...sym, symptom] })
        }
    }

    const submitPresentingSymptoms = () => {
        setState({ presentSymptoms: state.presentingSymptoms })
        return navigation.navigate("ctc-assessment-questions-screen")
    }

    return (
        <Screen preset="scroll" title="Patient Assessment">
            <Row>
                <Col md={12} marginVertical={12}>
                    <Row justifyContent="space-between">
                        <Text size="h5" bold>
                            Date of Visit
                        </Text>
                        <Text size="h5">{fullFormatDate(new Date())}</Text>
                    </Row>
                </Col>

                <Col md={12} marginVertical={14}>
                    <Text size="h5" bold>
                        Disease Assessment
                    </Text>

                    <RadioQuestion
                        question="Does the patient have any new symptoms to assess today?"
                        options={BOOLEAN_OPTIONS}
                        onPress={(value) => setState({ newSymptoms: value })}
                        value={state.newSymptoms}
                        id="newPatientSymptoms"
                    />
                </Col>

                <Col md={12} marginVertical={16}>
                    <Text size="h5" bold>
                        Presenting Symptoms
                    </Text>

                    <Text style={[style.bodyContent, { color: "#7B7B7B", fontStyle: "italic" }]}>
                        Please indicate any new symptoms the patient has:
                    </Text>

                    <SearchAndSelectBar
                        options={SYMPTOMS}
                        toggleOption={(symptom) => toggleSymptom(symptom.toLowerCase())}
                        selectedOptions={state.presentingSymptoms}
                    />
                </Col>

                <Col md={12} colStyles={[{}]}>
                    <Button
                        style={[
                            style.buttonFilled,
                            { paddingHorizontal: 46, alignSelf: "flex-end" },
                        ]}
                        onPress={submitPresentingSymptoms}
                        uppercase={false}
                    >
                        <Text style={style.buttonText}>Next</Text>
                    </Button>
                </Col>
            </Row>
        </Screen>
    )
}

export { CtcPatientAssessmentSymptoms }
