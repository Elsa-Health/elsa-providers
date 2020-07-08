import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, FlatList, TouchableOpacity } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
import _ from "lodash"
// import { useStores } from "../models/root-store"
import { color } from "../theme"
import EStyleSheet from "react-native-extended-stylesheet"
import Icon from "react-native-vector-icons/MaterialIcons"

export interface AppointmentExtendedScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    // flex: 1,
}
const CONTAINER: ViewStyle = {
    padding: 10,
}

interface AppointmentItem {
    id: string
    title: string
    risk: "high" | "medium" | "low"
}

const DATA: AppointmentItem[] = [
    {
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        title: "James Alex Massoy",
        risk: "high",
    },
    {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        title: "+255766458987",
        risk: "medium",
    },
    {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        title: "Jumanne Issa",
        risk: "high",
    },
]

const styles = EStyleSheet.create({
    itemContainer: {
        borderBottomColor: color.palette.lightGrey,
        borderBottomWidth: 1,
        marginVertical: 8,
    },
    item: {
        paddingVertical: 15,
        paddingHorizontal: 10,
        marginHorizontal: 0,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    title: {
        fontSize: 32,
    },
})

function Item({ title, risk, action }) {
    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity style={styles.item} onPress={action} activeOpacity={0.2}>
                <View>
                    <Text size="h6" style={styles.title}>
                        {title}
                    </Text>
                    <Text italic >Risk: {_.upperFirst(risk)}</Text>
                </View>
                <Icon name="chevron-right" size={20} />
            </TouchableOpacity>
        </View>
    )
}

export const AppointmentExtendedScreen: React.FunctionComponent<AppointmentExtendedScreenProps> = observer(
    props => {
        // const { someStore } = useStores()
        return (
            <View style={{ backgroundColor: "white", flex: 1 }}>
                {/* <Screen style={ROOT} preset="scroll"> */}
                <Header headerText="10:00 AM - 11:00 AM" />
                {/* </Screen> */}
                <View style={CONTAINER}>
                    <FlatList
                        data={DATA}
                        renderItem={({ item }) => (
                            <Item
                                title={item.title}
                                action={() => props.navigation.navigate("appointment-person")}
                                risk={item.risk}
                            />
                        )}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        )
    },
)
