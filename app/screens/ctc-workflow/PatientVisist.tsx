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
    SymptomsPicker,
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
    // flex: 1,
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

// THIS COMPONENT TAKES LONG TO RENDER I DONT KNOW WHY
// I HAVE TO WAIT FOR COUPLE SECONDS TO REACH HERE

export const PatientVisit: React.FunctionComponent<PatientVisitProps> = () => {
    // const { someStore } = useStores()

    const navigation = useNavigation()
    // const onChange=(input)=>{
    //     setSta
    // }
    const [displayIndex, setDisplayIndex] = useState(0)
    const [title, setTitle] = useState("Patient Visit")
    const [state, setState] = useState({
        weight: 0,
        height: 0,
        systolicBP: 0,
        distolicBP: 0,
        whoClinicalStage: "",
        deliveryDate: null,
        isPreginant: false,
        isTakingARVS: false,
        regimen: "",
        isHavingSymptomOrEffect: false,
    })

    // console.log("All component state ", state)

    return (
        <Screen style={ROOT} preset="scroll" title={title}>
            <Spacer size={20} />
            <Card leftIcon="calendar-today" title="Date of Visit" right={getFormattedDate()}>
                {/* <Text>Hello World</Text> */}
            </Card>
            <Spacer size={12} />

            {/* The first part of patient visit */}
            {displayIndex === 0 && (
                <View>
                    <Card leftIcon="person" title="Patient Information">
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
                        <Spacer size={12} />
                    </Card>
                    <Spacer size={12} />
                    <Card leftIcon="healing" title="Known Co-Morbidities">
                        <Text size="h5">
                            Please indicate any known conditions the patient has at the time of this
                            visit:
                        </Text>

                        {/* Logic for this component implementation is left for now */}
                        {/* so left stateless, delete this comment when state added */}
                        {/* also not sure if this is appropriate place for this component */}
                        <SymptomsPicker />
                    </Card>

                    <Spacer size={12} />
                    <Card leftIcon="healing" title="ARV Treatment & Co-Medications">
                        <Row>
                            <Col md={12}>
                                <RadioQuestion
                                    question="Is the patient taking ARVs at the time of this visit?"
                                    value={state.isTakingARVS}
                                    options={isPreginantOptions}
                                    onPress={(answer) => {
                                        // console.log("Answer :  ", answer)
                                        setState({
                                            ...state,
                                            isTakingARVS: answer,
                                        })
                                    }}
                                />
                            </Col>
                            <Col md={12}>
                                {/* Content from "Long Inputs page" not well understood */}
                                {/* delete this when added the options here */}
                                <CustomPicker
                                    label="If yes, what is their regimen?"
                                    onChange={(regimen) => {
                                        setState({
                                            ...state,
                                            regimen,
                                        })
                                    }}
                                    options={[
                                        {
                                            label: "Sample",
                                            value: "Value",
                                        },
                                    ]}
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
                                    setTitle("Patient Visit - Symptoms")
                                    setDisplayIndex(1)
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
            )}

            {/* the second part of patient visit */}
            {displayIndex === 1 && (
                <View>
                    <Card leftIcon="healing" title="Symptom Assessment">
                        <RadioQuestion
                            question="Does the patient have any new symptoms or side effects to assess today?"
                            value={state.isHavingSymptomOrEffect}
                            options={isPreginantOptions}
                            onPress={(answer) => {
                                // console.log("Answer :  ", answer)
                                setState({
                                    ...state,
                                    isHavingSymptomOrEffect: answer,
                                })
                            }}
                        />

                        <Text bold size="h5">
                            Presenting Complaints
                        </Text>
                        <Spacer size={4} />

                        <Text italic size="h6" color="gray">
                            Ask your patient about their symptoms. We will ask questions about these
                            symptoms and related systems on the next page.
                        </Text>
                        <Spacer size={12} />
                        {/* Logic for this component implementation is left for now */}
                        {/* so left stateless, delete this comment when state added */}

                        <SymptomsPicker />
                    </Card>
                    <Spacer size={20} />
                    <Row>
                        <Col md={12} colStyles={{ flexDirection: "row-reverse" }}>
                            <Button
                                onPress={() => {
                                    // logics and show the second part here
                                    setTitle("Signs and Symptoms")
                                    setDisplayIndex(2)
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
            )}

            {/* the third part of patient visit */}
            {displayIndex === 2 && (
                <View>
                    {/* Are the sysmptoms cards to be kept separate ? */}
                    {/* TODO : implementation of the sysmptoms according to the origin systems */}
                    <Card title="Symptoms Cards ">
                        <Row>
                            <Col md={12}>
                                <Text size="h5" bold>
                                    Building ...
                                </Text>
                            </Col>
                        </Row>
                        <Spacer size={20} />
                    </Card>

                    <Row>
                        <Col md={12} colStyles={{ flexDirection: "row-reverse" }}>
                            <Button
                                onPress={() => {
                                    // Go to signs and simptoms page
                                
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
            )}

            <Spacer size={20} />
        </Screen>
    )
}

export default PatientVisit
