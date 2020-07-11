import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Image, Dimensions } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color } from "../theme"
import { Button } from "react-native-paper"

export interface CompletedFollowUpSubscriptionScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const { height } = Dimensions.get("window")

export const CompletedFollowUpSubscriptionScreen: React.FunctionComponent<CompletedFollowUpSubscriptionScreenProps> = observer(
    props => {
        // const { someStore } = useStores()
        return (
            <Screen preset="scroll">
                <Header headerText="Registration Complete" />
                <Text italic style={{ padding: 10, paddingTop: 0 }}>
                    The registration is complete! Please inform your patient that they will be sent
                    an SMS message and asked to input their symptoms every day for 14 days. If their
                    symptoms worsen, they should seek medical care immediately.
                </Text>

                <Image
                    style={{ alignSelf: "center", marginTop: height / 7 }}
                    source={require("./confirmed.png")}
                />

                <Button
                    mode="contained"
                    style={{ margin: 10, marginTop: 20 }}
                    onPress={() => props.navigation.navigate("appointments-list")}
                >
                    <Text color="white">Main Page</Text>
                </Button>
            </Screen>
        )
    },
)
