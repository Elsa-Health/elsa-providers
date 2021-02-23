import React from "react"
import { View, Dimensions } from "react-native"
import _ from "lodash"
import { Button, Card, Checkbox, Col, Row, Screen, Text, TextInput } from "../../components"
import RadioQuestion from "../../components/radio-question/radio-question"
import { useNavigation } from "@react-navigation/native"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import Spacer from "../../components/spacer/spacer"
import { Divider } from "react-native-paper"
import { useVisitStore } from "../../models/addo-store"
import { color } from "../../theme"
import VisitDate from "../../components/visit-date/visit-date"
import { useLocale } from "../../models/language"

const { width, height } = Dimensions.get("window")

const PatientIntake: React.FC = () => {
    const navigation = useNavigation()
    const [translateChoice, _locale] = useLocale((state) => [state.translateChoice, state.locale])
    const [
        sex,
        years,
        months,
        isPregnant,
        presentingSymptoms,
        setState,
    ] = useVisitStore((state) => [
        state.sex,
        state.years,
        state.months,
        state.isPregnant,
        state.presentingSymptoms,
        state.updateVisit,
    ])
    const [signs, setSigns] = React.useState({
        cough: presentingSymptoms.includes("cough") ? "present" : "absent",
        coughType: "unknown",
        "chest pain": presentingSymptoms.includes("chest pain") ? "present" : "absent",
        dyspnoea: presentingSymptoms.includes("dyspnoea") ? "present" : "absent",
        fever: presentingSymptoms.includes("fever") ? "present" : "absent",
        feverGrade: "unknown",
        cyanosis: "unknown",
        seizures: "unknown",
        "loss of consciousness": "unknown",
    })

    const toggleSign = (name: string) => {
        return setSigns((state) => ({
            ...state,
            [name]: state[name] === "present" ? "absent" : "present",
        }))
    }

    const submit = () => {
        const patientSymptoms = _.keys(signs).filter((sign) => signs[sign] === "present")
        const patientAbsentSymptoms = _.keys(signs).filter((sign) => signs[sign] === "absent")
        console.log("subgmi: ", patientSymptoms, patientAbsentSymptoms)
        setState({ presentingSymptoms: patientSymptoms, absentSymptoms: patientAbsentSymptoms })

        // FIXME: add proper symptom checking
        if (
            _.intersection(patientSymptoms, [
                "dyspnoea",
                "seizures",
                "cyanosis",
                "loss of consciousness",
            ]).length > 0
        ) {
            return navigation.navigate("addo.ReferPatient")
        }

        navigation.navigate("addo.FurtherAssessment")
    }

    console.log(years, months, presentingSymptoms)
    return (
        <Screen preset="scroll" titleTx="addo.patientAssessment.title" title="Patient Assessment">
            <View style={{ paddingVertical: 5, minHeight: height / 2 }}>
                {/* <Card
                    leftIcon="calendar-today"
                    marginVertical={18}
                    title="Date of Visit"
                    rightItem={fullFormatDate(new Date())}
                /> */}

                <Spacer size={25} />

                <VisitDate />

                <RadioQuestion
                    question="Patient's Sex"
                    questionSize="h6"
                    questionTx="common.patientSex"
                    orientation="horizontal"
                    options={[
                        { label: "Male", value: "male" },
                        { label: "Female", value: "female" },
                    ]}
                    id="patientSex"
                    onPress={(value) => setState({ sex: value as string })}
                    value={sex}
                />

                {sex === "female" && (
                    <RadioQuestion
                        question="Is the patient pregnant?"
                        questionSize="h6"
                        questionTx="common.patientPregnant"
                        orientation="horizontal"
                        options={[
                            { label: "Yes", value: true },
                            { label: "No", value: false },
                        ]}
                        id="isPregnant"
                        onPress={(value) => setState({ isPregnant: value as boolean })}
                        value={isPregnant}
                    />
                )}

                <Spacer size={15} />

                <Text tx="common.age" size="h6">
                    Age
                </Text>

                <Row>
                    <Col xs={6} sm={6}>
                        <TextInput
                            value={years.toString()}
                            keyboardType="number-pad"
                            onChangeText={(val) => setState({ years: Number(val) })}
                            label="Years"
                            labelTx="common.years"
                        />
                    </Col>
                    <Col xs={6} sm={6}>
                        <TextInput
                            value={months.toString()}
                            keyboardType="number-pad"
                            onChangeText={(val) => setState({ months: Number(val) })}
                            label="Months"
                            labelTx="common.months"
                        />
                    </Col>
                </Row>

                <Spacer size={25} />
                <Divider />
                <Spacer size={25} />

                <Row>
                    <MaterialIcon
                        style={{ marginRight: 10 }}
                        size={24}
                        color={color.primary}
                        name="text-box-check-outline"
                    />
                    <Text tx="common.symptomAssessment" text="Symptom Assessment" bold size="h6" />
                </Row>

                {/* <Text size="h5" bold>
                    Symptom Assessment
                </Text> */}

                <Card>
                    <Checkbox
                        value={signs.cough === "present"}
                        onToggle={() => toggleSign("cough")}
                        text={translateChoice(["Cough", "Kikohozi"])}
                        textSize="h6"
                        rtl
                    />

                    {signs.cough === "present" && (
                        <>
                            <View style={{ paddingLeft: 20 }}>
                                <Checkbox
                                    // text="Dry cough"
                                    value={signs.coughType === "dry cough"}
                                    onToggle={() =>
                                        setSigns((state) => ({ ...state, coughType: "dry cough" }))
                                    }
                                    text={translateChoice(["Dry Cough", "Kikohozi kikavu"])}
                                    textSize="default"
                                    rtl
                                />
                                <Checkbox
                                    value={signs.coughType === "productive cough"}
                                    onToggle={() =>
                                        setSigns((state) => ({
                                            ...state,
                                            coughType: "productive cough",
                                        }))
                                    }
                                    // text="Productive cough"
                                    text={translateChoice([
                                        "Productive Cough",
                                        "Kikohozi chenye makohozi",
                                    ])}
                                    textSize="default"
                                    rtl
                                />
                            </View>
                            <TextInput label="Duration" labelTx="common.duration" />
                        </>
                    )}
                </Card>

                <Card>
                    <Checkbox
                        // text="Fever"
                        value={signs.fever === "present"}
                        onToggle={() => toggleSign("fever")}
                        text={translateChoice(["Fever", "Homa"])}
                        textSize="h6"
                        rtl
                    />

                    {signs.fever === "present" && (
                        <>
                            <View style={{ paddingLeft: 20 }}>
                                <Checkbox
                                    value={signs.feverGrade === "high grade fever"}
                                    onToggle={() =>
                                        setSigns((state) => ({
                                            ...state,
                                            feverGrade: "high grade fever",
                                        }))
                                    }
                                    // text="High grade (above 37°C)"
                                    text={translateChoice([
                                        "High grade (above 37°C)",
                                        "Homa kali sana",
                                    ])}
                                    textSize="default"
                                    rtl
                                />
                                <Checkbox
                                    value={signs.feverGrade === "low grade fever"}
                                    onToggle={() =>
                                        setSigns((state) => ({
                                            ...state,
                                            feverGrade: "low grade fever",
                                        }))
                                    }
                                    text={translateChoice([
                                        "Low grade (below 36°C)",
                                        "Homa isiyo kali sana",
                                    ])}
                                    // text="Low grade (below 36°C)"
                                    textSize="default"
                                    rtl
                                />
                            </View>
                            <TextInput label="Duration" labelTx="common.duration" />
                        </>
                    )}
                </Card>

                <Card>
                    <Checkbox
                        value={signs.dyspnoea === "present"}
                        onToggle={() => toggleSign("dyspnoea")}
                        // text="Difficulty Breathing"
                        text={translateChoice(["Difficulty Breathing", "Ugumu wa kupumua"])}
                        textSize="h6"
                        rtl
                    />
                    {signs.dyspnoea === "present" && (
                        <>
                            {/* <View style={{ paddingLeft: 20 }}>
                                <Checkbox text="High grade (above 37C)" textSize="h6" rtl />
                                <Checkbox text="Low grade (below 36C)" textSize="h6" rtl />
                            </View> */}
                            <TextInput label="Duration" labelTx="common.duration" />
                        </>
                    )}
                </Card>

                <Card>
                    <Checkbox
                        value={signs["chest pain"] === "present"}
                        onToggle={() => toggleSign("chest pain")}
                        // text="Chest Pain"
                        text={translateChoice(["Chest Pain", "Maumivu ya kifua"])}
                        textSize="h6"
                        rtl
                    />

                    {signs["chest pain"] === "present" && (
                        <>
                            {/* <View style={{ paddingLeft: 20 }}>
                                <Checkbox text="High grade (above 37C)" textSize="h6" rtl />
                                <Checkbox text="Low grade (below 36C)" textSize="h6" rtl />
                            </View> */}
                            <TextInput label="Duration" labelTx="common.duration" />
                        </>
                    )}
                </Card>

                <Card>
                    <Checkbox
                        value={signs["loss of consciousness"] === "present"}
                        onToggle={() => toggleSign("loss of consciousness")}
                        // text="Loss of consciousness"
                        text={translateChoice(["Loss of consciousness", "Kupoteza fahamu"])}
                        textSize="h6"
                        rtl
                    />
                </Card>

                <Card>
                    <Checkbox
                        value={signs.cyanosis === "present"}
                        onToggle={() => toggleSign("cyanosis")}
                        // text="Cyanosis (blue lips or fingers)"
                        text={translateChoice([
                            "Cyanosis (blue lips or fingers)",
                            "Vidole au mdomo kuwa bluu",
                        ])}
                        textSize="h6"
                        rtl
                    />
                </Card>

                <Card>
                    <Checkbox
                        value={signs.seizures === "present"}
                        onToggle={() => toggleSign("seizures")}
                        // text="Seizures or convulsions"
                        text={translateChoice(["Seizures or convulsions", "Kukakamaa au Degedege"])}
                        textSize="h6"
                        rtl
                    />
                </Card>
            </View>

            <Button
                style={{ paddingHorizontal: 46, paddingVertical: 5, alignSelf: "flex-end" }}
                onPress={submit}
                uppercase={false}
                mode="contained"
                label="Next"
                labelTx="common.next"
            />
        </Screen>
    )
}

export default PatientIntake
