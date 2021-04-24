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
import { ParamListBase, useNavigation, useRoute } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { ActivityIndicator } from "react-native-paper"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { Screen, Row, Col, Text, TextInput, Button } from "../../components"
import QRCodeScanner from "react-native-qrcode-scanner"
import { RNCamera } from "react-native-camera"

import { color, style } from "../../theme"
import { useStores } from "../../models/root-store"
import useStore, { PatientFile, useAdherenceStore, useVisitStore } from "../../models/ctc-store"
import Spacer from "../../components/spacer/spacer"
import { palette } from "../../theme/palette"
import { Api } from "../../services/api"
import RadioQuestion from "../../components/radio-question/radio-question"
import { useRouteStore } from "../../stores"
import _, { omit } from "lodash"

export interface CtcQrcodeScanScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const { width, height } = Dimensions.get("window")

const CtcQrcodeScanScreen: React.FunctionComponent<CtcQrcodeScanScreenProps> = (props) => {
    const [code, setCode] = useState("")

    const navigation = useNavigation()
    const [scanComplete, setScanComplete] = useState(false)
    const [mode, setMode] = useState<"camera" | "manual">("manual")
    const [loadingFile, setLoadingFile] = useState(false)

    const [fileExists, setFileExists] = useState(null)

    // const resetVisitStore = useVisitStore((state) => state.resetVisitStore)
    // const resetAdheranceStore = useAdherenceStore((state) => state.resetAdheranceStore)
    const setPatientFile = useVisitStore((state) => state.setPatientFile)

    const route = useRoute()
    // nextRouteName is the name of the next route
    const nextRouteName = route.params?.nextRouteName

    useEffect(() => {
        setScanComplete(false)
    }, [])

    console.log(nextRouteName)

    const onSuccess = async (data) => {
        setCode(data)
        setLoadingFile(true)

        const api = new Api()
        const ptFile = api.getLocalCTCPatientFile(data)

        if (!ptFile) {
            setFileExists(false)
        } else {
            setFileExists(true)
            setPatientFile(ptFile)
        }

        setLoadingFile(false)
        setScanComplete(true)
    }

    const createNewFileAndNavigate = (routePath: string) => {
        // return null
        const api = new Api()

        const ptFile = api.createLocalCTCPatientFile(code)

        if (ptFile) {
            setPatientFile(ptFile)
            ToastAndroid.show(
                "New incomplete file has been created for this patient",
                ToastAndroid.SHORT,
            )
            console.warn(route)
            navigation.navigate(routePath, omit(route.params, "nextRouteName"))
        } else {
            ToastAndroid.show(
                "There was an error creating a file for this patient",
                ToastAndroid.SHORT,
            )
            console.warn(route)
            // TODO: add crashylitcs and loggins support
            console.warn("There was an error creating a patient outline file")
        }
    }

    const continueWithVisit = () => {
        if (!fileExists) {
            Alert.alert(
                "This patient does not currently have a file on record.",
                "Continuing with this visit will create a minimal file for the patient that can be updated at a later time.",
                [
                    { text: "Abort", style: "cancel" },
                    {
                        text: "Continue",
                        onPress: () => createNewFileAndNavigate(nextRouteName),
                    },
                ],
            )
            return
        }
        // TODO: load this file into the global state
        navigation.navigate(nextRouteName, _.cloneDeep(route.params))
    }

    const registerNewFile = () => {
        // const dest =
        //     nextRouteName && nextRouteName === "ctc.PatientFile"
        //         ? "ctc.PatientFile"
        //         : "ctc.VisitType"
        createNewFileAndNavigate("ctc.PatientInformationManager")
    }

    const goToUpdateFile = () =>
        navigation.navigate("ctc.PatientInformationManager", _.cloneDeep(route.params))

    if (!scanComplete) {
        return (
            <Screen preset="scroll" title="Scan QR Code">
                <Spacer size={20} />

                {mode === "manual" ? (
                    <View>
                        <Text>Please enter the QR code on the patient’s CTC ID card.</Text>
                        <TextInput
                            value={String(Number(code))}
                            onChangeText={(val) => setCode(_.padStart(val, 10, "0"))}
                            keyboardType="number-pad"
                            label="Patient Code"
                        />

                        <Button
                            mode="text"
                            label="OR SCAN WITH CAMERA"
                            onPress={() => setMode("camera")}
                        />

                        {/* <Row> */}
                        <Button
                            label="CONTINUE"
                            mode="contained"
                            onPress={() => code.length > 0 && onSuccess(code)}
                            width={200}
                            style={{ alignSelf: "flex-end" }}
                        />
                        {/* </Row> */}
                    </View>
                ) : (
                    <View>
                        <Text>Please scan the QR code on the patient’s CTC ID card.</Text>

                        <CodeScannerView onScan={onSuccess} />
                        <Button
                            style={{ marginBottom: -10 }}
                            mode="outlined"
                            backgroundColor="primary"
                            label="OR ENTER MANUALLY"
                            onPress={() => setMode("manual")}
                        />
                    </View>
                )}

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
        <Screen preset="scroll" backgroundColor="white" title="Scan QR Code">
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

            <Spacer size={20} />
            {nextRouteName && nextRouteName === "ctc.PatientFile" ? (
                <View style={{ flexDirection: "row-reverse" }}>
                    {fileExists ? (
                        <Button
                            onPress={() => navigation.navigate("ctc.PatientFile")}
                            style={styles.actionButtons}
                            uppercase={false}
                            label="Continue"
                            mode="contained"
                        />
                    ) : (
                        <Button
                            onPress={registerNewFile}
                            style={styles.actionButtons}
                            uppercase={false}
                            mode="contained"
                            label="Register New Patient"
                        />
                    )}
                </View>
            ) : (
                <View style={styles.actionButtonsContainer}>
                    {!fileExists ? (
                        <>
                            <Button
                                mode="outlined"
                                onPress={registerNewFile}
                                style={styles.actionButtons}
                                uppercase={false}
                                label="Register Patient"
                            />
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
                                label="Update Patient File"
                            />
                            <Spacer horizontal size={44} />
                        </>
                    )}

                    <Button
                        onPress={continueWithVisit}
                        style={styles.actionButtons}
                        uppercase={false}
                        mode="contained"
                        label="Continue with Visit"
                    />
                </View>
            )}

            <Spacer size={20} />
        </Screen>
    )
}

interface CodeScannerViewProps {
    onScan: (data: string) => void
}

export const CodeScannerView: React.FC<CodeScannerViewProps> = ({ onScan }) => (
    <QRCodeScanner
        onRead={(e) => onScan(e.data)}
        showMarker={true}
        // flashMode={RNCamera.Constants.FlashMode.torch}
        cameraProps={{ flashMode: "on" }}
        containerStyle={styles.scannerContainer}
        cameraStyle={styles.cameraStyle}
        reactivate
        reactivateTimeout={1000}
        markerStyle={{
            borderColor: color.primary,
        }}
    />
)

const styles = StyleSheet.create({
    actionButtons: { paddingHorizontal: 30, paddingVertical: 5 },
    actionButtonsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 60,
    },
    cameraStyle: {
        height: height / 1.5,
        width: "100%",
    },
    scannerContainer: { height: height / 1.5 },
})

export default CtcQrcodeScanScreen
// FIXME: import components from elsa custom libraries
