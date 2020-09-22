import React from "react"
import { StyleSheet, TouchableOpacity } from "react-native"
import { Screen, Row, Col, Text, Button } from "../../components"
import { Card } from "react-native-paper"
import Spacer from "../../components/spacer/spacer"
import { useNavigation } from "@react-navigation/native"
import RadioQuestion from "../../components/radio-question/radio-question"
import CustomPicker from "../../components/custom-picker/custom-picker"

const VisitType: React.FC = () => {
    const [state, setState] = React.useState("medication") // medication or checkup

    const navigation = useNavigation()

    // global state for tracking new user or not / props needed
    // transit prop/state
    // facility of attendance

    const next = () => {
        // check and save everthing and go to the next page
        // TODO :choosing route depending on previouse screens inputs

        navigation.navigate("ctc.PatientVisit")
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

            <Card style={styles.buttonCard}>
                <TouchableOpacity onPress={() => navigation.navigate("ctc-assessment-screen")}>
                    <Card.Content style={styles.cardContent}>
                        <Text size="h4">Full Checkup</Text>
                        <Text size="h6">(Patient has symptoms or complaints)</Text>
                    </Card.Content>
                </TouchableOpacity>
            </Card>

            <Spacer size={30} />

            <Card style={styles.buttonCard}>
                <TouchableOpacity
                    onPress={() =>
                        navigation.navigate("ctc-patient-adherence-audit", {
                            mode: "medication-only",
                            adherence: true,
                        })
                    }
                >
                    <Card.Content style={styles.cardContent}>
                        <Text size="h4">Medication Only</Text>
                        <Text size="h6">(Patient does not have symptoms or complaints)</Text>
                    </Card.Content>
                </TouchableOpacity>
            </Card>

            <Spacer size={12} />
            <Row>
                <Col md={12}>
                    <RadioQuestion question="Is your patient on transit or visiting from another facility?" />
                </Col>
            </Row>

            <Spacer size={12} />
            <Row>
                <Col md={12}>
                    <CustomPicker
                        label="If yes, which facility do they normally attend?"
                        options={[{ label: "Some label", value: "some value" }]}
                    />
                </Col>
            </Row>
            <Spacer size={20} />
            <Row>
                <Col md={12} colStyles={{ flexDirection: "row-reverse" }}>
                    <Button
                        onPress={next}
                        label="Next"
                        labelSize="h6"
                        mode="contained"
                        style={{ paddingHorizontal: 16, paddingVertical: 8 }}
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
