import React from "react"
import {
    ViewStyle,
    ScrollView,
    View,
    Dimensions,
    TouchableOpacity,
    Alert,
    ToastAndroid,
} from "react-native"
import { ParamListBase, StackActions, useNavigation, CommonActions } from "@react-navigation/native"
import { Screen, Row, Col, Text, Button, Card } from "../../components"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import _ from "lodash"
import Spacer from "../../components/spacer/spacer"
import ExtendedDatePicker from "../../components/extended-date-picker/extended-date-picker"
import { calculate, getObservationsFromLists } from "../../elsa-local/curiosity.nb"
import { useAdherenceStore, useVisitStore } from "../../models/ctc-store"
import { DiseaseDistribution } from ".."
import { palette } from "../../theme/palette"
import { LineChart } from "react-native-chart-kit"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { Api } from "../../services/api"
import { Divider } from "react-native-paper"
import { color, md } from "../../theme"
import { ProgressBar } from "@react-native-community/progress-bar-android"
import shallow from "zustand/shallow"
import { calculateAge, fullFormatDate } from "../../common/utils"
import { AppointmentManagerCard } from "./PatientFile"

const { width } = Dimensions.get("window")

const AssessmentSummary: React.FC = ({ route }) => {
    const mode = route.params?.mode ? route.params.mode : "complete" // "medication-only", "adherence"
    const adherenceAudited = route.params?.adherence ? route.params.adherence : false
    const [adherenceRisk, setAdherenceRisk] = React.useState(0.0)

    const defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate() + 30)
    const [appointmentDate, setAppointmentDate] = React.useState(defaultDate)
    const [appointmentDateSet, setAppointmentDateSet] = React.useState(false)

    const state = useVisitStore((state) => state.visit)
    const patientFile = useVisitStore((state) => state.patientFile)
    const setDiagnoses = useVisitStore((state) => state.setDiagnoses)

    const causeLikelihoods = calculate(
        getObservationsFromLists(state.presentSymptoms, state.absentSymptoms),
        patientFile?.sex,
    )

    const diagnosesLikelihoods = _.sortBy(
        _.map(causeLikelihoods, (value, key) => ({
            diag: key,
            name: _.upperFirst(key),
            p: value.toFixed(2),
        })),
        ["p"],
    )
        .reverse()
        .slice(0, 5)

    // Persist the diagnoses to the store
    setDiagnoses(diagnosesLikelihoods)

    const steps = [
        {
            description: "Order routine tests and tests to confirm likely condition.",
            route: "ctc.TestRecommendations",
            key: "tests",
            routeProps: {
                diagnoses: [diagnosesLikelihoods[0].diag, diagnosesLikelihoods[1].diag],
            },
        },
        {
            description: "Prescribe medication or treatments.",
            route: "ctc.TreatmentOptions",
            key: "treatments",
            routeProps: {
                diagnoses: [diagnosesLikelihoods[0].diag, diagnosesLikelihoods[1].diag],
            },
            // mode === "medication-only"
            //     ? "ctc-medication-only-visit-screen"
            //     : "ctc-medication-screen",
        },
        {
            description: "Offer HIV/AIDS counseling to the patient.",
            route: "ctc.Counseling",
            key: "counseling",
            routeProps: {
                risk: adherenceRisk,
            },
        },
    ]

    // console.log(JSON.stringify(state, null, 2))

    return (
        <Screen preset="scroll" title="Assessment Summary">
            <Spacer size={20} />
            {mode === "complete" && (
                <>
                    <DiseaseAssesmentCTC diagnosesLikelihoods={diagnosesLikelihoods.slice(0, 4)} />
                    <FullWidthDivider />
                </>
            )}

            {/* FIXME: hide when the adherence analysis has been skipped */}
            <AdherenceAnalysis
                age={calculateAge(patientFile?.dateOfBirth)}
                sex={patientFile?.sex}
                setAdherenceRisk={setAdherenceRisk}
            />
            <FullWidthDivider />

            {mode !== "adherence" && (
                <>
                    <NextStepsCTC steps={mode === "complete" ? steps : [...steps.slice(1, 3)]} />
                    <FullWidthDivider />

                    {!appointmentDateSet && <AppointmentManagerCard />}
                </>
            )}

            <NextScreenButton />
        </Screen>
    )
}

const DiseaseAssesmentCTC = ({ diagnosesLikelihoods }) => {
    return (
        <Card title="Disease Assesment">
            <Text style={[{ fontStyle: "italic" }]}>
                Based on our assessment, these are the likely conditions for your patient.
            </Text>
            <Spacer size={25} />

            <DiseaseDistribution height={500} diagnoses={diagnosesLikelihoods} />

            <InformationBullet
                containerStyle={{ marginTop: 25 }}
                text="Please see 'Next Steps' for information on how to proceed."
            />
        </Card>
    )
}

const NextStepsCTC = ({ steps }) => {
    const [investigationsOrdered, counseling, dispensedMedications, ARTDecision] = useVisitStore(
        (state) => [
            state.visit.investigationsOrdered,
            state.visit.counseling,
            state.visit.dispensedMedications,
            state.visit.ARTDecision,
        ],
        shallow,
    )
    const navigation = useNavigation()
    return (
        <Card title="Next Steps">
            <Text style={[{ fontStyle: "italic", marginBottom: 10 }]}>
                Click on the next steps below to complete your visit with the patient.{" "}
            </Text>
            {steps.map(({ route, description, routeProps, key }, index) => {
                const completed = (function () {
                    if (key === "tests") {
                        return investigationsOrdered.length > 0
                    } else if (key === "counseling") {
                        return counseling.length > 0
                    } else if (key === "treatments") {
                        return dispensedMedications.length > 0 || ARTDecision.length > 0
                    }
                    return false
                })()
                return (
                    <NextStep
                        description={description}
                        index={index}
                        onPress={() => navigation.navigate(route, { ...routeProps })}
                        key={key}
                        completed={completed}
                    />
                )
            })}
        </Card>
    )
}

const NextStep = ({ description, index, onPress, completed }) => (
    <TouchableOpacity
        style={{ marginBottom: 10, marginTop: 3, flexDirection: "row" }}
        activeOpacity={0.5}
        onPress={onPress}
    >
        <Col md={1} colStyles={{ alignItems: "center", justifyContent: "center" }}>
            {completed ? (
                <Icon name="check-circle" size={26} color="green" />
            ) : (
                <Text
                    style={{
                        backgroundColor: color.primary,
                        paddingHorizontal: 10,
                        paddingVertical: 4,
                        borderRadius: 100,
                    }}
                    size="small"
                    color="white"
                >
                    {index + 1}
                </Text>
            )}
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
            style={{ backgroundColor: color.offWhiteBackground, marginHorizontal: md ? -36 : -12 }}
        />
    </Col>
)

const NextScreenButton = () => {
    const navigation = useNavigation()
    const resetVisitStore = useVisitStore((state) => state.resetVisitStore)
    const resetPatientFile = useVisitStore((state) => state.resetPatientFile)
    const resetAdheranceStore = useAdherenceStore((state) => state.resetAdheranceStore)
    const persistVisit = useVisitStore((state) => state.persistVisit)
    const visit = useVisitStore((state) => state.visit)

    console.log("Visit", _.keys(visit))
    // const resetAdheranceStore = useAdherenceStore((state) => state.resetAdheranceStore)
    return (
        <Col md={12} colStyles={[{}]}>
            <Button
                style={[{ paddingHorizontal: 46, alignSelf: "flex-end" }]}
                onPress={() => {
                    // navigate here
                    // setDisplayIndex(1)
                    // FIXME: this should return a promise that we can show a notification to the user on success and/or on failure
                    console.log("Inside", persistVisit())
                    resetVisitStore()
                    resetPatientFile()
                    resetAdheranceStore()

                    navigation.dispatch(
                        CommonActions.reset({
                            index: 1,
                            routes: [{ name: "ctc.Dashboard" }],
                        }),
                    )
                }}
                mode="contained"
                label="Complete"
                uppercase={false}
            />
        </Col>
    )
}

interface AdherenceAnalysisProps {
    setAdherenceRisk: (mean: number) => any
    sex: "male" | "female"
    age: number
}

const AdherenceAnalysis: React.FC<AdherenceAnalysisProps> = ({ setAdherenceRisk, sex, age }) => {
    // TODO: Need to add loading state, and error state on a failed backend request
    const [adherenceAudit, setAdherenceAudit] = React.useState({
        mean: 0,
        data: {},
        loading: true,
    })
    const responses = useAdherenceStore()

    const requestAudit = async () => {
        const api = new Api()

        const results = await api.requestLocalHIVAdherenceAudit(responses, age, sex)
        console.log("AWAIT: results", results)
        // console.log("AWAIT: ", api.requestLocalHIVAdherenceAudit(responses, 64, "female"))

        const values = _.values(results)

        // If there are no values leave it as loading (network issues)
        if (values.length === 0) return
        const meanValue =
            _.sum(_.keys(results).map((result) => Number(result) * results[result])) / _.sum(values)
        setAdherenceRisk(meanValue)
        setAdherenceAudit({ data: results, mean: meanValue, loading: false })
    }
    React.useEffect(() => {
        requestAudit()
    }, [])

    const principalComponents: string[] = [
        responses.shareDrugs ? "Drug sharing" : null,
        responses.understandRegimen ? null : "ART Regimen understanding",
        responses.frequentAlcoholUse ? "Alcohol intake" : null,
        responses.sideEffects ? "Side Effects" : null,
        responses.employed ? "Employment" : null,
    ].filter((pc) => pc !== null)

    // const labels = [
    //     "0",
    //     "0.1",
    //     "0.2",
    //     "0.3",
    //     "0.4",
    //     "0.5",
    //     "0.6",
    //     "0.7",
    //     "0.8",
    //     "0.9",
    //     "1.0",
    // ]
    const labels = _.keys(adherenceAudit.data).sort()
    const graphData = labels.map((label) => adherenceAudit.data[label])

    if (adherenceAudit.loading) {
        return (
            <Card title="Risk of Non-Adherence">
                <ProgressBar />
            </Card>
        )
    }

    return (
        <Card title="Risk of Non-Adherence">
            <Text style={[{ fontStyle: "italic" }]}>
                Based on our assessment, this shows the liklihood of non-adherence.{" "}
            </Text>

            <LineChart
                data={{
                    labels,
                    datasets: [
                        {
                            data: graphData, //[0, 4, 1, 1, 3, 7, 21, 80, 50, 5, 2], //adherenceAudit.data,
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
                width={width - 110}
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
                text={adherenceCategoryDescription[adherenceScoreToCategory(adherenceAudit.mean)]}
            />
            {/* FIXME: Update this information to include the correct factors */}
            {principalComponents.length > 0 && (
                <InformationBullet
                    containerStyle={{ marginBottom: 20, marginTop: 10 }}
                    text={`Principle component: ${principalComponents.join(", ")}.`}
                />
            )}
            {/* <InformationBullet
                containerStyle={{ marginBottom: 20, marginTop: 10 }}
                text="Please see 'Next Steps' for counseling recommendations"
            /> */}
        </Card>
    )
}

export const adherenceScoreToCategory = (score: number): string => {
    if (score >= 0.8) {
        return "very-high"
    } else if (score >= 0.45) {
        return "high"
    } else {
        return "low"
    }
}

export const adherenceCategoryDescription = {
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

export default AssessmentSummary
