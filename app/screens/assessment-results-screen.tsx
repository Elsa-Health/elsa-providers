import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Dimensions } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
import { useStores } from "../models/root-store"
import { color } from "../theme"

const { width } = Dimensions.get("window")

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from "react-native-chart-kit"
import { Button } from "react-native-paper"
import _ from "lodash"

export interface AssessmentResultsScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    backgroundColor: color.palette.black,
}

const CONTAINER: ViewStyle = {
    padding: 10,
}

const dummyNextSteps = [
    {
        title:
            "Refer the following tests: Complete Blood Culture, C-reactive protein, arterial blood gas",
    },
    {
        title: "If possible, refer the patient for a chest X-ray",
    },
    {
        title: "If non-severe, treat symptoms with over the counter medication",
    },
    {
        title: "If non-severe, suggest rest and plenty of fluids",
    },
    {
        title: "Put the patient on a follow up program.",
    },
]

// TODO: on back press, go back to home page.

export const AssessmentResultsScreen: React.FunctionComponent<AssessmentResultsScreenProps> = observer(
    (props) => {
        const { assessment } = useStores()
        const topDiagnoses = assessment.topDiagnoses(4)

        console.log("assesment", assessment)
        return (
            <Screen preset="scroll">
                <Header headerText="Assessment Results" />
                <Text italic style={{ padding: 10, paddingTop: 0 }}>
                    Below are the results for this patient. Please remember that these are only a
                    suggestion and that you get to make the final decision about your patient.
                </Text>

                <View style={CONTAINER}>
                    {/* <View style={{ borderWidth: 1 }}> */}
                    <DiseaseDistribution diagnoses={topDiagnoses} />
                    {/* </View> */}

                    <Text size="h6">Next Steps:</Text>
                    {dummyNextSteps.map(({ title, description }, index) => (
                        <View style={{ flexDirection: "row", paddingHorizontal: 20 }} key={index}>
                            <View style={{ flex: 1 }}>
                                <Text>{index + 1}.</Text>
                            </View>
                            <View style={{ flex: 12 }}>
                                <Text>{title}</Text>
                                {/* <Text>{description}</Text> */}
                            </View>
                        </View>
                    ))}

                    <View style={{ marginTop: 20 }}>
                        <Button
                            mode="contained"
                            onPress={() =>
                                props.navigation.navigate("hospital-recommendation", {
                                    symptoms: assessment.patient.symptoms,
                                })
                            }
                            style={{ marginVertical: 6 }}
                        >
                            <Text color="white">Refer to hospital</Text>
                        </Button>
                        <Button
                            onPress={() => props.navigation.navigate("follow-up-registration")}
                            mode="contained"
                            style={{ marginVertical: 6 }}
                        >
                            <Text color="white">Register for follow ups</Text>
                        </Button>
                    </View>
                </View>
            </Screen>
        )
    },
)

const data = {
    labels: ["Pneumonia", "Tuberculosis", "Sinusitis", "COPD"],
    datasets: [
        {
            data: [90, 35, 15, 9],
        },
    ],
}

const chartConfig = {
    //     backgroundGradientFrom: color.palette.greyDarker,
    //     backgroundGradientFromOpacity: 0,
    // backgroundGradientTo: color.palette.greyDarker,
    backgroundColor: "white",
    // backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
}

export const DiseaseDistribution: React.FC<{
    diagnoses: any[]
    height?: number
    hideMessage: boolean
}> = ({ diagnoses, height = 220, hideMessage = false }) => {
    const labels = []
    const data = []
    diagnoses.forEach((diag) => {
        labels.push(diag.name)
        data.push(diag.p)
    })

    const dx = _.sortBy(diagnoses, ["p"]).reverse()[0]
    return (
        <View style={{ marginVertical: 10, marginBottom: -14 }}>
            <BarChart
                style={{
                    backgroundColor: color.palette.white,
                    // paddingHorizontal: 0,
                    // marginHorizontal: 0,
                }}
                data={{
                    labels,
                    datasets: [{ data }],
                }}
                width={width - 20}
                height={height}
                yAxisLabel=""
                fromZero
                yAxisSuffix="%"
                showValuesOnTopOfBars
                horizontalLabelRotation={0}
                chartConfig={{
                    backgroundColor: "white",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2,
                    barPercentage: 1.6,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                }}
                verticalLabelRotation={0}
            />
            {!hideMessage && !!dx && (
                <Text size="h5" style={{ marginTop: -30 }}>
                    It is most likely that your patient has{" "}
                    <Text size="h5" style={{ color: color.primary }}>
                        {_.upperFirst(dx.name)}
                    </Text>
                </Text>
            )}

            {/* <Text size="h6" style={{ marginTop: 10, fontWeight: "bold" }}>
                The patients risk of COVID-19 is HIGH. Refer Patient.
            </Text> */}
        </View>
    )
}
