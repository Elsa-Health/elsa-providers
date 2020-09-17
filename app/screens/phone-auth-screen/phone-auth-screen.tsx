import * as React from "react"
import { observer } from "mobx-react-lite"
import {
    ViewStyle,
    StatusBar,
    View,
    Image,
    Alert,
    Dimensions,
    Text as RNText,
    TouchableOpacity,
} from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { TextInput, Button, Title, ActivityIndicator, Colors, Text } from "react-native-paper"
import { ParamListBase, StackActions, useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import auth from "@react-native-firebase/auth"
import { Screen, Row, Col } from "../../components"
import { useStores } from "../../models/root-store"
import { color, style, md } from "../../theme"

const { height } = Dimensions.get("window")

export interface PhoneAuthScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    backgroundColor: color.background,
    flex: 1,
    height: height - StatusBar.currentHeight,
    // backgroundColor: "red",
}
const ACTIVITY_INDICATOR: ViewStyle = {
    marginTop: "40%",
}

const styles = EStyleSheet.create({
    logo: {
        width: 164 * 0.8,
        height: 141 * 0.8,
        alignSelf: "center",
        marginBottom: 20,
    },
    input: {
        height: 44,
        width: "100%",
        backgroundColor: "#E5E5E5",
        marginTop: 12, //value to be fixed
    },
    button: {
        backgroundColor: color.primary,
        marginTop: 15,
        borderRadius: 5,
        height: 44,
    },
})

interface PhoneAuthScreenState {
    telephone: string
    activationCode: string
    view: "phone-number" | "activation-code"
}

const initialState: PhoneAuthScreenState = {
    telephone: "+255",
    activationCode: "",
    view: "phone-number",
}

export const PhoneAuthScreen: React.FunctionComponent<PhoneAuthScreenProps> = () => {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = React.useState(null)
    const [state, setstate] = React.useState({ ...initialState })
    const [loading, setloading] = React.useState(false)
    const [user, setUser] = React.useState(null)
    const [loadingVeriricationCode, setLoadingVerificationCode] = React.useState(false)
    const navigation = useNavigation()

    const rootStore = useStores()
    const { account } = rootStore

    const toggleView = () =>
        setstate({
            ...state,
            view: state.view === "phone-number" ? "activation-code" : "phone-number",
        })

    const sendAuthMessage = () => {
        setLoadingVerificationCode(true)
        auth()
            .signInWithPhoneNumber(state.telephone)
            .then((res) => {
                setLoadingVerificationCode(false)
                console.log("Auth done", res.confirm)
                setConfirm(res)
                toggleView()
            })
            .catch((error) => {
                setLoadingVerificationCode(false)
                console.log(error)

                Alert.alert("Error", "Failed to authenticate your account")
            })
    }

    const authenticate = async (confirm) => {
        setloading(true)
        let hasError = false

        try {
            const user = await confirm.confirm(state.activationCode)
            setUser(user)

            account.setUser({
                id: user.uid,
                username: user.phoneNumber,
                telephone: "",
                role: "chw", //current role of the user
                hospitalId: "",
                hospitalName: "",
                authenticated: true,
                loading: false,
            })

            setloading(false)
        } catch (error) {
            setloading(false)
            console.log("Invalid code.", error)
            hasError = true
            Alert.alert("Invalid code")
            return
        }
        if (!hasError) {
            // return props.navigation.dispatch(
            //     StackActions.replace("appointment-list", {
            //         props: "",
            //     }),
            // )
            // return props.navigation.navigate("appointments-list")
        }

        setstate({ ...state, view: "phone-number" })

        // To be set up with right data source
    }

    if (account.loading) {
        return (
            <Screen style={ROOT}>
                <ActivityIndicator
                    animating={true}
                    color={Colors.purple700}
                    size={32}
                    style={ACTIVITY_INDICATOR}
                />
            </Screen>
        )
    }

    // FIXME: add support for the workflow field in the user keys

    if (account.authenticated && account.role === "clinician") {
        // navigate to routes of clinicians at the facilities
        console.warn("Signed in as clinician")
        // navigation.dispatch(
        //     StackActions.replace("appointments-list", {})
        // )
    }

    if (account.authenticated && account.role === "addo-dispenser") {
        // navigate to routes of clinicians at the facilities
        console.warn("Signed in as addo dispenser")
        // navigation.dispatch(
        //     StackActions.replace("appointments-list", {})
        // )
    }

    if (account.authenticated && account.role === "chw") {
        // navigate to the routes of chw's
        console.warn("Signed in as chw")
        // navigation.dispatch(
        //     StackActions.replace("dashboard", {})
        // )
        // props.navigation.navigate("respiratory-presentation")
    }
    return (
        <Screen testID="container" preset="fixed" title="auth">
            <StatusBar backgroundColor="white" />
            <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
                <Image style={styles.logo} source={require("./logo.png")} resizeMode="contain" />
                <Text
                    style={{
                        textAlign: "center",
                        fontSize: md ? 32 : 28,
                        paddingVertical: md ? 18 : 12,
                    }}
                >
                    Elsa Health Assistant
                </Text>
                {state.view === "phone-number" ? (
                    <React.Fragment>
                        <TextInput
                            value={state.telephone}
                            onChangeText={(text) => setstate({ ...state, telephone: text })}
                            mode="outlined"
                            label="Phone Number"
                            keyboardType="phone-pad"
                            // placeholder="Namba ya simu"
                            style={[style.input]}
                            underlineColor="transparent"
                            theme={{ colors: { primary: color.primary } }}
                        />

                        <Button
                            mode="contained"
                            onPress={sendAuthMessage}
                            color="white"
                            loading={loadingVeriricationCode}
                            style={style.buttonFilled}
                            uppercase={false}
                        >
                            <Text style={style.buttonText}>Send Code</Text>
                        </Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Text style={[style.contentTextVerticalSpacing, style.bodyContent]}>
                            <Text>Verification code sent to number </Text>
                            <Text style={{ fontWeight: "bold" }}>{state.telephone}. </Text>
                            <Text
                                style={{ color: color.primary }}
                                onPress={() => {
                                    setstate({ ...state, view: "phone-number" })
                                }}
                            >
                                Change Number
                            </Text>
                        </Text>
                        <TextInput
                            value={state.activationCode}
                            keyboardType="number-pad"
                            onChangeText={(text) => setstate({ ...state, activationCode: text })}
                            mode="outlined"
                            label="Enter code"
                            style={styles.input}
                            underlineColor="transparent"
                            theme={{ colors: { primary: color.primary } }}
                        />

                        <Button
                            mode="contained"
                            onPress={() => authenticate(confirm)}
                            loading={loading}
                            color="white"
                            style={style.buttonFilled}
                            uppercase={false}
                        >
                            <Text style={style.buttonText}>Thibitisha</Text>
                        </Button>
                    </React.Fragment>
                )}

                <View style={{ position: "absolute", bottom: 10, width: "100%" }}>
                    {/* the bellow component to be written */}
                    <RNText style={{ fontSize: 12, textAlign: "center" }}>
                        Built by Inspired Ideas LLC
                    </RNText>
                </View>
            </View>
        </Screen>
    )
}
