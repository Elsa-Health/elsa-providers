import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, RadioButton, TextInput, Divider, Button, Chip } from "react-native-paper"
import { Screen, Col, Row } from "../components"
import { Dropdown } from "react-native-material-dropdown"
import _ from "lodash"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../theme"
import SearchAndSelectBar from "../components/search-and-select-bar/search-and-select-bar"
import { Picker } from "@react-native-community/picker"
import useStore, { PatientFile } from "../models/ctc-store"
const Item = Picker.Item as any

export interface CtcNewPatientScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

const symptomSet: string[] = [
    "fever",
    "dry cough",
    "cough",
    "jaundice",
    "yellow eyes",
    "dyspnoea",
    "vomiting",
    "headache",
    "malaise",
    "hearing loss",
    "skin rash",
    "visual loss",
    "stiff neck",
    "photophobia",
]

var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
]

const drugAllergySet: string[] = [
    "asprin",
    "sulfer drugs",
    "penicillin",
    "ibuprofen",
    "chemotherapy drugs",
]
const maritalStates = ["Single", "Married", "Cohabiting", "Divorced/ Separated", "Widow/ Widowed"]

const years = function (startYear) {
    var currentYear = new Date().getFullYear(),
        years = []
    startYear = startYear || 1980
    while (startYear <= currentYear) {
        years.push(startYear++)
    }
    return years
}

//method to get all days in a month
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate()
}

const daysNumbers = Array.from(Array(daysInMonth(8, 2020)), (_, i) => i + 1)
const yearNumbers = years(2019 - 30).reverse()

const arvStages = ["Stage 1", "Stage 2", "Stage 3", "Stage 4"]

export const CtcNewPatientScreen: React.FunctionComponent<CtcNewPatientScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        const navigation = useNavigation()
        const [value, setValue] = React.useState("male")
        const [selectedValue, setSelectedValue] = React.useState("java")
        const [displayIndex, setDisplayIndex] = React.useState(0)
        const [selectedSymptoms, setSelectedSymptoms] = React.useState([])

        const patient: PatientFile = useStore((state) => state.patient)
        const updatePatient = useStore((state) => state.updatePatient)

        const [value2, setValue2] = React.useState("red")

        const [state, setState] = React.useState({
            maritalStatus: "",
            month: "",
            year: "",
            day: "",
            arvStage: "",
        })

        const [firstTest, setFirstTest] = React.useState({ month: "", year: "", day: "" })
        const [confirmedHIV, setConfirmedHIV] = React.useState({ month: "", year: "", day: "" })
        const [ARVStart, setARVStart] = React.useState({ month: "", year: "", day: "" })

        console.warn("Year ", patient.sex)
        return (
            <Screen style={ROOT} preset="scroll" title="New Patient Information">
                <Row>
                    <Col md={12}>
                        <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                            Please input the following information about your patient.{" "}
                        </Text>
                    </Col>
                </Row>
                {displayIndex == 0 ? (
                    <Row>
                        <Row rowStyles={style.contentTextVerticalSpacing}>
                            <Col md={6}>
                                <Text style={style.contentHeader}>Gender </Text>
                            </Col>
                            <Col md={6}>
                                <RadioButton.Group
                                    onValueChange={(value) => updatePatient("sex", value)}
                                    value={patient.sex}
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
                                                    <Text style={style.bodyContent}>Female</Text>
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </RadioButton.Group>
                            </Col>
                        </Row>
                        <Row rowStyles={style.contentTextVerticalSpacing}>
                            <Col md={12}>
                                <Text style={style.contentHeader}>Date of Birth</Text>
                            </Col>
                            <Col md={12}>
                                <Row>
                                    <Col md={4}>
                                        {/* <TextInput
                                            // value={state.activationCode}
                                            keyboardType="number-pad"
                                            // onChangeText={text => setstate({ ...state, activationCode: text })}
                                            mode="outlined"
                                            label=""
                                            style={style.input}
                                            underlineColor="transparent"
                                            theme={{ colors: { primary: color.primary } }}
                                        /> */}
                                        <View
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
                                                selectedValue={state.month}
                                                // onValueChange={(v) => setValue2(v)}
                                                accessibilityLabel="Month"
                                                onValueChange={(v) =>
                                                    setState({ ...state, month: v })
                                                }
                                                mode="dialog"
                                            >
                                                <Item label="Month" value={0} />
                                                {monthNames.map((item, index) => (
                                                    <Item label={item} value={index + 1} />
                                                ))}
                                            </Picker>
                                        </View>
                                    </Col>
                                    <Col md={4}>
                                        <View
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
                                                selectedValue={state.day}
                                                // onValueChange={(v) => setValue2(v)}
                                                accessibilityLabel="Day"
                                                onValueChange={(v) =>
                                                    setState({ ...state, day: v })
                                                }
                                                mode="dialog"
                                            >
                                                <Item label="Day" value={0} />
                                                {daysNumbers.map((item, index) => (
                                                    <Item label={item + ""} value={index + 1} />
                                                ))}
                                            </Picker>
                                        </View>
                                    </Col>
                                    <Col md={4}>
                                        <View
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
                                                selectedValue={state.year}
                                                onValueChange={(v) =>
                                                    setState({ ...state, year: v })
                                                }
                                                accessibilityLabel="Year"
                                                mode="dialog"
                                            >
                                                <Item label="Year" value="year" />
                                                {yearNumbers.map((item, index) => (
                                                    <Item label={item + ""} value={index + 1} />
                                                ))}
                                            </Picker>
                                        </View>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={12}>
                                        <Text style={{ color: "#7B7B7B" }}>
                                            Age: 35 years, 4 months
                                        </Text>
                                    </Col>
                                </Row>
                            </Col>
                        </Row>

                        <Row rowStyles={style.contentTextVerticalSpacing}>
                            <Col md={12}>
                                <View
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
                                        // style={[, style.input, {  color: "rgba(0, 0, 0, 0.32)" }]}
                                        selectedValue={state.maritalStatus}
                                        onValueChange={(v) =>
                                            setState({ ...state, maritalStatus: v })
                                        }
                                        accessibilityLabel="Marital Status"
                                        mode="dialog"
                                    >
                                        <Item label="Marital Status" value={0} />
                                        {maritalStates.map((item, index) => (
                                            <Item label={item} value={index + 1} />
                                        ))}
                                    </Picker>
                                </View>
                            </Col>
                            <Col md={12}>
                                <TextInput
                                    // value={state.activationCode}
                                    keyboardType="default"
                                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                                    mode="outlined"
                                    label="District Of Residence"
                                    style={style.input}
                                    underlineColor="#FF0000"
                                    // underlineColorAndroid="#FF0000"
                                    theme={{
                                        colors: {
                                            primary: color.primary,
                                            text: "#A8A8A8",
                                            underlineColor: "#A8A8A8",
                                        },
                                    }}
                                />
                            </Col>
                        </Row>

                        <Row rowStyles={{ marginVertical: 32 }}>
                            <Col md={12}>
                                <Divider
                                    style={[
                                        {
                                            backgroundColor: color.offWhiteBackground,
                                            marginHorizontal: md ? -36 : -12,
                                        },
                                    ]}
                                />
                            </Col>
                        </Row>

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
                                options={drugAllergySet}
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
                        <Row rowStyles={{ marginVertical: 32 }}>
                            <Col md={12}>
                                <Divider
                                    style={[
                                        {
                                            backgroundColor: color.offWhiteBackground,
                                            marginHorizontal: md ? -36 : -12,
                                        },
                                    ]}
                                />
                            </Col>
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
                                    {maritalStates.map((item, index) => (
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
                    </Row>
                ) : (
                    <Row>
                        <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                            <Text style={style.contentHeader}>Date of First HIV+ Test</Text>
                        </Col>

                        <Col md={4}>
                            <View
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
                                    {monthNames.map((item, index) => (
                                        <Item label={item} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
                        </Col>

                        <Col md={4}>
                            <View
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
                                    selectedValue={firstTest.day}
                                    // onValueChange={(v) => setValue2(v)}
                                    accessibilityLabel="Day"
                                    onValueChange={(v) => setFirstTest({ ...firstTest, day: v })}
                                    mode="dialog"
                                >
                                    <Item label="Day" value={0} />
                                    {daysNumbers.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
                        </Col>

                        <Col md={4}>
                            <View
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
                                    selectedValue={firstTest.year}
                                    onValueChange={(v) => setFirstTest({ ...firstTest, year: v })}
                                    accessibilityLabel="Year"
                                    mode="dialog"
                                >
                                    <Item label="Year" value="year" />
                                    {yearNumbers.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
                        </Col>

                        <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                            <Text style={style.contentHeader}>Date Confirmed HIV+</Text>
                        </Col>
                        <Col md={4}>
                            <View
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
                                    selectedValue={confirmedHIV.month}
                                    // onValueChange={(v) => setValue2(v)}
                                    accessibilityLabel="Month"
                                    onValueChange={(v) =>
                                        setConfirmedHIV({ ...confirmedHIV, month: v })
                                    }
                                    mode="dialog"
                                >
                                    <Item label="Month" value={0} />
                                    {monthNames.map((item, index) => (
                                        <Item label={item} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
                        </Col>

                        <Col md={4}>
                            <View
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
                                    selectedValue={confirmedHIV.day}
                                    // onValueChange={(v) => setValue2(v)}
                                    accessibilityLabel="Day"
                                    onValueChange={(v) =>
                                        setConfirmedHIV({ ...confirmedHIV, day: v })
                                    }
                                    mode="dialog"
                                >
                                    <Item label="Day" value={0} />
                                    {daysNumbers.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
                        </Col>

                        <Col md={4}>
                            <View
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
                                    selectedValue={confirmedHIV.year}
                                    onValueChange={(v) =>
                                        setConfirmedHIV({ ...confirmedHIV, year: v })
                                    }
                                    accessibilityLabel="Year"
                                    mode="dialog"
                                >
                                    <Item label="Year" value="year" />
                                    {yearNumbers.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
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
                                                <RadioButton value="male" color={color.primary} />
                                            </Col>
                                            <Col md={8}>
                                                <Text style={style.bodyContent}>Yes</Text>
                                            </Col>
                                        </Row>
                                    </Col>

                                    <Col md={2}>
                                        <Row>
                                            <Col md={4}>
                                                <RadioButton value="female" color={color.primary} />
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
                            <Text style={style.contentHeader}>Date Started on ARVs</Text>
                        </Col>

                        <Col md={4}>
                            <View
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
                                    selectedValue={state.month}
                                    // onValueChange={(v) => setValue2(v)}
                                    accessibilityLabel="Month"
                                    onValueChange={(v) => setARVStart({ ...ARVStart, month: v })}
                                    mode="dialog"
                                >
                                    <Item label="Month" value={0} />
                                    {monthNames.map((item, index) => (
                                        <Item label={item} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
                        </Col>

                        <Col md={4}>
                            <View
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
                                    selectedValue={state.day}
                                    // onValueChange={(v) => setValue2(v)}
                                    accessibilityLabel="Day"
                                    onValueChange={(v) => setARVStart({ ...ARVStart, day: v })}
                                    mode="dialog"
                                >
                                    <Item label="Day" value={0} />
                                    {daysNumbers.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
                        </Col>

                        <Col md={4}>
                            <View
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
                                    selectedValue={state.year}
                                    onValueChange={(v) => setARVStart({ ...ARVStart, year: v })}
                                    accessibilityLabel="Year"
                                    mode="dialog"
                                >
                                    <Item label="Year" value="year" />
                                    {yearNumbers.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
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
                                    selectedValue={state.arvStage}
                                    onValueChange={(v) => setState({ ...state, arvStage: v })}
                                    accessibilityLabel="WHO Stage at Start of ARVs"
                                    mode="dialog"
                                >
                                    <Item label="WHO Stage at Start of ARVs" value="0" />
                                    {arvStages.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </View>
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
                                            //navigate here
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
                                            //navigate here
                                            navigation.navigate("ctc-assessment-screen")
                                        }}
                                        uppercase={false}
                                    >
                                        <Text style={style.buttonText}>Next</Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                )}
            </Screen>
        )
    },
)
