import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import {
    Text,
    TextInput,
    RadioButton,
    Divider,
    Button,
    Checkbox,
    Card,
    Title,
    Paragraph,
} from "react-native-paper"
import { Screen, Row, Col } from "../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../theme"

export interface CtcAssessmentFeedbackScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

const NextScreenButton = () => {
    const navigation = useNavigation()
    return (
        <Col md={12} colStyles={[{}]}>
            <Button
                style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
                onPress={() => {
                    //navigate here
                    // setDisplayIndex(1)
                    // navigation.navigate("ctc-assessment-feedback-screen")
                    navigation.navigate("dashboard")
                }}
                uppercase={false}
            >
                <Text style={style.buttonText}>Complete</Text>
            </Button>
        </Col>
    )
}

const Recommendation = ({ recommendation }) => {
    return (
        <Col md={12}>
            <Card>
                <Card.Content>
                    <Row>
                        <Col md={10}>
                            <Text style={[style.bodyContent]}>{recommendation}</Text>
                        </Col>

                        <Col md={2} colStyles={{}}>
                            <View
                                style={{
                                    alignSelf: "flex-end",
                                }}
                            >
                                <Checkbox
                                    status={"unchecked"}
                                    color={color.primary}
                                    onPress={() => {
                                        //hello friend
                                    }}
                                />
                            </View>
                        </Col>
                    </Row>
                </Card.Content>
            </Card>
        </Col>
    )
}

const RecommendationWithSeach = ({ title, subtitle }) => {
    return (
        <Col md={12} colStyles={style.contentTextVerticalSpacing}>
            <Card>
                <Card.Content>
                    <Row>
                        <Col md={10}>
                            <Text style={[style.bodyContent]}>{title}</Text>
                        </Col>

                        <Col md={2} colStyles={{}}>
                            <View
                                style={{
                                    alignSelf: "flex-end",
                                }}
                            >
                                <Checkbox
                                    status={"unchecked"}
                                    color={color.primary}
                                    onPress={() => {
                                        //hello friend
                                    }}
                                />
                            </View>
                        </Col>

                        <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                            <Text
                                style={[
                                    style.bodyContent,
                                    { color: "#7B7B7B", fontStyle: "italic" },
                                ]}
                            >
                                {subtitle}{" "}
                            </Text>
                        </Col>

                        <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
                            <Row>
                                <Col md={2}>
                                    <Button
                                        mode="outlined"
                                        onPress={() => {}}
                                        style={style.buttonOutline}
                                        uppercase={false}
                                    >
                                        <Text
                                            style={{ color: color.primary, fontSize: md ? 18 : 14 }}
                                        >
                                            Anemia
                                        </Text>
                                    </Button>
                                </Col>

                                <Col md={2}>
                                    <Button
                                        mode="outlined"
                                        onPress={() => {}}
                                        style={style.buttonOutline}
                                        uppercase={false}
                                    >
                                        <Text
                                            style={{ color: color.primary, fontSize: md ? 18 : 14 }}
                                        >
                                            Cough
                                        </Text>
                                    </Button>
                                </Col>
                            </Row>
                        </Col>

                        <Col md={12} colStyles={{}}>
                            <TextInput
                                // value={state.activationCode}
                                keyboardType="number-pad"
                                // onChangeText={text => setstate({ ...state, activationCode: text })}
                                mode="outlined"
                                label="Search..."
                                style={style.input}
                                underlineColor="transparent"
                                theme={{ colors: { primary: color.primary } }}
                            />
                        </Col>
                    </Row>
                </Card.Content>
            </Card>
        </Col>
    )
}

const RecommendationWithTextArea = ({ title }) => {
    return (
        <Col md={12} colStyles={style.contentTextVerticalSpacing}>
            <Card>
                <Card.Content>
                    <Row>
                        <Col md={10}>
                            <Text style={[style.bodyContent]}>{title}</Text>
                        </Col>

                        <Col md={2} colStyles={{}}>
                            <View
                                style={{
                                    alignSelf: "flex-end",
                                }}
                            >
                                <Checkbox
                                    status={"unchecked"}
                                    color={color.primary}
                                    onPress={() => {
                                        //hello friend
                                    }}
                                />
                            </View>
                        </Col>

                        <Col md={12} colStyles={{}}>
                            <TextInput
                                // value={state.activationCode}
                                keyboardType="number-pad"
                                // onChangeText={text => setstate({ ...state, activationCode: text })}
                                mode="outlined"
                                label="Please type the recommendations..."
                                multiline={true}
                                numberOfLines={4}
                                style={style.input}
                                underlineColor="transparent"
                                theme={{ colors: { primary: color.primary } }}
                            />
                        </Col>
                    </Row>
                </Card.Content>
            </Card>
        </Col>
    )
}

const recommendationsDummy = [
    {
        title: "Referred to a laboratory for testing.",
        subtitle: "If yes, please indicate which tests you recommended: ",
    },
    {
        title: "Dispensed medication to the patient.",
        subtitle: "If yes, please indicate which medication: ",
    },
]
export const CtcAssessmentFeedbackScreen: React.FunctionComponent<CtcAssessmentFeedbackScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        return (
            <Screen style={ROOT} preset="scroll" title="Assessment Feedback">
                <Row>
                    <Col md={12}>
                        <Text style={[style.bodyContent, { fontStyle: "italic" }]}>
                            Please input the following information about your patient.{" "}
                        </Text>
                    </Col>
                    <Col md={12}>
                        <Text style={[style.contentHeader, style.contentTextVerticalSpacing]}>
                            I provided the following recommendations:{" "}
                        </Text>
                    </Col>
                    <Recommendation recommendation="Referred to nearest health facility." />
                    <RecommendationWithSeach
                        title={recommendationsDummy[0].title}
                        subtitle={recommendationsDummy[0].subtitle}
                    />
                    <RecommendationWithSeach
                        title={recommendationsDummy[1].title}
                        subtitle={recommendationsDummy[1].subtitle}
                    />
                    <Recommendation recommendation="Offered counseling to the patient." />
                    <RecommendationWithTextArea title="Provided additional recommendations to the patient:" />
                    <NextScreenButton />
                </Row>
            </Screen>
        )
    },
)
