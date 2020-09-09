import React from "react"
import { ViewStyle, ScrollView, View, Dimensions, StyleSheet } from "react-native"
import { Screen, Row, Col, Text } from "../components"
import { Card } from "react-native-paper"
import Spacer from "../components/spacer/spacer"
import { color } from "../theme"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useNavigation } from "@react-navigation/native"

const VisitType: React.FC = () => {
    const [state, setState] = React.useState("medication") // medication or checkup
    const navigation = useNavigation()
    return (
        <Screen preset="scroll" title="Type of Visit">
            <Text size="h5">What is the purpose of your patients visit to the clinic today?</Text>

            <Spacer size={30} />

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

export { VisitType }
