import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, ToastAndroid, View } from "react-native"
import { Screen, Row, Col, Text, Button, Card, TextInput } from "../../components"
// import { Card } from "react-native-paper"
import Spacer from "../../components/spacer/spacer"
import { useNavigation } from "@react-navigation/native"
import RadioQuestion from "../../components/radio-question/radio-question"
import CustomPicker from "../../components/custom-picker/custom-picker"
import { useRouteStore } from "../../stores"
import { color } from "../../theme"
import { Divider } from "react-native-paper"
import { getNextAppointment, getNextAppointmentDate } from "../../common/utils"
import { useAuthenticationStore, useVisitStore } from "../../models/ctc-store"
import _ from "lodash"
import { Api } from "../../services/api"

const binaryOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
]

const locations = [
    "Patandi",
    "Mbuguni",
    "USA RC",
    "USA DC",
    "Meru Regional Hospital",
    "Kimundo",
    "Ngoaresambu",
    "Other",
].map((loc) => ({ label: loc, value: loc.toLowerCase() }))

const VisitType: React.FC = ({ route }) => {
    // const [patientAppointments, setAppointments] = useVisitStore((state) => [
    //     state.patientAppointments,
    //     state.setAppointments,
    // ])
    const [visit, updateVisit] = useVisitStore((state) => [state.visit, state.updateVisit])
    const [facilityName] = useAuthenticationStore((state) => [state.facilityName])
    // const isPatientNew = useRouteStore((state) => state.isPatientNew)
    // const currentAppointmentDate = getNextAppointmentDate(patientAppointments)
    // const currentAppointmentId = getNextAppointment(patientAppointments)?.id

    const [state, setState] = React.useState(
        _.pick(visit, [
            "visitType",
            "isTransiting",
            "CTCNumber",
            "attendanceFacility",
            "registerdFacility",
        ]),
    )

    const navigation = useNavigation()

    const [isFullCheck, setIsFullCheckup] = useState(false)
    const [isMedication, setIsMedication] = useState(false)
    // const [fulfilledAppointment, setFulfilledAppointment] = useState(false)

    // nextRouteName is the name of the next route
    const nextRouteName = route.params?.nextRouteName

    const next = () => {
        if (!isFullCheck && !isMedication) {
            ToastAndroid.show("Please select a visit type", ToastAndroid.SHORT)
            return
        }

        // Update the global visit store with values set here
        updateVisit({ ...state, attendanceFacility: facilityName })

        if (isFullCheck) {
            // const nextRouteName = isPatientNew ? "ctc.PatientNewVisit" : "ctc.PatientVisit"
            navigation.navigate(nextRouteName || "ctc.ScanQRCode", {
                nextRouteName: "ctc.PatientVisit",
            })
        }

        if (isMedication) {
            // is there a need to register a patient if is new is thre for medication ony?
            console.log("Is Medication")
            // navigation.navigate(nextRouteName || "ctc.AdherenceAssessment", {
            navigation.navigate(nextRouteName || "ctc.ScanQRCode", {
                mode: "medication-only",
                adherence: true,
                nextRouteName: "ctc.AdherenceAssessment",
            })
        }
    }

    React.useEffect(() => {
        if (!state.isTransiting) {
            setState((state) => ({ ...state, registerdFacility: facilityName }))
        }
    }, [state.isTransiting])

    return (
        <Screen preset="scroll" backgroundColor="white" title="Type of Visit">
            <Spacer size={20} />

            <Text size="h5">What is the purpose of your patients visit to the clinic today?</Text>

            <Spacer size={10} />

            <View
                style={
                    !isFullCheck
                        ? styles.buttonCard
                        : {
                              backgroundColor: color.primary,
                          }
                }
            >
                <TouchableOpacity
                    onPress={() => {
                        setIsMedication(false)
                        setIsFullCheckup(true)
                        setState({ ...state, visitType: "checkup" })
                    }}
                >
                    <View style={styles.cardContent}>
                        <Text size="h4" color={isFullCheck ? "white" : null}>
                            Full Checkup
                        </Text>
                        <Text size="h6" color={isFullCheck ? "white" : null}>
                            (Patient has symptoms or complaints)
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Spacer size={20} />

            <View
                style={
                    !isMedication
                        ? styles.buttonCard
                        : {
                              backgroundColor: color.primary,
                          }
                }
            >
                <TouchableOpacity
                    onPress={() => {
                        setIsFullCheckup(false)
                        setIsMedication(true)
                        setState({ ...state, visitType: "medication-only" })
                    }}
                >
                    <View style={styles.cardContent}>
                        <Text size="h4" color={isMedication ? "white" : null}>
                            Medication Refill
                        </Text>
                        <Text size="h6" color={isMedication ? "white" : null}>
                            (Patient does not have symptoms or complaints)
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>

            <Spacer size={42} />
            <Divider />
            {/* FIXME: this should only show when its 7 days before the expected appointment date */}
            {/* {currentAppointmentDate && (
                <View>
                    <Spacer size={22} />
                    <RadioQuestion
                        question={`ARV appointment date: ${currentAppointmentDate}.\nAre you dispensing next round of ARV's today for that appointment?`}
                        value={fulfilledAppointment}
                        options={binaryOptions}
                        // questionSize="h5"
                        onPress={(answer: boolean) => {
                            // console.log("Answer :  ", answer)
                            setFulfilledAppointment(answer)
                            // updateAppointment()
                        }}
                    />
                </View>
            )} */}
            <Spacer size={12} />
            <Row>
                <Col md={12}>
                    <RadioQuestion
                        question="Patient on transit or visiting from another facility?"
                        value={state.isTransiting}
                        options={binaryOptions}
                        // questionSize="h5"
                        onPress={(answer: boolean) => {
                            // console.log("Answer :  ", answer)
                            setState({
                                ...state,
                                isTransiting: answer,
                            })
                        }}
                    />
                </Col>
            </Row>

            <Spacer size={12} />
            {state.isTransiting && (
                <Row>
                    <Col md={12}>
                        <CustomPicker
                            labelSize="h5"
                            selectedValue={state.registerdFacility}
                            label="If yes, which facility do they normally attend?"
                            options={locations}
                            onChange={(newValue) => {
                                setState((state) => ({
                                    ...state,
                                    registerdFacility: newValue,
                                }))
                            }}
                        />
                    </Col>
                </Row>
            )}

            {/* If the patient is from "other" non listed facilities, just record their CTC Number */}
            {state.isTransiting && (
                <View>
                    <Spacer size={12} />
                    <TextInput
                        label="CTC ID Number"
                        value={state.CTCNumber}
                        onChangeText={(val) => setState((state) => ({ ...state, CTCNumber: val }))}
                    />
                </View>
            )}

            <Spacer size={20} />
            <Row>
                <Col md={12} colStyles={{ flexDirection: "row-reverse" }}>
                    <Button
                        onPress={next}
                        label="Next"
                        labelSize="h6"
                        mode="contained"
                        style={{ paddingHorizontal: 72, paddingVertical: 8 }}
                        // withArrow={true}
                    />
                </Col>
            </Row>
            <Spacer size={20} />
        </Screen>
    )
}

const styles = StyleSheet.create({
    buttonCard: {
        borderColor: color.primary,
        borderRadius: 8,
        borderWidth: 1,
    },
    cardContent: {
        alignItems: "center",
        paddingVertical: 25,
    },
})

export default VisitType
