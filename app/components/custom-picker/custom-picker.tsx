/* eslint-disable react-native/no-color-literals */
import React from "react"
import { View, StyleSheet, ViewStyle } from "react-native"
import { Text } from "../text/text"
import { Picker } from "@react-native-community/picker"

interface CustomPickerProps {
    label?: string
    labelSize?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small"
    selectedValue: string | number
    onChange: (value: string) => any
    options: { label: string; value: string | number }[]
    defaultFirstItem?: string
    defaultFirstItemValue?: string
    accessibilityLabel?: string
    width?: number
    height?: number
    containerStyle?: ViewStyle
}

const CustomPickerNoMemo: React.FC<CustomPickerProps> = ({
    label,
    labelSize = "h5",
    selectedValue,
    onChange,
    options,
    accessibilityLabel = "",
    defaultFirstItem,
    defaultFirstItemValue,
    width,
    height,
    containerStyle = {},
}) => {
    return (
        <>
            {label && (
                <Text size={labelSize} style={{ marginBottom: 6 }}>
                    {label}
                </Text>
            )}
            <View
                style={[
                    styles.pickerContainer,
                    containerStyle,
                    width && { width },
                    height && { height },
                ]}
            >
                <Picker
                    selectedValue={selectedValue}
                    // style={{  }}
                    onValueChange={onChange}
                    accessibilityLabel={accessibilityLabel}
                    focusable
                    testID="customPicker"
                    mode="dialog"
                >
                    {options.map(({ label, value }) => (
                        <Picker.Item
                            label={label}
                            testID={`option_${label}`}
                            key={label}
                            value={value}
                        />
                    ))}

                    {/* Render the default item last to avoid indexing issues */}
                    {defaultFirstItem && (
                        <Picker.Item
                            color="gray"
                            label={defaultFirstItem}
                            value={defaultFirstItemValue}
                        />
                    )}
                </Picker>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    pickerContainer: {
        backgroundColor: "#F3F3F3",
        borderColor: "#A8A8A8",
        borderRadius: 5,
        borderWidth: 0.5,
        color: "rgba(0, 0, 0, 0.32)",
        justifyContent: "center",
        paddingHorizontal: 4,
        // paddingVertical: "auto",
    },
})

export const CustomPicker = React.memo(CustomPickerNoMemo, (prevProps, nextProps) => {
    return prevProps.selectedValue === nextProps.selectedValue
})

export default CustomPicker

// FIXME: add support for the passed in value to be an empty string or null or undefined
// This allows the initial value to not be defined and prevent rendering any item that looks to be
// selected incorrectly
