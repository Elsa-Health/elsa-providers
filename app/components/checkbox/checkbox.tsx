import * as React from "react"
import { TouchableOpacity, TextStyle, ViewStyle, View } from "react-native"
import { Text } from "../text/text"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { color, sm, spacing, xs } from "../../theme"
import { CheckboxProps } from "./checkbox.props"
import { mergeAll, flatten } from "ramda"

const ROOT: ViewStyle = {
    flexDirection: "row",
    paddingVertical: spacing[1],
    alignSelf: "flex-start",
}

const DIMENSIONS = { width: 16, height: 16 }

const OUTLINE: ViewStyle = {
    ...DIMENSIONS,
    marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: color.primary,
    borderRadius: 1,
}

const FILL: ViewStyle = {
    width: DIMENSIONS.width - 4,
    height: DIMENSIONS.height - 4,
    backgroundColor: color.primary,
}

const LABEL: TextStyle = { paddingLeft: spacing[2], flexWrap: "wrap" }

export function Checkbox(props: CheckboxProps) {
    const numberOfLines = props.multiline ? 0 : 1

    const rootStyle = mergeAll(
        flatten([
            ROOT,
            props.style,
            props.rtl && {
                flexDirection: "row-reverse",
                flexGrow: 1,
                justifyContent: "space-between",
                width: "100%",
            },
        ]),
    )
    const outlineStyle = mergeAll(flatten([OUTLINE, props.outlineStyle]))
    const fillStyle = mergeAll(flatten([FILL, props.fillStyle]))

    const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null

    const iconName = props.value ? "checkbox-marked" : "checkbox-blank-outline"

    return (
        <TouchableOpacity
            activeOpacity={0.5}
            disabled={!props.onToggle}
            onPress={onPress}
            style={rootStyle}
        >
            {/* FIXME: Replace fill with a checkmark */}
            <MaterialIcon size={24} name={iconName} color={color.primary} />
            <View style={{ flex: 1 }}>
                <Text
                    text={props.text}
                    size={props.textSize || (sm ? "default" : "h6")}
                    tx={props.tx}
                    numberOfLines={numberOfLines}
                    style={LABEL}
                />
                {props.secondaryText && <Text color="gray">&nbsp;&nbsp;{props.secondaryText}</Text>}
            </View>
        </TouchableOpacity>
    )
}
