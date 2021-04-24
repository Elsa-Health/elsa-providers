import React from "react"
import { useNavigation } from "@react-navigation/native"
import { Screen, Card, Button, Row, Col } from "../../components"
import { fullFormatDate } from "../../common/utils"
import SymptomBySystem from "../../components/system-symptoms/system-symptoms"

interface SystemAssessmentProps {}
const SystemAssessment: React.FC<SystemAssessmentProps> = () => {
    const navigation = useNavigation()
    return (
        <Screen preset="scroll" title={"System Assessment"}>
            {/* Are the sysmptoms cards to be kept separate ? */}
            {/* TODO: implementation of the sysmptoms according to the origin systems */}
            <Card
                leftIcon="calendar-today"
                marginVertical={18}
                title="Date of Visit"
                rightItem={fullFormatDate(new Date())}
            />
            <SymptomBySystem />

            <Row>
                <Col md={12} colStyles={{ flexDirection: "row-reverse" }}>
                    <Button
                        onPress={() => navigation.navigate("ctc.FurtherAssessment")}
                        // onPress={() => navigation.navigate("ctc.AdherenceAssessment")}
                        label="Next"
                        labelSize="h6"
                        mode="contained"
                        style={{ paddingHorizontal: 72, paddingVertical: 8 }}
                    />
                </Col>
            </Row>
        </Screen>
    )
}

export default SystemAssessment
