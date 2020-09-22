import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
    ViewStyle,
    View,
    Dimensions,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ToastAndroid,
} from "react-native"
import { ParamListBase, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Button, ActivityIndicator } from "react-native-paper"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { Screen, Row, Col, Text } from "../../components"
import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from "react-native-camera"

import { color, style } from "../../theme"
import { useStores } from "../../models/root-store"
import useStore, { PatientFile, useVisitStore } from "../../models/ctc-store"
import Spacer from "../../components/spacer/spacer"
import { palette } from "../../theme/palette"
import { Api } from "../../services/api"
import RadioQuestion from "../../components/radio-question/radio-question"
import { useRouteStore } from "../../stores"

export interface CtcQrcodeScanScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const { width, height } = Dimensions.get("window")

// to remove the observer and the mobx
const CtcQrcodeScanScreen: React.FunctionComponent<CtcQrcodeScanScreenProps> = observer((props) => {
    const [code, setCode] = useState("")

    const navigation = useNavigation()
    const [scanComplete, setScanComplete] = useState(false)
    const [loadingFile, setLoadingFile] = useState(false)

    const [fileExists, setFileExists] = useState(null)

    const resetVisitStore = useVisitStore((state) => state.resetVisitStore)
    const { setIsPatientNew, isPatientNew } = useRouteStore()

    console.log("Zustand state : ", setIsPatientNew, " ", isPatientNew)
    useEffect(() => {
        setScanComplete(false)
    }, [])

    // console.log(patient)

    const onSuccess = async (data) => {
        setCode(data)
        setLoadingFile(true)

        const api = new Api()
        const file = await api.getCTCPatientFile(data)

        if (file === null) {
            setFileExists(false)
        } else {
            setFileExists(true)
        }
        setLoadingFile(false)
        setScanComplete(true)
        resetVisitStore()
        console.warn("File", file)
    }

    const createNewFileAndNavigate = (route: string) => {
        

        const api = new Api()

        return api
            .createMinimalCTCFile(code)
            .then((res) => {
                ToastAndroid.show(
                    "New incomplete file has been created for this patient",
                    ToastAndroid.SHORT,
                )
                navigation.navigate(route)
            })
            .catch((error) => {
                // TODO: add crashylitcs and loggins support
                console.warn("There was an error creating a patient outline file", error)
            })
    }

    const continueWithVisit = () => {
        setIsPatientNew(false)

        if (!fileExists) {
            Alert.alert(
                "This patient does not currently have a file on record.",
                "Continuing with this visit will create a minimal file for the patient that can be updated at a later time.",
                [
                    { text: "Abort", style: "cancel" },
                    {
                        text: "Continue",
                        onPress: () => createNewFileAndNavigate("ctc.VisitType"),
                    },
                ],
            )
            return
        }
        // TODO: load this file into the global state
        navigation.navigate("ctc.VisitType")
    }

    const registerNewFile = () => {
        setIsPatientNew(true)
        createNewFileAndNavigate("ctc.VisitType")
    }

    const goToUpdateFile = () => navigation.navigate("ctc-new-patient-screen")

    if (!scanComplete) {
        return (
            <Screen preset="scroll" title="Scan QR Code">
                <Spacer size={20} />
                <Text>Please scan the QR code on the patient’s CTC ID card.</Text>

                <CodeScannerView onScan={onSuccess} />

                {/* If the scan has happened, but we are loading the file from the server, show a spinner in the mean time */}
                {loadingFile && code.length > 2 && (
                    <View
                        style={{
                            position: "absolute",
                            justifyContent: "center",
                            width,
                            height: "100%",
                            backgroundColor: "rgba(243, 245, 242, 0.85)",
                        }}
                    >
                        <ActivityIndicator animating={true} color={color.primary} size={100} />
                    </View>
                )}
            </Screen>
        )
    }

    return (
        <Screen preset="scroll" title="Scan QR Code">
            <Spacer size={20} />
            <Row>
                <Col md={12}>
                    <Text>Please scan the QR code on the patient’s CTC ID card.</Text>
                </Col>
            </Row>
            <Row rowStyles={style.contentTextVerticalSpacing}>
                <Col md={12}>
                    <View
                        style={{
                            paddingVertical: 100,
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <MaterialCommunityIcon
                            name="qrcode-scan"
                            color={palette.greyDarker}
                            size={width / 2}
                        />
                    </View>
                </Col>
            </Row>
            <Row rowStyles={style.contentTextVerticalSpacing}>
                <Col md={12} colStyles={{ justifyContent: "center", alignItems: "center" }}>
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
                        <Spacer horizontal size={4} />
                        <Text size="h5">QR Code Scanned</Text>
                    </View>
                    <Text bold size="h5">
                        Number: {code}
                    </Text>
                    <Text size="h5">
                        Patient{" "}
                        {fileExists ? "is already registered." : "is not currently registered."}
                    </Text>
                </Col>
            </Row>

            <View style={styles.actionButtonsContainer}>
                {!fileExists ? (
                    <>
                        <Button
                            mode="outlined"
                            onPress={registerNewFile}
                            style={styles.actionButtons}
                            uppercase={false}
                        >
                            <Text color="primary" size="h6">
                                Register Patient
                            </Text>
                        </Button>
                        <Spacer horizontal size={44} />
                    </>
                ) : (
                    // FIXME: This should maybe only show when the patient file is not completed
                    <>
                        <Button
                            mode="outlined"
                            onPress={goToUpdateFile}
                            style={styles.actionButtons}
                            uppercase={false}
                        >
                            <Text color="primary" size="h6">
                                Update Patient File
                            </Text>
                        </Button>
                        <Spacer horizontal size={44} />
                    </>
                )}

                <Button
                    onPress={continueWithVisit}
                    style={styles.actionButtons}
                    uppercase={false}
                    mode="contained"
                >
                    <Text size="h6" color="white">
                        Continue with Visit
                    </Text>
                </Button>
            </View>

            <Spacer size={20} />
        </Screen>
    )
})

const styles = StyleSheet.create({
    actionButtons: { paddingHorizontal: 30, paddingVertical: 5 },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 60,
    },
})

interface CodeScannerViewProps {
    onScan: (data: string) => void
}

const CodeScannerView: React.FC<CodeScannerViewProps> = ({ onScan }) => (
    <QRCodeScanner
        onRead={(e) => onScan(e.data)}
        showMarker={true}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        cameraProps={{ flashMode: "on" }}
        // containerStyle={{
        //     height:700,width:"100%"
        // }}
        containerStyle={{ height: height / 1.5 }}
        cameraStyle={{
            height: height / 1.5,
            width: "100%",
        }}
        markerStyle={{
            borderColor: color.primary,
        }}
    />
)

export default CtcQrcodeScanScreen
// TODO: Fetch the file from the server and persist it to the visit state
