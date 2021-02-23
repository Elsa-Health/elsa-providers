import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, ToastAndroid, Alert } from "react-native"
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
// import { RadioButton, TextInput, Divider, Button, Chip } from "react-native-paper"
import { Screen, Col, Row, Card, Text, Notification, Button } from "../../components"
import { Dropdown } from "react-native-material-dropdown"
import _ from "lodash"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../../theme"
import SearchAndSelectBar from "../../components/search-and-select-bar/search-and-select-bar"
import { Picker } from "@react-native-community/picker"
import { CTCPatientFile, useVisitStore } from "../../models/ctc-store"
import { monthsDiff, pickerOptionsFromList, yearsDiff } from "../../common/utils"
import CustomPicker from "../../components/custom-picker/custom-picker"
import { string } from "mobx-state-tree/dist/internal"
import {
    YEAR_NUMBERS,
    DAY_NUMBERS,
    WHO_STAGES,
    MONTH_NAMES,
    DRUG_ALLERGIES,
    MARITIAL_STATUS,
    DISTRICTS,
    TREATMENT_SUPPORT_TYPES,
} from "../../common/constants"
import ExtendedDatePicker from "../../components/extended-date-picker/extended-date-picker"
import Spacer from "../../components/spacer/spacer"
import { RadioQuestion } from "../../components/radio-question/radio-question"
import SectionedMultiSelect from "react-native-sectioned-multi-select"
import { Api } from "../../services/api"

export interface CTCPatientInformation {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    // flex: 1,
}

const drugAllergyOptions = DRUG_ALLERGIES.sort().map((drug) => ({
    label: _.upperFirst(drug),
    value: drug,
    name: drug,
    id: _.kebabCase(drug),
}))

// FIXME: List of fixes and updates
// 1. load the patient file and initialize the file state
// 2. on submit update the patient file (and re-fetch patient updates in the store)
// 3. render correct patient age
// 4. store and update all dates (dob, art start, etc.)
// 5. Hide and show dependent drop downs on question state change

export const PatientInformationManager: React.FunctionComponent<CTCPatientInformation> = (
    props,
) => {
    // const { someStore } = useStores()
    const route = useRoute()
    const navigation = useNavigation()
    const patient: CTCPatientFile = useVisitStore((state) => state.patientFile)
    const updatePatient = useVisitStore((state) => state.updatePatientFile)

    const [state, setState] = React.useState({
        sex: patient?.sex || "female",
        district: patient?.district || "",
        HIVConfirmed: patient ? patient.HIVConfirmed : false,
        ARTNaive: patient ? patient.ARTNaive : true,
        WHOStageAtDiagnosis: patient?.WHOStageAtDiagnosis || "",
        treatmentSupport: patient ? patient.treatmentSupport : false,
        treatmentSupportType: patient?.treatmentSupportType || "",
        allergies: patient?.allergies || [],
        maritalStatus: patient?.maritalStatus || "",
        dateOfBirth: patient?.dateOfBirth || new Date(),
        HIVConfirmDate: patient?.HIVConfirmDate || null,
        ARTStartDate: patient?.ARTStartDate || null,
        currentARTUse: patient ? patient.currentARTUse : false,
    })

    // destination is the name of the next route on successful page events
    const destination = route.params?.destination

    const updateFile = () => {
        if (!patient || !patient.id) {
            ToastAndroid.show("Error. Please refresh the app.", 3000)
            return
        }
        const api = new Api()

        const file = api.updateLocalCTCFileInformation(patient.id, {
            ...state,
            data: JSON.stringify(state),
        })

        if (file) {
            updatePatient({ ...state })
            ToastAndroid.show("File updated", 3000)
            if (destination === "back") return navigation.goBack()
            navigation.navigate(destination || "ctc.VisitType")
        } else {
            ToastAndroid.show("Failed to update file", 3000)
            // FIXME: add error logger here
            console.warn("Error updating patient file")
        }
    }

    // console.warn("patient", patient)

    return (
        <Screen preset="scroll" title="Patient Information">
            <Spacer size={20} />
            <Card leftIcon="account" title="Basic Information">
                <Row>
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
                                setState((state) => ({ ...state, sex: value as string }))
                            }
                            value={state.sex}
                        />
                    </Col>

                    <Col md={12}>
                        <ExtendedDatePicker
                            onDateSet={(date) =>
                                setState((state) => ({ ...state, dateOfBirth: date }))
                            }
                            defaultDate={state.dateOfBirth}
                            label="Date of Birth"
                        />
                        <Notification
                            visible
                            title={`Patient's age: ${Math.floor(
                                yearsDiff(state.dateOfBirth, new Date()),
                            )} years and ${Math.floor(
                                monthsDiff(state.dateOfBirth, new Date()) % 12,
                            )} months`}
                            variation="info"
                        />
                    </Col>

                    <Col md={12} marginVertical={4}>
                        <CustomPicker
                            options={pickerOptionsFromList(MARITIAL_STATUS)}
                            accessibilityLabel="Marital Status"
                            label="Marital Status"
                            labelSize="h6"
                            onChange={(value) =>
                                setState((state) => ({ ...state, maritalStatus: value }))
                            }
                            selectedValue={state.maritalStatus}
                        />
                    </Col>

                    <Col md={12} marginVertical={4}>
                        <CustomPicker
                            options={pickerOptionsFromList(DISTRICTS)}
                            accessibilityLabel="District of Residence"
                            label="District of Residence"
                            labelSize="h6"
                            onChange={(value) =>
                                setState((state) => ({ ...state, district: value }))
                            }
                            selectedValue={state.district}
                        />
                    </Col>
                </Row>
            </Card>

            <Card marginVertical={14} title="HIV Status" leftIcon="account">
                <Row>
                    <RadioQuestion
                        question="Has the patient had a HIV test that had a positive result?"
                        options={[
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                        ]}
                        id="patientPosHIVTest"
                        onPress={(value) =>
                            setState((state) => ({ ...state, HIVConfirmed: value as boolean }))
                        }
                        value={state.HIVConfirmed}
                    />

                    <ExtendedDatePicker
                        onDateSet={(date) =>
                            setState((state) => ({ ...state, HIVConfirmDate: date }))
                        }
                        defaultDate={state.HIVConfirmDate}
                        label="Date confirmed HIV+"
                    />

                    <RadioQuestion
                        question="Is the patient treatment Naive?"
                        options={[
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                        ]}
                        id="patientTreatmentNaive"
                        onPress={(value) =>
                            setState((state) => ({ ...state, ARTNaive: value as boolean }))
                        }
                        value={state.ARTNaive}
                    />

                    {!state.ARTNaive && (
                        <Row>
                            <RadioQuestion
                                question="Is the patient currently on ARVs?"
                                options={[
                                    { label: "Yes", value: true },
                                    { label: "No", value: false },
                                ]}
                                id="patientARVuse"
                                onPress={(value) =>
                                    setState((state) => ({
                                        ...state,
                                        currentARTUse: value as boolean,
                                    }))
                                }
                                value={state.currentARTUse}
                            />

                            <Col md={12} marginVertical={4}>
                                <ExtendedDatePicker
                                    onDateSet={(date) =>
                                        setState((state) => ({ ...state, ARTStartDate: date }))
                                    }
                                    defaultDate={state.ARTStartDate}
                                    label="Date started on ARVs"
                                />
                            </Col>
                        </Row>
                    )}

                    <Col md={12} marginVertical={4}>
                        <CustomPicker
                            options={pickerOptionsFromList(WHO_STAGES)}
                            accessibilityLabel="WHO Stage at time of Diagnosis"
                            label="WHO Stage at time of Diagnosis"
                            labelSize="h6"
                            onChange={(value) =>
                                setState((state) => ({ ...state, WHOStageAtDiagnosis: value }))
                            }
                            selectedValue={state.WHOStageAtDiagnosis}
                        />
                    </Col>

                    <RadioQuestion
                        question="Does the patient have treatment support?"
                        options={[
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                        ]}
                        id="treatmentSupport"
                        onPress={(value) =>
                            setState((state) => ({ ...state, treatmentSupport: value as boolean }))
                        }
                        value={state.treatmentSupport}
                    />

                    <Col md={12} marginVertical={4}>
                        <CustomPicker
                            options={pickerOptionsFromList(TREATMENT_SUPPORT_TYPES)}
                            accessibilityLabel="Type of Support"
                            label="Type of Support"
                            labelSize="h6"
                            onChange={(value) =>
                                setState((state) => ({ ...state, treatmentSupportType: value }))
                            }
                            selectedValue={state.treatmentSupportType}
                        />
                    </Col>
                </Row>
            </Card>

            <Card marginVertical={14} title="Drug Allergies" leftIcon="pharmacy">
                <Text size="h6" style={{ marginBottom: 6 }}>
                    Please indicate any drug allergies the patient has:
                </Text>
                <SectionedMultiSelect
                    items={drugAllergyOptions}
                    uniqueKey="id"
                    // subKey="children"
                    selectText="Search..."
                    styles={style.multiSelect}
                    // showDropDowns={true}
                    // readOnlyHeadings={true}
                    // expandDropDowns
                    chipsPosition="top"
                    // single
                    onSelectedItemsChange={(items) => {
                        console.warn(items)
                        setState((state) => ({ ...state, allergies: items }))
                    }}
                    selectedItems={[...state.allergies]}
                />
            </Card>

            <View style={{ flexDirection: "row-reverse", marginVertical: 10 }}>
                <Button
                    label="Next"
                    mode="contained"
                    style={{ paddingHorizontal: 48 }}
                    onPress={updateFile}
                />
            </View>
        </Screen>
    )
}

export default PatientInformationManager
