import * as React from "react"
import { Text as ReactNativeText } from "react-native"
import EStyleSheet from "react-native-extended-stylesheet"
import { presets } from "./text.presets"
import { TextProps } from "./text.props"
import { translate } from "../../i18n"
import { mergeAll, flatten } from "ramda"
import { color, sm, xs } from "../../theme"
import { useLocale } from "../../models/language"

const styles = EStyleSheet.create({
    h1: {
        fontSize: "3rem",
    },
    h2: {
        fontSize: "2.5rem",
    },
    h3: {
        fontSize: "2rem",
    },
    h4: {
        fontSize: "1.6rem",
    },
    h5: {
        fontSize: "1.4rem",
    },
    h6: {
        fontSize: "1.2rem",
    },
    h7: {
        fontSize: "0.9rem",
    },
    small: {
        fontSize: "0.8rem",
    },
    default: {
        // lineHeight: 16,
        fontSize: sm ? "0.95rem" : "1.09rem",
    },
    left: {
        textAlign: "left",
    },
    right: {
        textAlign: "right",
    },
    center: {
        textAlign: "center",
    },
    justify: {
        textAlign: "justify",
    },
    white: {
        color: "white",
    },
    primary: {
        color: color.primary,
    },
    gray: {
        color: color.dim,
    },
    angry: {
        color: color.error,
    },
    italic: {
        // fontStyle: "italic",
        fontFamily: "AvenirLTStd-LightOblique",
    },
    bold: {
        fontFamily: "AvenirLTStd-Heavy",
    },
    boldItalic: {
        fontFamily: "AvenirLTStd-HeavyOblique",
    },
})

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function Text(props: TextProps) {
    // grab the props
    const {
        preset = "default",
        txOptions,
        text,
        children,
        style: styleOverride,
        size = "default",
        align = "left",
        color = "default",
        italic,
        bold,
        letterSpacing = 0,
        lineHeight = 0,
        tx,
        ...rest
    } = props

    const locale = useLocale((state) => state.locale)

    // figure out which content to use
    const i18nText = tx && translate(tx, { locale, ...txOptions })
    const content = i18nText || text || children

    const style = mergeAll(flatten([presets[preset] || presets.default, styleOverride]))
    const fontFormat = () => {
        if (bold && italic) {
            return "AvenirLTStd-HeavyOblique"
        }
        if (bold) {
            return "AvenirLTStd-Heavy"
        }
        if (italic) {
            return "AvenirLTStd-Oblique"
        }
        return "AvenirLTStd-Roman"
    }

    return (
        <ReactNativeText
            {...rest}
            style={[
                style,
                styles[color],
                styles[size],
                styles[align],
                { fontFamily: fontFormat(), letterSpacing },
                lineHeight > 0 && { lineHeight },
                // italic && styles.italic,
                // bold && styles.bold,
            ]}
        >
            {content}
        </ReactNativeText>
    )
}
