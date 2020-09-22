import * as React from "react"
import {
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StatusBar,
    View,
    ViewStyle,
    Text,
} from "react-native"
import { useSafeArea } from "react-native-safe-area-context"
import { ScreenProps } from "./screen.props"
import { isNonScrolling, offsets, presets } from "./screen.presets"
import Icon from "react-native-vector-icons/MaterialIcons"
import { color, md, style } from "../../theme"
import { Header } from "../"
import { Title } from "react-native-paper"

const isIos = Platform.OS === "ios"

const RIGHT_ICON_CONTAINER: ViewStyle = { flexDirection: "row-reverse" }

function ScreenWithoutScrolling(props: ScreenProps) {
    const insets = useSafeArea()
    const preset = presets.fixed
    const styles = props.style || {}
    const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top, paddingHorizontal: 16 }

    return (
        <KeyboardAvoidingView
            style={[preset.outer, backgroundStyle]}
            behavior={isIos ? "padding" : null}
            keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
        >
            <StatusBar backgroundColor="white" barStyle={props.statusBar || "light-content"} />
            <View style={[preset.inner, styles, insetStyle, style.mainContainerPadding]}>
                {props.children}
            </View>
        </KeyboardAvoidingView>
    )
}

function ScreenWithScrolling(props: ScreenProps) {
    const insets = useSafeArea()
    const preset = presets.scroll

    // this background color to be moved to screen props
    
    const styles = {...props.style,backgroundColor:"#F2F4F7"}|| {}
    const backgroundStyle = props.backgroundColor ? { backgroundColor: props.backgroundColor } : {}
    const insetStyle = { paddingTop: props.unsafe ? 0 : insets.top }

    return (
        <KeyboardAvoidingView
            style={[preset.outer, backgroundStyle]}
            behavior={isIos ? "padding" : null}
            keyboardVerticalOffset={offsets[props.keyboardOffset || "none"]}
        >
            <StatusBar
                backgroundColor={color.black}
                barStyle={props.statusBar || "light-content"}
            />
            <View style={[preset.outer, backgroundStyle, insetStyle]}>
                {props.title === "auth" ? null : (
                    <View style={{ height: md ? "auto" : 80 }}>
                        <Header headerText={props.title} />
                    </View>
                )}
                <ScrollView
                    style={[preset.outer, backgroundStyle]}
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={[preset.inner, styles, style.mainContainerPadding]}
                >
                    {props.children}
                </ScrollView>
            </View>
        </KeyboardAvoidingView>
    )
}

/**
 * The starting component on every screen in the app.
 *
 * @param props The screen props
 */
export function Screen(props: ScreenProps) {
    if (isNonScrolling(props.preset)) {
        return <ScreenWithoutScrolling {...props} />
    } else {
        return <ScreenWithScrolling {...props} />
    }
}
