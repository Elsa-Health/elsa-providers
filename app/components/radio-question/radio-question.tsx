import React from "react"
import { SYMPTOM_PRESENCE } from "../../common/constants"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import { RadioButton } from "react-native-paper"
import { style, color } from "../../theme"
import { Text } from "../text/text"
import { TextProps } from "../text/text.props"

interface RadioQuestionProps {
    question: string
    boldQuestion?: boolean
    questionSize?: TextProps["size"]
    value?: string | boolean
    onPress: (value: string | boolean) => any
    id: string
    marginVertical?: number
    orientation?: "horizontal" | "vertical"
    options?: { label: string; value: string | boolean }[]
    containerStyle?: StyleObj
}

// eslint-disable-next-line react/display-name
export const RadioQuestion: React.FC<RadioQuestionProps> = React.memo(
    ({
        question,
        boldQuestion,
        questionSize = "h5",
        value = "absent",
        onPress,
        id,
        marginVertical = 12,
        options = SYMPTOM_PRESENCE,
        orientation = "vertical",
        containerStyle,
    }) => {
        const horizontal = orientation === "horizontal"
        return (
            <View
                style={[
                    style.contentTextVerticalSpacing,
                    horizontal && styles.horizontalStyling,
                    { marginVertical },
                    containerStyle,
                ]}
            >
                <Text bold={boldQuestion} size={questionSize}>
                    {question}
                </Text>
                <View style={[style.headerTextContentVerticalSpacing, styles.optionsContainer]}>
                    {[...options].map((option) => (
                        <TouchableOpacity
                            key={`radio-option__${id}-${option.label}`}
                            onPress={() => onPress(option.value)}
                            style={styles.optionItem}
                        >
                            <RadioButton
                                value={option.value}
                                status={value === option.value ? "checked" : "unchecked"}
                                onPress={() => onPress(option.value)}
                                color={color.primary}
                            />
                            <Text size="h6">{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        )
    },
    (prevProps, nextProps) => prevProps.value === nextProps.value,
)

const styles = StyleSheet.create({
    horizontalStyling: {
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
    optionItem: {
        alignItems: "center",
        flexDirection: "row",
        marginRight: "6%",
        // marginRight: horizontal ? "4%" : "10%",
    },
    optionsContainer: {
        alignItems: "center",
        flexDirection: "row",
    },
})

export default RadioQuestion
