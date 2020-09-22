import React, { useState } from "react"
import { observer } from "mobx-react-lite"
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
} from "../../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../../theme"
import Spacer from "../../components/spacer/spacer"
import { getFormattedDate } from "../../utils/time"
import RadioQuestion from "../../components/radio-question/radio-question"
import ExtendedDatePicker from "../../components/extended-date-picker/extended-date-picker"

export interface PatientVisitProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

const WHOClinicalOptions = [
    { label: "Stage 1", value: "Stage 1" },
    { label: "Stage 2", value: "Stage 2" },
    { label: "Stage 3", value: "Stage 3" },
    { label: "Stage 4", value: "Stage 4" },
]

const functionStatusOptions = [
    { label: "Working", value: "Working" },
    { label: "Ambulatory", value: "Ambulatory" },
    { label: "Bedridden", value: "Bedridden" },
]

const isPreginantOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
]

export const PatientVisit: React.FunctionComponent<PatientVisitProps> = () => {
    // const { someStore } = useStores()

    const navigation = useNavigation()
    // const onChange=(input)=>{
    //     setSta
    // }

    const [state, setState] = useState({
        weight: 0,
        height: 0,
        systolicBP: 0,
        distolicBP: 0,
        whoClinicalStage: "",
        deliveryDate: null,
        isPreginant: false,
    })

    // console.log("All component state ", state)

    return (
        <Screen style={ROOT} preset="scroll" title={"Patient Visit"}>
            <Spacer size={20} />
            <Card leftIcon="calendar" title="Date of Visit" right={getFormattedDate()}>
                {/* <Text>Hello World</Text> */}
            </Card>
            <Spacer size={12} />
            <Card leftIcon="piano" title="Patient Information">
                <Row>
                    <Col md={6}>
                        <TextInput
                            label="Weight (kgs)"
                            onChange={() => (newValue) => {
                                setState({
                                    ...state,
                                    weight: newValue,
                                })
                            }}
                        />
                    </Col>

                    <Col md={6}>
                        <TextInput
                            label="Height/Length (cm)"
                            onChange={() => (newValue) => {
                                setState({
                                    ...state,
                                    height: newValue,
                                })
                            }}
                        />
                    </Col>

                    <Spacer size={12} />
                    <Col md={12}>{/* Some notification here if yes */}</Col>

                    <Spacer size={12} />
                    <Col md={6}>
                        <TextInput
                            label="Systolic Blood Pressure"
                            onChange={() => (newValue) => {
                                setState({
                                    ...state,
                                    systolicBP: newValue,
                                })
                            }}
                        />
                    </Col>

                    <Col md={6}>
                        <TextInput
                            label="Diastolic Blood Pressure"
                            onChange={() => (newValue) => {
                                setState({
                                    ...state,
                                    distolicBP: newValue,
                                })
                            }}
                        />
                    </Col>

                    <Spacer size={12} />
                    <Col md={12}>{/* Some notification here if yes too */}</Col>

                    <Spacer size={12} />
                    <Col md={6}>
                        {/* Keep the label outside the Cutomer, its a bit different outside of the design */}
                        {/* but its kept that way for understanding what someone selects */}
                        <CustomPicker
                            labelSize="h6"
                            label="WHO Clinical Stage"
                            options={WHOClinicalOptions}
                            onChange={() => (newValue) => {
                                setState({
                                    ...state,
                                    whoClinicalStage: newValue,
                                })
                            }}
                        />
                    </Col>

                    <Col md={6}>
                        <CustomPicker
                            labelSize="h6"
                            label="Functional Status"
                            options={functionStatusOptions}
                            onChange={() => (newValue) => {
                                setState({
                                    ...state,
                                    whoClinicalStage: newValue,
                                })
                            }}
                        />
                    </Col>

                    <Col md={12}>
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
                    </Col>
                    {state.isPreginant && (
                        <Col md={12}>
                            <Spacer size={12} />
                            <ExtendedDatePicker
                                label="If yes, expected date of delivery:"
                                onDateSet={(date) => {
                                    setState({
                                        ...state,
                                        deliveryDate: date,
                                    })
                                }}
                            />
                        </Col>
                    )}
                </Row>
                <Spacer size={20} />
            </Card>
        </Screen>
    )
}

export default PatientVisit
