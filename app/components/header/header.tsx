/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { View, ViewStyle, TextStyle, StatusBar } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"

// import { Icon } from "../icon/icon"
import { Text } from "../text/text"

import { spacing, color, md } from "../../theme"
import { translate } from "../../i18n/"
import { palette } from "../../theme/palette"
import { useLocale } from "../../models/language"
import { useNavigation } from "@react-navigation/native"

// static styles
const ROOT: ViewStyle = {
    flexDirection: "row",
    paddingHorizontal: spacing[0],
    alignItems: "center",
    paddingTop: spacing[0],
    paddingBottom: spacing[2],
    marginBottom: spacing[1],
    marginRight: spacing[2],
    marginLeft: spacing[2],
    justifyContent: "flex-start",
}
const TITLE: TextStyle = { fontSize: md ? 28 : 24 }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "flex-start" }
const LEFT: ViewStyle = { width: 0 }
const RIGHT: ViewStyle = { width: 0 }
const RIGHT_ICON_CONTAINER: ViewStyle = { flexDirection: "row-reverse" }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: React.FunctionComponent<HeaderProps> = (props) => {
    const {
        onLeftPress,
        onRightPress,
        rightIcon,
        leftIcon,
        headerText,
        headerTx,
        style,
        titleStyle,
    } = props
    const locale = useLocale((state) => state.locale)
    const navigation = useNavigation()
    const header = headerTx ? translate(headerTx, { locale }, headerText) : headerText || ""

    return (
        <View
            style={
                {
                    // shadowOpacity: 0,
                    // shadowRadius:0,
                    // elevation: 4,
                }
            }
        >
            <StatusBar backgroundColor={color.palette.white} />
            <View
                style={{
                    ...RIGHT_ICON_CONTAINER,
                    paddingHorizontal: md ? 36 : 10,
                    paddingTop: md ? 18 : 12,
                }}
            >
                {/* @ts-ignore the toggleDrawer is not part of the type definitions */}
                <Icon name="menu" onPress={() => navigation.toggleDrawer()} size={32} color={color.black} />
            </View>
            <View style={{ ...ROOT, ...style, paddingHorizontal: md ? 24 : 10 }}>
                {leftIcon ? (
                    <Button preset="link" onPress={onLeftPress}>
                        <Icon icon={leftIcon} />
                    </Button>
                ) : (
                    <View style={LEFT} />
                )}
                <View style={TITLE_MIDDLE}>
                    <Text size={md ? "h3" : "h4"} style={{ ...titleStyle }}>
                        {header}
                    </Text>
                </View>
                {rightIcon ? (
                    <Button preset="link" onPress={onRightPress}>
                        <Icon icon={rightIcon} />
                    </Button>
                ) : (
                    <View style={RIGHT} />
                )}
            </View>
        </View>
    )
}
