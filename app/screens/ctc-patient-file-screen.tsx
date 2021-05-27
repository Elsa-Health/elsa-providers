import React from "react"
import { Screen, Text } from "../components"
import { TextInput, Divider, Button, Card } from "react-native-paper"
import CustomPicker from "../components/custom-picker/custom-picker"
import { EDUCATION_LEVELS, educationLevels, BOOLEAN_OPTIONS } from "../common/constants"
import { View, StyleSheet } from "react-native"
import _ from "lodash"
import RadioQuestion from "../components/radio-question/radio-question"
import { useNavigation } from "@react-navigation/native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { TouchableOpacity } from "react-native-gesture-handler"
import { color, style } from "../theme"
import Spacer from "../components/spacer/spacer"

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

const CTCPatientFile: React.FC = () => {
    const navigation = useNavigation()
    return (
        <Screen preset="scroll" title="Patient File" style={{ paddingBottom: 10 }}>
            <Text size="small" italic style={{ marginBottom: 20 }}>
                Please select what you want to do.
            </Text>

            <Text size="h5" bold>
                Number: 1234-456-890
            </Text>

            <Card style={{ marginVertical: 20 }}>
                <TouchableOpacity activeOpacity={0.5} style={styles.cardActionContainer}>
                    <Text size="h5">Patient Information</Text>
                    <Icon size={20} name="arrow-forward" />
                </TouchableOpacity>
            </Card>

            <Card style={{ marginBottom: 25 }}>
                <TouchableOpacity activeOpacity={0.5} style={styles.cardActionContainer}>
                    <Text size="h5">New Visit</Text>
                    <Icon size={20} name="arrow-forward" />
                </TouchableOpacity>
            </Card>

            <Text size="h5" bold>
                Visits
            </Text>

            {visits.map((visit) => (
                <Card key={visit.id} style={{ marginVertical: 20 }}>
                    <Card.Content>
                        <Text size="h6" bold>
                            Date: {visit.date}
                        </Text>

                        <Spacer size={10} />

                        <Text>
                            Likely Condition:{" "}
                            {_.sortBy(visit.conditionDistributions, ["p"])[0].diagnosis}
                        </Text>
                        <Text>
                            Non-Adherence Risk: {(visit.nonAdherenceRisk * 100).toFixed(1)}%
                        </Text>
                        <Text>
                            Drug Resistance Risk: {(visit.ARVresistanceRisk * 100).toFixed(1)}%
                        </Text>
                    </Card.Content>

                    <Card.Actions>
                        <Button
                            onPress={() => navigation.navigate("ctc-manage-patient-visit")}
                            contentStyle={styles.cardAction}
                            mode="text"
                            icon={() => (
                                <Icon
                                    name="arrow-forward"
                                    size={18}
                                    style={{ color: color.primary }}
                                />
                            )}
                        >
                            <Text style={[style.buttonText, { color: color.primary }]}>
                                Manage Visit
                            </Text>
                        </Button>
                    </Card.Actions>
                </Card>
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

export { CTCPatientFile }
