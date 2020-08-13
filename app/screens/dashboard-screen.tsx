import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, View, Image } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import Icon from "react-native-vector-icons/MaterialIcons"
import {
    Screen,
    //  Text,
    Header,
} from "../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../theme"
import { Card, Button, FAB, Text } from "react-native-paper"
import Process from "../assets/icons/process.svg"
import DrugsNurse from "../assets/icons/drugs-nurse.svg"
import DataExtraction from "../assets/icons/data-extraction.svg"

export interface DashboardScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

export const DashboardScreen: React.FunctionComponent<DashboardScreenProps> = observer((props) => {
    // const { someStore } = useStores()
    const navigation = useNavigation()

    //determine previleges and give the approprivate route
    //for the dashboard item
    const getRoute = () => {
        // other codes here
        // return "client-present"
        // return "".toString()
    }

    return (
        <Screen style={[ROOT]} preset="scroll" title="Elsa Health Assistant">
            <View style={{ padding: 0 }}>
                <DashboardItem
                    title="New Patient Assessment"
                    // iconSource={require("../assets/icons/ASK-A-DOCTOR.png")}
                    icon={<DrugsNurse width="130" height="130" />}
                    actionText="Begin New Assessment"
                    description="Assess your patients’ symptoms to understand more about their health and receive valuable insights for next steps to take."
                    route="ctc-qrcode-scan-screen"
                />

                <DashboardItem
                    title="Risk of Non-Adherence"
                    // iconSource={require("../assets/icons/process.svg")}
                    icon={<Process width="130" height="130" />}
                    actionText="Assess Adherence"
                    description="The Elsa Library provides information about common illnesses, recommendations for next steps, and prevention strategies."
                    route="client-present"
                />

                <DashboardItem
                    title="Risk of Drug Resistance"
                    // iconSource={require("../assets/icons/ASK-A-DOCTOR.png")}
                    icon={<DataExtraction width="130" height="130" />}
                    actionText="Assess Risk of Drug Resistance"
                    description="The Elsa Library provides information about common illnesses, recommendations for next steps, and prevention strategies."
                    route="client-present"
                />

                <DashboardItem
                    title="Elsa Library"
                    actionText="Visit Elsa Library"
                    description="The Elsa Library provides information about common illnesses, recommendations for next steps, and prevention strategies."
                    route="disease-library"
                />
                <DashboardItem
                    title="Feedback/ Report Problem"
                    actionText="Report Problem/ Feedback"
                    description="Please provide feedback about your experience to help improve the Elsa Health Assistant."
                    route="feedback"
                />
            </View>
            <FAB
                style={{
                    position: "absolute",
                    right: md ? 36 : 12,
                    bottom: md ? 36 : 12,
                    height: md ? 60 : 40,
                    width: md ? 60 : 40,
                    backgroundColor: color.primary,
                }}
                icon="plus"
                onPress={() => navigation.navigate("ctc-qrcode-scan-screen")}
            />
        </Screen>
    )
})

interface DashboardItemProps {
    title: string
    description: string
    actionText: string
    iconSource?: any
    icon?: React.ReactNode
    route?: string
}

const DashboardItem: React.FC<DashboardItemProps> = ({
    title,
    description,
    iconSource,
    icon,
    actionText,
    route,
}) => {
    const navigation = useNavigation()

    const navigateTo = () => {
        if (route) navigation.navigate(route)
        return
    }
    const hasIcon = iconSource || icon
    return (
        <Card style={{ marginTop: 20, padding: 0 }}>
            <Card.Content>
                <View style={{ flexDirection: "row" }}>
                    <View
                        style={
                            hasIcon && {
                                flex: 3,
                            }
                        }
                    >
                        <Card.Title
                            title={title}
                            titleStyle={[
                                style.contentHeader,
                                { fontSize: md ? 22 : 18, marginLeft: -16 },
                            ]}
                        />
                        <Text style={[style.bodyContent]}>{description}</Text>
                    </View>
                    {hasIcon && (
                        <View
                            style={{
                                flex: 1.4,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            {icon ? (
                                icon
                            ) : (
                                <Image
                                    resizeMode="contain"
                                    style={{
                                        width: "100%",
                                        height: 100,
                                    }}
                                    source={iconSource}
                                />
                            )}
                        </View>
                    )}
                </View>
            </Card.Content>
            <Card.Actions>
                <Button
                    onPress={navigateTo}
                    contentStyle={{ flexDirection: "row-reverse", paddingLeft: 8 }}
                    mode="text"
                    icon={() => (
                        <Icon name="arrow-forward" size={18} style={{ color: color.primary }} />
                    )}
                >
                    <Text style={[style.buttonText, { color: color.primary }]}>{actionText}</Text>
                </Button>
            </Card.Actions>
        </Card>
    )
}
