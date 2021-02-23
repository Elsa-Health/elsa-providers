import React from "react"
import { Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { Card as PaperCard } from "react-native-paper"
import { color, sm } from "../../theme"
import { Text } from "../text/text"

import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
// import MaterialIcon from "react-native-vector-icons/MaterialIcons"

import { TextProps } from "../text/text.props"
import { TouchableOpacity } from "react-native-gesture-handler"
import Spacer from "../spacer/spacer"

interface CardProps {
    containerStyle?: ViewStyle
    marginVertical?: number
    title?: string
    titleSize?: TextProps["size"]
    leftIcon?: string
    rightItem?: string | React.Component
    collapsible?: boolean
    defaultCollapsed?: boolean
    elevation?: number
}

const Card: React.FC<CardProps> = ({
    title,
    marginVertical,
    containerStyle = {},
    leftIcon,
    collapsible,
    children,
    rightItem,
    defaultCollapsed,
    elevation = 2
}) => {
    const [collapsed, setCollapsed] = React.useState(defaultCollapsed || false)
    const rightCollapseIconName = collapsed ? "chevron-down" : "chevron-up"
    return (
        <PaperCard
            style={[
                styles.containerStyle,
                containerStyle,
                marginVertical && { marginVertical },
                // collapsed && { paddingBottom: 10 },
            ]}
            elevation={elevation}
        >
            {(leftIcon || title) && (
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingLeft: 14,
                        paddingRight: 16,
                        paddingTop: 20,
                    }}
                >
                    <View
                        style={{
                            flexDirection: "row",
                            flex: 2,
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        {leftIcon && (
                            <MaterialIcon
                                style={{ marginRight: 10 }}
                                size={24}
                                color={color.primary}
                                name={leftIcon}
                            />
                        )}
                        {title && (
                            <View style={{ flex: 1 }}>
                                <Text bold size={sm ? "default" : "h5"}>
                                    {title}
                                </Text>
                            </View>
                        )}
                    </View>

                    {(rightItem || collapsible) && (
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "flex-end" }}>
                            {rightItem && <Text size={sm ? "default" : "h5"}>{rightItem}</Text>}
                            {collapsible && (
                                <TouchableOpacity
                                    style={{ paddingHorizontal: 10 }}
                                    hitSlop={{ bottom: 15, left: 15, right: 15, top: 15 }}
                                    onPress={() => setCollapsed(!collapsed)}
                                >
                                    <MaterialIcon
                                        size={22}
                                        color={color.primary}
                                        name={rightCollapseIconName}
                                    />
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>
            )}
            {!collapsed && children ? (
                <PaperCard.Content style={styles.cardContent}>{children}</PaperCard.Content>
            ) : (
                <Spacer size={16} />
            )}
        </PaperCard>
    )
}

const styles = StyleSheet.create({
    cardContent: { paddingTop: 14, paddingRight: 26 },
    containerStyle: { marginVertical: 5, paddingHorizontal: sm ? 2 : 8 },
})

export { Card }
