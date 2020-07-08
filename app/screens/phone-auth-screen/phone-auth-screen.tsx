import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, View, Image, Alert, Dimensions } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { TextInput, Button, Title, ActivityIndicator, Colors } from "react-native-paper"
import { ParamListBase, StackActions } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import auth from "@react-native-firebase/auth"
import { Screen, Text } from "../../components"
import { useStores } from "../../models/root-store"
import { color } from "../../theme"

const { height } = Dimensions.get("window")

export interface PhoneAuthScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    backgroundColor: color.background,
    // flex: 1,
    height,
    // backgroundColor: "red",
}
const ACTIVITY_INDICATOR: ViewStyle = {
    marginTop: "40%",
}

const styles = EStyleSheet.create({
    logo: {
        width: "50%", // 80% of screen width
        height: "20%",
        marginTop: "50%",
        marginBottom: "5%",
        alignSelf: "center",
    },
    input: {
        padding: 15,
        paddingTop: 30,
        paddingBottom: 5,
    },
    button: {
        marginTop: 15,
        marginRight: 15,
        marginLeft: 15,
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

export const PhoneAuthScreen: React.FunctionComponent<PhoneAuthScreenProps> = observer(props => {
    // If null, no SMS has been sent
    const [confirm, setConfirm] = React.useState(null)
    const [state, setstate] = React.useState({ ...initialState })
    const [loading, setloading] = React.useState(false)

    const toggleView = () =>
        setstate({
            ...state,
            view: state.view === "phone-number" ? "activation-code" : "phone-number",
        })

    // Handle the button press
    // async function signInWithPhoneNumber() {
    //     if (loading) return
    //     setloading(true)
    //     const confirmation = await auth().signInWithPhoneNumber(state.telephone)

    //     // confirmation.
    //     setConfirm(confirmation)
    // }

    const sendAuthMessage = () => {
        auth()
            .signInWithPhoneNumber(state.telephone)
            .then(res => {
                console.log("Auth done", res.confirm)
                setConfirm(res)
                toggleView()
            })
            .catch(error => {
                console.log(error)
                setloading(false)
                Alert.alert("Error", "Failed to authenticate your account")
            })
    }

    const authenticate = async confirm => {
        let hasError = false
        try {
            await confirm.confirm(state.activationCode)
        } catch (error) {
            console.log("Invalid code.", error)
            hasError = true
            alert("Invalid code")
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
    }
    const rootStore = useStores()

    const { account } = rootStore

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

    if (account.authenticated && account.role === "clinician") {
        // navigate to routes of clinicians at the facilities
        props.navigation.dispatch(
            StackActions.replace("appointments-list", {})
        )
    }

    if (account.authenticated && account.role === "addo-dispenser") {
        // navigate to routes of clinicians at the facilities
        props.navigation.dispatch(
            StackActions.replace("appointments-list", {})
        )
    }

    if (account.authenticated && account.role === "chw") {
        // navigate to the routes of chw's
        props.navigation.dispatch(
            StackActions.replace("respiratory-presentation", {})
        )
        // props.navigation.navigate("respiratory-presentation")
    }
    return (
        <Screen style={ROOT} testID="container" preset="scroll">
            <StatusBar backgroundColor="white" />

            <Image style={styles.logo} source={require("./logo.png")} resizeMode="contain" />

            <Text size="h2" tx="phoneAuthScreen.title" align="center" />

            {state.view === "phone-number" ? (
                <React.Fragment>
                    <TextInput
                        value={state.telephone}
                        onChangeText={text => setstate({ ...state, telephone: text })}
                        mode="outlined"
                        keyboardType="phone-pad"
                        label="Namba ya simu"
                        style={styles.input}
                    />

                    <Button
                        mode="contained"
                        onPress={sendAuthMessage}
                        loading={loading}
                        style={styles.button}
                    >
                        <Text color="white">Tuma Uthibitisho</Text>
                    </Button>
                </React.Fragment>
            ) : (
                <React.Fragment>
                    <TextInput
                        value={state.activationCode}
                        keyboardType="number-pad"
                        onChangeText={text => setstate({ ...state, activationCode: text })}
                        mode="outlined"
                        label="Kodi ya uthibitisho"
                        style={styles.input}
                    />

                    <Button
                        mode="contained"
                        onPress={() => authenticate(confirm)}
                        loading={loading}
                        style={styles.button}
                    >
                        <Text color="white">Thibitisha</Text>
                    </Button>
                </React.Fragment>
            )}
        </Screen>
    )
})
