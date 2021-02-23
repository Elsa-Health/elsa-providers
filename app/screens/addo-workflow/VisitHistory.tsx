import React from "react"
import { useNavigation } from "@react-navigation/native"
import { View, Dimensions } from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { Button, Checkbox, Row, Screen, Text } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { color } from "../../theme"
import RadioQuestion from "../../components/radio-question/radio-question"
import { BOOLEAN_OPTIONS } from "../../common/constants"
import VisitDate from "../../components/visit-date/visit-date"
import { useVisitStore } from "../../models/addo-store"
import shallow from "zustand/shallow"
import { useLocale } from "../../models/language"

const { height } = Dimensions.get("window")

interface VisitHistoryState {
    recentVisit: boolean
    similarPresentation: boolean
    elsaVisit: boolean
}

const VisitHistory: React.FC = () => {
    const navigation = useNavigation()
    // const [state, setState] = React.useState<VisitHistoryState>({
    //     recentVisit: false,
    //     similarPresentation: false,
    //     elsaVisit: false,
    // })
    const [translateChoice, _locale] = useLocale((state) => [state.translateChoice, state.locale])
    const [recentVisit, similarPresentation, elsaVisit, setState] = useVisitStore(
        (state) => [
            state.recentVisit,
            state.similarPresentation,
            state.elsaVisit,
            state.updateVisit,
        ],
        shallow,
    )

    const submit = () => navigation.navigate("addo.PatientIntake")

    return (
        <Screen title="Previous Visits" titleTx="addo.previousVisits.title" preset="scroll">
            <Spacer size={25} />

            <VisitDate />
            <Spacer size={10} />

            <Row>
                <MaterialIcon
                    style={{ marginRight: 10 }}
                    size={28}
                    color={color.primary}
                    name={"history"}
                />
                <Text tx="addo.previousVisits.visitHistory" bold size="h6">
                    Visit History
                </Text>
            </Row>
            <Spacer size={15} />

            <RadioQuestion
                id="recentVisit"
                onPress={(status: boolean) => setState({ recentVisit: status })}
                value={recentVisit}
                options={BOOLEAN_OPTIONS}
                question={translateChoice([
                    "Has the patient seen another healthcare provder in the past week?",
                    "Je! Mgonjwa amemuona mtoa huduma ya afya mwingine katika wiki iliyopita?",
                ])}
                marginVertical={18}
            />

            {recentVisit ? (
                <View>
                    <RadioQuestion
                        id="similarPresentation"
                        onPress={(status: boolean) => setState({ similarPresentation: status })}
                        value={similarPresentation}
                        options={BOOLEAN_OPTIONS}
                        question={translateChoice([
                            "Was it for the same symptoms that they have today?",
                            "Je? Ilikuwa ni kwa dalili zile zile walizo nazo leo?",
                        ])}
                        marginVertical={18}
                    />

                    <RadioQuestion
                        id="elsaVisit"
                        onPress={(status: boolean) => setState({ elsaVisit: status })}
                        value={elsaVisit}
                        options={BOOLEAN_OPTIONS}
                        question={translateChoice([
                            "Did they visit an ADDO that was using the Elsa Health Assistant (this tool)?",
                            "Je! Walitembelea ADDO ambayo ilikuwa ikitumia Mfumo wa Afya wa Elsa (zana hii)?",
                        ])}
                        marginVertical={18}
                    />
                </View>
            ) : (
                <Spacer size={height / 4} />
            )}

            <Spacer size={25} />

            <Button
                style={{ paddingHorizontal: 46, paddingVertical: 5, alignSelf: "flex-end" }}
                onPress={submit}
                uppercase={false}
                mode="contained"
                label="Next"
                labelTx="common.next"
            />
        </Screen>
    )
}

export default VisitHistory
