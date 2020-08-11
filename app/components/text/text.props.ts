import { TextStyle, TextProps as TextProperties } from "react-native"
import { TextPresets } from "./text.presets"

export interface TextProps extends TextProperties {
    /**
     * Children components.
     */
    children?: React.ReactNode

    /**
     * Text which is looked up via i18n.
     */
    tx?: string

    /**
     * Optional options to pass to i18n. Useful for interpolation
     * as well as explicitly setting locale or translation fallbacks.
     */
    txOptions?: object

    /**
     * The text to display if not using `tx` or nested components.
     */
    text?: string

    /**
     * An optional style override useful for padding & margin.
     */
    style?: TextStyle | TextStyle[]

    /**
     * One of the different types of text presets.
     */
    preset?: TextPresets

    /**
     * One of the different sizes of text.
     */
    size?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "small"

    /**
     * One of the different alignments of text.
     */
    align?: "left" | "right" | "center" | "justify"

    /**
     * Colors the text can take
     */
    color?: "white" | "primary"

    /**
     * Colors the text can take
     */
    italic?: boolean
}
