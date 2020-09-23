import React from "react"
import { Screen, Text, Card, Button, Notification, Row, Col } from "../../components"
import { TextInput, Divider } from "react-native-paper"
import CustomPicker from "../../components/custom-picker/custom-picker"
import { EDUCATION_LEVELS, educationLevels, BOOLEAN_OPTIONS } from "../../common/constants"
import { View, StyleSheet } from "react-native"
import _ from "lodash"
import RadioQuestion from "../../components/radio-question/radio-question"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { color, style } from "../../theme"
import Spacer from "../../components/spacer/spacer"
import { getFormattedDate } from "../../utils/time"

const visits = [
    {
        id: "euwjpoicm283jfewocs",
        date: "20 August 2020",
        conditionDistributions: [
            { diagnosis: "Pneumocystis Pneumonia", p: 0.89 },
            { diagnosis: "Cryptoccocal Meningitis", p: 0.25 },
            { diagnosis: "Hepatitis B", p: 9 },
        ],
        nonAdherenceRisk: 0.75,
        ARVresistanceRisk: 0.43,
    },
    {
        id: "v4y576hfc3vthjyukhrtss",
        date: "15 August 2020",
        conditionDistributions: [
            { diagnosis: "Pneumocystis Pneumonia", p: 0.39 },
            { diagnosis: "Cryptoccocal Meningitis", p: 0.55 },
            { diagnosis: "Hepatitis B", p: 19 },
        ],
        nonAdherenceRisk: 0.07,
        ARVresistanceRisk: 0.43,
    },
    {
        id: "fjcsdjmrcjf34wrfjw98rudmwr",
        date: "12 August 2020",
        conditionDistributions: [
            { diagnosis: "Pneumocystis Pneumonia", p: 0.99 },
            { diagnosis: "Cryptoccocal Meningitis", p: 0.55 },
            { diagnosis: "Hepatitis B", p: 19 },
        ],
        nonAdherenceRisk: 0.7,
        ARVresistanceRisk: 0.83,
    },
]

const patientInfo = [
    {
        label: "Gender",
        value: "Male",
    },
    {
        label: "Date of Birth",
        value: "31 September 1993",
    },
    {
        label: "Age",
        value: "25",
    },

    {
        label: "Marital Status",
        value: "Single",
    },
]
const PatientFile: React.FC = () => {
    const navigation = useNavigation()
    return (
        <Screen preset="scroll" title="Patient File">
            <Spacer size={20} />

            <Text size="h5" bold>
                Number: 1234-456-890
            </Text>

            <Spacer size={16} />
            <Card>
                <TouchableOpacity activeOpacity={0.5} style={styles.cardActionContainer}>
                    <Text size="h5">Start a New Visit</Text>
                    <Icon size={20} name="arrow-forward" />
                </TouchableOpacity>
            </Card>
            <Spacer size={16} />

            {/* change the next visit according to data props */}

            <Card leftIcon="calendar-today" title="Date of Visit" right={getFormattedDate()}>
                <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <Button label="Change" mode="text" onPress={() => {}}></Button>
                </View>
            </Card>
            <Spacer size={16} />
            <Card>
                {/* A room for any Notification */}
                <Notification variation="danger" title="Some Notification">
                    <Text size="h5">Lorem ipsum</Text>
                </Notification>
            </Card>
            <Spacer size={16} />

            {/* the right component to be changed to accept react component */}

            <Card
                title="Patient Information"
                leftIcon="person"
                right={
                    <TouchableOpacity>
                        <Text size="h6" color="primary">
                            Update
                        </Text>
                    </TouchableOpacity>
                }
            >
                <Row>
                    {/* it depends this info can be hard coded  */}
                    {patientInfo.map((info, index) => (
                        <Col md={6} marginVertical={8} key={info.label}>
                            <Text size="small" color="gray">
                                {info.label}
                            </Text>
                            <Text size="h5">{info.value}</Text>
                        </Col>
                    ))}
                </Row>
            </Card>

            <Spacer size={16} />
            <Text size="h5" bold>
                Past Visits
            </Text>
            <Spacer size={12} />
            {visits.map((visit) => (
                <View key={visit.id}>
                    <Card>
                        {/* <Card.Content> */}
                        <Spacer size={20} />
                        <Row>
                            <Col md={8}>
                                <Text size="h6" color="primary" bold>
                                    Date: {visit.date}
                                </Text>
                            </Col>

                            <Col md={4}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("ctc.ManagePatientVisit")}
                                >
                                    <View>
                                        <Text size="h6" color="primary" align="right" >
                                            Manage Visit
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                                {/* <Button
                                    label="Manage Visit"
                                    mode="text"
                                    onPress={() => navigation.navigate("ctc.ManagePatientVisit")}
                                ></Button> */}
                            </Col>
                        </Row>

                        <Spacer size={10} />
                        <Row>
                            <Col md={12}>
                                <Text size="h6" color="primary" bold>
                                    Assessment Outcomes
                                </Text>
                            </Col>

                            <Col md={8}>
                                <Text>
                                    Likely Condition:{" "}
                                    {_.sortBy(visit.conditionDistributions, ["p"])[0].diagnosis}
                                </Text>
                            </Col>

                            <Col md={4}>
                                <Text color="angry" align="center">
                                    Not confirmed
                                </Text>
                            </Col>
                            <Spacer size={30} />
                            <Col md={12}>
                                <Text>
                                    Non-Adherence Risk: {(visit.nonAdherenceRisk * 100).toFixed(1)}%
                                </Text>
                            </Col>
                            <Spacer size={30} />

                            <Col md={12}>
                                <Text>
                                    Drug Resistance Risk:{" "}
                                    {(visit.ARVresistanceRisk * 100).toFixed(1)}%
                                </Text>
                            </Col>
                        </Row>
                        <Spacer size={20} />
                    </Card>

                    <Spacer size={16} />
                </View>
            ))}
        </Screen>
    )
}

const styles = StyleSheet.create({
    cardAction: { flexDirection: "row-reverse", paddingLeft: 8 },
    cardActionContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
})

export default PatientFile
