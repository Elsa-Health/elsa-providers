import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../theme"

const ROOT: ViewStyle = {
    backgroundColor: color.palette.black,
    flex: 1,
}
export const ApplicationComponentsScreen = () => {
    return (
        <Screen style={ROOT} preset="scroll">
            <Text preset="header" text="applicationComponentsScreen" />
        </Screen>
    )
}
