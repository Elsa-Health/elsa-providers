import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
// import { Button, Checkbox } from "react-native-paper"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Header, Card, Text, Button, Row, Col } from "../../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../../theme"
import Spacer from "../../components/spacer/spacer"
import { getFormattedDate } from "../../utils/time"
import { TextInput } from "react-native-paper"

export interface PatientVisitProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

export const PatientVisit: React.FunctionComponent<PatientVisitProps> = () => {
    // const { someStore } = useStores()

    const navigation = useNavigation()
    return (
        <Screen style={ROOT} preset="scroll" title={"Patient Visit"}>
            <Spacer size={20} />
            <Card leftIcon="calendar" title="Date of Visit" right={getFormattedDate()}>
                {/* <Text>Hello World</Text> */}
            </Card>
            <Spacer size={12} />
            <Card leftIcon="person" title="Patient Information">
                <Row>
                    <Col md={6}>
                        <TextInput label="Weight (kgs)" onChange={() => null} />
                    </Col>

                    <Col md={6}>
                        <TextInput label="Weight (kgs)" onChange={() => null} />
                    </Col>
                </Row>
            </Card>
        </Screen>
    )
}

export default PatientVisit
