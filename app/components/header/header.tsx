/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import * as React from "react"
import { View, ViewStyle, TextStyle, StatusBar } from "react-native"
import Icon from "react-native-vector-icons/MaterialIcons"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"

// import { Icon } from "../icon/icon"
import { Text } from "react-native-paper"

import { spacing, color, md } from "../../theme"
import { translate } from "../../i18n/"
import { palette } from "../../theme/palette"

// static styles
const ROOT: ViewStyle = {
    flexDirection: "row",
    paddingHorizontal: spacing[0],
    alignItems: "center",
    paddingTop: spacing[0],
    paddingBottom: spacing[2],
    marginBottom: spacing[4],
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
    const header = headerText || (headerTx && translate(headerTx)) || ""

    return (
        <View
            style={{
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                // shadowOpacity: 0,
                // shadowRadius:0,
                elevation: 1,
               
            }}
        >
            <StatusBar backgroundColor={color.palette.black} />
            <View
                style={{
                    ...RIGHT_ICON_CONTAINER,
                    paddingHorizontal: md ? 36 : 12,
                    paddingTop: md ? 18 : 12,
                }}
            >
                <Icon name="menu" size={32} color={color.black} />
            </View>
            <View style={{ ...ROOT, ...style, paddingHorizontal: md ? 24 : 12 }}>
                {leftIcon ? (
                    <Button preset="link" onPress={onLeftPress}>
                        <Icon icon={leftIcon} />
                    </Button>
                ) : (
                    <View style={LEFT} />
                )}
                <View style={TITLE_MIDDLE}>
                    <Text style={{ ...TITLE, ...titleStyle }}>{header}</Text>
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
