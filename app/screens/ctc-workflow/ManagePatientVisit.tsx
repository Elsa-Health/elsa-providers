import React from "react"
import { Screen, Row, Col, Text, Card } from "../../components"
import _ from "lodash"
import { Divider, Button, TextInput } from "react-native-paper"
import Spacer from "../../components/spacer/spacer"
import { View, Dimensions } from "react-native"
import CustomPicker from "../../components/custom-picker/custom-picker"
import {
    pickerOptionsFromList,
    fullFormatDate,
    valuesToLabels,
    labelToValue,
} from "../../common/utils"
import { TESTSLIST } from "../../common/constants"
import { TouchableOpacity } from "react-native-gesture-handler"
import BulletList from "../../components/bullet-list/bullet-list"
import { CTCVisit, useVisitStore } from "../../models/ctc-store"

const { width } = Dimensions.get("window")

type booleanTestResult = "positive" | "negative"
type numericTestResult = number

interface TestResult {
    test: string
    units: string
    type: "boolean" | "number" | "text"
    options?: string[]
}

const testResultTypes: TestResult[] = [
    {
        test: "mrdt",
        units: "",
        type: "boolean",
        options: ["positive", "negative"],
    },
    {
        test: "blood culture",
        units: "",
        type: "boolean",
        options: ["positive", "negative"],
    },
    {
        test: "crag",
        units: "",
        type: "boolean",
        options: ["positive", "negative"],
    },
    {
        test: "cd4",
        units: "cells/mm³",
        type: "number",
    },
    {
        test: "viral load",
        units: "copies/mm³",
        type: "number",
    },
]

const defaultTest: TestResult = {
    test: "default",
    units: "",
    type: "text",
}

const ManagePatientVisit: React.FC = ({ route }) => {
    const [patientFile, patientVisits] = useVisitStore((state) => [
        state.patientFile,
        state.patientVisits,
    ])
    const nextVisitDate = new Date()
    nextVisitDate.setDate(nextVisitDate.getDate() + 10)

    const visitId = route.params?.visitId

    if (!visitId) {
        return (
            <View>
                <Text>No patient visit selected</Text>
            </View>
        )
    }

    const visit: CTCVisit = JSON.parse(
        patientVisits.find((visit) => visit.id === visitId)?.data || "{}",
    )

    console.log(visit.investigationsOrdered)

    return (
        <Screen preset="scroll" title="Manage Visit">
            <Spacer size={20} />

            <Text size="h5" bold>
                Visit Date {fullFormatDate(visit.dateOfVisit)}
            </Text>

            <Spacer size={16} />
            <Card title="Visit Information" leftIcon="text-box-check">
                <Row>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            {"Weight"}
                        </Text>
                        <Text size="h5">{visit.weight} kgs</Text>
                    </Col>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            Height
                        </Text>
                        <Text size="h5">{visit.height}cm</Text>
                    </Col>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            BP
                        </Text>
                        <Text size="h5">
                            {visit.systolic}/{visit.diastolic}
                        </Text>
                    </Col>
                </Row>
                <Spacer size={8} />
                <Row>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            Clinical Stage
                        </Text>
                        <Text size="h5">{visit.clinicalStage || "Not Set"}</Text>
                    </Col>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            Functional
                        </Text>
                        <Text size="h5">{_.upperFirst(visit.functionalStage)}</Text>
                    </Col>
                    {patientFile.sex === "female" && (
                        <Col md={4}>
                            <Text size="small" color="gray">
                                Pregnant
                            </Text>
                            <Text size="h5">{visit.pregnant ? "Yes" : "No"}</Text>
                        </Col>
                    )}
                </Row>

                <Spacer size={8} />
                <Row>
                    <Col md={12} colStyles={{ paddingVertical: 10 }}>
                        <Text size="small" color="gray">
                            Co-Morbidities
                        </Text>
                        <Text size="h5">{visit.conditions.join(", ") || "None"}</Text>
                    </Col>
                    {/* <Spacer size={48} /> */}
                    <Col md={12} colStyles={{ paddingVertical: 10 }}>
                        <Text size="small" color="gray">
                            Co-Medications
                        </Text>
                        <Text size="h5">{visit.coMedications.join(", ") || "None"}</Text>
                    </Col>
                    {/* <Spacer size={48} /> */}
                    <Col md={12} colStyles={{ paddingVertical: 10 }}>
                        <Text size="small" color="gray">
                            ARV Regimen
                        </Text>
                        <Text size="h5">{visit.ARTCombination}</Text>
                    </Col>
                </Row>
            </Card>
            <Spacer size={16} />
            <Card title="Test Results" leftIcon="text-box-check">
                {visit.investigationsOrdered.map((investigation) => {
                    const testResultType =
                        testResultTypes.find(
                            (trt) => trt.test === valuesToLabels([investigation])[0].toLowerCase(),
                        ) || defaultTest
                    return (
                        <View
                            key={investigation}
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginVertical: 8,
                                paddingHorizontal: 45,
                                borderBottomWidth: 1,
                                paddingBottom: 25,
                                borderBottomColor: "#ccc",
                            }}
                        >
                            <Text size="h6">{investigation}</Text>

                            {testResultType.type !== "boolean" && (
                                <TextInput
                                    width={width / 4}
                                    keyboardType={
                                        testResultType.type === "number" ? "number-pad" : "default"
                                    }
                                    label={testResultType.units}
                                />
                            )}
                            {testResultType.type === "boolean" && (
                                <CustomPicker
                                    options={pickerOptionsFromList(testResultType?.options || [])}
                                    onChange={() => {}}
                                    width={width / 4}
                                    selectedValue="negative"
                                />
                            )}
                            {/* <Text>copies/mm3</Text> */}
                            {/* <Text size="h6">{_.upperFirst(tnr.result)}</Text> */}
                        </View>
                    )
                })}

                {/* <Spacer size={20} />
                <Text size="h5" bold>
                    Add Tests and Results
                </Text> */}
                {/* <CustomPicker
                    label="Choose a test"
                    options={pickerOptionsFromList(TESTSLIST)}
                    onChange={() => {}}
                    selectedValue={""}
                />
                <TextInput label="Test results" style={{ marginTop: 20 }} mode="outlined" /> */}

                {/* <TouchableOpacity style={{ marginTop: 15 }}>
                    <Text color="primary" size="h6">
                        + Add New Test
                    </Text>
                </TouchableOpacity> */}
            </Card>

            <Spacer size={16} />
            <Card title="Treatments Provided" leftIcon="text-box-check">
                <Text size="h5">The following medications were prescribed: </Text>

                {/* to fix component subtitle issue */}
                <BulletList
                    items={valuesToLabels(visit.dispensedMedications)}
                    id="medications"
                    textSize="h6"
                />
            </Card>

            <Spacer size={20} />
            {/* <Text size="h5">Next Visit</Text>
            <Text>{fullFormatDate(nextVisitDate)}</Text> */}
        </Screen>
    )
}

export default ManagePatientVisit
