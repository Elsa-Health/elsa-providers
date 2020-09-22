import React from "react"
import { Pressable, StyleSheet, View, ViewStyle } from "react-native"
import { Card as PaperCard } from "react-native-paper"
import { color } from "../../theme"
import DashboardItem from "../dashboard-item/dashboard-item"
import { Text } from "../text/text"

// import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"

import { TextProps } from "../text/text.props"
import { TouchableOpacity } from "react-native-gesture-handler"

interface CardProps {
    containerStyle?: ViewStyle
    title?: string
    titleSize?: TextProps["size"]
    leftIcon?: string
    right?: string
    collapsible?: boolean
}

const Card: React.FC<CardProps> = ({
    title,
    containerStyle = {},
    leftIcon,
    collapsible,
    children,
    right,
}) => {
    const [collapsed, setCollapsed] = React.useState(false)
    const rightCollapseIconName = collapsed ? "chevron-down" : "chevron-up"
    return (
        <PaperCard
            style={[styles.containerStyle, containerStyle, collapsed && { paddingBottom: 14 }]}
        >
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingLeft: 14,
                    paddingRight: 16,
                    paddingTop: 20,
                    display: leftIcon || title ? "flex" : "none",
                }}
            >
                <View
                    style={{
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        display: leftIcon || title ? "flex" : "none",
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
                            <Text bold size="h5">
                                {title}
                            </Text>
                        </View>
                    )}
                    {right && <Text size="h5">{right}</Text>}
                </View>

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
            {!collapsed && (
                <PaperCard.Content style={styles.cardContent}>{children}</PaperCard.Content>
            )}
        </PaperCard>
    )
}

const styles = StyleSheet.create({
    cardContent: { paddingTop: 12 },
    containerStyle: { marginVertical: 4 },
})

export { Card }
