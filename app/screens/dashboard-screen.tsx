import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, View, Image } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import {
    Screen,
    //  Text, 
    Header
} from "../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../theme"
import { Card, Button, FAB, Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialIcons"

export interface DashboardScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1
}

export const DashboardScreen: React.FunctionComponent<DashboardScreenProps> = observer(props => {
    // const { someStore } = useStores()
    return (
        <Screen style={[ROOT]} preset="scroll" title="Elsa Health Assistant">
            <View style={{ padding: 10 }}>
                <DashboardItem
                    title="New Patient Assesment"
                    iconSource={require("../assets/icons/ASK-A-DOCTOR.png")}
                    actionText="Begin Symptom Assesment"
                    description="Assess your patients health situation using the Elsa suite of Tools."
                    route="client-present"
                />

                <DashboardItem
                    title="Risk of Non-Adherence"
                    // iconSource={require("../assets/icons/ASK-A-DOCTOR.png")}
                    actionText="Assess Adherence"
                    description="The Elsa Library provides information about common illnesses, recommendations for next steps, and prevention strategies."
                    route="client-present"
                />

                <DashboardItem
                    title="Risk of Drug Resistance"
                    // iconSource={require("../assets/icons/ASK-A-DOCTOR.png")}
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
                    backgroundColor: color.primary
                }}

                icon="plus"
                onPress={() => console.log('Pressed')}
            />
        </Screen>
    )
})

interface DashboardItemProps {
    title: string
    description: string
    actionText: string
    iconSource?: any,
    route?: string
}

const DashboardItem: React.FC<DashboardItemProps> = ({
    title,
    description,
    iconSource,
    actionText,
    route
}) => {
    const navigation = useNavigation()

    const navigateTo = () => {
        if (route) navigation.navigate(route)
        return
    }
    return (
        <Card style={{ marginTop: 20 }}>
            <Card.Title title={title} titleStyle={[style.contentHeader,{fontSize:md?22:18}]} />
            <Card.Content>
                {iconSource ? (
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 3 }}>
                            <Text style={[style.bodyContent]}>{description}</Text>
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
                        <Text style={[style.bodyContent]}>{description} </Text>
                    )}
            </Card.Content>
            <Card.Actions>
                <Button onPress={navigateTo}
                    contentStyle={{ flexDirection: 'row-reverse', paddingLeft: 8 }}
                    mode="text"
                    icon={() => <Icon name="arrow-forward" size={18} style={{ color: color.primary }} />}

                >
                    <Text style={{color:color.primary}}>{actionText}</Text>
                </Button>
            </Card.Actions>
        </Card>
    )
}
