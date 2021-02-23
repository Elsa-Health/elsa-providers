import React from "react"
import { View } from "react-native"
import { TextInput as PaperTextInput } from "react-native-paper"
import { Text } from "../"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, style as styles } from "../../theme"

import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { TextInputsProps } from "./text-input.props"
import { useLocale } from "../../models/language"
import { translate } from "../../i18n"

export const TextInput: React.FunctionComponent<TextInputsProps> = (props) => {
    const {
        label = "",
        labelTx,
        placeholder = "",
        style,
        title,
        keyboardType,
        multiline = false,
        rows = 1,
        //  this to be renamed once good name for error or warning message is found
        // also can be replaced if color for inputs are to be applied for error  or warning
        notification = "",
        error,
        warning,
        onChangeText,
        ...rest
    } = props
    // const [isErrorOrWarning, setIsErrorOrWarning] = useState(false)
    const themeColor = (() => {
        if (error) return color.error
        if (warning) return color.warning
        return color.primary
    })()

    const locale = useLocale((state) => state.locale)

    const labelText = translate(labelTx, { locale }) || label

    return (
        <View>
            {title && (
                <View style={{ marginVertical: 8 }}>
                    <Text size="h6">{title}</Text>
                </View>
            )}
            <PaperTextInput
                label={labelText}
                placeholder={placeholder}
                onChangeText={onChangeText}
                mode="outlined"
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={rows}
                style={[{ borderColor: themeColor }, style]}
                // option to show the them color

                underlineColor="transparent"
                // this can change if the are to be applied to the borders only
                // currenly is the for example its error input, even the cursor changes to color.error color
                // theme={{ colors: { primary: themeColor } }}
                theme={{
                    colors:
                        error || warning
                            ? { primary: themeColor, text: color.primary }
                            : { primary: color.primary },
                }}
                {...rest}
            />

            {/* optional if would love to display error message */}

            {error || warning ? (
                <Text
                    size="small"
                    style={{
                        color: warning ? color.warning : color.error,
                    }}
                >
                    <MaterialIcon
                        name="info"
                        style={{ marginTop: 100 }}
                        size={12}
                        color={themeColor}
                    />
                    {notification}
                </Text>
            ) : null}
        </View>
    )
}
