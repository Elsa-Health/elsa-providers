import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { Button, Checkbox,Text } from 'react-native-paper'
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen,Header } from "../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../theme"


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
    <Screen style={ROOT} preset="scroll" title={title}>
      <View style={{ padding: 10 }}>
        {isClientConfirmed
          ?
          <View>
            <Text style={style.contentHeader}>AfyaTek Program - Client Consent Form</Text>
            {messageList.map((message, i) => (
              <Text style={[style.bodyContent,style.contentTextVerticalSpacing]} key={i} >{message}</Text>
            ))}
            <View style={{ flex:1,flexDirection: "row", marginTop: 24 }}>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => {
                  setChecked(!checked);
                }}
                color={color.primary}
              />
              <View >
                <Text style={style.bodyContent}>I, the client, agree to participate in this study and understand the information described to me above.</Text>
              </View>

            </View>
            <Button
              mode="contained"
              onPress={() => {
                navigation.navigate("symptom-assessment")
              }}
              style={style.buttonFilled}
              uppercase={false}
            ><Text style={style.buttonText}>Continue</Text>
            </Button>

            <Button
              mode="outlined"
              onPress={() => { navigation.goBack() }}
              style={style.buttonOutline}
              uppercase={false}
            ><Text style={{ color: color.primary,fontSize: md ? 18 : 14 }}>Client is not present</Text>
            </Button>
          </View>
          :
          <View>
            <View style={{ backgroundColor: "#E5E5E5", height: 200, marginBottom: 12 }}>
            </View>

            {/* fonts range to be updated  */}
            <Text style={style.contentHeader} >Please confirm the following</Text>
            <Text style={style.bodyContent}>Is the client for whom you are completing this symptom assessment for present in your ADDO now/ during the time of the assessment?</Text>
            <Button
              mode="contained"
              onPress={() => {
                setIsClientConfirmed(true)
                setTitle("Client Consent")
              }}
              style={style.buttonFilled}
              uppercase={false}
            ><Text style={style.buttonText}>Client is present</Text>
            </Button>

            <Button
              mode="outlined"
              onPress={() => { navigation.goBack() }}
              style={style.buttonOutline}
              uppercase={false}
            ><Text style={{ color: color.primary,fontSize: md ? 18 : 14 }}>Client is not present</Text>
            </Button>
          </View>
        }

      </View>
    </Screen>
  )
})
