import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, Button } from 'react-native-paper'
import { Screen, Row, Col } from "../components"

import { color, style } from "../theme"

export interface CtcQrcodeScanScreenProps {
  navigation: NativeStackNavigationProp<ParamListBase>
}


const ROOT: ViewStyle = {
  flex: 1,
  // backgroundColor: "red"
}

export const CtcQrcodeScanScreen: React.FunctionComponent<CtcQrcodeScanScreenProps> = observer((props) => {
  // const { someStore } = useStores()
  const navigation = useNavigation()
  const [scanComplete, setScanComplete] = useState(false)

  return (
    <Screen style={ROOT} preset="scroll" title="Scan QR Code">
      {!scanComplete ?
        <Row>
          <Row>
            <Col md={12}>
              <Text>Please scan the QR code on the patient’s CTC ID card.</Text>
            </Col>
          </Row>
          <Row rowStyles={style.contentTextVerticalSpacing}>
            <Col md={12}>
              <View
                style={{
                  // flex:1,
                  height: 700,
                  backgroundColor: color.offWhiteBackground
                }}>

              </View>

            </Col>
          </Row>
          <Row rowStyles={style.contentTextVerticalSpacing}>
            <Col md={12}>

              <Button
                style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
                onPress={() => { setScanComplete(true) }}
                uppercase={false}
              ><Text style={style.buttonText}>Next</Text></Button>

            </Col>
          </Row>
        </Row>
        :
        <Row>
          <Row>
            <Col md={12}>
              <Text>Please scan the QR code on the patient’s CTC ID card.</Text>
            </Col>
          </Row>
          <Row rowStyles={style.contentTextVerticalSpacing}>
            <Col md={12}>
              <View
                style={{
                  // flex:1,
                  height: 700,
                  backgroundColor: color.offWhiteBackground
                }}>

              </View>

            </Col>
          </Row>
          <Row rowStyles={style.contentTextVerticalSpacing}>
            <Col md={12} colStyles={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={[style.bodyContent, style.contentTextVerticalSpacing]}>QR Code Scanned</Text>
              <Text style={[style.bodyContent, style.contentTextVerticalSpacing, { fontWeight: "bold" }]}>Number: 12345-39-499583</Text>
              <Text style={[style.bodyContent, style.contentTextVerticalSpacing]}>Patient registered.</Text>

            </Col>
          </Row>

          <Row rowStyles={style.contentTextVerticalSpacing}>
            <Col md={12}>

              <Button
                style={[style.buttonFilled, { paddingHorizontal: 46, alignSelf: "flex-end" }]}
                onPress={() => {
                  navigation.navigate('ctc-new-patient-screen')
                }}
                uppercase={false}
              ><Text style={style.buttonText}>Next</Text></Button>

            </Col>
          </Row>
        </Row>
      }

    </Screen>
  )
})
