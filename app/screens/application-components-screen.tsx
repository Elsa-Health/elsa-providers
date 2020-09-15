import React, { Children } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { Card, Button } from "react-native-paper"
import { Screen, Text, Row, Col } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../theme"
import { any } from "ramda"

const ROOT: ViewStyle = {
    // backgroundColor: color.palette.black,
    flex: 1,
    paddingVertical: 12,
}

const DEFAULTS: ViewStyle | TextStyle = {
    borderRadius: 5,
    marginVertical: 12,
}
const CARD_STYLE: ViewStyle = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    elevation: 1,
    backgroundColor: color.palette.white,
    ...DEFAULTS,
}

function Panel({ children }) {
    return (
        <Card style={CARD_STYLE}>
            <Card.Content>{children}</Card.Content>
        </Card>
    )
}

type ElsaButtonProps = {
    block:boolean,
    variation:string,
    withArrow:boolean,
    backgroundColor:string,
    color:string
  }

const ElsaButton = ({block,variation,withArrow,backgroundColor,color}) => {
    return (
        <Button
            contentStyle={{ flexDirection: "row-reverse", paddingLeft: 8 }}
            icon={withArrow?"arrow-right":null}
            mode="contained"
            onPress={() => console.log("Pressed")}
            
        >
            <Text style={{color}}>Press Me</Text>
        </Button>
    )
}
export const ApplicationComponentsScreen = () => {
    return (
        <Screen style={ROOT} preset="scroll" title="All components">
            <Row>
                {/* Panel Components */}
                <Col md={12}>
                    <Panel>
                        <Text text="Panel"></Text>
                    </Panel>
                </Col>

                <Col md={12} colStyles={DEFAULTS}>
                    <ElsaButton color="#FFFFFF" withArrow={true}/>
                </Col>
            </Row>
        </Screen>
    )
}
