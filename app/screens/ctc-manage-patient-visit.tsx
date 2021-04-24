import React from "react"
import { Screen, Row, Col, Text } from "../components"
import _ from "lodash"
import { Divider, Button, TextInput } from "react-native-paper"
import Spacer from "../components/spacer/spacer"
import { View } from "react-native"
import CustomPicker from "../components/custom-picker/custom-picker"
import { pickerOptionsFromList, fullFormatDate } from "../common/utils"
import { TESTSLIST } from "../common/constants"
import { TouchableOpacity } from "react-native-gesture-handler"

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

const CTCManagePatientVisit: React.FC = () => {
    const nextVisitDate = new Date()
    nextVisitDate.setDate(nextVisitDate.getDate() + 10)

    return (
        <Screen preset="scroll" title="Manage Visit">
            <Text italic style={{ marginBottom: 20 }}>
                Please add the tests and outcomes below.
            </Text>

            <Spacer size={20} />
            <Text size="h5" bold>
                Test Results
            </Text>
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

            <Spacer size={20} />
            <Text size="h5">Treatments Provided</Text>

            <Spacer size={60} />
            <Text size="h5">Next Visit</Text>
            <Text>{fullFormatDate(nextVisitDate)}</Text>
        </Screen>
    )
}

export { CTCManagePatientVisit }
