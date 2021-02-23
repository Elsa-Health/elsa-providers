import * as React from "react"
import { ViewStyle, ScrollView, View, Dimensions } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { TextInput, RadioButton, Divider, Button } from "react-native-paper"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import _ from "lodash"
import { Screen, Row, Col, Text } from "../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../theme"
import { DiseaseDistribution } from "."
import { LineChart } from "react-native-chart-kit"
import { TouchableOpacity } from "react-native-gesture-handler"
import Spacer from "../components/spacer/spacer"
import { palette } from "../theme/palette"
import { Api } from "../services/api"
import { useVisitStore, useAdherenceStore } from "../models/ctc-store"
import ExtendedDatePicker from "../components/extended-date-picker/extended-date-picker"
import { getObservationsFromLists, calculate } from "../elsa-local/curiosity.nb"

const { width } = Dimensions.get("screen")

export interface CtcAssessmentSummaryScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
    route: any
}

export const CtcAssessmentSummaryScreen: React.FunctionComponent<CtcAssessmentSummaryScreenProps> = ({
    route,
}) => {
    console.warn(route.params)
    const mode = route.params?.mode ? route.params.mode : "complete" // "medication-only", "adherence"
    const adherenceAudited = route.params?.adherence ? route.params.adherence : false

    const state = useVisitStore((state) => state.visit)

    // console.warn(mode)

    const steps = [
        {
            description: "Order routine tests and tests to confirm likely condition.",
            route: "diagnostic-test-recommendations",
        },
        {
            description: "Prescribe medication or treatments.",
            route:
                mode === "medication-only"
                    ? "ctc-medication-only-visit-screen"
                    : "ctc-medication-screen",
        },
        {
            description: "Offer HIV/AIDS counseling to the patient.",
            route: "ctc-counseling-screen",
        },
    ]

    const causeLikelihoods = calculate(
        getObservationsFromLists(state.presentSymptoms, state.absentSymptoms),
        "male",
    )

    const diagnosesLikelihoods = _.sortBy(
        _.map(causeLikelihoods, (value, key) => ({
            diag: _.upperFirst(key),
            name: _.upperFirst(key),
            p: value.toFixed(2),
        })),
        ["p"],
    )
        .reverse()
        .slice(0, 5)

    return (
        <Screen preset="scroll" title="Assessment Summary">
            <Row>
                {mode === "complete" && (
                    <>
                        <DiseaseAssesmentCTC diagnosesLikelihoods={diagnosesLikelihoods} />
                        <FullWidthDivider />
                    </>
                )}

                {/* FIXME: hide when the adherence analysis has been skipped */}
                <AdherenceAnalysis />
                <FullWidthDivider />

                {mode !== "adherence" && (
                    <>
                        <NextStepsCTC
                            steps={mode === "complete" ? steps : [...steps.slice(1, 3)]}
                        />
                        <FullWidthDivider />

                        <View style={{ paddingVertical: 26 }}>
                            <Text size="h5" bold>
                                Next Visit
                            </Text>
                            <ExtendedDatePicker
                                label="When should the patient return for their next visit?"
                                futureOnly
                                onDateSet={() => {}}
                            />
                        </View>
                    </>
                )}

                <NextScreenButton />
            </Row>

            <Spacer size={20} />
        </Screen>
    )
}

const DiseaseAssesmentCTC = ({ diagnosesLikelihoods }) => {
    return (
        <Col md={12} marginVertical={15} paddingVertical={10}>
            <Text size="h5" bold>
                Disease Assesment
            </Text>
            <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                Based on our assessment, these are the likely conditions for your patient.
            </Text>
            <Spacer size={25} />

            <DiseaseDistribution height={500} diagnoses={diagnosesLikelihoods} />

            <InformationBullet
                containerStyle={{ marginTop: 25 }}
                text="Please see 'Next Steps' for information on how to proceed."
            />
        </Col>
    )
}

const NextStepsCTC = ({ steps }) => {
    const navigation = useNavigation()
    return (
        <Col md={12} colStyles={{ paddingVertical: 30 }}>
            <Text size="h5" bold>
                Next Steps
            </Text>

            <Text style={[style.bodyContent, { fontStyle: "italic", marginBottom: 10 }]}>
                Click on the next steps below to complete your visit with the patient.{" "}
            </Text>
            {steps.map(({ route, description }, index) => (
                <NextStep
                    description={description}
                    index={index}
                    onPress={() => navigation.navigate(route)}
                    key={index}
                />
            ))}
        </Col>
    )
}

const NextStep = ({ description, index, onPress }) => (
    <TouchableOpacity
        style={{ marginBottom: 10, marginTop: 3, flexDirection: "row" }}
        activeOpacity={0.5}
        onPress={onPress}
    >
        <Col md={1} colStyles={{ alignItems: "center", justifyContent: "center" }}>
            <Text
                style={{
                    backgroundColor: color.primary,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 100,
                }}
                size="small"
                color="white"
            >
                {index + 1}
            </Text>
        </Col>

        <Col md={11}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text size="h6" style={{ marginRight: 6 }}>
                    {description}
                </Text>
                <MaterialIcon size={20} name="arrow-forward" />
            </View>
        </Col>
    </TouchableOpacity>
)
const FullWidthDivider = () => (
    <Col md={12} colStyles={{ marginVertical: 32 }}>
        <Divider
            style={[
                { backgroundColor: color.offWhiteBackground, marginHorizontal: md ? -36 : -12 },
            ]}
        />
    </Col>
)

const NextScreenButton = () => {
    const navigation = useNavigation()
    const resetVisitStore = useVisitStore((state) => state.resetVisitStore)
    const resetPatientFile = useVisitStore((state) => state.resetPatientFile)
    const resetAdheranceStore = useAdherenceStore((state) => state.resetAdheranceStore)
    return (
        <Col md={12} colStyles={[{}]}>
            <Button
                style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
                onPress={() => {
                    //navigate here
                    // setDisplayIndex(1)
                    resetVisitStore()
                    resetPatientFile()
                    resetAdheranceStore()
                    navigation.navigate("dashboard")
                }}
                uppercase={false}
            >
                <Text style={style.buttonText}>Complete</Text>
            </Button>
        </Col>
    )
}

interface AdherenceAnalysisProps {}

const AdherenceAnalysis: React.FC<AdherenceAnalysisProps> = ({}) => {
    // TODO: Need to add loading state, and error state on a failed backend request
    const [adherenceAudit, setAdherenceAudit] = React.useState({
        mean: 0,
        data: _.times(10, (n) => 0),
    })
    const responses = useAdherenceStore()

    const requestAudit = () => {
        const api = new Api()

        const results = api.requestHIVAdherenceAudit(responses)
        setAdherenceAudit(results)
    }
    React.useEffect(() => {
        requestAudit()
    }, [])
    return (
        <Col md={12} marginVertical={30}>
            <Text size="h5" bold>
                Risk of Non-Adherence
            </Text>
            <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                Based on our assessment, this shows the liklihood of non-adherence.{" "}
            </Text>

            <LineChart
                data={{
                    labels: [
                        "0",
                        "0.1",
                        "0.2",
                        "0.3",
                        "0.4",
                        "0.5",
                        "0.6",
                        "0.7",
                        "0.8",
                        "0.9",
                        "1.0",
                    ],
                    datasets: [
                        {
                            data: [0, 4, 1, 1, 3, 7, 21, 80, 50, 5, 2], //adherenceAudit.data,
                            strokeWidth: 2,
                            color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`,
                        },
                        {
                            data: [100],
                            color: () => "rgba(0, 0, 0, 0)",
                            withDots: false,
                        },
                    ],
                }}
                style={{ marginTop: 15 }}
                fromZero
                width={width - 20}
                height={500}
                verticalLabelRotation={0}
                chartConfig={{
                    backgroundColor: "#fff",
                    backgroundGradientFrom: "#fff",
                    backgroundGradientTo: "#fff",
                    decimalPlaces: 2, // optional, defaults to 2dp
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                    propsForDots: {
                        r: "4",
                        strokeWidth: "2",
                        stroke: "#ffa726",
                    },
                    strokeWidth: 2,
                }}
                bezier
            />
            <Text size="h5">
                The patient’s risk of non-adherence is{" "}
                <Text size="h5" color="primary">
                    {(adherenceAudit.mean * 100).toFixed(1)}%
                </Text>
            </Text>

            <InformationBullet
                containerStyle={{ marginBottom: 20, marginTop: 10 }}
                text={adherenceCategoryDescription[adherenceScoreToCategory(0.85)]}
            />
            <InformationBullet
                containerStyle={{ marginBottom: 20, marginTop: 10 }}
                text="Principle component: Sharing drugs with friends or family."
            />
            {/* <InformationBullet
                containerStyle={{ marginBottom: 20, marginTop: 10 }}
                text="Please see 'Next Steps' for counseling recommendations"
            /> */}
        </Col>
    )
}

const adherenceScoreToCategory = (score: number) => {
    if (score >= 0.8) {
        return "very-high"
    } else if (score >= 0.05) {
        return "high"
    } else {
        return "low"
    }
}

const adherenceCategoryDescription = {
    "very-high":
        "Your patient's risk of non-adherence is very high. They are at risk for not adhering to their HIV medication or being lost to follow up.",
    high:
        "Your patient's risk of non-adherence is high. They are at risk for not adhering to their HIV medication or being lost to follow up.",
    low:
        "Your patient's risk of non-adherence is low. They are likely to continue adhering to their medication. ",
}

interface InformationBulletProps {
    text: string
    containerStyle?: any
}

const InformationBullet: React.FC<InformationBulletProps> = ({ text, containerStyle }) => {
    return (
        <View style={[{ flexDirection: "row", paddingRight: 20 }, containerStyle]}>
            <MaterialIcon name="info" size={26} color="gray" />
            <Spacer horizontal size={22} />
            <Text style={{ color: palette.greyDarker }} size="h6">
                {text}
            </Text>
        </View>
    )
}
