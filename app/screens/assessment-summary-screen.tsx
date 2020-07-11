import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import {Button} from 'react-native-paper'
import { ParamListBase,useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color } from "../theme"

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
        <View style={{ marginTop: 12 }} key={index}>
          <View style={{ flex: 1, flexDirection: "row" }}>
            <View style={{ height: 30, width: 30, backgroundColor: color.primary, borderRadius: 30 / 2, alignItems: "center", justifyContent: "center" }}>
              <Text style={{ color: "white", textAlign: "center" }}>{index + 1}</Text>
            </View>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={{ fontWeight: "bold" }}>{step.title}</Text>
            </View>
          </View>
          <Text style={{ marginTop: 12 }}>{step.description}</Text>
        </View>
      ))
      }
    </React.Fragment>

  )
}

export const AssessmentSummaryScreen: React.FunctionComponent<AssessmentSummaryScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const navigation=useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText="Assessment Summary" />

      <View style={{ padding: 10 }}>
        <View style={{ backgroundColor: "#e5e5e5", height: 200 }}>
        </View>
        <View style={{}}>
          <Text size="h6">It is most likely that your client has </Text>
          <Text size="h6" style={{ color: color.primary }}>{"Pneumonia"}</Text>
        </View>

        <View style={{ marginTop: 12 }}>
          <Text size="h5" style={{ fontWeight: "bold" }}>Next Steps</Text>
          <Text>Please utilize these next steps for your client.</Text>
          <NextSteps />
          <View>
            <Button
              style={{ marginTop: 12, paddingHorizontal: 20, paddingVertical: 8, borderRadius: 5, backgroundColor: color.primary}}
              onPress={() => {
                navigation.navigate("client-feedback")
               }}
              uppercase={false}
            ><Text style={{ color: "white" }}>To Client Feedback</Text></Button>
          </View>
        </View>


      </View>
    </Screen>
  )
})
