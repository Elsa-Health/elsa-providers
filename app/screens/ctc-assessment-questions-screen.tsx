import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { ParamListBase,useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, TextInput, RadioButton, Divider, Button } from 'react-native-paper'
import { Screen, Row, Col } from "../components"
// import { useStores } from "../models/root-store"
import { color, style } from "../theme"

export interface CtcAssessmentQuestionsScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
  flex: 1
}

const AssementQuestionCTC = ({ question }) => {
  return (
    <>
      <Col md={12} colStyles={style.contentTextVerticalSpacing}>
        <Text style={style.bodyContent}>{question}</Text>
      </Col>

      <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
        <RadioButton.Group

          onValueChange={() => { }} value={"male"}>
          <Row>
            <Col md={2}>

              <Row>
                <Col md={4}>
                  <RadioButton value="male" color={color.primary} />
                </Col>
                <Col md={8}>
                  <Text style={style.bodyContent}>Yes</Text>
                </Col>


              </Row>
            </Col>

            <Col md={2}>
              <Row>
                <Col md={4}>
                  <RadioButton value="female" color={color.primary} />
                </Col>
                <Col md={8}>
                  <Text style={style.bodyContent}>No</Text>
                </Col>
              </Row>
            </Col>

          </Row>
        </RadioButton.Group>
      </Col>
    </>
  )
}

const dummyCTCData = [
  { quesiton: "Does the client feel more fatigued or tired than usual?" },
  { quesiton: "Has the client had difficulty breathing for more than 3 days?" },
  { quesiton: "Does the client have a loss of appetite? " },
  { quesiton: "Does the client have white patches on the back of their throat or inside their mouth?" },

]
export const CtcAssessmentQuestionsScreen: React.FunctionComponent<CtcAssessmentQuestionsScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const navigation=useNavigation()
  return (
    <Screen style={ROOT} preset="scroll" title="Patient Assessment">
      <Row>
        <Col md={12}>
          <Text style={[style.bodyContent, { fontStyle: "italic" }]}>Please input the following information about your patient. </Text>
        </Col>
        {dummyCTCData.map((question, index) => (
          <AssementQuestionCTC question={question.quesiton} key={index} />
        ))}
        <Col md={12} colStyles={[{}]}>

          <Button
            style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
            onPress={() => {
              //navigate here
              // setDisplayIndex(1)
              navigation.navigate("ctc-assessment-summary-screen")
            }}
            uppercase={false}
          ><Text style={style.buttonText}>Next</Text></Button>
        </Col>
      </Row>
    </Screen>
  )
})
