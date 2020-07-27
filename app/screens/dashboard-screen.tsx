import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TouchableOpacity, View, Image} from "react-native"
import { ParamListBase,useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color, style } from "../theme"
import { Card, Button } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialIcons"

export interface DashboardScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {}

export const DashboardScreen: React.FunctionComponent<DashboardScreenProps> = observer(props => {
    // const { someStore } = useStores()
    return (
        <Screen style={ROOT} preset="scroll" title="Elsa Health Assistant">
            <View style={{ padding: 10 }}>
                <DashboardItem
                    title="New Patient Assesment"
                    iconSource={require("../assets/icons/ASK-A-DOCTOR.png")}
                    actionText="Begin Symptom Assesment"
                    description="Assess your patients health situation using the Elsa suite of Tools."
                    route="client-present"
                />
                <DashboardItem
                    title="Have a question about a disease?"
                    actionText="Visit Library"
                    description="The Elsa library provides information about each of the diseases we cover."
                    route="disease-library"
                />
                <DashboardItem
                    title="Having a problem? Enjoying Something?"
                    actionText="Report Problem / Feedback"
                    description="Please leave feedback and we will be sure to fix whatever you are having a problem with."
                    route="feedback"
                />
            </View>
        </Screen>
    )
})

interface DashboardItemProps {
    title: string
    description: string
    actionText: string
    iconSource?: any,
    route?:string
}

const DashboardItem: React.FC<DashboardItemProps> = ({
    title,
    description,
    iconSource,
    actionText,
    route
}) => {
    const navigation=useNavigation()
    
    const navigateTo=()=>{
        if(route) navigation.navigate(route)
        return
    }
    return (
        <Card style={{ marginTop: 20 }}>
            <Card.Title title={title} titleStyle={style.contentHeader} />
            <Card.Content>
                {iconSource ? (
                    <View style={{ flexDirection: "row" }}>
                        <View style={{ flex: 3 }}>
                            <Text text={description} style={style.bodyContent}/>
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
                <Button onPress={navigateTo}
                    contentStyle={{ flexDirection: 'row-reverse', paddingLeft: 8 }}
                    mode="text"
                    icon={() => <Icon name="arrow-forward" size={18} style={{ color: color.primary }} />}

                >
                    <Text text={actionText} color="primary" size="small" />
                </Button>
            </Card.Actions>
        </Card>
    )
}
