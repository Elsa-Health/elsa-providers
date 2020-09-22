import { TextInputProps, TextStyle, ViewStyle } from "react-native"

export interface TextInputsProps extends TextInputProps {
    /**
     * The Titlte on tup of inputs
     */
    title?: string

    /**
     * The Placeholder text
     */
    placeholder?: string

    /**
     * The label text
     */
    label?: string

    /**
     * Optional container style overrides useful for margins & padding.
     */
    style?: ViewStyle | ViewStyle[]

    /**
     * Optional style overrides for the input.
     */

    keyboardType?: any // to be fiex
    multiline?: boolean
    rows?: number

    /**
     * Text below the input as warning or error
     */
    notification?: string
    error: boolean
    warning: boolean

    value: string
    onChangeText: () => {}
}
