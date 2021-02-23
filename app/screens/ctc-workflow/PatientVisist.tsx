import React, { useState } from "react"
import { ViewStyle, View } from "react-native"
// import { Button, Checkbox } from "react-native-paper"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import {
    Screen,
    Header,
    Card,
    TextInput,
    Text,
    Button,
    Row,
    Col,
    CustomPicker,
    SymptomsPicker,
    Notification,
} from "../../components"
import _ from "lodash"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../../theme"
import Spacer from "../../components/spacer/spacer"
import { getFormattedDate } from "../../utils/time"
import RadioQuestion from "../../components/radio-question/radio-question"
import ExtendedDatePicker from "../../components/extended-date-picker/extended-date-picker"
import {
    getAdultBMI,
    getBloodPressureAnalysis,
    getBMIDescription,
    isValidDate,
    monthsDiff,
    pickerOptionsFromList,
    yearsDiff,
} from "../../common/utils"
import { useVisitStore } from "../../models/ctc-store"
import SearchAndSelectBar from "../../components/search-and-select-bar/search-and-select-bar"
import { ARVCOMBINATIONREGIMENS, WHO_STAGES, KNOWN_CONDITIONS } from "../../common/constants"
import SectionedMultiSelect from "react-native-sectioned-multi-select"

export interface PatientVisitProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const WHOClinicalOptions = [
    { label: "Stage 1", value: "Stage 1" },
    { label: "Stage 2", value: "Stage 2" },
    { label: "Stage 3", value: "Stage 3" },
    { label: "Stage 4", value: "Stage 4" },
]

const functionalStages = ["working", "bedridden", "ambulatory"]

const isPreginantOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
]

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

// THIS COMPONENT TAKES LONG TO RENDER I DONT KNOW WHY
// I HAVE TO WAIT FOR COUPLE SECONDS TO REACH HERE

export const PatientVisit: React.FunctionComponent<PatientVisitProps> = () => {
    const navigation = useNavigation()
    const [displayIndex, setDisplayIndex] = useState(0)
    const [title, setTitle] = useState()
    // const [state, setState] = useState({
    //     weight: 0,
    //     height: 0,
    //     systolicBP: 0,
    //     distolicBP: 0,
    //     whoClinicalStage: "",
    //     deliveryDate: null,
    //     isPreginant: false,
    //     isTakingARVS: false,
    //     regimen: "",
    //     isHavingSymptomOrEffect: false,
    // })

    const state = useVisitStore((state) => state.visit)
    const patientFile = useVisitStore((state) => state.patientFile)
    const updatePatientFile = useVisitStore((state) => state.updatePatientFile)
    const setState = useVisitStore((state) => state.updateVisit)

    if (!patientFile) {
        // BUG: this screen is still mounted when the patient file is cleared from state.
        // HACK: return an empty view when there is no patient file
        return (
            <View>
                <Text>No patient file loaded.</Text>
            </View>
        )
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

    const updateWHOStage = (stage: string) => setState({ clinicalStage: stage })
    const updateFuncitonalStage = (stage: string) => setState({ functionalStage: stage })

    const updateState = (name: string, value: any) => {
        setState({ [name]: value })
    }

    const bmi = getAdultBMI(Number(state.height), Number(state.weight)).toFixed(2)
    const { description: BPDescription, category: BPCategory } = getBloodPressureAnalysis(
        Number(state.systolic),
        Number(state.diastolic),
    )

    // console.log("File Information: ", patientFile.data)

    return (
        <Screen preset="scroll" title={"Patient Visit"}>
            <Spacer size={20} />
            <Card leftIcon="calendar-today" title="Date of Visit" rightItem={getFormattedDate()} />
            <Spacer size={12} />

            <View>
                <Card leftIcon="account" title="Patient Information">
                    <Row>
                        {patientFile && patientFile.sex !== "male" && patientFile.sex !== "female" && (
                            <Col md={12}>
                                <RadioQuestion
                                    question="Patient Sex"
                                    orientation="horizontal"
                                    options={[
                                        { label: "Male", value: "male" },
                                        { label: "Female", value: "female" },
                                    ]}
                                    id="patientSex"
                                    onPress={(value) =>
                                        updatePatientFile({ sex: value as string }, true)
                                    }
                                    value={state.sex}
                                />
                            </Col>
                        )}

                        <Col md={12}>
                            <TextInput
                                label="CTC ID Number"
                                onChangeText={(newValue) => {
                                    updatePatientFile({ CTCID: newValue }, true)
                                }}
                                value={patientFile.CTCID}
                                keyboardType="numeric"
                            />
                        </Col>

                        {/* {patientFile && !isValidDate(patientFile.dateOfBirth) && ( */}
                        <Col md={12}>
                            <ExtendedDatePicker
                                onDateSet={(date) => updatePatientFile({ dateOfBirth: date }, true)}
                                defaultDate={patientFile.dateOfBirth}
                                label="Date of Birth"
                            />
                            <Notification
                                visible={patientFile.dateOfBirth}
                                title={`Patient's age: ${Math.floor(
                                    yearsDiff(patientFile.dateOfBirth, new Date()),
                                )} years and ${Math.floor(
                                    monthsDiff(patientFile.dateOfBirth, new Date()) % 12,
                                )} months`}
                                variation="info"
                            />
                        </Col>
                        {/* )} */}

                        <Col md={6}>
                            <TextInput
                                label="Weight (kgs)"
                                onChangeText={(newValue) => {
                                    setState({
                                        ...state,
                                        weight: newValue,
                                    })
                                }}
                                keyboardType="numeric"
                            />
                        </Col>

                        <Col md={6}>
                            <TextInput
                                label="Height/Length (cm)"
                                keyboardType="numeric"
                                onChangeText={(newValue) => {
                                    console.warn(newValue)
                                    setState({
                                        ...state,
                                        height: newValue,
                                    })
                                }}
                            />
                        </Col>

                        <Spacer size={12} />
                        <Col md={12}>
                            <Notification
                                marginVertical={12}
                                visible={Number(bmi) > 0}
                                title={`Patient BMI: ${bmi}`}
                                variation="info"
                            >
                                <Row>
                                    <Text bold>Status:</Text>
                                    <Text>{getBMIDescription(Number(bmi))}</Text>
                                </Row>
                            </Notification>
                        </Col>

                        <Spacer size={12} />
                        <Col md={6}>
                            <TextInput
                                label="Systolic Blood Pressure"
                                keyboardType="numeric"
                                onChangeText={(newValue) => {
                                    setState({
                                        ...state,
                                        systolic: newValue,
                                    })
                                }}
                            />
                        </Col>

                        <Col md={6}>
                            <TextInput
                                keyboardType="numeric"
                                label="Diastolic Blood Pressure"
                                onChangeText={(newValue) =>
                                    setState({
                                        ...state,
                                        diastolic: newValue,
                                    })
                                }
                            />
                        </Col>

                        <Spacer size={12} />
                        <Col md={12}>
                            <Notification
                                marginVertical={12}
                                visible={Number(state.systolic) > 0 && Number(state.diastolic) > 0}
                                title={`Hypertension Status:`}
                                variation={BPCategory === "hypertensive crisis" ? "danger" : "info"}
                            >
                                <Text>{BPDescription}</Text>
                            </Notification>
                        </Col>

                        <Col md={6} colStyles={style.contentTextVerticalSpacing}>
                            <CustomPicker
                                options={pickerOptionsFromList(WHO_STAGES)}
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

                        {/* <Col md={12}>
                                <Spacer size={20} />
                                <RadioQuestion
                                    question="Is the patient pregnant?"
                                    value={state.isPreginant}
                                    options={isPreginantOptions}
                                    onPress={(answer) => {
                                        console.log("Answer :  ", answer)
                                        setState({
                                            ...state,
                                            isPreginant: answer,
                                        })
                                    }}
                                />
                            </Col> */}
                        {patientFile.sex === "female" && (
                            <>
                                <Col md={12}>
                                    <RadioQuestion
                                        question="Is your patient pregnant?"
                                        // orientation="horizontal"
                                        options={[
                                            { label: "Yes", value: true },
                                            { label: "No", value: false },
                                            { label: "N/A", value: "n/a" },
                                        ]}
                                        id="patientPregnant"
                                        onPress={(value) =>
                                            setState({ pregnant: value as boolean })
                                        }
                                        value={state.pregnant}
                                    />
                                </Col>
                                {state.pregnant === true && (
                                    <Col md={12}>
                                        <ExtendedDatePicker
                                            label="If yes, expected date of delivery:"
                                            defaultDate={state.deliveryDate}
                                            futureOnly
                                            onDateSet={(date) => setState({ deliveryDate: date })}
                                        />
                                    </Col>
                                )}
                            </>
                        )}
                    </Row>
                    <Spacer size={12} />
                </Card>
                <Spacer size={12} />
                <Card leftIcon="bandage" title="Known Co-Morbidities">
                    <Text size="h5">
                        Does the patient have any known conditions/diseases at the moment (e.g: Diabetes, Hypertension, etc):
                    </Text>

                    {/* Logic for this component implementation is left for now */}
                    {/* so left stateless, delete this comment when state added */}
                    {/* also not sure if this is appropriate place for this component */}
                    {/* <SymptomsPicker /> */}
                    <SearchAndSelectBar
                        options={KNOWN_CONDITIONS}
                        toggleOption={(condition) => toggleCondition(condition)}
                        selectedOptions={state.conditions}
                    />
                </Card>

                <Spacer size={12} />
                <Card leftIcon="pharmacy" title="ARV Treatment & Co-Medications">
                    <Row>
                        <Col md={12}>
                            <RadioQuestion
                                question="Is the patient already on an ARV treatment regimen?"
                                value={state.currentARTUse}
                                options={isPreginantOptions}
                                onPress={(value) =>
                                    setState({
                                        currentARTUse: value,
                                    })
                                }
                            />
                        </Col>

                        <Col md={12} marginVertical={8}>
                            <Text size="h6" style={{ marginBottom: 6 }}>
                                What is their Regimen?
                            </Text>
                            <SectionedMultiSelect
                                items={ARVCombinationOptions}
                                uniqueKey="id"
                                subKey="children"
                                selectText="Choose the ARV Regimen..."
                                styles={style.multiSelect}
                                showDropDowns={true}
                                readOnlyHeadings={true}
                                expandDropDowns
                                chipsPosition="top"
                                single
                                onSelectedItemsChange={(items) => {
                                    console.warn(items)
                                    setState({ ARTCombination: items[0] })
                                }}
                                selectedItems={[state.ARTCombination]}
                            />
                        </Col>
                        <Spacer size={20} />
                    </Row>
                </Card>
                <Spacer size={20} />
                <Row>
                    <Col md={12} colStyles={{ flexDirection: "row-reverse" }}>
                        <Button
                            onPress={() => {
                                // logics and show the second part here
                                // setTitle("Patient Visit - Symptoms")
                                // setDisplayIndex(1)
                                navigation.navigate("ctc.PresentingSymptoms")
                            }}
                            label="Next"
                            labelSize="h6"
                            mode="contained"
                            style={{ paddingHorizontal: 72, paddingVertical: 8 }}
                            // withArrow={true}
                        />
                    </Col>
                </Row>
            </View>
            <Spacer size={20} />
        </Screen>
    )
}

export default PatientVisit
