import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Button, Text } from 'react-native-paper'
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color, style } from "../theme"

export interface AssessmentSummaryScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
}

const sampleNextSteps = [
  {
    title: "Encourage staying home & hydration.",
    description: "Client should stay at home and drink as much water as possible. This will help them get better. "
  },
  {
    title: "Refer to nearest health facility.",
    description: "If their symptoms get worse, they should call a doctor. They will be able to help your client and make sure that they get the appropriate tests and treatment."
  },
  {
    title: "Dispense cough medicine",
    description: ""
  }
]
const NextSteps = () => {

  return (
    <React.Fragment>
      {sampleNextSteps.map((step, index) => (
        <View style={style.contentTextVerticalSpacing} key={index}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ height: 30, width: 30, backgroundColor: color.primary, borderRadius: 30 / 2, alignItems: "center", justifyContent: "center" }}>
              <Text style={[style.bodyContent, { color: "white", textAlign: "center" }]}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={[style.contentHeader]}>{step.title}</Text>
            </View>
          </View>
          <Text style={[style.bodyContent,style.headerTextContentVerticalSpacing]}>{step.description}</Text>
        </View>
      ))
      }
    </React.Fragment>

  )
}

export const AssessmentSummaryScreen: React.FunctionComponent<AssessmentSummaryScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll" title="Assessment Summary">
      <View style={{ padding: 10 }}>
        <View style={{ backgroundColor: "#e5e5e5", height: 200 }}>
        </View>
        <View style={{}}>
          <Text style={style.bodyContent}>It is most likely that your client has </Text>
          <Text style={[style.bodyContent, { color: color.primary }]}>{"Pneumonia"}</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text  style={style.contentHeader}>Next Steps</Text>
          <Text style={style.bodyContent}>Please utilize these next steps for your client.</Text>
          <NextSteps />
          <View>
            {/* this component is not supposed to be there */}
            <Button
              style={style.buttonFilled}
              onPress={() => {
                navigation.navigate("client-feedback")
              }}
              uppercase={false}
            ><Text style={style.buttonText}>To Client Feedback</Text></Button>
          </View>
        </View>


      </View>
    </Screen>
  )
})
