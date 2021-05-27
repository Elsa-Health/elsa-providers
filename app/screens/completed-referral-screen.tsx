import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, Image, Dimensions } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color } from "../theme"
import { Button } from "react-native-paper"

export interface CompletedReferralScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    backgroundColor: color.palette.black,
}

const { height } = Dimensions.get("window")

export const CompletedReferralScreen: React.FunctionComponent<CompletedReferralScreenProps> = observer(
    props => {
        // const { someStore } = useStores()
        return (
            <Screen preset="scroll">
                <Header headerText="Referral Made" />
                <Text italic style={{ padding: 10, paddingTop: 0 }}>
                    Your referral is complete! Your patient has been referred to XYZ Hospital for an
                    appointment on May 11, 2020 at 16:00. Please tell your patient to proceed to
                    their appointment and inform the registration desk upon arrival.
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
