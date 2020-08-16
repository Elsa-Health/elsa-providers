import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, TextInput, RadioButton, Divider, Button } from "react-native-paper"
import { Screen, Row, Col } from "../components"
// import { useStores } from "../models/root-store"
import _ from "lodash"
import { color, style, md } from "../theme"
import { friendlyFormatDate, fullFormatDate } from "../common/utils"
import { Picker } from "@react-native-community/picker"
import SearchAndSelectBar from "../components/search-and-select-bar/search-and-select-bar"
const Item = Picker.Item as any

export interface CtcPatientAssessmentScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

const arvStages = ["Stage 1", "Stage 2", "Stage 3", "Stage 4"]
const functionalStages = ["working", "bedridden", "ambulatory"]
const currentMedication = ["antibiotics", "antimalarials", "diuretics"]
const comninations = [
    "ARV Combination Program",
    "Treatment Naive",
    "1a = d4T, 3TC, NVP (pediatric patients)",
    "1a (30) = d4T (30), 3TC, NVP",
    "1a (30) L = d4T (30), 3TC, NVP loading dose",
    "1a (40) = d4T (40), 3TC, NVP",
    "1a (40) L = d4T (40), 3TC, NVP loading dose",
    "1b = ZDV, 3TC, NVP",
    "1c = ZDV, 3TC, EFV",
    "1d (30) = d4T (30), 3TC, EFV",
    "1d (40) = d4T (40), 3TC, EFV",
    "2a = ABC, ddl, LPV/r",
    "2b = ABC, ddl, SQV/r",
    "2c - ABC, ddl, NFV",
    "99 - Other (Specify)",
]
const symptomSet = [
    "Abdominal pain",
    "Burning",
    "Numb",
    "Tingling",
    "Dizziness",
    "Nightmare ",
    "Cough",
    "Dyspnoea",
    "Diarrhoea",
    "Fatigue",
    "Fever",
    "Headache",
    "Jaundice",
    "Nausea",
    "Skin rash",
    "Urethral discharge",
    "Weight loss",
    "Malaise",
    "Stiff neck",
    "Photophobia",
    "Vomiting",
    "Coma",
    "Visual loss",
    "Hearing loss",
    "Lethargy",
    "Confusion",
    "Altered mental status",
    "Focal neurological deficit",
    "Diastolic hypertension",
    "Seizures",
    "Non productive cough",
    "Eye pain",
    "Decreased visual acuity",
    "Dark coloured urine",
    "Clay coloured stools",
    "Chills",
    "Chest pain",
    "Tachypneoa",
    "Hypoxia after extertion",
]
const knownConditions = [
    "Diabetes",
    "Hypertension",
    "Tuberculosis",
    "HIV Encephalopathy",
    "Genital ulcer disease",
    "IRIS",
    "Karposi Saccoma",
    "Molluscum",
    "Osephageal candidiasis",
    "Partoid enlargement",
    "Pelvic inflammatory disease",
    "Papular pruritic eruptions",
    "Oral thrush",
    "Vaginal thrush",
    "Ulcer",
    "Zoster",
    "Pneumonia",
    "Pneumocystis pneumonia",
    "Dementia",
    "Cryptococcal meningitis",
    "Anaemia",
    "Depression",
    "Anxiety",
]
const adhStatus = ["Good", "Poor", "N/A"]

export const CtcPatientAssessmentScreen: React.FunctionComponent<CtcPatientAssessmentScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        const navigation = useNavigation()
        const [value, setValue] = React.useState("male")
        const [displayIndex, setDisplayIndex] = React.useState(0)
        const [state, setState] = React.useState({
            maritalStatus: "",
            month: "",
            year: "",
            day: "",
            arvStage: "",
            pregnant: "false",
            cotrim: "false",
            diflucan: "false",
            currentMedication: "antibiotics",
            combination: "ARV Combination Program",
            adhStatus: "Good",
            functionalStage: "working",
            presentingSymptoms: [],
            conditions: [],
        })

        const toggleSymptom = (symptom: string) => {
            const sym = [...state.presentingSymptoms]
            if (sym.includes(symptom)) {
                updateState(
                    "presentingSymptoms",
                    sym.filter((sy) => sy !== symptom),
                )
            } else {
                updateState("presentingSymptoms", [...sym, symptom])
            }
        }
        const toggleCondition = (condition: string) => {
            const cond = [...state.conditions]
            if (cond.includes(condition)) {
                updateState(
                    "conditions",
                    cond.filter((sy) => sy !== condition),
                )
            } else {
                updateState("conditions", [...cond, condition])
            }
        }
        const updateState = (name: string, value: any) => {
            setState({ ...state, [name]: value })
        }

        return (
            <Screen style={ROOT} preset="scroll" title="Patient Assessment">
                <Row>
                    <Col md={12}>
                        <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                            Please input the following information about your patient.{" "}
                        </Text>
                    </Col>
                    {displayIndex == 0 ? (
                        <>
                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Row rowStyle={{ backgroundColor: "red", width: "100%" }}>
                                    <Col md={6} colStyles={{}}>
                                        <Text
                                            style={[style.bodyContent, { alignSelf: "flex-start" }]}
                                        >
                                            Date of Visit
                                        </Text>
                                    </Col>
                                    <Col md={6} colStyles={[{}]}>
                                        <Text
                                            style={[style.bodyContent, { alignSelf: "flex-end" }]}
                                        >
                                            {fullFormatDate(new Date())}
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>Patient Information</Text>
                            </Col>

                            <Col md={6}>
                                <TextInput
                                    // value={state.activationCode}
                                    keyboardType="decimal-pad"
                                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                                    mode="outlined"
                                    label="Weight (kgs)"
                                    style={style.input}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: color.primary } }}
                                />
                            </Col>

                            <Col md={6}>
                                <TextInput
                                    // value={state.activationCode}
                                    keyboardType="decimal-pad"
                                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                                    mode="outlined"
                                    label="Height/Length (cm)"
                                    style={style.input}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: color.primary } }}
                                />
                            </Col>

                            <Col md={6} colStyles={style.contentTextVerticalSpacing}>
                                <View
                                    style={[
                                        {
                                            backgroundColor: "#F3F3F3",
                                            borderColor: "#A8A8A8",
                                            borderWidth: 0.5,
                                            color: "rgba(0, 0, 0, 0.32)",
                                            paddingVertical: 4,
                                            paddingHorizontal: 4,
                                        },
                                    ]}
                                >
                                    <Picker
                                        // style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                        selectedValue={state.arvStage}
                                        onValueChange={(v) => setState({ ...state, arvStage: v })}
                                        accessibilityLabel="WHO Clinical Stage"
                                        mode="dialog"
                                    >
                                        <Item label="WHO Clinical Stage" value="0" />
                                        {arvStages.map((item, index) => (
                                            <Item label={item + ""} value={index + 1} />
                                        ))}
                                    </Picker>
                                </View>
                            </Col>

                            <Col md={6} colStyles={style.contentTextVerticalSpacing}>
                                <View
                                    style={[
                                        {
                                            backgroundColor: "#F3F3F3",
                                            borderColor: "#A8A8A8",
                                            borderWidth: 0.5,
                                            color: "rgba(0, 0, 0, 0.32)",
                                            paddingVertical: 4,
                                            paddingHorizontal: 4,
                                        },
                                    ]}
                                >
                                    <Picker
                                        // style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                        selectedValue={state.functionalStage}
                                        onValueChange={(v) =>
                                            setState({ ...state, functionalStage: v })
                                        }
                                        accessibilityLabel="Functional Status"
                                        mode="dialog"
                                    >
                                        <Item label="Functional Status" value="0" />
                                        {functionalStages.map((item, index) => (
                                            <Item
                                                label={_.upperFirst(item + "")}
                                                key={item}
                                                value={index + 1}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </Col>

                            <Col md={6} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>Is the patient pregnant?</Text>
                            </Col>
                            <Col md={6} colStyles={style.contentTextVerticalSpacing}>
                                <RadioButton.Group
                                    onValueChange={(value) => updateState("pregnant", value)}
                                    value={state.pregnant}
                                >
                                    <Row>
                                        <Col md={6}>
                                            <Row>
                                                <Col md={4}>
                                                    <RadioButton
                                                        value={"true"}
                                                        color={color.primary}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Text style={style.bodyContent}>Yes</Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={6}>
                                            <Row>
                                                <Col md={4}>
                                                    <RadioButton
                                                        value={"false"}
                                                        color={color.primary}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Text style={style.bodyContent}>No</Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </RadioButton.Group>
                            </Col>
                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <TextInput
                                    // value={state.activationCode}
                                    keyboardType="default"
                                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                                    mode="outlined"
                                    label="If yes, expected date of delivery."
                                    style={style.input}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: color.primary } }}
                                />
                            </Col>

                            {/* <Col md={12} colStyles={{ marginVertical: 32 }}>
                                <Divider
                                    style={[
                                        {
                                            backgroundColor: color.offWhiteBackground,
                                            marginHorizontal: md ? -36 : -12,
                                        },
                                    ]}
                                />
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>Known Current Conditions</Text>
                            </Col>

                            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <Text
                                    style={[
                                        style.bodyContent,
                                        { color: "#7B7B7B", fontStyle: "italic" },
                                    ]}
                                >
                                    Please indicate any new known conditions the patient has at the
                                    time of this visit:{" "}
                                </Text>
                            </Col>

                            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <Row>
                                    <Col md={2}>
                                        <Button
                                            mode="outlined"
                                            onPress={() => { }}
                                            style={style.buttonOutline}
                                            uppercase={false}
                                        >
                                            <Text
                                                style={{
                                                    color: color.primary,
                                                    fontSize: md ? 18 : 14,
                                                }}
                                            >
                                                Anemia
                                            </Text>
                                        </Button>
                                    </Col>

                                    <Col md={2}>
                                        <Button
                                            mode="outlined"
                                            onPress={() => { }}
                                            style={style.buttonOutline}
                                            uppercase={false}
                                        >
                                            <Text
                                                style={{
                                                    color: color.primary,
                                                    fontSize: md ? 18 : 14,
                                                }}
                                            >
                                                Cough
                                            </Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={12} colStyles={{}}>
                                <TextInput
                                    // value={state.activationCode}
                                    keyboardType="number-pad"
                                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                                    mode="outlined"
                                    label="Search..."
                                    style={style.input}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: color.primary } }}
                                />
                            </Col> */}

                            <Col md={12} colStyles={{ marginVertical: 32 }}>
                                <Divider
                                    style={[
                                        {
                                            backgroundColor: color.offWhiteBackground,
                                            marginHorizontal: md ? -36 : -12,
                                        },
                                    ]}
                                />
                            </Col>
                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>Current Medications</Text>
                            </Col>

                            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <View
                                    style={[
                                        {
                                            backgroundColor: "#F3F3F3",
                                            borderColor: "#A8A8A8",
                                            borderWidth: 0.5,
                                            color: "rgba(0, 0, 0, 0.32)",
                                            paddingVertical: 4,
                                            paddingHorizontal: 4,
                                        },
                                    ]}
                                >
                                    <Picker
                                        // style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                        selectedValue={state.currentMedication}
                                        onValueChange={(v) =>
                                            setState({ ...state, currentMedication: v })
                                        }
                                        accessibilityLabel="Relevant Co-Medications"
                                        mode="dialog"
                                    >
                                        <Item label="Relevant Co-Medications" value="0" />
                                        {currentMedication.map((item, index) => (
                                            <Item
                                                label={_.upperFirst(item + "")}
                                                key={item}
                                                value={index + 1}
                                            />
                                        ))}
                                    </Picker>
                                </View>
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}></Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>
                                    Is the patient currently taking Cotrim?
                                </Text>
                            </Col>

                            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <RadioButton.Group
                                    onValueChange={(value) => updateState("cotrim", value)}
                                    value={state.cotrim}
                                >
                                    <Row>
                                        <Col md={2}>
                                            <Row>
                                                <Col md={4}>
                                                    <RadioButton
                                                        value="true"
                                                        color={color.primary}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Text style={style.bodyContent}>Yes</Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={2}>
                                            <Row>
                                                <Col md={4}>
                                                    <RadioButton
                                                        value="false"
                                                        color={color.primary}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Text style={style.bodyContent}>No</Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </RadioButton.Group>
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>
                                    Is the patient currently taking Diflucan?
                                </Text>
                            </Col>

                            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <RadioButton.Group
                                    onValueChange={(value) => updateState("diflucan", value)}
                                    value={state.diflucan}
                                >
                                    <Row>
                                        <Col md={2}>
                                            <Row>
                                                <Col md={4}>
                                                    <RadioButton
                                                        value="true"
                                                        color={color.primary}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Text style={style.bodyContent}>Yes</Text>
                                                </Col>
                                            </Row>
                                        </Col>

                                        <Col md={2}>
                                            <Row>
                                                <Col md={4}>
                                                    <RadioButton
                                                        value="false"
                                                        color={color.primary}
                                                    />
                                                </Col>
                                                <Col md={8}>
                                                    <Text style={style.bodyContent}>No</Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </RadioButton.Group>
                            </Col>

                            <Col md={12} colStyles={{ marginVertical: 32 }}>
                                <Divider
                                    style={[
                                        {
                                            backgroundColor: color.offWhiteBackground,
                                            marginHorizontal: md ? -36 : -12,
                                        },
                                    ]}
                                />
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>ARV Treatment Information</Text>
                            </Col>

                            <Col md={12} colStyles={{}}>
                                <View
                                    style={[
                                        {
                                            backgroundColor: "#F3F3F3",
                                            borderColor: "#A8A8A8",
                                            borderWidth: 0.5,
                                            color: "rgba(0, 0, 0, 0.32)",
                                            paddingVertical: 4,
                                            paddingHorizontal: 4,
                                        },
                                    ]}
                                >
                                    <Picker
                                        // style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                        selectedValue={state.combination}
                                        onValueChange={(v) =>
                                            setState({ ...state, combination: v })
                                        }
                                        accessibilityLabel="ARV Combination Regimen"
                                        mode="dialog"
                                    >
                                        {/* <Item label="ARV Combination Regimen" value="0" /> */}
                                        {comninations.map((item, index) => (
                                            <Item label={item} key={item} value={index} />
                                        ))}
                                    </Picker>
                                </View>
                            </Col>

                            <Col md={12} colStyles={{}}>
                                <TextInput
                                    // value={state.activationCode}
                                    keyboardType="number-pad"
                                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                                    mode="outlined"
                                    label="Number of Days Dispensed"
                                    style={style.input}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: color.primary } }}
                                />
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <View
                                    style={[
                                        {
                                            backgroundColor: "#F3F3F3",
                                            borderColor: "#A8A8A8",
                                            borderWidth: 0.5,
                                            color: "rgba(0, 0, 0, 0.32)",
                                            paddingVertical: 4,
                                            paddingHorizontal: 4,
                                        },
                                    ]}
                                >
                                    <Picker
                                        // style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                        selectedValue={state.adhStatus}
                                        onValueChange={(v) => setState({ ...state, adhStatus: v })}
                                        accessibilityLabel="ARV Adherence Status"
                                        mode="dialog"
                                    >
                                        <Item label="ARV Adherence Status" value="0" />
                                        {adhStatus.map((item, index) => (
                                            <Item label={item + ""} key={adhStatus} value={index} />
                                        ))}
                                    </Picker>
                                </View>
                            </Col>

                            <Col md={12} colStyles={[{}]}>
                                <Button
                                    style={[
                                        style.buttonFilled,
                                        { paddingHorizontal: 46, alignSelf: "flex-end" },
                                    ]}
                                    onPress={() => {
                                        //navigate here
                                        setDisplayIndex(1)
                                    }}
                                    uppercase={false}
                                >
                                    <Text style={style.buttonText}>Next</Text>
                                </Button>
                            </Col>
                        </>
                    ) : (
                        <>
                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>Known Current Conditions</Text>
                            </Col>

                            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <Text
                                    style={[
                                        style.bodyContent,
                                        { color: "#7B7B7B", fontStyle: "italic" },
                                    ]}
                                >
                                    Please indicate any new known conditions the patient has at the
                                    time of this visit:{" "}
                                </Text>
                            </Col>

                            <SearchAndSelectBar
                                options={knownConditions}
                                toggleOption={(condition) => toggleCondition(condition)}
                                selectedOptions={state.conditions}
                            />

                            {/* <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <Row>
                                    <Col md={2}>
                                        <Button
                                            mode="outlined"
                                            onPress={() => {}}
                                            style={style.buttonOutline}
                                            uppercase={false}
                                        >
                                            <Text
                                                style={{
                                                    color: color.primary,
                                                    fontSize: md ? 18 : 14,
                                                }}
                                            >
                                                Anemia
                                            </Text>
                                        </Button>
                                    </Col>

                                    <Col md={2}>
                                        <Button
                                            mode="outlined"
                                            onPress={() => {}}
                                            style={style.buttonOutline}
                                            uppercase={false}
                                        >
                                            <Text
                                                style={{
                                                    color: color.primary,
                                                    fontSize: md ? 18 : 14,
                                                }}
                                            >
                                                Cough
                                            </Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>

                            <Col md={12} colStyles={{}}>
                                <TextInput
                                    // value={state.activationCode}
                                    keyboardType="number-pad"
                                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                                    mode="outlined"
                                    label="Search..."
                                    style={style.input}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: color.primary } }}
                                />
                            </Col> */}

                            <Col md={12} colStyles={{ marginVertical: 32 }}>
                                <Divider
                                    style={[
                                        {
                                            backgroundColor: color.offWhiteBackground,
                                            marginHorizontal: md ? -36 : -12,
                                        },
                                    ]}
                                />
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>Presenting Symptoms</Text>
                            </Col>

                            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <Text
                                    style={[
                                        style.bodyContent,
                                        { color: "#7B7B7B", fontStyle: "italic" },
                                    ]}
                                >
                                    Please indicate any new symptoms the patient has:{" "}
                                </Text>
                            </Col>

                            <SearchAndSelectBar
                                options={symptomSet}
                                toggleOption={(symptom) => toggleSymptom(symptom)}
                                selectedOptions={state.presentingSymptoms}
                            />

                            {/* <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <Row>
                                    <Col md={2}>
                                        <Button
                                            mode="outlined"
                                            onPress={() => {}}
                                            style={style.buttonOutline}
                                            uppercase={false}
                                        >
                                            <Text
                                                style={{
                                                    color: color.primary,
                                                    fontSize: md ? 18 : 14,
                                                }}
                                            >
                                                Anemia
                                            </Text>
                                        </Button>
                                    </Col>

                                    <Col md={2}>
                                        <Button
                                            mode="outlined"
                                            onPress={() => {}}
                                            style={style.buttonOutline}
                                            uppercase={false}
                                        >
                                            <Text
                                                style={{
                                                    color: color.primary,
                                                    fontSize: md ? 18 : 14,
                                                }}
                                            >
                                                Cough
                                            </Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col> */}

                            {/* <Col md={12} colStyles={{}}>
                                <TextInput
                                    // value={state.activationCode}
                                    keyboardType="number-pad"
                                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                                    mode="outlined"
                                    label="Search..."
                                    style={style.input}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: color.primary } }}
                                />
                            </Col> */}

                            {/* <Col md={12} colStyles={{ marginVertical: 32 }}>
                                    <Divider
                                        style={[
                                            {
                                                backgroundColor: color.offWhiteBackground,
                                                marginHorizontal: md ? -36 : -12,
                                            },
                                        ]}
                                    />
                                </Col>

                                <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                    <Text style={style.contentHeader}>ARV Treatment Information</Text>
                                </Col>

                                <Col md={12} colStyles={{}}>
                                    <Picker
                                        style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                        selectedValue={state.arvStage}
                                        onValueChange={(v) => setState({ ...state, arvStage: v })}
                                        accessibilityLabel="ARV Combination Regimen"
                                        mode="dialog">
                                        <Item label="ARV Combination Regimen" value="0" />
                                        {arvStages.map((item, index) => (
                                            <Item label={item + ""} value={index + 1} />
                                        ))}
                                    </Picker>
                                </Col>

                                <Col md={12} colStyles={{}}>
                                    <TextInput
                                        // value={state.activationCode}
                                        keyboardType="number-pad"
                                        // onChangeText={text => setstate({ ...state, activationCode: text })}
                                        mode="outlined"
                                        label="Number of Days Dispensed"
                                        style={style.input}
                                        underlineColor="transparent"
                                        theme={{ colors: { primary: color.primary } }}
                                    />
                                </Col>

                                <Col md={12} colStyles={{}}>
                                <Picker
                                        style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                        selectedValue={state.arvStage}
                                        onValueChange={(v) => setState({ ...state, arvStage: v })}
                                        accessibilityLabel="ARV Adherence Status"
                                        mode="dialog">
                                        <Item label="ARV Adherence Status" value="0" />
                                        {arvStages.map((item, index) => (
                                            <Item label={item + ""} value={index + 1} />
                                        ))}
                                    </Picker>
                                </Col> */}

                            {/* <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                    <Text style={style.contentHeader}>Test Information</Text>
                                </Col>

                                <Col md={12} colStyles={{}}>
                                    <TextInput
                                        // value={state.activationCode}
                                        keyboardType="number-pad"
                                        // onChangeText={text => setstate({ ...state, activationCode: text })}
                                        mode="outlined"
                                        label="Patient CD4 Count or %"
                                        style={style.input}
                                        underlineColor="transparent"
                                        theme={{ colors: { primary: color.primary } }}
                                    />
                                </Col>
                                <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                    <Text
                                        style={{ color: "#7B7B7B", fontStyle: "italic", fontSize: 14 }}
                                    >
                                        For patients less than 6 years, enter CD4%
                                </Text>
                                </Col>

                                <Col md={6} colStyles={{}}>
                                    <TextInput
                                        // value={state.activationCode}
                                        keyboardType="number-pad"
                                        // onChangeText={text => setstate({ ...state, activationCode: text })}
                                        mode="outlined"
                                        label="HB"
                                        style={style.input}
                                        underlineColor="transparent"
                                        theme={{ colors: { primary: color.primary } }}
                                    />
                                </Col>

                                <Col md={6} colStyles={{}}>
                                    <TextInput
                                        // value={state.activationCode}
                                        keyboardType="number-pad"
                                        // onChangeText={text => setstate({ ...state, activationCode: text })}
                                        mode="outlined"
                                        label="ALT"
                                        style={style.input}
                                        underlineColor="transparent"
                                        theme={{ colors: { primary: color.primary } }}
                                    />
                                </Col>

                                <Col md={12} colStyles={{}}>
                                    <Picker
                                        style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                        selectedValue={state.arvStage}
                                        onValueChange={(v) => setState({ ...state, arvStage: v })}
                                        accessibilityLabel="Abnormal Lab Results/ Other"
                                        mode="dialog">
                                        <Item label="Abnormal Lab Results/ Other" value="0" />
                                        {arvStages.map((item, index) => (
                                            <Item label={item + ""} value={index + 1} />
                                        ))}
                                    </Picker>
                                </Col> */}

                            <Col md={12} colStyles={[{}]}>
                                <Button
                                    style={[
                                        style.buttonFilled,
                                        { paddingHorizontal: 46, alignSelf: "flex-end" },
                                    ]}
                                    onPress={() => {
                                        //navigate here
                                        // setDisplayIndex(1)
                                        navigation.navigate("ctc-assessment-questions-screen")
                                    }}
                                    uppercase={false}
                                >
                                    <Text style={style.buttonText}>Next</Text>
                                </Button>
                            </Col>
                        </>
                    )}
                </Row>
            </Screen>
        )
    },
)
