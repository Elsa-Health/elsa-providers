import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, TextInput, RadioButton, Divider, Button } from "react-native-paper"
import { Screen, Row, Col } from "../components"
// import { useStores } from "../models/root-store"
import { color, style } from "../theme"

export interface CtcAssessmentQuestionsScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const questions = [
    "Does the patient have abdominal pain?",
    "Is the patient experiencing a burning sensation in any part of their body?",
    "Is the patient experiencing numbness in any part of their body?",
    "Is the patient experiencing tingling in any part of their body?",
    "Does the patient have dizziness?",
    "Does the patient have nightmares?",
    "Does the patient have a cough?",
    "Does the patient have dyspnoea (difficulty breathing)?",
    "Does the patient have diarrhoea?",
    "Is the patient feeling tired or fatigued?",
    "Does the patient have a fever?",
    "Does the patient have a headache?",
    "Does the patient have jaundice?",
    "Is the patient nauseous? ",
    "Does the patient have a skin rash?",
    "Does the patient have urethral discharge?",
    "Is the patient experiencing weight loss?",
    "Does the patient have malaise?",
    "Does the patient have a stiff neck?",
    "Does the patient have photophobia?",
    "Is the patient vomiting or has the patient been vomiting? ",
    "Is the patient in a coma? ",
    "Does the patient have visual loss?",
    "Does the patient have hearing loss or difficulty in hearing?",
    "Is the patient lethargic? ",
    "Is the patient confused or experience confusion?",
    "Does the patient have an altered mental status?",
    "Does the patient have a focal neurological deficit?",
    "Does the patient have diastolic hypertension?",
    "Is the patient experiencing seizures?",
    "Does the patient have a non-productive cough?",
    "Does the patient have eye pain?",
    "Does the patient have decreased visual acuity?",
    "Does the patient have dark colored urine?",
    "Does the patient have clay colored stool?",
    "Does the patient have chills?",
    "Does the patient have chest pain?",
    "Is the patient breathing abnormally quickly?",
    "Does the patient experience hypoxia after exertion?",
    "Has the patient started ARV treatment?",
    "Does the patient have a history of drug resistance?",
    "Does the patient work with or around animals? ",
    "Is the patient pregnant?",
    "Does the patient have anemia? ",
    "Does the patient have hypertension?",
    "Does the patient identify as MSM? ",
    "Does the patient inject drugs or have a history of injecting drugs?",
    "Does the patient have a history of multiple sexual partners?",
    "Has the patient ever been incarcerated?",
    "Is the patient currrently undergoing renal replacement therapy?",
    "Is the patient a healthcare worker or work in a heatlh facility?",
    "Does the patient have diabetes mellitus?",
    "Is the patient HIV+?",
    "Has the patient recently recieved a blood donation?",
    "Has the patient received an HBV vaccination?",
    "Is the patient a recipient of an organ transplant?",
    "Does the patient have a solid tumor (cancer)?",
    "Does the patient have hematologic malignancies?",
    "Does the patient have a history of taking chemotherapy, glucocorticoids, or immunosuppressive medication?",
    "Does the patient have an autoimmune disease?",
    "Does the patient have a history of pneumocystis pneumonia?",
    "Does the patient have oral thrush?",
    "Does the patient have a history of recurrent bacterial pneumonia? ",
    "Does the patient have a history of high plasma HIV RNA levels?",
]

const ROOT: ViewStyle = {
    flex: 1,
}

const AssementQuestionCTC = ({ question }) => {
    const [state, setState] = React.useState("no")
    return (
        <>
            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                <Text style={{ fontSize: 26 }}>{question}</Text>
            </Col>

            <Col md={12} colStyles={[style.headerTextContentVerticalSpacing, { marginBottom: 10 }]}>
                <RadioButton.Group onValueChange={(value) => setState(value)} value={state}>
                    <Row>
                        <Col md={2}>
                            <Row>
                                <Col md={4}>
                                    <RadioButton value="yes" color={color.primary} />
                                </Col>
                                <Col md={8}>
                                    <Text style={style.bodyContent}>Yes</Text>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={2}>
                            <Row>
                                <Col md={4}>
                                    <RadioButton value="no" color={color.primary} />
                                </Col>
                                <Col md={8}>
                                    <Text style={style.bodyContent}>No</Text>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </RadioButton.Group>
            </Col>
        </>
    )
}

const dummyCTCData = [
    { quesiton: "Does the client feel more fatigued or tired than usual?" },
    { quesiton: "Has the client had difficulty breathing for more than 3 days?" },
    { quesiton: "Does the client have a loss of appetite? " },
    {
        quesiton:
            "Does the client have white patches on the back of their throat or inside their mouth?",
    },
]
export const CtcAssessmentQuestionsScreen: React.FunctionComponent<CtcAssessmentQuestionsScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        const navigation = useNavigation()
        return (
            <Screen style={ROOT} preset="scroll" title="Patient Assessment">
                <Row>
                    <Col md={12}>
                        <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                            Please input the following information about your patient.{" "}
                        </Text>
                    </Col>
                    {getRandom(questions, 8).map((question, index) => (
                        <AssementQuestionCTC question={question} key={index} />
                    ))}
                    <Col md={12} colStyles={[{}]}>
                        <Button
                            style={[
                                style.buttonFilled,
                                { paddingHorizontal: 46, alignSelf: "flex-end" },
                            ]}
                            onPress={() => {
                                //navigate here
                                // setDisplayIndex(1)
                                navigation.navigate("ctc-assessment-summary-screen")
                            }}
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
