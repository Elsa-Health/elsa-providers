import { useNavigation } from "@react-navigation/native"
import React from "react"
import { BOOLEAN_OPTIONS } from "../../common/constants"
import { fullFormatDate } from "../../common/utils"
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
import { RadioQuestion } from "../../components/radio-question/radio-question"
import Spacer from "../../components/spacer/spacer"
import { useVisitStore } from "../../models/ctc-store"

// FIXME: SymptomPicker Component should update a separate store and the next button
// just continues with navigation but the state of the symptoms remains the same
const PresentingSymptoms: React.FC = () => {
    const navigation = useNavigation()

    const state = useVisitStore((state) => state.visit)
    const setState = useVisitStore((state) => state.updateVisit)

    return (
        <Screen preset="scroll" title="Patient Visit - Symptoms">
            <Card
                marginVertical={18}
                leftIcon="calendar-today"
                title="Date of Visit"
                rightItem={fullFormatDate(new Date())}
            />

            <Card marginVertical={10} leftIcon="bandage" title="Symptom Assessment">
                <RadioQuestion
                    id="symptomPresenceToggle"
                    question="Does the patient have any new symptoms or side effects to assess today?"
                    options={BOOLEAN_OPTIONS}
                    onPress={(value) => setState({ newSymptoms: value })}
                    value={state.newSymptoms}
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
                <SymptomsPicker />
            </Card>
            <Spacer size={20} />
            <Row>
                <Col md={12} colStyles={{ flexDirection: "row-reverse" }}>
                    <Button
                        onPress={() => navigation.navigate("ctc.SystemAssessment")}
                        label="Next"
                        labelSize="h6"
                        mode="contained"
                        style={{ paddingHorizontal: 72, paddingVertical: 8 }}
                        // withArrow={true}
                    />
                </Col>
            </Row>
        </Screen>
    )
}

export default PresentingSymptoms
