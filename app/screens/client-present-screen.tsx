import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Button, Checkbox } from 'react-native-paper'
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
// import { useStores } from "../models/root-store"
import { color } from "../theme"


export interface ClientPresentScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
}


const messageList = [
  'The following information describes the AfyaTek program. Please read it to your client',
  'The AfyaTek program is seeking to improve health outcomes in Tanzania. This tool helps assess patient symptoms and provide guidelines for next steps',
  'No personally identifying information will be collected from you during this symptom assessment. You do not have to participate in this study if you do not want to',
  'If you would like to withdraw, you are able to do so at any time',
  'If you have questions, please feel free to contact us directly'
]
export const ClientPresentScreen: React.FunctionComponent<ClientPresentScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const [isClientConfirmed, setIsClientConfirmed] = React.useState(false)
  const [checked, setChecked] = React.useState(false);
  const [title, setTitle] = React.useState("Confirmation");
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Header headerText={title} />
      <View style={{ padding: 10 }}>
        {isClientConfirmed
          ?
          <View>
            <Text size="h6" style={{ fontWeight: "bold" }}> AfyaTek Program - Client Consent Form</Text>
            {messageList.map((message, i) => (
              <Text size="h6" style={{ marginTop: 12 }} key={i} >{message}</Text>
            ))}
            <View style={{ flexDirection: "row", marginTop: 12 }}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                color={color.primary}
              />
              <View style={{flex:1}}>
                <Text size="h6">I, the client, agree to participate in this study and understand the information described to me above.</Text>
              </View>

            </View>
            <Button
              mode="contained"
              onPress={() => {
                navigation.navigate("symptom-assessment") 
              }}
              style={[{ paddingVertical: 8, marginTop: 12, backgroundColor: color.primary }, { elevation: 0 }]}
              uppercase={false}
            ><Text style={{ color: "white" }}>Continue</Text>
            </Button>

            <Button
              mode="outlined"
              onPress={() => { navigation.goBack() }}
              style={[{ paddingVertical: 8, marginTop: 12, borderColor: color.primary }, { elevation: 0 }]}
              uppercase={false}
            ><Text style={{ color: color.primary }}>Client is not present</Text>
            </Button>
          </View>
          :
          <View>
            <View style={{ backgroundColor: "#E5E5E5", height: 200, marginBottom: 12 }}>
            </View>

            {/* fonts range to be updated  */}
            <Text size="h6" style={{ fontWeight: "bold" }} >Please confirm the following</Text>
            <Text size="h6" >Is the client for whom you are completing this symptom assessment for present in your ADDO now/ during the time of the assessment?</Text>
            <Button
              mode="contained"
              onPress={() => {
                setIsClientConfirmed(true)
                setTitle("Client Consent") 
              }}
              style={[{ paddingVertical: 8, marginTop: 12, backgroundColor: color.primary }, { elevation: 0 }]}
              uppercase={false}
            ><Text style={{ color: "white" }}>Client is present</Text>
            </Button>

            <Button
              mode="outlined"
              onPress={() => { navigation.goBack() }}
              style={[{ paddingVertical: 8, marginTop: 12, borderColor: color.primary }, { elevation: 0 }]}
              uppercase={false}
            ><Text style={{ color: color.primary }}>Client is not present</Text>
            </Button>
          </View>
        }

      </View>
    </Screen>
  )
})
