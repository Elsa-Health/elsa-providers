import React from "react"
import { Screen, Text, Card, Button, Notification, Row, Col } from "../../components"
import CustomPicker from "../../components/custom-picker/custom-picker"
import { EDUCATION_LEVELS, educationLevels, BOOLEAN_OPTIONS } from "../../common/constants"
import { View, StyleSheet, Alert, ToastAndroid, Dimensions } from "react-native"
import _ from "lodash"
import RadioQuestion from "../../components/radio-question/radio-question"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { color, style } from "../../theme"
import Spacer from "../../components/spacer/spacer"
import { getFormattedDate } from "../../utils/time"
import { Appointment, useAuthenticationStore, useVisitStore } from "../../models/ctc-store"
import {
    fullFormatDate,
    getNextAppointment,
    getNextAppointmentDate,
    monthsDiff,
} from "../../common/utils"
import ExtendedDatePicker from "../../components/extended-date-picker/extended-date-picker"
import { Api } from "../../services/api"
import moment from "moment"
import { LineChart } from "react-native-chart-kit"
import shallow from "zustand/shallow"

const { width, height } = Dimensions.get("window")

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

const PatientFile: React.FC = () => {
    const navigation = useNavigation()
    const [patientFile, patientVisits, patientAppointments] = useVisitStore(
        (state) => [state.patientFile, state.patientVisits, state.patientAppointments],
        shallow,
    )

    console.warn("Patient Date: ", patientAppointments)

    const currentAppointmentDate = getNextAppointmentDate(patientAppointments)
    // const currentAppointmentId = getNextAppointment(patientAppointments).id

    if (!patientFile) {
        // FIXME: add error logging in case of this
        // TODO: add a better screen handler for this case
        return <View />
    }

    return (
        <Screen preset="scroll" title="Patient File">
            <Spacer size={30} />

            <Text size="h5" bold>
                Number: {patientFile.code}
            </Text>

            <Spacer size={16} />
            <Card containerStyle={{ backgroundColor: color.primary }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("ctc.VisitType", {})}
                    activeOpacity={0.5}
                    style={styles.cardActionContainer}
                >
                    <Text color="white" size="h5">
                        Start a New Visit
                    </Text>
                    <Icon color="white" size={20} name="arrow-right" />
                </TouchableOpacity>
            </Card>
            <Spacer size={16} />

            {/* change the next visit according to data props */}

            <AppointmentManagerCard />

            {currentAppointmentDate && (
                <Notification
                    variation="danger"
                    visible={new Date(currentAppointmentDate) < new Date()}
                    title="Missed Appointment"
                >
                    <Text size="h5">
                        Patient has not shown up for their appointment{" "}
                        {Math.abs(moment(currentAppointmentDate).diff(moment(), "days"))} days ago.{" "}
                        {moment(currentAppointmentDate).diff(moment(), "days") >= 28
                            ? `Patient is now
                    considered lost to followup.`
                            : ""}
                    </Text>
                </Notification>
            )}

            <Spacer size={16} />

            {/* the right component to be changed to accept react component */}

            <Card
                title="Patient Information"
                leftIcon="account"
                marginVertical={15}
                rightItem={
                    <TouchableOpacity
                        onPress={() =>
                            navigation.navigate("ctc.PatientInformationManager", {
                                destination: "back",
                            })
                        }
                    >
                        <Text size="h6" color="primary">
                            Update
                        </Text>
                    </TouchableOpacity>
                }
            >
                <Row>
                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            Sex
                        </Text>
                        <Text size="h5">
                            {patientFile.sex ? _.upperFirst(patientFile.sex) : "Not Set"}
                        </Text>
                    </Col>
                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            Date of Birth
                        </Text>
                        <Text size="h5">
                            {patientFile.dateOfBirth
                                ? fullFormatDate(patientFile.dateOfBirth)
                                : "Not Set"}
                        </Text>
                    </Col>

                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            Age
                        </Text>
                        <Text size="h5">
                            {patientFile.dateOfBirth
                                ? (monthsDiff(patientFile.dateOfBirth, new Date()) / 12).toFixed(1)
                                : "Not Set"}
                        </Text>
                    </Col>
                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            Marital Status
                        </Text>
                        <Text size="h5">
                            {_.upperFirst(patientFile.maritalStatus || "Not Set")}
                        </Text>
                    </Col>

                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            District of Residence
                        </Text>
                        <Text size="h5">{patientFile.district || "Not Set"}</Text>
                    </Col>
                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            Date Confirmed HIV+
                        </Text>
                        <Text size="h5">
                            {patientFile.HIVConfirmDate
                                ? fullFormatDate(patientFile.HIVConfirmDate)
                                : "Not Set"}
                        </Text>
                    </Col>

                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            ARV Status
                        </Text>
                        <Text size="h5">
                            {patientFile.ARTNaive
                                ? "Treatment Naive"
                                : patientFile.currentARTUse
                                ? "Current"
                                : "Not Current"}
                        </Text>
                    </Col>
                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            Date Started on ARVs
                        </Text>
                        <Text size="h5">
                            {patientFile.ARTStartDate
                                ? fullFormatDate(patientFile.ARTStartDate)
                                : "Not Set"}
                        </Text>
                    </Col>

                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            WHO Stage at diagnosis
                        </Text>
                        <Text size="h5">
                            {patientFile.WHOStageAtDiagnosis
                                ? _.upperFirst(patientFile.WHOStageAtDiagnosis.replace("-", " "))
                                : "Not Set"}
                        </Text>
                    </Col>
                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            Treatment Support
                        </Text>
                        <Text size="h5">{patientFile.treatmentSupport ? "Yes" : "No"}</Text>
                    </Col>

                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            Support Type
                        </Text>
                        <Text size="h5">
                            {patientFile.treatmentSupportType
                                ? _.upperFirst(patientFile.treatmentSupportType)
                                : "Not Set"}
                        </Text>
                    </Col>
                    <Col md={6} marginVertical={8}>
                        <Text size="small" color="gray">
                            Drug Allergies
                        </Text>
                        <Text size="h5">
                            {patientFile.allergies
                                ? patientFile.allergies.map((al) => _.upperFirst(al)).join(" ")
                                : "Not Set"}
                        </Text>
                    </Col>
                </Row>
            </Card>

            <PatientProgression />
            <Spacer size={20} />

            <Text size="h5" bold>
                Past Visits
            </Text>
            <Spacer size={12} />
            {patientVisits.map((visit) => {
                const data = visit.data ? JSON.parse(visit.data) : {}
                return (
                    <View key={visit.id}>
                        <Card>
                            {/* <Card.Content> */}
                            <Spacer size={20} />
                            <Row>
                                <Col md={8}>
                                    <Text size="h6" color="primary" bold>
                                        Date:{" "}
                                        {data.dateOfVisit ? fullFormatDate(data.dateOfVisit) : ""}
                                    </Text>
                                </Col>

                                <Col md={4}>
                                    <TouchableOpacity
                                        onPress={() =>
                                            navigation.navigate("ctc.ManagePatientVisit", {
                                                visitId: visit.id,
                                            })
                                        }
                                    >
                                        <View>
                                            <Text size="h6" color="primary" align="right">
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
                                        {_.sortBy(data.diagnoses, ["p"]).reverse()[0].name}
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
                                        {/* FIXME: store non-adherence risk in file (maybe??) */}
                                        Non-Adherence Risk:{" "}
                                        {(visit.nonAdherenceRisk || 0.1 * 100).toFixed(1)}%
                                    </Text>
                                </Col>
                                <Spacer size={30} />

                                <Col md={12}>
                                    <Text>
                                        {/* FIXME: Need way to work with ARV resistance risk */}
                                        Drug Resistance Risk:{" "}
                                        {(visit.ARVresistanceRisk || 0.1 * 100).toFixed(1)}%
                                    </Text>
                                </Col>
                            </Row>
                            <Spacer size={20} />
                        </Card>

                        <Spacer size={16} />
                    </View>
                )
            })}
        </Screen>
    )
}

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]

const PatientProgression = () => {
    const month = new Date().getMonth()
    const monthsList = [...months.slice(month), ...months.slice(0, month)]
    const data = {
        labels: monthsList,
        datasets: [
            {
                data: [200, 185, 128, 120, 116, 118, 92, 62, 48, 33, 44, 45],
                color: (opacity = 1) => `rgba(255, 127, 80, ${opacity})`, // optional
                strokeWidth: 2, // optional
            },
            {
                data: [20, 25, 28, 33, 40, 40, 64, 88, 88, 100, 160, 178],
                color: (opacity = 1) => `rgba(134, 135, 244, ${opacity})`, // optional
                strokeWidth: 2, // optional
            },
        ],
        hidePointsAtIndex: [4, 5],
        legend: ["CD4 Count", "Viral Load"].reverse(), // optional
    }

    const chartConfig = {
        backgroundGradientFrom: "#fff",
        // backgroundGradientFromOpacity: 0,
        backgroundGradientTo: "#fff",
        // backgroundGradientToOpacity: 0.5,
        color: (opacity = 1) => `rgba(56, 05, 16, ${opacity})`,
        strokeWidth: 2, // optional, default 3
        barPercentage: 0.5,
        decimalPlaces: 0,
        useShadowColorFromDataset: false, // optional
    }

    return (
        <Card title="Patient Progression (12 months - Demo)" leftIcon="chart-arc">
            <LineChart
                data={data}
                width={width - 80}
                // yLabelsOffset={0}
                onDataPointClick={(dot) => console.log(dot)}
                bezier
                fromZero
                style={{ marginLeft: -25 }}
                height={260}
                chartConfig={chartConfig}
            />
        </Card>
    )
}

interface AppointmentManagerCardProps {
    // patientId: string
    // currentAppointmentDate: string
    // currentAppointmentId: string
}

// TODO: Big hairy mess of a component. In dire need of a refactor!

export const AppointmentManagerCard: React.FC<AppointmentManagerCardProps> = () => {
    const [patientFile, patientAppointments, setAppointments] = useVisitStore((state) => [
        state.patientFile,
        state.patientAppointments,
        state.setAppointments,
    ])

    const currentAppointmentDate = getNextAppointmentDate(patientAppointments)
    const currentAppointmentId = getNextAppointment(patientAppointments)?.id
    const authStore = useAuthenticationStore()

    console.log("Appointment: ", currentAppointmentDate)

    const [appointmentDate, setAppointmentDate] = React.useState<Date>(
        currentAppointmentDate ? new Date(currentAppointmentDate) : new Date(),
    )
    const [mode, setMode] = React.useState<"view" | "edit">(
        currentAppointmentDate ? "view" : "edit",
    )

    // const [appointmentDateSet, setAppointmentDateSet] = React.useState(false)

    const confirmAppointment = () => {
        const api = new Api()
        Alert.alert(
            "Confirm",
            `Please confirm that you are setting an appointment for ${fullFormatDate(
                appointmentDate,
            )} for your patient.`,
            [
                {
                    text: "Cancel",
                },
                {
                    text: "Confirm",
                    onPress: () => {
                        let tmpId = null
                        let updatedRequest: Appointment | boolean = false
                        if (currentAppointmentDate === null) {
                            updatedRequest = api.setLocalPatientNextCTCAppointment(
                                patientFile.id,
                                patientFile.code,
                                appointmentDate,
                                authStore.facilityName,
                            )
                            tmpId = updatedRequest?.id || null
                            ToastAndroid.show("Appointment has been set", 3000)
                        } else {
                            updatedRequest = api.updateLocalAppointmentDate(
                                currentAppointmentId,
                                appointmentDate,
                                authStore.facilityName,
                            )
                            console.warn("Current appointmentId", updatedRequest)
                        }
                        if (updatedRequest) {
                            ToastAndroid.show("Appointment has been updated", 3000)
                        } else {
                            return ToastAndroid.show("Error updating the appointment", 3000)
                        }
                        setMode("view")

                        if (currentAppointmentId) {
                            setAppointments(
                                _.sortBy(
                                    patientAppointments.map((app) => {
                                        if (app.id === currentAppointmentId) {
                                            return {
                                                ...app,
                                                appointmentDate,
                                                facilityAttended: null,
                                                appointmentAttended: false,
                                                dateAttended: null,
                                            }
                                        }
                                        return app
                                    }),
                                    ["appointmentDate"],
                                ),
                            )
                        } else {
                            setAppointments([
                                ...patientAppointments,
                                {
                                    id: tmpId,
                                    patientId: patientFile.id,
                                    appointmentDate,
                                    attendanceFacility: "Patandi",
                                    createdAt: new Date(),
                                    updatedAt: new Date(),
                                    facilityAttended: null,
                                    appointmentAttended: false,
                                    dateAttended: null,
                                },
                            ])
                        }
                    },
                },
            ],
        )
    }

    if (mode === "view") {
        return (
            <Card
                leftIcon="calendar-today"
                title="Next Visit"
                marginVertical={10}
                rightItem={
                    <View>
                        <Text>{currentAppointmentDate}</Text>
                    </View>
                }
            >
                <View style={{ flex: 1, flexDirection: "row-reverse" }}>
                    <TouchableOpacity onPress={() => setMode("edit")}>
                        <Text color="primary">Change</Text>
                    </TouchableOpacity>
                </View>
            </Card>
        )
    }

    return (
        <Card marginVertical={25} title="Next ART Appointment">
            <ExtendedDatePicker
                label="When should the patient return for their next ARV appointment?"
                futureOnly
                defaultDate={appointmentDate}
                onDateSet={(date) => {
                    // console.log("DATE: ", date)
                    setAppointmentDate(date)
                }}
            />

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                <Button
                    onPress={() => setMode("view")}
                    mode="text"
                    labelSize="default"
                    label="Cancel"
                />
                <Button
                    onPress={confirmAppointment}
                    mode="text"
                    labelSize="default"
                    label="Save appointment date"
                />
            </View>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardAction: { flexDirection: "row-reverse", paddingLeft: 8 },
    cardActionContainer: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 3,
        paddingVertical: 10,
    },
})

export default PatientFile
