import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { Text } from "../text/text"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { Button as PaperButton } from "react-native-paper"
import { TextProps } from "../text/text.props"
import Spacer from "../spacer/spacer"

type PaperButtonProps = React.ComponentProps<typeof PaperButton>

type ButtonProps = Omit<PaperButtonProps, "children" | "color"> & {
    withArrow?: boolean
    backgroundColor?: string
    labelSize?: TextProps["size"]
    labelColor?: TextProps["color"]
    label: string
    labelTx?: string
    style?: ViewStyle
    arrowLeftSpace?: number
}

const Button: React.FC<ButtonProps> = React.memo(
    ({
        withArrow,
        backgroundColor,
        onPress,
        label,
        labelSize = "h6",
        labelColor,
        labelTx,
        style,
        arrowLeftSpace = 40,
        ...rest
    }) => {
        const btnLabelColor = (() => {
            if (labelColor && typeof labelColor === "string") {
                return labelColor
            }

            if (rest.mode === "contained" || backgroundColor) {
                return "white"
            }

            return "primary"
        })()

        return (
            <View style={withArrow ? styles.containerRow : styles.containerColumn}>
                <PaperButton
                    onPress={onPress}
                    uppercase={false}
                    style={[style || {}, backgroundColor ? { backgroundColor } : {}]}
                    {...rest}
                >
                    <Text tx={labelTx} style={styles.text} color={btnLabelColor} size={labelSize}>
                        {label}
                    </Text>

                    {withArrow && (
                        <>
                            <Spacer horizontal size={arrowLeftSpace} />{" "}
                            <MaterialIcon name="arrow-right" size={20} />
                        </>
                    )}
                </PaperButton>
            </View>
        )
    },
    (prevProps, nextProps) => {
        return (
            prevProps.disabled === nextProps.disabled &&
            prevProps.label === nextProps.label &&
            prevProps.onPress === nextProps.onPress
        )
    },
)

const styles = StyleSheet.create({
    containerColumn: { flexDirection: "column", paddingVertical: 6 },
    containerRow: { flexDirection: "row", paddingVertical: 6 },
    text: { marginRight: 40 },
})

export { Button }
