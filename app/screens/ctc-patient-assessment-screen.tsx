import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, TextInput, RadioButton, Divider, Button } from "react-native-paper"
import { Screen, Row, Col } from "../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../theme"
import { friendlyFormatDate, fullFormatDate } from "../common/utils"
import { Picker } from '@react-native-community/picker';
const Item = Picker.Item as any;

export interface CtcPatientAssessmentScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}


const arvStages = [
    'Stage 1',
    'Stage 2',
    'Stage 3',
    'Stage 4',
]

export const CtcPatientAssessmentScreen: React.FunctionComponent<CtcPatientAssessmentScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        const navigation = useNavigation()
        const [value, setValue] = React.useState("male")
        const [displayIndex, setDisplayIndex] = React.useState(0)
        const [state, setState] = React.useState({
            maritalStatus: "", month: "", year: "", day: "", arvStage: ""
        })

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
                                    keyboardType="number-pad"
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
                                    keyboardType="number-pad"
                                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                                    mode="outlined"
                                    label="Height/Length (cm)"
                                    style={style.input}
                                    underlineColor="transparent"
                                    theme={{ colors: { primary: color.primary } }}
                                />
                            </Col>

                            <Col md={6}>
                                <Picker
                                    style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                    selectedValue={state.arvStage}
                                    onValueChange={(v) => setState({ ...state, arvStage: v })}
                                    accessibilityLabel="WHO Clinical Stage"
                                    mode="dialog">
                                    <Item label="WHO Clinical Stage" value="0" />
                                    {arvStages.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </Col>

                            <Col md={6}>
                                <Picker
                                    style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                    selectedValue={state.arvStage}
                                    onValueChange={(v) => setState({ ...state, arvStage: v })}
                                    accessibilityLabel="Functional Status"
                                    mode="dialog">
                                    <Item label="Functional Status" value="0" />
                                    {arvStages.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </Col>

                            <Col md={6} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>Is the patient pregnant?</Text>
                            </Col>
                            <Col md={6} colStyles={style.contentTextVerticalSpacing}>
                                <RadioButton.Group
                                    onValueChange={(value) => setValue(value)}
                                    value={value}
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
                                                    <Text style={style.bodyContent}>Yes</Text>
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
                                    keyboardType="number-pad"
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
                                <Picker
                                    style={[, style.input, { backgroundColor: "#E5E5E5", color: "rgba(0, 0, 0, 0.32)" }, style.contentTextVerticalSpacing]}
                                    selectedValue={state.arvStage}
                                    onValueChange={(v) => setState({ ...state, arvStage: v })}
                                    accessibilityLabel="Relevant Co-Medications"
                                    mode="dialog">
                                    <Item label="Relevant Co-Medications" value="0" />
                                    {arvStages.map((item, index) => (
                                        <Item label={item + ""} value={index + 1} />
                                    ))}
                                </Picker>
                            </Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}></Col>

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>
                                    Is the patient currently taking Cotrim?
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

                            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                                <Text style={style.contentHeader}>
                                    Is the patient currently taking Diflucan?
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
