import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { Checkbox, Button, TextInput } from 'react-native-paper'
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color, style } from "../theme"

export interface ClientFeedbackScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
}

const sampleRecommendations = [
  'Referred to nearest health facility.',
  'Referred to a laboratory for testing.',
]

const sampleRecommendations2 = [
  'Dispensed medication.'
]

const ClientRecommendation = ({ sampleRecommendations }: { sampleRecommendations?: string[] }) => {
  return (
    <View>
      {sampleRecommendations.map((recommendation, index) => (
        <View style={[style.contentTextVerticalSpacing,{ flexDirection: "row", justifyContent: "space-between"}]} key={index}>
          <Text style={{ textAlignVertical: "center" }}>{recommendation}</Text>
          <Checkbox
            status={'checked'}
            onPress={() => {
            }}
            color={color.primary}
          />

        </View>))

      }
    </View>
  )
}
export const ClientFeedbackScreen: React.FunctionComponent<ClientFeedbackScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  return (
    <Screen style={ROOT} preset="scroll" title="Assessment Feedback">
      <View style={{ padding: 10 }}>
        <Text style={style.bodyContent}>Please indicate which next steps you provided to the patient in order to complete this symptom assessment.</Text>
        <Text style={[style.contentTextVerticalSpacing,style.contentHeader]}>I provided the following recommendations:</Text>
        <View style={{ flex: 1 }}>
          <ClientRecommendation sampleRecommendations={sampleRecommendations} />
        </View>
        <View style={style.contentTextVerticalSpacing}>
          <Text style={style.bodyContent}>Please indicate which tests: </Text>
          <TextInput
            placeholder="Start typing..."
            mode="flat"
            // multiline={true}
            // numberOfLines={4}
            value={""}
            onChangeText={text => { }}

            underlineColor="transparent"
            style={[style.headerTextContentVerticalSpacing,style.input]}
            theme={{ colors: { primary: color.primary } }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ClientRecommendation sampleRecommendations={sampleRecommendations2} />
        </View>

        <View style={style.contentTextVerticalSpacing}>
          <Text style={style.bodyContent}>Please indicate which medication </Text>
          <TextInput
            placeholder="Start typing..."
            mode="flat"
            // multiline={true}
            // numberOfLines={4}
            value={""}
            onChangeText={text => { }}
            style={[style.headerTextContentVerticalSpacing,style.input]}
            underlineColor="transparent"
            theme={{ colors: { primary: color.primary } }}
          />
        </View>

        <View style={style.contentTextVerticalSpacing}>
          <Text style={style.bodyContent}>Please add any additional notes.  </Text>
          <TextInput
            placeholder="Start typing..."
            mode="flat"
            multiline={true}
            numberOfLines={4}
            value={""}
            onChangeText={text => { }}
            underlineColor="transparent"
            style={[style.headerTextContentVerticalSpacing]}
            theme={{ colors: { primary: color.primary } }}
          />
        </View>
        <View style={style.contentTextVerticalSpacing}>
          <Button
            style={[style.buttonFilled,{paddingHorizontal:46, alignSelf: "flex-end" }]}
            onPress={() => { }}
            uppercase={false}
          ><Text style={{ color: "white" }}>Submit</Text></Button>
        </View>
      </View>
    </Screen>
  )
})
