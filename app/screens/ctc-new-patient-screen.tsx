import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Picker } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, RadioButton, TextInput } from 'react-native-paper'
import { Screen, Col, Row } from "../components"
// import { useStores } from "../models/root-store"
import { color, style } from "../theme"

export interface CtcNewPatientScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
  flex: 1
}

export const CtcNewPatientScreen: React.FunctionComponent<CtcNewPatientScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const [value, setValue] = React.useState('male');
  const [selectedValue, setSelectedValue] = React.useState("java");
  return (
    <Screen style={ROOT} preset="scroll" title="New Patient Information">
      <Row>
        <Row>
          <Col md={12}>
            <Text style={style.bodyContent}>Please input the following information about your patient. </Text>
          </Col>
        </Row>

        <Row rowStyles={style.contentTextVerticalSpacing}>
          <Col md={6}>
            <Text style={style.bodyContent}>Gender </Text>
          </Col>
          <Col md={6}>
            <RadioButton.Group

              onValueChange={value => setValue(value)} value={value}>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={4}>
                      <RadioButton value="male" color={color.primary} />
                    </Col>
                    <Col md={8}>
                      <Text style={style.bodyContent}>Male</Text>
                    </Col>


                  </Row>
                </Col>

                <Col md={6}>
                  <Row>
                    <Col md={4}>
                      <RadioButton value="female" color={color.primary} />
                    </Col>
                    <Col md={8}>
                      <Text style={style.bodyContent}>Female</Text>
                    </Col>


                  </Row>
                </Col>





              </Row>
            </RadioButton.Group>
          </Col>

        </Row>

        <Row rowStyles={style.contentTextVerticalSpacing}>
          <Col md={12}>
            <Text style={style.bodyContent}>Date of Birth</Text>
          </Col>
          <Col md={12}>
            <Row >
              <Col md={4}>
                {/* <TextInput
                  // value={state.activationCode}

                  render={props => */}
                    <Picker
                      selectedValue={selectedValue}
                      style={{ height: 50, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                      <Picker.Item label="Java" value="java" />
                      <Picker.Item label="JavaScript" value="js" />
                    </Picker>
                  {/* }
                  keyboardType="number-pad"
                  // onChangeText={text => setstate({ ...state, activationCode: text })}
                  mode="outlined"
                  label="Month"
                  style={style.input}
                  underlineColor="transparent"
                  theme={{ colors: { primary: color.primary } }}
                /> */}
              </Col>
              <Col md={4}>
                <Text>One</Text>
              </Col>
              <Col md={4}>
                <Text>One</Text>
              </Col>
            </Row>
          </Col>

        </Row>
      </Row>
    </Screen>
  )
})
