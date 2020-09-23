import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { RadioButton, TextInput, Divider, Button, Chip } from "react-native-paper"
import { Screen, Col, Row, Card, Text } from "../../components"
import { Dropdown } from "react-native-material-dropdown"
import _ from "lodash"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../../theme"
import SearchAndSelectBar from "../../components/search-and-select-bar/search-and-select-bar"
import { Picker } from "@react-native-community/picker"
import { PatientFile, useVisitStore } from "../../models/ctc-store"
import { pickerOptionsFromList } from "../../common/utils"
import CustomPicker from "../../components/custom-picker/custom-picker"
import { string } from "mobx-state-tree/dist/internal"
import {
    YEAR_NUMBERS,
    DAY_NUMBERS,
    ARV_STAGES,
    MONTH_NAMES,
    DRUG_ALLERGIES,
    MARITIAL_STATUS,
    DISTRICTS,
} from "../../common/constants"
import ExtendedDatePicker from "../../components/extended-date-picker/extended-date-picker"
import Spacer from "../../components/spacer/spacer"

export interface CtcNewPatientScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    // flex: 1,
}

export const PatientNewVisit: React.FunctionComponent<CtcNewPatientScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        const navigation = useNavigation()
        const [value, setValue] = React.useState("male")
        const [selectedValue, setSelectedValue] = React.useState("java")
        const [displayIndex, setDisplayIndex] = React.useState(0)
        const [selectedSymptoms, setSelectedSymptoms] = React.useState([])

        const patient: PatientFile = useVisitStore((state) => state.patientFile)
        const updatePatient = useVisitStore((state) => state.updatePatientFile)

        const [value2, setValue2] = React.useState("red")

        const [state, setState] = React.useState({
            maritalStatus: "",
            month: "",
            year: "",
            day: "",
            arvStage: "",
            ARVStartDate: null,
        })

        const [firstTest, setFirstTest] = React.useState({ month: "", year: "", day: "" })
        const [confirmedHIV, setConfirmedHIV] = React.useState({ month: "", year: "", day: "" })
        const [ARVStart, setARVStart] = React.useState({ month: "", year: "", day: "" })

        return (
            <Screen preset="scroll" title="New Patient Information">
                <Spacer size={20} />
                {/* <Row>
                    <Col md={12}>
                        <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                            Please input the following information about your patient.{" "}
                        </Text>
                    </Col>
                </Row> */}
                {displayIndex === 0 ? (
                    <View>
                        <Card title="Basic Information">
                            <Row rowStyles={style.contentTextVerticalSpacing}>
                                <Col md={6}>
                                    <Text size="h5">Gender </Text>
                                </Col>
                                <Col md={6}>
                                    <RadioButton.Group
                                        onValueChange={(value) => updatePatient("sex", value)}
                                        value={patient?.sex || ""}
                                    >
                                        <Row>
                                            <Col md={6}>
                                                <Row>
                                                    <Col md={4}>
                                                        <RadioButton
                                                            value="male"
                                                            color={color.primary}
                                                        />
                                                    </Col>
                                                    <Col md={8}>
                                                        <Text style={style.bodyContent}>Male</Text>
                                                    </Col>
                                                </Row>
                                            </Col>

                                            <Col md={6}>
                                                <Row>
                                                    <Col md={4}>
                                                        <RadioButton
                                                            value="female"
                                                            color={color.primary}
                                                        />
                                                    </Col>
                                                    <Col md={8}>
                                                        <Text style={style.bodyContent}>
                                                            Female
                                                        </Text>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </RadioButton.Group>
                                </Col>
                            </Row>
                            <Row rowStyles={style.contentTextVerticalSpacing}>
                                <Col md={12}>
                                    <Text style={style.contentHeader}></Text>
                                </Col>
                                <Col md={12}>
                                    <ExtendedDatePicker
                                        onDateSet={() => null}
                                        label="Date of Birth"
                                    />
                                </Col>
                                <Col md={12}>
                                    <Text style={{ color: "#7B7B7B" }}>
                                        Age: 35 years, 4 months
                                    </Text>
                                </Col>
                            </Row>

                            <Row rowStyles={style.contentTextVerticalSpacing}>
                                <Col md={12}>
                                    <CustomPicker
                                        options={pickerOptionsFromList(MARITIAL_STATUS)}
                                        accessibilityLabel="Marital Status"
                                        label="Marital Status"
                                        onChange={(v) => setState({ ...state, maritalStatus: v })}
                                        selectedValue={state.maritalStatus}
                                    />
                                </Col>
                                <Col md={12} marginTop={20}>
                                    <CustomPicker
                                        options={pickerOptionsFromList(DISTRICTS)}
                                        accessibilityLabel="District of Residence"
                                        label="District of Residence"
                                        // defaultFirstItem="Marital Status"
                                        onChange={(v) => {}}
                                        selectedValue={""}
                                    />
                                </Col>
                            </Row>
                        </Card>
                        <Spacer size={12} />
                        <Card>
                            <Row rowStyles={{}}>
                                <Col md={12}>
                                    <Text style={style.contentHeader}>Drug Allergies</Text>
                                </Col>
                                <Col md={12}>
                                    <Text
                                        style={[
                                            style.bodyContent,
                                            { fontStyle: "italic", color: "#7B7B7B" },
                                        ]}
                                    >
                                        Please indicate any allergies the patient has:{" "}
                                    </Text>
                                </Col>
                                <SearchAndSelectBar
                                    options={DRUG_ALLERGIES}
                                    selectedOptions={selectedSymptoms}
                                    toggleOption={(symptom) => {
                                        if (selectedSymptoms.includes(symptom)) {
                                            setSelectedSymptoms(
                                                selectedSymptoms.filter((sym) => sym !== symptom),
                                            )
                                        } else {
                                            setSelectedSymptoms([...selectedSymptoms, symptom])
                                        }
                                    }}
                                />
                            </Row>

                            <Row rowStyles={{}}>
                                <Col md={12}>
                                    <Text style={style.contentHeader}>Treatment Support</Text>
                                </Col>
                                <Col md={12}>
                                    <Text
                                        style={[
                                            style.bodyContent,
                                            { fontStyle: "italic", color: "#7B7B7B" },
                                        ]}
                                    >
                                        Does the patient have treatment support?{" "}
                                    </Text>
                                </Col>
                                <Col md={12}>
                                    <RadioButton.Group
                                        onValueChange={(value) => setValue(value)}
                                        value={value}
                                    >
                                        <Row>
                                            <Col md={2}>
                                                <Row>
                                                    <Col md={4}>
                                                        <RadioButton
                                                            value="male"
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
                                                            value="female"
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
                                {/* <Col md={12}>
                                <Picker
                                    style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }]}
                                    selectedValue={value2}
                                    onValueChange={(v) => setValue2(v)}
                                    accessibilityLabel="Type of support"
                                    mode="dialog">
                                    <Item label="Type of support" value="0" />
                                    {MARITIAL_STATUS.map((item, index) => (
                                        <Item label={item} value={index + 1} />
                                    ))}
                                </Picker>
                            </Col> */}

                                <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                    <Button
                                        style={[
                                            style.buttonFilled,
                                            { paddingHorizontal: 46, alignSelf: "flex-end" },
                                        ]}
                                        onPress={() => {
                                            setDisplayIndex(1)
                                        }}
                                        uppercase={false}
                                    >
                                        <Text style={style.buttonText}>Next</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Card>
                    </View>
                ) : (
                    <Card title="HIV Status">
                        <Row>
                            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <Text style={style.contentHeader}>Date of First HIV+ Test</Text>
                            </Col>

                            <Col md={4}>
                                <CustomPicker
                                    options={pickerOptionsFromList(MONTH_NAMES)}
                                    onChange={(v: string) =>
                                        setFirstTest({ ...firstTest, month: v })
                                    }
                                    accessibilityLabel="Month"
                                    defaultFirstItem="Month"
                                    selectedValue={firstTest.month}
                                />
                                {/* <View
                                style={{
                                    backgroundColor: "#F3F3F3",
                                    borderColor: "#A8A8A8",
                                    borderWidth: 0.5,
                                    color: "rgba(0, 0, 0, 0.32)",
                                    paddingVertical: 4,
                                    paddingHorizontal: 4,
                                }}
                            >
                                <Picker
                                    // style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }]}
                                    selectedValue={firstTest.month}
                                    // onValueChange={(v) => setValue2(v)}
                                    accessibilityLabel="Month"
                                    onValueChange={(v) => setFirstTest({ ...firstTest, month: v })}
                                    mode="dialog"
                                >
                                    <Item label="Month" value={0} />
                                    {MONTH_NAMES.map((item, index) => (
                                        <Item label={item} value={index + 1} />
                                    ))}
                                </Picker>
                            </View> */}
                            </Col>

                            <Col md={4}>
                                <CustomPicker
                                    options={pickerOptionsFromList(DAY_NUMBERS)}
                                    defaultFirstItem="Day"
                                    selectedValue={firstTest.day}
                                    accessibilityLabel="Day"
                                    onChange={(v) => setFirstTest({ ...firstTest, day: v })}
                                />
                                {/* <View
                                style={{
                                    backgroundColor: "#F3F3F3",
                                    borderColor: "#A8A8A8",
                                    borderWidth: 0.5,
                                    color: "rgba(0, 0, 0, 0.32)",
                                    paddingVertical: 4,
                                    paddingHorizontal: 4,
                                }}
                            >
                                <Picker
                                    selectedValue={firstTest.day}
                                    accessibilityLabel="Day"
                                    onValueChange={(v) => setFirstTest({ ...firstTest, day: v })}
                                    mode="dialog"
                                >
                                    <Item label="Day" value={0} />
                                    {DAY_NUMBERS.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </View> */}
                            </Col>

                            <Col md={4}>
                                <CustomPicker
                                    options={pickerOptionsFromList(YEAR_NUMBERS)}
                                    defaultFirstItem="Year"
                                    accessibilityLabel="Year"
                                    selectedValue={firstTest.year}
                                    onChange={(v) => setFirstTest({ ...firstTest, year: v })}
                                />
                                {/* <View
                                style={{
                                    backgroundColor: "#F3F3F3",
                                    borderColor: "#A8A8A8",
                                    borderWidth: 0.5,
                                    color: "rgba(0, 0, 0, 0.32)",
                                    paddingVertical: 4,
                                    paddingHorizontal: 4,
                                }}
                            >
                                <Picker
                                    selectedValue={firstTest.year}
                                    onValueChange={(v) => setFirstTest({ ...firstTest, year: v })}
                                    accessibilityLabel="Year"
                                    mode="dialog"
                                >
                                    <Item label="Year" value="year" />
                                    {YEAR_NUMBERS.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </View> */}
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>Date Confirmed HIV+</Text>
                            </Col>
                            <Col md={4}>
                                <CustomPicker
                                    options={pickerOptionsFromList(MONTH_NAMES)}
                                    defaultFirstItem="Month"
                                    accessibilityLabel="Month"
                                    selectedValue={confirmedHIV.month}
                                    onChange={(v) => setConfirmedHIV({ ...confirmedHIV, month: v })}
                                />
                            </Col>

                            <Col md={4}>
                                <CustomPicker
                                    options={pickerOptionsFromList(DAY_NUMBERS)}
                                    defaultFirstItem="Day"
                                    accessibilityLabel="Day"
                                    selectedValue={confirmedHIV.day}
                                    onChange={(v) => setConfirmedHIV({ ...confirmedHIV, day: v })}
                                />
                            </Col>

                            <Col md={4}>
                                <CustomPicker
                                    options={pickerOptionsFromList(YEAR_NUMBERS)}
                                    defaultFirstItem="Year"
                                    accessibilityLabel="Year"
                                    selectedValue={confirmedHIV.year}
                                    onChange={(v) => setConfirmedHIV({ ...confirmedHIV, year: v })}
                                />
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>
                                    Is the patient currently on ARVs?
                                </Text>
                            </Col>

                            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                                <RadioButton.Group
                                    onValueChange={(value) => setValue(value)}
                                    value={value}
                                >
                                    <Row>
                                        <Col md={2}>
                                            <Row>
                                                <Col md={4}>
                                                    <RadioButton
                                                        value="male"
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
                                                        value="female"
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
                            <Col md={12} marginVertical={10}>
                                <ExtendedDatePicker
                                    label="Date Started on ARVs"
                                    onDateSet={(date) => setState({ ...state, ARVStartDate: date })}
                                />
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <CustomPicker
                                    options={pickerOptionsFromList(ARV_STAGES)}
                                    defaultFirstItem="WHO Stage"
                                    accessibilityLabel="stage"
                                    selectedValue={state.arvStage}
                                    onChange={(v) => setState({ ...state, arvStage: v })}
                                />
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Row rowStyle={{ backgroundColor: "red", width: "100%" }}>
                                    <Col md={6} colStyles={[{}]}>
                                        <Button
                                            style={[
                                                style.buttonFilled,
                                                { paddingHorizontal: 46, alignSelf: "flex-start" },
                                            ]}
                                            onPress={() => {
                                                // navigate here
                                                setDisplayIndex(0)
                                            }}
                                            uppercase={false}
                                        >
                                            <Text style={style.buttonText}>Back</Text>
                                        </Button>
                                    </Col>
                                    <Col md={6} colStyles={[{}]}>
                                        <Button
                                            style={[
                                                style.buttonFilled,
                                                { paddingHorizontal: 46, alignSelf: "flex-end" },
                                            ]}
                                            onPress={() => {
                                                // navigate here

                                                // saving data and continue with assessment
                                                // not sure if this is the right destination though
                                                navigation.navigate("ctc.PatientVisit")
                                            }}
                                            uppercase={false}
                                        >
                                            <Text style={style.buttonText}>Next</Text>
                                        </Button>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                )}
                <Spacer size={20} />
            </Screen>
        )
    },
)

export default PatientNewVisit
