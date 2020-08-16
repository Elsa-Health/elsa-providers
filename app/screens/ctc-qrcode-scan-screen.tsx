import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
    ViewStyle,
    View,
    // Text,
    TouchableOpacity,
} from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Text, Button } from "react-native-paper"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { Screen, Row, Col } from "../components"
import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from "react-native-camera"

import { color, style } from "../theme"
import { useStores } from "../models/root-store"
import useStore, { PatientFile } from "../models/ctc-store"

export interface CtcQrcodeScanScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
    // backgroundColor: "red"
}

const ScanWindow = () => {
    const { assessment } = useStores()

    console.log("Assessment store is here ", assessment)
    const onSuccess = (e) => {
        // console.log("Code run already : ", e.data)
        //settnig scan complete and setting the value of qr code here
        assessment.setQrCodeComplete(true)
        assessment.setQrCode(e.data)
    }

    return (
        <View style={{ flex: 1, width: "100%" }}>
            <QRCodeScanner
                onRead={onSuccess}
                showMarker={true}
                flashMode={RNCamera.Constants.FlashMode.torch}
                // containerStyle={{
                //     height:700,width:"100%"
                // }}
                cameraStyle={{
                    height: 700,
                    width: "100%",
                }}
                markerStyle={{
                    borderColor: color.primary,
                }}
            />
        </View>
    )
}

export const CtcQrcodeScanScreen: React.FunctionComponent<CtcQrcodeScanScreenProps> = observer(
    (props) => {
        // const { someStore } = useStores()
        const { assessment } = useStores()
        const patient: PatientFile = useStore((state) => state.patient)
        const updatePatient = useStore((state) => state.updatePatient)

        const navigation = useNavigation()
        const [scanComplete, setScanComplete] = useState(false)

        useEffect(() => {
            setScanComplete(false)
        }, [])

        // console.log(patient)

        const onSuccess = (e) => {
            // console.log("Code run already : ", e.data)
            //settnig scan complete and setting the value of qr code here
            // assessment.setQrCodeComplete(true)
            setScanComplete(true)
            updatePatient("code", e.data)
            // assessment.setQrCode(e.data)
        }

        return (
            <Screen style={ROOT} preset="scroll" title="Scan QR Code">
                {!scanComplete ? (
                    <Row>
                        <Row>
                            <Col md={12}>
                                <Text>Please scan the QR code on the patient’s CTC ID card.</Text>
                            </Col>
                        </Row>
                        <Row rowStyles={style.contentTextVerticalSpacing}>
                            {/* MarginTop to prevent the cammera from blocking any top content */}
                            <Col md={12} colStyles={{ paddingTop: 100 }}>
                                <View
                                    style={{
                                        // flex:1,
                                        //Setting height manually to fit the tablet space
                                        height: 880,

                                        // backgroundColor: color.offWhiteBackground,
                                    }}
                                >
                                    <View style={{ flex: 1, width: "100%" }}>
                                        <QRCodeScanner
                                            onRead={onSuccess}
                                            showMarker={true}
                                            flashMode={RNCamera.Constants.FlashMode.torch}
                                            // containerStyle={{
                                            //     height:700,width:"100%"
                                            // }}
                                            cameraStyle={{
                                                height: 700,
                                                width: "100%",
                                            }}
                                            markerStyle={{
                                                borderColor: color.primary,
                                            }}
                                        />
                                    </View>
                                </View>
                            </Col>
                        </Row>
                        <Row rowStyles={style.contentTextVerticalSpacing}>
                            <Col md={12}>
                                <Button
                                    style={[
                                        style.buttonFilled,
                                        { paddingHorizontal: 46, alignSelf: "flex-end" },
                                    ]}
                                    onPress={() => {
                                        setScanComplete(true)
                                    }}
                                    uppercase={false}
                                >
                                    <Text style={style.buttonText}>Next</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                ) : (
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
                                        backgroundColor: color.offWhiteBackground,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text style={{ textAlign: "center" }}>
                                        To Be Replaced with QR Image as in Design
                                    </Text>
                                </View>
                            </Col>
                        </Row>
                        <Row rowStyles={style.contentTextVerticalSpacing}>
                            <Col
                                md={12}
                                colStyles={{ justifyContent: "center", alignItems: "center" }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "baseline",
                                    }}
                                >
                                    <MaterialIcon
                                        name="check-circle"
                                        style={{ alignSelf: "center" }}
                                        size={22}
                                        color="green"
                                    />
                                    <Text
                                        style={[
                                            style.bodyContent,
                                            style.contentTextVerticalSpacing,
                                            { alignSelf: "center", marginLeft: 3 },
                                        ]}
                                    >
                                        QR Code Scanned
                                    </Text>
                                </View>
                                <Text
                                    style={[
                                        style.bodyContent,
                                        style.contentTextVerticalSpacing,
                                        { fontWeight: "bold" },
                                    ]}
                                >
                                    Number: {patient.code}
                                </Text>
                                <Text style={[style.bodyContent, style.contentTextVerticalSpacing]}>
                                    Patient registered.
                                </Text>
                            </Col>
                        </Row>

                        <Row rowStyles={style.contentTextVerticalSpacing}>
                            <Col md={12}>
                                <Button
                                    style={[
                                        style.buttonFilled,
                                        { paddingHorizontal: 46, alignSelf: "flex-end" },
                                    ]}
                                    onPress={() => {
                                        navigation.navigate("ctc-new-patient-screen")
                                    }}
                                    uppercase={false}
                                >
                                    <Text style={style.buttonText}>Next</Text>
                                </Button>
                            </Col>
                        </Row>
                    </Row>
                )}
            </Screen>
        )
    },
)
