import React from "react"
import { View, StyleSheet } from "react-native"
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
    label: string
}

const Button: React.FC<ButtonProps> = ({
    withArrow,
    backgroundColor,
    onPress,
    label,
    labelSize = "h6",
    ...rest
}) => {
    return (
        <View style={withArrow ? styles.containerRow : styles.containerColumn}>
            <PaperButton
                onPress={onPress}
                uppercase={false}
                style={backgroundColor ? { backgroundColor } : {}}
                {...rest}
            >
                <Text
                    style={styles.text}
                    color={rest.mode === "contained" || backgroundColor ? "white" : "primary"}
                    size={labelSize}
                >
                    {label}
                </Text>

                {withArrow && (
                    <>
                        <Spacer horizontal size={40} />{" "}
                        <MaterialIcon name="arrow-right" size={20} />
                    </>
                )}
            </PaperButton>
        </View>
    )
}

const styles = StyleSheet.create({
    containerColumn: { flexDirection: "column", paddingVertical: 6 },
    containerRow: { flexDirection: "row", paddingVertical: 6 },
    text: { marginRight: 40 },
})

export { Button }
