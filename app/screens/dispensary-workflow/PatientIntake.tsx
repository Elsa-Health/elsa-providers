import React from "react"
import { View, Dimensions } from "react-native"
import {
    Button,
    Card,
    Col,
    CustomPicker,
    Notification,
    Row,
    Screen,
    SymptomsPicker,
    Text,
    TextInput,
} from "../../components"
import RadioQuestion from "../../components/radio-question/radio-question"
import SearchAndSelectBar from "../../components/search-and-select-bar/search-and-select-bar"
import { useNavigation } from "@react-navigation/native"
import {
    fullFormatDate,
    getAdultBMI,
    getBloodPressureAnalysis,
    getBMIDescription,
    monthsDiff,
    yearsDiff,
} from "../../common/utils"
import { ALLERGIES, KNOWN_CONDITIONS } from "../../common/constants"
import Spacer from "../../components/spacer/spacer"
import { Divider } from "react-native-paper"
import VisitDate from "../../components/visit-date/visit-date"
import ExtendedDatePicker from "../../components/extended-date-picker/extended-date-picker"
import { usePatientFile, useVisitStore } from "../../models/dispensary-store"

const { width, height } = Dimensions.get("window")

const locations = [
    "Tengeru",
    "Mbuguni",
    "USA River",
    "Arusha City",
    "Kimundo",
    "Ngoaresambu",
    "Other",
].map((loc) => ({ label: loc, value: loc.toLowerCase() }))

const PatientIntake: React.FC = () => {
    const navigation = useNavigation()
    const [
        sex,
        dateOfBirth,
        residenceDistrict,
        allergies,
        updatePatientFile,
    ] = usePatientFile((state) => [
        state.sex,
        state.dateOfBirth,
        state.residenceDistrict,
        state.allergies,
        state.updateFile,
    ])
    const visit = useVisitStore()
    const submit = () => navigation.navigate("dispensary.PresentingSymptoms")

    const toggleAllergies = (newAllergies: string) => {
        const _allergies = [...allergies]
        if (_allergies.includes(newAllergies)) {
            updatePatientFile({ allergies: _allergies.filter((al) => al !== newAllergies) })
        } else {
            updatePatientFile({ allergies: [..._allergies, newAllergies] })
        }
    }

    const toggleCondition = (condition: string) => {
        const cond = [...visit.coMorbidities]
        if (cond.includes(condition)) {
            visit.updateVisit({ coMorbidities: cond.filter((con) => con !== condition) })
        } else {
            visit.updateVisit({ coMorbidities: [...cond, condition] })
        }
    }
    const bmi = getAdultBMI(Number(visit.height), Number(visit.weight)).toFixed(2)
    const { description: BPDescription, category: BPCategory } = getBloodPressureAnalysis(
        Number(visit.systolic),
        Number(visit.diastolic),
    )
    return (
        <Screen preset="scroll" title="Patient Assessment">
            <View style={{ paddingVertical: 10 }}>
                <Card
                    leftIcon="calendar-today"
                    marginVertical={18}
                    title="Today's Date"
                    rightItem={fullFormatDate(new Date())}
                />

                <Card leftIcon="account" title="Patient Information">
                    <RadioQuestion
                        question="Patient Sex"
                        questionSize="h6"
                        orientation="horizontal"
                        options={[
                            { label: "Male", value: "male" },
                            { label: "Female", value: "female" },
                        ]}
                        id="patientSex"
                        onPress={(value) => updatePatientFile({ sex: value })}
                        value={sex}
                    />

                    <Col md={12}>
                        <ExtendedDatePicker
                            onDateSet={(date) => updatePatientFile({ dateOfBirth: date })}
                            // onDateSet={(date) => visit.updateVisit({ deliveryDate: date })}
                            defaultDate={dateOfBirth}
                            label="Date of Birth"
                        />
                        <Notification
                            visible={dateOfBirth !== undefined}
                            title={`Patient's age: ${Math.floor(
                                yearsDiff(dateOfBirth, new Date()),
                            )} years and ${Math.floor(
                                monthsDiff(dateOfBirth, new Date()) % 12,
                            )} months`}
                            variation="info"
                        />
                    </Col>

                    <Row marginVertical={12}>
                        <Col md={12}>
                            <CustomPicker
                                labelSize="h6"
                                selectedValue={residenceDistrict}
                                label="District of Residence?"
                                options={locations}
                                onChange={(newValue) => {
                                    updatePatientFile({
                                        residenceDistrict: newValue,
                                    })
                                }}
                            />
                        </Col>
                    </Row>
                </Card>

                <Spacer size={15} />

                <Card leftIcon="account" title="Visit Information">
                    <Text size="h6">Vital Signs</Text>
                    <Row>
                        <Col xs={12} sm={12} md={6}>
                            <TextInput
                                value={visit.weight.toString()}
                                onChangeText={(text) => visit.updateVisit({ weight: +text })}
                                label="Weight (kgs)"
                                keyboardType="number-pad"
                                placeholder="Weight (kgs)"
                            />
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <TextInput
                                value={visit.height.toString()}
                                onChangeText={(text) => visit.updateVisit({ height: +text })}
                                label="Height/Length (cm)"
                                keyboardType="number-pad"
                                placeholder="Height/Length (cm)"
                            />
                        </Col>
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
                    </Row>

                    <Row marginVertical={6}>
                        <Col xs={12} sm={12} md={6}>
                            <TextInput
                                value={visit.temperature.toString()}
                                onChangeText={(text) => visit.updateVisit({ temperature: +text })}
                                label="Temperature (C)"
                                keyboardType="number-pad"
                                placeholder="Temperature (C)"
                            />
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <TextInput
                                value={visit.respiratoryRate.toString()}
                                onChangeText={(text) =>
                                    visit.updateVisit({ respiratoryRate: +text })
                                }
                                label="Respiratory Rate (bpm)"
                                keyboardType="number-pad"
                                placeholder="Respiratory Rate (bpm)"
                            />
                        </Col>
                    </Row>

                    <Row marginVertical={6}>
                        <Col xs={12} sm={12} md={6}>
                            <TextInput
                                value={visit.heartRate.toString()}
                                onChangeText={(text) => visit.updateVisit({ heartRate: +text })}
                                label="Heart Rate (/min)"
                                keyboardType="number-pad"
                                placeholder="Heart Rate (/min)"
                            />
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <TextInput
                                value={visit.oxygen.toString()}
                                onChangeText={(text) => visit.updateVisit({ oxygen: +text })}
                                label="O2 Stat(%)"
                                keyboardType="number-pad"
                                placeholder="O2 Stat(%)"
                            />
                        </Col>
                    </Row>

                    <Row marginVertical={6}>
                        <Col xs={12} sm={12} md={6}>
                            <TextInput
                                value={visit.systolic.toString()}
                                onChangeText={(text) => visit.updateVisit({ systolic: +text })}
                                label="Systolic Blood Pressure"
                                keyboardType="number-pad"
                                placeholder="Systolic Blood Pressure"
                            />
                        </Col>
                        <Col xs={12} sm={12} md={6}>
                            <TextInput
                                value={visit.diastolic.toString()}
                                onChangeText={(text) => visit.updateVisit({ diastolic: +text })}
                                label="Diastolic Blood Pressure"
                                keyboardType="number-pad"
                                placeholder="Diastolic Blood Pressure"
                            />
                        </Col>

                        <Col md={12}>
                            <Notification
                                marginVertical={12}
                                visible={Number(visit.systolic) > 0 && Number(visit.diastolic) > 0}
                                title={`Hypertension Status:`}
                                variation={BPCategory === "hypertensive crisis" ? "danger" : "info"}
                            >
                                <Text>{BPDescription}</Text>
                            </Notification>
                        </Col>
                    </Row>

                    {sex === "female" && yearsDiff(dateOfBirth, new Date()) > 9 && (
                        <>
                            <RadioQuestion
                                question="Is the patient pregnant?"
                                questionSize="h6"
                                options={[
                                    { label: "Yes", value: true },
                                    { label: "No", value: false },
                                    { label: "N/A", value: null },
                                ]}
                                id="patientSex"
                                onPress={(value) => visit.updateVisit({ pregnant: value })}
                                value={visit.pregnant}
                            />

                            <ExtendedDatePicker
                                onDateSet={(date) => visit.updateVisit({ deliveryDate: date })}
                                defaultDate={visit.deliveryDate}
                                futureOnly
                                label="Expected date of delivery:"
                            />
                        </>
                    )}
                </Card>

                <Spacer size={12} />
                <Card leftIcon="bandage" title="Known Co-Morbidities">
                    <Text size="h5">
                        Does the patient have any known conditions/diseases at the moment (e.g:
                        Diabetes, Hypertension, etc):
                    </Text>

                    <SearchAndSelectBar
                        options={KNOWN_CONDITIONS}
                        toggleOption={(condition) => toggleCondition(condition)}
                        selectedOptions={visit.coMorbidities}
                    />
                </Card>

                <Spacer size={12} />
                <Card leftIcon="allergy" title="Allergies">
                    <Text size="h5">
                        Please indicate any allergies to drugs, foods, or pollutants the patient
                        has:
                    </Text>

                    <SearchAndSelectBar
                        options={ALLERGIES}
                        toggleOption={(allergy) => toggleAllergies(allergy)}
                        selectedOptions={allergies}
                    />
                </Card>
            </View>

            <Button
                style={{ paddingHorizontal: 46, alignSelf: "flex-end" }}
                onPress={submit}
                uppercase={false}
                mode="contained"
                label="Next"
            />
        </Screen>
    )
}

export default PatientIntake
