import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, View, Image } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color } from "../theme"
import { Card, Button } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialIcons"

export interface DashboardScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {}

export const DashboardScreen: React.FunctionComponent<DashboardScreenProps> = observer(props => {
    // const { someStore } = useStores()
    return (
        <Screen style={ROOT} preset="scroll">
            <Header headerText="Elsa Health Assistant" />

            <View style={{ padding: 10 }}>
                <DashboardItem
                    title="New Patient Assesment"
                    iconSource={require("../assets/icons/ASK-A-DOCTOR.png")}
                    actionText="Begin Symptom Assesment"
                    description="Assess your patients health situation using the Elsa suite of Tools."
                />
                <DashboardItem
                    title="Have a question about a disease?"
                    actionText="Visit Library"
                    description="The Elsa library provides information about each of the diseases we cover."
                />
                <DashboardItem
                    title="Having a problem? Enjoying Something?"
                    actionText="Report Problem / Feedback"
                    description="Please leave feedback and we will be sure to fix whatever you are having a problem with."
                />
            </View>
        </Screen>
    )
})

interface DashboardItemProps {
    title: string
    description: string
    actionText: string
    iconSource?: any
}

const DashboardItem: React.FC<DashboardItemProps> = ({
    title,
    description,
    iconSource,
    actionText,
}) => {
    return (
        <Card style={{ marginTop: 20 }}>
            <Card.Title title={title} />
            <Card.Content>
                {iconSource ? (
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 3 }}>
                            <Text text={description} />
                        </View>
                        <View
                            style={{
                                flex: 2,
                                alignItems: "flex-end",
                            }}
                        >
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: "100%",
                                    height: 100,
                                }}
                                source={iconSource}
                            />
                        </View>
                    </View>
                ) : (
                    <Text text={description} />
                )}
            </Card.Content>
            <Card.Actions>
                <Button onPress={() => {}} style={{ alignContent: "center" }} mode="text">
                    <Text text={actionText} color="primary" size="small" />
                    {/* <Icon name="arrow-forward" color={col or.primary} /> */}
                    <Text style={{ alignSelf: "center" }} color="primary" size="h5">
                        {" "}
                        ⟶
                    </Text>
                </Button>
            </Card.Actions>
        </Card>
    )
}
