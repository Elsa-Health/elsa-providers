import React, { useState } from "react"
import { StyleSheet, TouchableOpacity, ToastAndroid } from "react-native"
import { Screen, Row, Col, Text, Button } from "../../components"
import { Card } from "react-native-paper"
import Spacer from "../../components/spacer/spacer"
import { useNavigation } from "@react-navigation/native"
import RadioQuestion from "../../components/radio-question/radio-question"
import CustomPicker from "../../components/custom-picker/custom-picker"
import { useRouteStore } from "../../stores"
import { color } from "../../theme"

const binaryOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
]

const VisitType: React.FC = () => {
    const [state, setState] = React.useState({
        visitType: "medication",
        isTransiting: false,
        attendanceFacility: "",
    }) // medication or checkup

    const navigation = useNavigation()

    const isPatientNew = useRouteStore((state) => state.isPatientNew)

    const [isFullCheck, setIsFullCheckup] = useState(false)
    const [isMedication, setIsMedication] = useState(false)

    const toggleSelection = () => {}
    // global state for tracking new user or not / props needed
    // transit prop/state
    // facility of attendance

    const next = () => {
        // check and save everthing and go to the next page
        // TODO :choosing route depending on previouse screens inputs

        if (!isFullCheck && !isMedication) {
            ToastAndroid.show("Please select a visit type", ToastAndroid.SHORT)
            return
        }

        // FIXME: What is going on here?
        if (isFullCheck) {
            if (isPatientNew) {
                navigation.navigate("ctc.PatientNewVisit")
            } else {
                navigation.navigate("ctc.PatientVisit")
            }
        }
        if (isMedication) {
            // is there a need to register a patient if is new is thre for medication ony?

            navigation.navigate("ctc.AdherenceAssess", {
                mode: "medication-only",
                adherence: true,
            })
        }

        // IF ITS MEDICATION NAVIGATE TO ADHRENCE SCREENS DIRECTLY
        // CODES TO BE HERE
    }


    return (
        <Screen preset="scroll" title="Type of Visit">
            <Spacer size={20} />
            <Text size="h5">What is the purpose of your patients visit to the clinic today?</Text>

            <Spacer size={30} />

            {/* 
            if other down options are to be included, then navigation has to be removed in these two cards
            instead would have means to apply style on it if selected otherwise leave as it is
            navigation to be done by the next button  */}

            <Card
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
                        setState({ ...state, visitType: "full" })
                    }}
                >
                    <Card.Content style={styles.cardContent}>
                        <Text size="h4" color={isFullCheck ? "white" : null}>
                            Full Checkup
                        </Text>
                        <Text size="h6" color={isFullCheck ? "white" : null}>
                            (Patient has symptoms or complaints)
                        </Text>
                    </Card.Content>
                </TouchableOpacity>
            </Card>

            <Spacer size={30} />

            <Card
                style={
                    !isMedication
                        ? styles.buttonCard
                        : {
                              backgroundColor: color.primary,
                          }
                }
            >
                <TouchableOpacity
                    onPress={
                        () => {
                            setIsFullCheckup(false)
                            setIsMedication(true)
                            setState({ ...state, visitType: "medication-only" })
                        }
                        // navigation.navigate("ctc-patient-adherence-audit", {
                        //     mode: "medication-only",
                        //     adherence: true,
                        // })
                    }
                >
                    <Card.Content style={styles.cardContent}>
                        <Text size="h4" color={isMedication ? "white" : null}>
                            Medication Only
                        </Text>
                        <Text size="h6" color={isMedication ? "white" : null}>
                            (Patient does not have symptoms or complaints)
                        </Text>
                    </Card.Content>
                </TouchableOpacity>
            </Card>

            <Spacer size={12} />
            <Row>
                <Col md={12}>
                    <RadioQuestion
                        question="Is your patient on transit or visiting from another facility"
                        value={state.isTransiting}
                        options={binaryOptions}
                        onPress={(answer) => {
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
                            labelSize="h6"
                            label="If yes, which facility do they normally attend?"
                            options={[{ label: "Some Hospital", value: "some value" }]}
                            onChange={() => (newValue) => {
                                setState({
                                    ...state,
                                    attendanceFacility: newValue,
                                })
                            }}
                        />
                    </Col>
                </Row>
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
        elevation: 3,
    },
    cardContent: {
        alignItems: "center",
        paddingVertical: 25,
    },
})

export default VisitType
