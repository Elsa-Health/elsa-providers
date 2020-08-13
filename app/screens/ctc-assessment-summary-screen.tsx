import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, ScrollView } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, TextInput, RadioButton, Divider, Button } from "react-native-paper"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { Screen, Row, Col } from "../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../theme"

export interface CtcAssessmentSummaryScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

const DiseaseAssesmentCTC = () => {
    return (
        <>
            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                <Text style={style.contentHeader}>Disease Assesment</Text>
            </Col>

            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                    Please indicate any new known conditions the patient has at the time of this
                    visit:{" "}
                </Text>
            </Col>

            <Col
                md={12}
                colStyles={[
                    style.headerTextContentVerticalSpacing,
                    {
                        height: 400,
                        backgroundColor: color.offWhiteBackground,
                    },
                ]}
            ></Col>
            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                <Text style={[style.bodyContent, {}]}>
                    It is most likely that your patient has{" "}
                    <Text style={{ color: color.primary }}> Pneumocistis Pneumonia..</Text>
                </Text>
            </Col>
            <FullWidthDivider />
        </>
    )
}

const RisksAssesmentCTC = ({ risk }) => {
    return (
        <>
            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                <Text style={style.contentHeader}>{risk.title}</Text>
            </Col>

            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                <Text style={[style.bodyContent, { fontStyle: "italic" }]}>{risk.subtitle} </Text>
            </Col>

            <Col
                md={12}
                colStyles={[
                    style.headerTextContentVerticalSpacing,
                    {
                        height: 400,
                        backgroundColor: color.offWhiteBackground,
                    },
                ]}
            ></Col>
            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                <Text style={[style.bodyContent, {}]}>
                    {risk.riskMessage}{" "}
                    <Text style={{ color: color.primary }}> {risk.riskValue}</Text>
                </Text>
            </Col>

            <Col
                md={1}
                colStyles={[style.headerTextContentVerticalSpacing, { alignItems: "center" }]}
            >
                <MaterialIcon name="info" size={26} color="gray" />
            </Col>

            <Col md={11} colStyles={style.headerTextContentVerticalSpacing}>
                <Text style={[style.bodyContent, { color: "#484545" }]}>{risk.warning}</Text>
            </Col>
            <FullWidthDivider />
        </>
    )
}

const nextStepsDummy = [
    { what: "Order routine tests and tests to confirm likely condition. " },
    { what: "Dispense medication." },
]

const NextStepsCTC = ({}) => {
    return (
        <>
            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
                <Text style={style.contentHeader}>Next Steps</Text>
            </Col>

            <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                    Click on the next steps below to complete your visit with the patient.{" "}
                </Text>
            </Col>
            {nextStepsDummy.map((nextStep, index) => (
                <NextStep step={nextStep} index={index} key={index} />
            ))}

            <FullWidthDivider />
        </>
    )
}

const NextStep = ({ step, index }) => (
    <>
        <Col md={1} colStyles={style.headerTextContentVerticalSpacing}>
            <Text
                style={[
                    style.bodyContent,
                    {
                        backgroundColor: color.primary,
                        width: 50,
                        height: 50,
                        borderRadius: 25,
                        color: "white",
                        textAlign: "center",
                        textAlignVertical: "center",
                    },
                ]}
            >
                {index + 1}
            </Text>
        </Col>

        <Col md={11} colStyles={style.headerTextContentVerticalSpacing}>
            <Text style={[style.bodyContent, { color: "#A8A8A8" }]}>{step.what}</Text>
        </Col>
    </>
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
    return (
        <Col md={12} colStyles={[{}]}>
            <Button
                style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
                onPress={() => {
                    //navigate here
                    // setDisplayIndex(1)
                    navigation.navigate("ctc-assessment-feedback-screen")
                }}
                uppercase={false}
            >
                <Text style={style.buttonText}>Next</Text>
            </Button>
        </Col>
    )
}

const riskyDummyData = [
    {
        title: "Risk of Non-Adherence",
        subtitle: "Based on our assessment, this shows the liklihood of non-adherence.",
        riskMessage: "The patient’s risk of non-adherence is",
        riskValue: "75%",
        warning:
            "Your patient does not understand their regimen and is sharing their medication with their family/ friends. Improving these will ensure that patient is more likely to adhere.",
    },
    {
        title: "Drug Resistance Risk",
        subtitle: "Based on our assessment, this shows the liklihood of drug resistance.",
        riskMessage: "The patient’s risk of drug resistance is ",
        riskValue: "75%",
        warning:
            "It is not likely that your patient is experiencing HIV drug resistance. Please recommend they see a healthcare provider if they have any symptoms or side effects.",
    },
]

export const CtcAssessmentSummaryScreen: React.FunctionComponent<CtcAssessmentSummaryScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        return (
            <Screen style={ROOT} preset="scroll" title="Assessment Summary">
                {/* screens are not scrolling , added scrollview to fix it */}
                {/* this issue to be fixed in Screen component not here */}

                <ScrollView
                    style={[]}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={[
                        { marginHorizontal: md ? -36 : -12, paddingBottom: md ? 24 : 8 },
                        style.mainContainerPadding,
                    ]}
                >
                    <Row>
                        <DiseaseAssesmentCTC />
                        {riskyDummyData.map((risk, index) => (
                            <RisksAssesmentCTC key={index} risk={risk} />
                        ))}
                        <NextStepsCTC />
                        <NextScreenButton />
                    </Row>
                </ScrollView>
            </Screen>
        )
    },
)
