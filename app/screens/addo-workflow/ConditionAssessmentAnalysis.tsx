import * as React from "react"
import { ParamListBase } from "@react-navigation/native"
import { View, Dimensions } from "react-native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Row, Card, Col } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { Divider } from "react-native-paper"

export interface ConditionAssessmentAnalysisProps {
    navigation: NativeStackNavigationProp<ParamListBase>
    route: any
}

const ConditionAssessmentAnalysis: React.FunctionComponent<ConditionAssessmentAnalysisProps> = ({
    route,
}) => {
    return (
        <Screen preset="scroll" title="Assessment Summary">
            <Spacer size={20} />
            <Text size="h4">Pneumonia</Text>
            <Spacer size={5} />
            {[1, 2, 3, 4, 5, 6].map((idx) => (
                <Card
                    key={idx}
                    title="Patient Profile"
                    elevation={6}
                    containerStyle={{ marginBottom: 30 }}
                    rightItem="ID: 98hvolsz"
                >
                    <Row>
                        <Col xs={6} sm={6} md={6}>
                            <Text color="gray">Age</Text>
                            <Text>6 years 4 months</Text>
                        </Col>
                        <Col xs={6} sm={6} md={6}>
                            <Text color="gray">Sex</Text>
                            <Text>Female</Text>
                        </Col>
                    </Row>
                    <Spacer size={15} />
                    <Row>
                        <Col xs={6} sm={6} md={6}>
                            <Text color="gray">Pregnant?</Text>
                            <Text>No</Text>
                        </Col>
                        <Col xs={6} sm={6} md={6}>
                            <Text color="gray">First Visit?</Text>
                            <Text>Yes</Text>
                        </Col>
                    </Row>

                    <Spacer size={25} />
                    <View>
                        <Text lineHeight={20} color="gray">
                            Symptoms, Signs and Risk Factors
                        </Text>
                        <Text lineHeight={20}>Cough</Text>
                        <Text lineHeight={20}>Fever</Text>
                        <Text lineHeight={20}>Difficulty Breathing</Text>
                    </View>

                    <Spacer size={15} />
                    <Divider />
                    <Spacer size={15} />

                    <View>
                        <View>
                            <Text lineHeight={20} color="gray">
                                Your suggested condition:
                            </Text>
                            <Text lineHeight={20}>Pneumonia</Text>
                        </View>
                        <Spacer size={15} />
                        <View>
                            <Text lineHeight={20} color="gray">
                                Expert suggested condition:
                            </Text>
                            <Text lineHeight={20}>Pneumonia</Text>
                        </View>
                    </View>
                </Card>
            ))}
        </Screen>
    )
}

export default ConditionAssessmentAnalysis
