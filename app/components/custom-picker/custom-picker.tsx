/* eslint-disable react-native/no-color-literals */
import React from "react"
import { View, StyleSheet } from "react-native"
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
}) => {
    return (
        <>
            {label && (
                <Text size={labelSize} style={{ marginBottom: 6 }}>
                    {label}
                </Text>
            )}
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={selectedValue}
                    onValueChange={onChange}
                    accessibilityLabel={accessibilityLabel}
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
        borderRadius: 1,
        borderWidth: 0.5,
        color: "rgba(0, 0, 0, 0.32)",
        paddingHorizontal: 4,
        paddingVertical: 4,
    },
})

const CustomPicker = React.memo(CustomPickerNoMemo, (prevProps, nextProps) => {
    return prevProps.selectedValue === nextProps.selectedValue
})

export default CustomPicker
