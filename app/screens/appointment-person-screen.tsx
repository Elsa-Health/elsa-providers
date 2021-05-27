import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color } from "../theme"
import { AssessmentQuestion } from "./assessment-questions-screen"
import { Button } from "react-native-paper"

export interface AppointmentPersonScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const CONTAINER: ViewStyle = {
    padding: 10,
    paddingTop: 0,
}

export const AppointmentPersonScreen: React.FunctionComponent<AppointmentPersonScreenProps> = observer(
    props => {
        // const { someStore } = useStores()
        return (
            <Screen preset="scroll">
                <Header headerText="Kevin Alex James" />
                <Text italic style={{ paddingLeft: 10 }}>
                    About the patient visit
                </Text>
                <View style={CONTAINER}>
                    <AssessmentQuestion question="Has the patient arrived?" />
                    <AssessmentQuestion question="Has the patient been tested for COVID-19?" />

                    <Button
                        style={{ marginVertical: 10 }}
                        onPress={() => props.navigation.navigate("hospital-recommendation")}
                        mode="contained"
                    >
                        <Text color="white">Save</Text>
                    </Button>

                    <Button
                        style={{ marginVertical: 0 }}
                        onPress={() => props.navigation.navigate("hospital-recommendation")}
                        mode="text"
                    >
                        <Text>Refer to Hospital</Text>
                    </Button>
                </View>
            </Screen>
        )
    },
)
