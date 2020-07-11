import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Dimensions, StatusBar } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
import { Checkbox, TextInput, Button } from "react-native-paper"
import _ from "lodash"
import { useStores } from "../models/root-store"
import { color } from "../theme"

const { width } = Dimensions.get("window")

export interface Covid19PresentationScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

// fever, cough, chest pain, sore throat, dyspnea, central cyanosis, travel history

// fever -> 2days, high fever, low grade,
// cough -> dry, productive, duration
// chest pain -> duration, pain scale
// sore throat -> duration
// dyspnea -> duration, scale
// travel history -> high risk, low risk

interface Qualifiers {
    [k: string]: { name: string; symptom: string }
}

// Experiment
interface Evidence {
    title: string
    symptom: string
    hasDuration: boolean
    isSymptom: boolean
    isRiskFactor: boolean
    hasQualifiers: boolean
    qualifiers: Qualifiers
}

const initialEvidence: Evidence[] = [
    {
        title: "Cough",
        symptom: "cough",
        hasDuration: true,
        isSymptom: true,
        isRiskFactor: false,
        hasQualifiers: true,
        qualifiers: {
            productive: { name: "Productive Cough", symptom: "sputum production" },
            dry: { name: "Dry Cough", symptom: "dry cough" },
        },
    },
    {
        title: "Fever",
        symptom: "fever",
        hasDuration: true,
        isSymptom: true,
        isRiskFactor: false,
        hasQualifiers: false,
        qualifiers: {},
    },
    {
        title: "Chest Pain",
        symptom: "chest pain",
        hasDuration: true,
        isSymptom: true,
        isRiskFactor: false,
        hasQualifiers: false,
        qualifiers: {},
    },
    {
        title: "Difficulty Breathing",
        symptom: "dyspnea",
        hasDuration: true,
        isSymptom: true,
        isRiskFactor: false,
        hasQualifiers: false,
        qualifiers: {},
    },
    {
        title: "Sore Throat",
        symptom: "sore throat",
        hasDuration: false,
        isSymptom: true,
        isRiskFactor: false,
        hasQualifiers: false,
        qualifiers: {},
    },
    {
        title: "Central Cyanosis",
        symptom: "central cyanosis",
        hasDuration: false,
        isSymptom: true,
        isRiskFactor: false,
        hasQualifiers: false,
        qualifiers: {},
    },
    {
        title: "Contact with confirmed COVID-19 patient",
        symptom: "direct contact", // FIXME: Needs to be qualified for COVID-19
        hasDuration: false,
        isSymptom: false,
        isRiskFactor: true,
        hasQualifiers: false,
        qualifiers: {},
    },
]

export const Covid19PresentationScreen: React.FunctionComponent<Covid19PresentationScreenProps> = observer(
    props => {
        const rootStore = useStores()
        const submitEvidence = () => {
            rootStore.predictDiagnoses()
            props.navigation.navigate("assessment-questions")
        }
        return (
            <Screen preset="scroll">
                <StatusBar backgroundColor="#fff" />
                <Header headerText="Patient Presentation" />
                <Text style={{ fontStyle: "italic", padding: 10, paddingTop: 0, marginBottom: 10 }}>
                    Please indicate whether or not your patient has any of the following presenting
                    symptoms. If additional information is requested, please input that as well.
                </Text>

                {initialEvidence.map(evidence => (
                    <PresentationItem
                        key={evidence.symptom}
                        hasDuration={evidence.hasDuration}
                        symptom={evidence.symptom}
                        title={evidence.title}
                        qualifiers={evidence.qualifiers}
                    />
                ))}

                <Button
                    style={{ margin: 10, marginBottom: 20 }}
                    onPress={submitEvidence}
                    mode="contained"
                >
                    <Text color="white">Next</Text>
                </Button>
            </Screen>
        )
    },
)

const initialStatus: "present" | "absent" = "absent"
interface PresentationItemProps {
    symptom: string
    title: string
    hasDuration: boolean
    qualifiers: Qualifiers
}

const PRESENTATION_ITEM_CONTAINER: ViewStyle = {
    margin: 10,
    marginBottom: 15,
    paddingLeft: 5,
    paddingRight: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: color.palette.lighterGrey,
}

const MAIN_SYMPTOM_CHECK_ITEM: ViewStyle = {
    flexDirection: "row",
    marginBottom: 10,
}

const QUALIFIER_CHECK_ITEM: ViewStyle = {
    flexDirection: "row",
    alignItems: "center",
}

const PresentationItem: React.FC<PresentationItemProps> = observer(
    ({ hasDuration, title, symptom, qualifiers }) => {
        const { assessment } = useStores()
        const { patient } = assessment

        const toggleSymptomStatus = (
            status: "present" | "absent" | "skip",
            symp: string = symptom,
        ) => {
            patient.setSymptom(symp, status)
        }

        React.useEffect(() => {
            const initial = { [symptom]: "absent" }
            _.forEach(qualifiers, ({ name, symptom }) => {
                initial[symptom] = "absent"
            })
            patient.bulkSetSymptoms(initial)
            assessment.clearDiagnoses()
            patient.clearSymptoms()
        }, [])
        const status = patient.symptoms[symptom] === "present" ? "present" : "absent"

        return (
            <View style={PRESENTATION_ITEM_CONTAINER}>
                <TouchableOpacity
                    style={MAIN_SYMPTOM_CHECK_ITEM}
                    onPress={() => toggleSymptomStatus(status !== "absent" ? "absent" : "present")}
                >
                    <Text style={{ flex: 9 }} size="h6">
                        {title}
                    </Text>

                    <View style={{ flex: 1 }}>
                        <Checkbox
                            onPress={() =>
                                toggleSymptomStatus(status !== "absent" ? "absent" : "present")
                            }
                            status={status === "present" ? "checked" : "unchecked"}
                        />
                    </View>
                </TouchableOpacity>

                {status === "present" && (
                    <View>
                        {hasDuration && (
                            <TextInput
                                mode="outlined"
                                style={{ marginBottom: 10 }}
                                dense
                                keyboardType="number-pad"
                                label="# of Days"
                            />
                        )}

                        {_.map(qualifiers, ({ name, symptom }) => {
                            const qStatus =
                                patient.symptoms[symptom] === "present" ? "present" : "absent"
                            const altStatus = qStatus === "present" ? "absent" : "present"
                            // console.log("render", qStatus, symptom)
                            return (
                                <TouchableOpacity
                                    key={symptom}
                                    style={QUALIFIER_CHECK_ITEM}
                                    onPress={() => toggleSymptomStatus(altStatus, symptom)}
                                >
                                    <Checkbox
                                        onPress={() => toggleSymptomStatus(altStatus, symptom)}
                                        status={qStatus === "present" ? "checked" : "unchecked"}
                                    />
                                    <Text>{name}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </View>
                )}
            </View>
        )
    },
)
