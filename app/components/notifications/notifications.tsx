/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { StyleSheet, TouchableOpacity, View } from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { Col, Row, Text } from ".."
import { adjustColor } from "../../common/utils"
import { color } from "../../theme"
import { palette } from "../../theme/palette"

interface NotificationProps {
    variation: "info" | "warning" | "danger" | "note"
    title?: string
    visible?: boolean
    marginVertical?: Number
    onPress?: () => any
}

const Notification: React.FC<NotificationProps> = ({
    variation,
    title,
    visible,
    marginVertical,
    onPress,
    children,
}) => {
    const backgroundColor = (() => {
        switch (variation) {
            case "info":
                return adjustColor(color.primary, 175)
            case "warning":
                return adjustColor(color.warning, 240)
            case "danger":
                return adjustColor(color.error, 195)
            case "note":
                return adjustColor(color.offWhiteBackground, 15)
        }
    })()
    const themeColor = (() => {
        switch (variation) {
            case "info":
                return color.primary
            case "warning":
                return color.warning
            case "danger":
                return color.error
            case "note":
                return color.dim
        }
    })()

    const iconName = (() => {
        switch (variation) {
            case "info":
                return "info"
            case "warning":
                return "warning"
            case "danger":
                return "error"
            case "note":
                return "note"
        }
    })()

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                borderWidth: 1,
                borderRadius: 5,
                borderColor: themeColor,
                padding: 14,
                paddingVertical: 18,
                backgroundColor: backgroundColor,
                display: visible ? "flex" : "none",
                //  opacity:0.1
                marginVertical: marginVertical || 8,
            }}
        >
            <Row
                styles={{
                    alignItems: "center",
                    display: variation === "note" ? "none" : "flex",
                }}
            >
                <MaterialIcon name={iconName} color={themeColor} size={30} />

                {title && (
                    <Text size="h6" bold style={{ color: themeColor, marginLeft: 15 }}>
                        {title}
                    </Text>
                )}
            </Row>
            {children && (
                <Row>
                    <Col md={12} colStyles={{ marginTop: 5 }}>
                        {children}
                    </Col>
                </Row>
            )}
        </TouchableOpacity>
    )
}

export { Notification }
