import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { ParamListBase,useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, RadioButton, TextInput, Divider, Button } from 'react-native-paper'
import { Select } from 'material-bread';
import { Screen, Col, Row } from "../components"
// import { useStores } from "../models/root-store"
import { color, style, md } from "../theme"

export interface CtcNewPatientScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
  flex: 1
}

export const CtcNewPatientScreen: React.FunctionComponent<CtcNewPatientScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const navigation=useNavigation()
  const [value, setValue] = React.useState('male');
  const [selectedValue, setSelectedValue] = React.useState("java");
  const [displayIndex, setDisplayIndex] = React.useState(0)
  return (
    <Screen style={ROOT} preset="scroll" title="New Patient Information">
      <Row>
        <Col md={12}>
          <Text style={[style.bodyContent, { fontStyle: "italic" }]}>Please input the following information about your patient. </Text>
        </Col>
      </Row>
      {displayIndex == 0 ?
        <Row>
          <Row rowStyles={style.contentTextVerticalSpacing}>
            <Col md={6}>
              <Text style={style.contentHeader}>Gender </Text>
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
              <Text style={style.contentHeader}>Date of Birth</Text>
            </Col>
            <Col md={12}>
              <Row>
                <Col md={12}>
                  <Text>This line to be removed : As note to replace all the inputtext with select when found appropriate one.</Text>
                </Col>
              </Row>
              <Row >
                <Col md={4}>
                  <TextInput
                    // value={state.activationCode}
                    keyboardType="number-pad"
                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                    mode="outlined"
                    label=""
                    style={style.input}
                    underlineColor="transparent"
                    theme={{ colors: { primary: color.primary } }}
                  />
                </Col>
                <Col md={4}>
                  <TextInput
                    // value={state.activationCode}
                    keyboardType="number-pad"
                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                    mode="outlined"
                    label=""
                    style={style.input}
                    underlineColor="transparent"
                    theme={{ colors: { primary: color.primary } }}
                  />
                </Col>
                <Col md={4}>
                  <TextInput
                    // value={state.activationCode}
                    keyboardType="number-pad"
                    // onChangeText={text => setstate({ ...state, activationCode: text })}
                    mode="outlined"
                    label=""
                    style={style.input}
                    underlineColor="transparent"
                    theme={{ colors: { primary: color.primary } }}
                  />
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <Text style={{ color: "#7B7B7B" }}>Age: 35 years, 4 months</Text>
                </Col>
              </Row>
            </Col>

          </Row>

          <Row rowStyles={style.contentTextVerticalSpacing}>
            <Col md={12}>
              <TextInput
                // value={state.activationCode}
                keyboardType="number-pad"
                // onChangeText={text => setstate({ ...state, activationCode: text })}
                mode="outlined"
                label=""
                style={style.input}
                underlineColor="transparent"
                theme={{ colors: { primary: color.primary } }}
              />
            </Col>
            <Col md={12}>
              <TextInput
                // value={state.activationCode}
                keyboardType="number-pad"
                // onChangeText={text => setstate({ ...state, activationCode: text })}
                mode="outlined"
                label="District Of Residence"
                style={style.input}
                underlineColor="transparent"
                theme={{ colors: { primary: color.primary } }}
              />
            </Col>
          </Row>

          <Row rowStyles={{ marginVertical: 32 }}>
            <Col md={12}>
              <Divider style={[{ backgroundColor: color.offWhiteBackground, marginHorizontal: md ? -36 : -12 }]} />
            </Col>
          </Row>


          <Row rowStyles={{}}>
            <Col md={12}>
              <Text style={style.contentHeader}>Drug Allergies</Text>
            </Col>
            <Col md={12}>
              <Text style={[style.bodyContent, { fontStyle: "italic", color: "#7B7B7B" }]}>Please indicate any allergies the patient has: </Text>
            </Col>
            <Col md={12}>
              <Row>
                <Col>
                  <Button
                    mode="outlined"
                    onPress={() => { }}
                    style={style.buttonOutline}
                    uppercase={false}
                  ><Text style={{ color: color.primary, fontSize: md ? 18 : 14 }}>Penicilin</Text>
                  </Button>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <TextInput
                // value={state.activationCode}
                keyboardType="number-pad"
                // onChangeText={text => setstate({ ...state, activationCode: text })}
                mode="outlined"
                label="Search ... "
                style={style.input}
                underlineColor="transparent"
                theme={{ colors: { primary: color.primary } }}
              />
            </Col>
          </Row>
          <Row rowStyles={{ marginVertical: 32 }}>
            <Col md={12}>
              <Divider style={[{ backgroundColor: color.offWhiteBackground, marginHorizontal: md ? -36 : -12 }]} />
            </Col>
          </Row>


          <Row rowStyles={{}}>
            <Col md={12}>
              <Text style={style.contentHeader}>Treatment Support</Text>
            </Col>
            <Col md={12}>
              <Text style={[style.bodyContent, { fontStyle: "italic", color: "#7B7B7B" }]}>Does the patient have treatment support?  </Text>
            </Col>
            <Col md={12}>
              <RadioButton.Group

                onValueChange={value => setValue(value)} value={value}>
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
            <Col md={12}>
              <TextInput
                // value={state.activationCode}
                keyboardType="number-pad"
                // onChangeText={text => setstate({ ...state, activationCode: text })}
                mode="outlined"
                label=""
                style={style.input}
                underlineColor="transparent"
                theme={{ colors: { primary: color.primary } }}
              />
            </Col>

            <Col md={12} colStyles={style.contentTextVerticalSpacing}>
              <Button
                style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
                onPress={() => { setDisplayIndex(1) }}
                uppercase={false}
              ><Text style={style.buttonText}>Next</Text></Button>
            </Col>


          </Row>



        </Row>
        :
        <Row >
          <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
            <Text style={style.contentHeader}>Date of First HIV+ Test</Text>
          </Col>

          <Col md={4}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>

          <Col md={4}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>

          <Col md={4}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>

          <Col md={12} colStyles={style.contentTextVerticalSpacing}>
            <Text style={style.contentHeader}>Date Confirmed HIV+</Text>
          </Col>
          <Col md={4}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>

          <Col md={4}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>

          <Col md={4}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>


          <Col md={12} colStyles={style.contentTextVerticalSpacing}>
            <Text style={style.contentHeader}>Is the patient currently on ARVs?</Text>
          </Col>


          <Col md={12} colStyles={style.headerTextContentVerticalSpacing}>
            <RadioButton.Group

              onValueChange={value => setValue(value)} value={value}>
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


          <Col md={12} colStyles={style.contentTextVerticalSpacing}>
            <Text style={style.contentHeader}>Date Started on ARVs</Text>
          </Col>

          <Col md={4}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>

          <Col md={4}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>

          <Col md={4}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>

          <Col md={12}>
            <TextInput
              // value={state.activationCode}
              keyboardType="number-pad"
              // onChangeText={text => setstate({ ...state, activationCode: text })}
              mode="outlined"
              label=""
              style={style.input}
              underlineColor="transparent"
              theme={{ colors: { primary: color.primary } }}
            />
          </Col>


          <Col md={12} colStyles={style.contentTextVerticalSpacing}>
            <Row rowStyle={{ backgroundColor: "red", width: "100%" }}>
              <Col md={6} colStyles={[{}]}>
                <Button
                  style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-start" }]}
                  onPress={() => {
                    //navigate here
                    setDisplayIndex(0)
                  }}
                  uppercase={false}
                ><Text style={style.buttonText}>Back</Text></Button>
              </Col>
              <Col md={6} colStyles={[{}]}>

                <Button
                  style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
                  onPress={() => {
                    //navigate here
                    navigation.navigate("ctc-assessment-screen")
                  }}
                  uppercase={false}
                ><Text style={style.buttonText}>Next</Text></Button>
              </Col>
            </Row>


          </Col>
        </Row>
      }
    </Screen >
  )
})
