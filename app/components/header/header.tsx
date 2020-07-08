import * as React from "react"
import { View, ViewStyle, TextStyle } from "react-native"
import { HeaderProps } from "./header.props"
import { Button } from "../button/button"
import { Text } from "../text/text"
import { Icon } from "../icon/icon"
import { spacing, color } from "../../theme"
import { translate } from "../../i18n/"
import { palette } from "../../theme/palette"

// static styles
const ROOT: ViewStyle = {
    flexDirection: "row",
    paddingHorizontal: spacing[0],
    alignItems: "center",
    paddingTop: spacing[5],
    paddingBottom: spacing[2],
    marginBottom: spacing[4],
    marginRight: spacing[2],
    marginLeft: spacing[2],
    justifyContent: "flex-start",
    borderBottomWidth: 1,
    borderBottomColor: color.palette.lighterGrey,
}
const TITLE: TextStyle = { textAlign: "center" }
const TITLE_MIDDLE: ViewStyle = { flex: 1, justifyContent: "flex-start" }
const LEFT: ViewStyle = { width: 0 }
const RIGHT: ViewStyle = { width: 0 }

/**
 * Header that appears on many screens. Will hold navigation buttons and screen title.
 */
export const Header: React.FunctionComponent<HeaderProps> = props => {
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
        <View style={{ ...ROOT, ...style }}>
            {leftIcon ? (
                <Button preset="link" onPress={onLeftPress}>
                    <Icon icon={leftIcon} />
                </Button>
            ) : (
                <View style={LEFT} />
            )}
            <View style={TITLE_MIDDLE}>
                <Text style={{ ...TITLE, ...titleStyle }} size="h3" text={header} />
            </View>
            {rightIcon ? (
                <Button preset="link" onPress={onRightPress}>
                    <Icon icon={rightIcon} />
                </Button>
            ) : (
                <View style={RIGHT} />
            )}
        </View>
    )
}
