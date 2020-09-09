import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { TextInput, Divider, Button } from "react-native-paper"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { Screen, Row, Col } from "../components"
import _ from "lodash"
import { useVisitStore } from "../models/ctc-store"
import { color, style, md } from "../theme"
import {
    fullFormatDate,
    pickerOptionsFromList,
    isValidDate,
    getMonthNumber,
    getAdultBMI,
    getBMIDescription,
    getBloodPressureAnalysis,
} from "../common/utils"
import SearchAndSelectBar from "../components/search-and-select-bar/search-and-select-bar"
import CustomPicker from "../components/custom-picker/custom-picker"
import { Text } from "../components/text/text"
import {
    BOOLEAN_OPTIONS,
    ARV_STAGES,
    COMEDICATIONS,
    MEDICATIONSLIST,
    ARVCOMBINATIONREGIMENS,
    ARVRECOMMENDATIONREASONS,
} from "../common/constants"
import RadioQuestion from "../components/radio-question/radio-question"
import ExtendedDatePicker from "../components/extended-date-picker/extended-date-picker"
import { Colors } from "react-native/Libraries/NewAppScreen"

export interface CtcPatientAssessmentScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

const items = [
    // this is the parent or 'item'
    {
        name: "Fruits",
        id: 0,
        // these are the children or 'sub items'
        children: [
            {
                name: "Apple",
                id: 10,
            },
            {
                name: "Strawberry",
                id: 17,
            },
            {
                name: "Pineapple",
                id: 13,
            },
            {
                name: "Banana",
                id: 14,
            },
            {
                name: "Watermelon",
                id: 15,
            },
            {
                name: "Kiwi fruit",
                id: 16,
            },
        ],
    },
]

const functionalStages = ["working", "bedridden", "ambulatory"]
const currentMedication = ["antibiotics", "antimalarials", "diuretics"]
// const combinations = [
//     "ARV Combination Program",
//     "Treatment Naive",
//     "1a = d4T, 3TC, NVP (pediatric patients)",
//     "1a (30) = d4T (30), 3TC, NVP",
//     "1a (30) L = d4T (30), 3TC, NVP loading dose",
//     "1a (40) = d4T (40), 3TC, NVP",
//     "1a (40) L = d4T (40), 3TC, NVP loading dose",
//     "1b = ZDV, 3TC, NVP",
//     "1c = ZDV, 3TC, EFV",
//     "1d (30) = d4T (30), 3TC, EFV",
//     "1d (40) = d4T (40), 3TC, EFV",
//     "2a = ABC, ddl, LPV/r",
//     "2b = ABC, ddl, SQV/r",
//     "2c - ABC, ddl, NFV",
//     "99 - Other (Specify)",
// ]
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

const ARVCombinationOptions = _.keys(ARVCOMBINATIONREGIMENS).map((key, index) => {
    return {
        name: key
            .split("-")
            .map((word) => _.upperFirst(word))
            .join(" "),
        id: index,
        children: pickerOptionsFromList(ARVCOMBINATIONREGIMENS[key]).map(({ label, value }) => ({
            label,
            value,
            name: label,
            id: value,
        })),
    }
})

export const CtcPatientAssessmentScreen: React.FunctionComponent<CtcPatientAssessmentScreenProps> = (
    props,
) => {
    const state = useVisitStore((state) => state.visit)
    const setState = useVisitStore((state) => state.updateVisit)
    const navigation = useNavigation()
    // const [state, setState] = React.useState({
    //     clinicalStage: "",
    //     pregnant: false,
    //     height: "",
    //     weight: "",
    //     systolic: "",
    //     diastolic: "",
    //     combination: "ARV Combination Program",
    //     functionalStage: "working",
    //     conditions: [],
    //     currentARVUse: false,
    //     additionalMedication: false,
    //     coMedications: [],
    //     deliveryDate: null,
    // })

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

    const goToNext = () => {
        navigation.navigate("ctc-assessment-symptoms-screen")
    }
    const updateState = (name: string, value: any) => {
        setState({ [name]: value })
    }

    const updateWHOStage = (stage: string) => setState({ clinicalStage: stage })
    // const updateWHOStage = (stage: string) => console.warn("Clinical Stage: ", stage)

    const updateFuncitonalStage = (stage: string) => setState({ functionalStage: stage })

    const bmi = getAdultBMI(Number(state.height), Number(state.weight)).toFixed(2)

    const { description: BPDescription, category: BPCategory } = getBloodPressureAnalysis(
        Number(state.systolic),
        Number(state.diastolic),
    )

    return (
        <Screen preset="scroll" title="Patient Assessment">
            <Row>
                <Col md={12} marginBottom={8}>
                    <Text size="small" style={[style.bodyContent, { fontStyle: "italic" }]}>
                        This is about your patient's visit today. We will provide you with insights
                        about your patient based on this information.
                    </Text>
                </Col>
                <>
                    <Col md={12} marginVertical={8}>
                        <Row justifyContent="space-between">
                            <Text size="h5" bold>
                                Date of Visit
                            </Text>
                            <Text size="h5">{fullFormatDate(new Date())}</Text>
                        </Row>
                    </Col>

                    <Col md={12} marginVertical={10}>
                        <Text bold size="h5">
                            Patient Information
                        </Text>
                    </Col>

                    <Col md={6}>
                        <TextInput
                            keyboardType="decimal-pad"
                            mode="outlined"
                            label="Weight (kgs)"
                            style={style.input}
                            onChangeText={(text) => setState({ weight: text })}
                            value={state.weight}
                            underlineColor="transparent"
                            theme={{ colors: { primary: color.primary } }}
                        />
                    </Col>

                    <Col md={6}>
                        <TextInput
                            keyboardType="decimal-pad"
                            mode="outlined"
                            label="Height/Length (cm)"
                            style={style.input}
                            onChangeText={(text) => setState({ height: text })}
                            value={state.height}
                            underlineColor="transparent"
                            theme={{ colors: { primary: color.primary } }}
                        />
                    </Col>

                    <Col marginVertical={4} md={12}>
                        <Text>BMI: {bmi}</Text>
                        <Text>Status: {getBMIDescription(Number(bmi))}</Text>
                    </Col>

                    <Col md={6}>
                        <TextInput
                            keyboardType="decimal-pad"
                            mode="outlined"
                            label="Systolic Blood Pressure"
                            style={style.input}
                            onChangeText={(text) => setState({ systolic: +text })}
                            value={state.systolic.toString()}
                            underlineColor="transparent"
                            theme={{ colors: { primary: color.primary } }}
                        />
                    </Col>
                    <Col md={6}>
                        <TextInput
                            keyboardType="decimal-pad"
                            mode="outlined"
                            label="Diastolic Blood Pressure"
                            style={style.input}
                            onChangeText={(text) => setState({ diastolic: +text })}
                            value={state.diastolic.toString()}
                            underlineColor="transparent"
                            theme={{ colors: { primary: color.primary } }}
                        />
                    </Col>

                    <Col marginVertical={4} md={12}>
                        <Text
                            style={{
                                color:
                                    BPCategory === "hypertensive crisis" ? color.error : color.text,
                            }}
                        >
                            Status: {BPDescription}
                        </Text>
                    </Col>

                    <Col md={6} colStyles={style.contentTextVerticalSpacing}>
                        <CustomPicker
                            options={pickerOptionsFromList(ARV_STAGES)}
                            label="WHO Clinical Stage"
                            labelSize="h6"
                            defaultFirstItem="WHO Clinical Stage"
                            accessibilityLabel="WHO Clinical Stage"
                            selectedValue={state.clinicalStage}
                            onChange={updateWHOStage}
                        />
                    </Col>

                    <Col md={6} colStyles={style.contentTextVerticalSpacing}>
                        <CustomPicker
                            options={pickerOptionsFromList(functionalStages)}
                            label="Functional Status"
                            labelSize="h6"
                            defaultFirstItem="Functional Status"
                            accessibilityLabel="Functional Status"
                            selectedValue={state.functionalStage}
                            onChange={updateFuncitonalStage}
                        />
                    </Col>

                    <Col md={12}>
                        <RadioQuestion
                            question="Is your patient pregnant?"
                            orientation="horizontal"
                            options={[
                                { label: "Yes", value: true },
                                { label: "No", value: false },
                                { label: "N/A", value: "n/a" },
                            ]}
                            id="patientPregnant"
                            onPress={(value) => setState({ pregnant: value as boolean })}
                            value={state.pregnant}
                        />
                    </Col>

                    <Col md={12} marginVertical={8}>
                        <ExtendedDatePicker
                            label="Expected date of delivery?"
                            defaultDate={state.deliveryDate}
                            futureOnly
                            onDateSet={(date) => setState({ deliveryDate: date })}
                        />
                    </Col>

                    <Col md={12} bordered paddingVertical={30} marginVertical={30}>
                        <Text size="h5" bold>
                            Known Co-Morbidities
                        </Text>

                        <Text size="small" color="gray">
                            Please indicate any new known conditions the patient has at the time of
                            this visit:
                        </Text>

                        <SearchAndSelectBar
                            options={knownConditions}
                            toggleOption={(condition) => toggleCondition(condition)}
                            selectedOptions={state.conditions}
                        />
                    </Col>

                    <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                        <Text size="h5" bold>
                            ARV Treatment and Co-Medications
                        </Text>
                    </Col>

                    <RadioQuestion
                        id="currentARVUse"
                        onPress={(val) => setState({ currentARVUse: val as boolean })}
                        orientation="vertical"
                        options={BOOLEAN_OPTIONS}
                        value={state.currentARVUse}
                        question="Is the patient taking ARVs at the time of this visit?"
                    />

                    <Col md={12} colStyles={style.contentTextVerticalSpacing}></Col>

                    <Col md={12} marginVertical={8}>
                        <Text size="h6" style={{ marginBottom: 6 }}>
                            What is thier Regimen?
                        </Text>
                        <SectionedMultiSelect
                            items={ARVCombinationOptions}
                            uniqueKey="id"
                            subKey="children"
                            selectText="Choose the ARV Combination dispensed..."
                            styles={style.multiSelect}
                            showDropDowns={true}
                            readOnlyHeadings={true}
                            expandDropDowns
                            chipsPosition="top"
                            single
                            onSelectedItemsChange={(items) => {
                                console.warn(items)
                                setState({ combination: items[0] })
                            }}
                            selectedItems={[state.combination]}
                        />
                    </Col>

                    <RadioQuestion
                        id="additionalMedication"
                        onPress={(val) =>
                            setState({
                                additionalMedication: val as boolean,
                            })
                        }
                        orientation="vertical"
                        options={BOOLEAN_OPTIONS}
                        value={state.additionalMedication}
                        question="Is the patient currently taking any medications (in addition to ARVs)?"
                    />

                    <Col md={12} marginVertical={12}>
                        <Text size="h6" style={{ marginBottom: 6 }}>
                            Which medications are they taking?
                        </Text>
                        <SectionedMultiSelect
                            items={pickerOptionsFromList([
                                ...MEDICATIONSLIST,
                                "Patient does not know",
                            ]).map(({ label, value }) => ({
                                label,
                                value,
                                name: label,
                                id: value,
                            }))}
                            uniqueKey="id"
                            // subKey="children"
                            selectText="Choose medications from list"
                            styles={style.multiSelect}
                            chipsPosition="top"
                            // showChips={false}
                            onSelectedItemsChange={(items) =>
                                // console.warn("selected", JSON.stringify(items))
                                setState({ coMedications: items })
                            }
                            selectedItems={state.coMedications}
                        />
                    </Col>

                    <Col md={12} marginVertical={10}>
                        <Button
                            style={[
                                style.buttonFilled,
                                { paddingHorizontal: 46, alignSelf: "flex-end" },
                            ]}
                            onPress={goToNext}
                            uppercase={false}
                        >
                            <Text style={style.buttonText}>Next</Text>
                        </Button>
                    </Col>
                </>
            </Row>
        </Screen>
    )
}
