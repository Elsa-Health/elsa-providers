import { ViewStyle } from "react-native"
import { TextProps } from "../text/text.props"

export interface CheckboxProps {
    /**
     * Additional container style. Useful for margins.
     */
    style?: ViewStyle | ViewStyle[]

    /**
     * Additional outline style.
     */
    outlineStyle?: ViewStyle | ViewStyle[]

    /**
     * Additional fill style. Only visible when checked.
     */
    fillStyle?: ViewStyle | ViewStyle[]

    /**
     * Is the checkbox checked?
     */
    value?: boolean

    /**
     * The text to display if there isn't a tx.
     */
    text?: string

    /**
     * The text to display under the text (dim).
     */
    secondaryText?: string

    /**
     * The text to display if there isn't a tx.
     */
    textSize?: TextProps["size"]

    /**
     * The i18n lookup key.
     */
    tx?: string

    /**
     * Multiline or clipped single line?
     */
    multiline?: boolean

    /**
     * Support right to left rendering (checkbox is show on the right)
     */
    rtl?: boolean

    /**
     * Fires when the user tabs to change the value.
     */
    onToggle?: (newValue: boolean) => void
}
