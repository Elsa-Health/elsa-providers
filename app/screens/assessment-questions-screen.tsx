import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Header } from "../components"
import { useStores } from "../models/root-store"
import { color, style } from "../theme"
import _ from "lodash"
import EStyleSheet from "react-native-extended-stylesheet"
import { RadioButton, Button, ActivityIndicator, Colors, Text } from "react-native-paper"
import { getQuestion } from "../common/questions"

export interface AssessmentQuestionsScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

const ACTIVITY_INDICATOR: ViewStyle = {
    marginTop: "40%",
}

export const AssessmentQuestionsScreen: React.FunctionComponent<AssessmentQuestionsScreenProps> = observer(
    (props) => {
        const rootStore = useStores()

        const { application, assessment } = rootStore

        const submit = () => {
            rootStore.predictDiagnoses()
            // props.navigation.navigate("assessment-results")
        }

        if (assessment.reachedDiagnosis && Object.keys(assessment.diagnoses).length > 0) {
            return props.navigation.navigate("assessment-results")
        }

        if (_.keys(assessment.patient.symptoms).length === 0) {
            return props.navigation.navigate("respiratory-presentation")
        }

        return (
            <Screen style={application.loadingAssessments ? ROOT : {}} preset="scroll">
                <Header headerText="Further Assessment" />
                <Text style={{ padding: 10, paddingTop: 0 }}>
                    These questions will help us better identify what is happening with your patient
                    based on the previous symptoms. Please ask the patient each of the questions and
                    record the results.
                </Text>

                {application.loadingAssessments ? (
                    <ActivityIndicator
                        animating={true}
                        color={Colors.purple700}
                        size={32}
                        style={ACTIVITY_INDICATOR}
                    />
                ) : (
                    <View style={{ padding: 10 }}>
                        {assessment.nextNodes.map((node) => (
                            <AssessmentQuestion
                                key={node}
                                symptom={node}
                                question={getQuestion(node, "eng")}
                            />
                        ))}
                        <Button
                            style={{ margin: 10, marginBottom: 20 }}
                            onPress={submit}
                            mode="contained"
                        >
                            <Text color="white">Next</Text>
                        </Button>
                    </View>
                )}
            </Screen>
        )
    },
)

interface AssessmentQuestionProps {
    question: string
    symptom: string
}

const styles = EStyleSheet.create({
    booleanOptionsContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    booleanOption: {
        flexDirection: "row",
        alignItems: "center",
        marginRight: "10%",
    },
    radioOption: {
        flexDirection: "row",
        marginTop: 10,
        alignItems: "center",
        marginRight: "15%",
        width: "90%",
    },
})

export const AssessmentQuestion: React.FC<AssessmentQuestionProps> = observer(
    ({ question, symptom }) => {
        const { assessment } = useStores()

        const status = assessment.patient.symptoms[symptom]
        return (
            <View style={style.contentTextVerticalSpacing}>
                <Text style={style.bodyContent}>{question}</Text>
                <View
                    style={[style.headerTextContentVerticalSpacing, styles.booleanOptionsContainer]}
                >
                    <TouchableOpacity
                        onPress={() => assessment.patient.setSymptom(symptom, "present")}
                        style={styles.booleanOption}
                    >
                        <RadioButton
                            value="present"
                            status={status === "present" ? "checked" : "unchecked"}
                            onPress={() => assessment.patient.setSymptom(symptom, "present")}
                            color={color.primary}
                        />
                        <Text style={style.bodyContent}>Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => assessment.patient.setSymptom(symptom, "absent")}
                        style={styles.booleanOption}
                    >
                        <RadioButton
                            value="absent"
                            status={status === "absent" ? "checked" : "unchecked"}
                            onPress={() => assessment.patient.setSymptom(symptom, "absent")}
                            color={color.primary}
                        />
                        <Text style={style.bodyContent}>No</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    },
)
