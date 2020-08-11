import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Header } from "../components"
import { RadioButton, TextInput, Checkbox, Button ,Text} from 'react-native-paper'
// import { useStores } from "../models/root-store"
import { color, style } from "../theme"
import EStyleSheet from "react-native-extended-stylesheet"
import { AssessmentQuestion } from "./assessment-questions-screen"
import { lastIndexOf } from "lodash"
import { useStores } from "../models/root-store"



export interface SymptomAssessmentScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
}

const styles = EStyleSheet.create({
  questionWrapper: {
    marginTop: 10,
    marginBottom: 35,
  },
  booleanOptionsContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  booleanOption: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: "10%",
  },
  radioOption: {
    flexDirection: "row",
    marginTop: 10,
    alignItems: "center",
    marginRight: "15%",
    width: "90%",
  },
})


export const GeneralAssessmentQuestion = ({ question }: { question: string }) => {

  return (
    <View style={style.contentTextVerticalSpacing}>
      <Text style={style.contentHeader}>{question}</Text>

      <View style={[styles.booleanOptionsContainer, style.bodyContent, style.headerTextContentVerticalSpacing]}>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.booleanOption}
        >
          <RadioButton
            value="present"
            status={"unchecked"}
            onPress={() => { }}
            color={color.primary}
          />
          <Text style={style.bodyContent}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => { }}
          style={styles.booleanOption}

        >
          <RadioButton
            value="absent"
            status={"checked"}
            onPress={() => { }}
            color={color.primary}
          />
          <Text style={style.bodyContent}>Female</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const sampleSymptoms = ['Cough', 'Fever/ High temperature', 'Difficulty breathing',
  'Chest pain',
  'Abnormal vaginal discharge',
]

const SymptomsList = () => {
  return (
    <React.Fragment>
      {sampleSymptoms.map((symptom, index) => (
        <View style={[style.contentTextVerticalSpacing, { flexDirection: "row", justifyContent: "space-between" }]} key={index}>
          <Text style={style.bodyContent}>{symptom}</Text>
          <Checkbox
            status={'checked'}
            onPress={() => {
            }}
            color={color.primary}
          />
        </View>))

      }
    </React.Fragment>
  )
}

const sampleAssessmentQuestions = [
  'Does the client feel more fatigued or tired than usual?',
  'Has the client had difficulty breathing for more than 3 days?',
  'Does the client have a loss of appetite? ',
  'Does the client have white patches on the back of their throat or inside their mouth?'
]

export const SymptomAssessmentScreen: React.FunctionComponent<SymptomAssessmentScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const [displayIndex, setDisplayIndex] = React.useState(0)
  const [lastIndex, setLastIndex] = React.useState(1)
  const navigation = useNavigation()
  const { assessment } = useStores()

  console.log("Assessment :",assessment.patient.symptoms)
  return (
    <Screen style={ROOT} preset="scroll" title="Symptom Assesessment">
      <View style={{ padding: 10 }}>
        {displayIndex === 0 &&
          <View>
            <Text style={style.bodyContent}>Please input the following information about your client.</Text>
            <GeneralAssessmentQuestion question="Gender" />
            <Text style={style.contentHeader}>Age</Text>
            <TextInput
              placeholder="Start typing..."
              mode="flat"
              value={""}
              onChangeText={text => { }}
              underlineColor="transparent"
              style={[style.input, style.bodyContent, style.headerTextContentVerticalSpacing]}
              theme={{ colors: { primary: color.primary } }}
            />

            <Text style={[style.contentHeader, style.contentTextVerticalSpacing]}>Presenting Symptoms</Text>
            <Text style={[style.bodyContent, style.headerTextContentVerticalSpacing]}>Does the client have any of the following symptoms? Please check all that apply. </Text>
            <SymptomsList />
            <View>
              <Button
                style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
                onPress={() => { setDisplayIndex(displayIndex + 1) }}
                uppercase={false}
              ><Text style={style.buttonText}>Next</Text></Button>

            </View>
          </View>
        }
        {displayIndex === 1 &&
          <View>
            <Text style={style.bodyContent} >Please input the following information about your client. </Text>
            {/* <AssessmentQuestion question={/> */}
            {sampleAssessmentQuestions.map((question, index) => (
              <AssessmentQuestion question={question} key={index} />
            ))}
            <View>
              <Button
                style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
                onPress={() => {
                  if (lastIndex === displayIndex) {
                    console.log("Reached the last index")
                    navigation.navigate('assessment-summary')
                  } else {
                    setDisplayIndex(displayIndex + 1)
                  }

                }}
                uppercase={false}
              ><Text style={style.buttonText}>Next</Text></Button>

            </View>
          </View>
        }

      </View>
    </Screen>
  )
})
