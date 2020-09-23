import React from "react"
import { Screen, Row, Col, Text, Card } from "../../components"
import _ from "lodash"
import { Divider, Button, TextInput } from "react-native-paper"
import Spacer from "../../components/spacer/spacer"
import { View } from "react-native"
import CustomPicker from "../../components/custom-picker/custom-picker"
import { pickerOptionsFromList, fullFormatDate } from "../../common/utils"
import { TESTSLIST } from "../../common/constants"
import { TouchableOpacity } from "react-native-gesture-handler"
import BulletList from "../../components/bullet-list/bullet-list"

const testsAndResults = [
    {
        name: "CrAG+",
        result: "positive",
    },
    {
        name: "CD4 Test",
        result: "1000 cells/mm3",
    },
]

const ManagePatientVisit: React.FC = () => {
    const nextVisitDate = new Date()
    nextVisitDate.setDate(nextVisitDate.getDate() + 10)

    return (
        <Screen preset="scroll" title="Manage Visit">
            <Spacer size={20} />

            <Text size="h5" bold>
                Visit Date {"23 Sept 2020"}
            </Text>

            <Spacer size={16} />
            <Card title="Visit Information" leftIcon="fact-check">
                <Row>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            {"Weight"}
                        </Text>
                        <Text size="h5">Value</Text>
                    </Col>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            Height
                        </Text>
                        <Text size="h5">Height</Text>
                    </Col>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            BP
                        </Text>
                        <Text size="h5">Value</Text>
                    </Col>
                </Row>
                <Spacer size={8} />
                <Row>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            Clinical Stage
                        </Text>
                        <Text size="h5">Value</Text>
                    </Col>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            Functional
                        </Text>
                        <Text size="h5">Value</Text>
                    </Col>
                    <Col md={4}>
                        <Text size="small" color="gray">
                            Pregnant
                        </Text>
                        <Text size="h5">Value</Text>
                    </Col>
                </Row>

                <Spacer size={8} />
                <Row>
                    <Col md={12}>
                        <Text size="small" color="gray">
                            Co-Morbidities
                        </Text>
                        <Text size="h5">Value</Text>
                    </Col>
                    <Spacer size={48} />
                    <Col md={12}>
                        <Text size="small" color="gray">
                            Co-Medications
                        </Text>
                        <Text size="h5">Value</Text>
                    </Col>
                    <Spacer size={48} />
                    <Col md={12}>
                        <Text size="small" color="gray">
                            ARV Regimen
                        </Text>
                        <Text size="h5">Value</Text>
                    </Col>
                </Row>
            </Card>
            <Spacer size={16} />
            <Card title="Test Results" leftIcon="fact-check">
                {testsAndResults.map((tnr) => (
                    <View
                        key={tnr.name}
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginVertical: 8,
                            paddingHorizontal: 45,
                        }}
                    >
                        <Text size="h6">{tnr.name}</Text>
                        <Text size="h6">{_.upperFirst(tnr.result)}</Text>
                    </View>
                ))}

                <Spacer size={20} />
                <Text size="h5" bold>
                    Add Tests and Results
                </Text>
                <CustomPicker
                    label="Choose a test"
                    options={pickerOptionsFromList(TESTSLIST)}
                    onChange={() => {}}
                    selectedValue={""}
                />
                <TextInput label="Test results" style={{ marginTop: 20 }} mode="outlined" />

                <TouchableOpacity style={{ marginTop: 15 }}>
                    <Text color="primary" size="h6">
                        + Add New Test
                    </Text>
                </TouchableOpacity>
            </Card>

            <Spacer size={16} />
            <Card title="Treatments Provided" leftIcon="fact-check">
                <Text size="h5">The following medications were prescribed: </Text>

                {/* to fix component subtitle issue */}
                <BulletList
                    items={["Tenofovir, 500mg", "Liquid cough medicine"]}
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
