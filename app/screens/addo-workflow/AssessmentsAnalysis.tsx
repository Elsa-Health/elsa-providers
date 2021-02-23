import * as React from "react"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { ViewStyle, ScrollView, View, Dimensions } from "react-native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Row, Button } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { color } from "../../theme"
import { TextProps } from "../../components/text/text.props"
import { useLocale } from "../../models/language"

const { width } = Dimensions.get("screen")

const assessmentAnalysisReport = [
    {
        condition: "Pneumonia",
        expert: 922,
        dispenser: 800,
        agreability: 655,
    },
    {
        condition: "Tonsilitis",
        expert: 122,
        dispenser: 73,
        agreability: 55,
    },
    {
        condition: "Bronchitis",
        expert: 122,
        dispenser: 80,
        agreability: 65,
    },
    {
        condition: "Tuberculosis",
        expert: 52,
        dispenser: 8,
        agreability: 3,
    },
    {
        condition: "Malaria",
        expert: 422,
        dispenser: 600,
        agreability: 355,
    },
]

export interface AssessmentAnalysisProps {
    navigation: NativeStackNavigationProp<ParamListBase>
    route: any
}

const AssessmentAnalysis: React.FunctionComponent<AssessmentAnalysisProps> = ({ route }) => {
    const navigation = useNavigation()
    const _locale = useLocale((state) => state.locale)
    return (
        <Screen preset="scroll" title="Assessment Summary">
            <Spacer size={20} />
            <Text size="h4">Hi, Lucy!</Text>
            <Spacer size={5} />
            <Text>We're happy you are here. Lets check how things are going.</Text>

            {assessmentAnalysisReport.map((analysis) => {
                const largestValue = Math.max(
                    analysis.dispenser,
                    analysis.expert,
                    analysis.agreability,
                )
                const maxValue = largestValue + largestValue * 0.1
                return (
                    <View
                        key={analysis.condition}
                        style={{
                            marginTop: 20,
                            borderBottomColor: "#e5e5e5",
                            borderBottomWidth: 1,
                            paddingBottom: 30,
                        }}
                    >
                        <Row alignItems="center" justifyContent="space-between">
                            <Text size="h5" bold color="primary">
                                {analysis.condition}
                            </Text>
                            <Button
                                arrowLeftSpace={20}
                                label="See more"
                                withArrow
                                labelSize="default"
                                mode="text"
                                onPress={() =>
                                    navigation.navigate("addo.ConditionAssessmentAnalysis")
                                }
                            />
                        </Row>

                        <View style={{ borderLeftWidth: 3, borderLeftColor: "#6f6e80" }}>
                            <AssessmentChartBar
                                count={analysis.dispenser}
                                maxValue={maxValue}
                                label={`You - ${analysis.dispenser}`}
                            />
                            <AssessmentChartBar
                                count={analysis.expert}
                                maxValue={maxValue}
                                label={`Expert - ${analysis.expert}`}
                            />
                            <AssessmentChartBar
                                count={analysis.agreability}
                                barColor={color.primary}
                                maxValue={maxValue}
                                label={`Agreeability - ${analysis.agreability}`}
                                labelColor="white"
                            />
                        </View>
                    </View>
                )
            })}
        </Screen>
    )
}

interface AssessmentChartBarProps {
    count: number
    maxValue: number
    label: string
    labelColor?: TextProps["color"]
    barColor?: string
}

const AssessmentChartBar: React.FC<AssessmentChartBarProps> = ({
    count = 100,
    maxValue = 110,
    label = "",
    labelColor = "default",
    barColor = "#ccc",
}) => {
    const countBar = (count / maxValue) * 100

    return (
        <Row marginVertical={10}>
            <View
                style={{
                    height: 40,
                    flex: countBar,
                    backgroundColor: barColor,
                    justifyContent: "center",
                }}
            >
                {countBar > 50 && (
                    <Text color={labelColor} style={{ alignSelf: "flex-end" }}>
                        {label}{" "}
                    </Text>
                )}
            </View>
            <View style={{ height: 40, flex: 100 - countBar, justifyContent: "center" }}>
                {countBar <= 50 && (
                    <Text color="default" style={{ alignSelf: "flex-start" }}>
                        {" "}
                        {label}
                    </Text>
                )}
            </View>
        </Row>
    )
}

export default AssessmentAnalysis
