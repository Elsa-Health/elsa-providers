import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { Card, Button, Text } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialIcons"

import { style, md, color } from "../../theme"
import { useNavigation } from "@react-navigation/native"

export interface DashboardItemProps {
    title: string
    description: string
    actionText: string
    iconSource?: any
    icon?: React.ReactNode
    route?: string
    routeParams?: { [key: string]: string }
}

const DashboardItem: React.FC<DashboardItemProps> = ({
    title,
    description,
    iconSource,
    icon,
    actionText,
    route,
    routeParams = {},
}) => {
    const navigation = useNavigation()

    const navigateTo = () => {
        if (route) navigation.navigate(route, routeParams)
        return null
    }
    const hasIcon = iconSource || icon
    return (
        <Card style={styles.containerCard}>
            <Card.Content style={styles.cardContent}>
                <View
                    style={
                        hasIcon && {
                            flex: 3,
                        }
                    }
                >
                    <Card.Title
                        title={title}
                        titleStyle={[
                            style.contentHeader,
                            { fontSize: md ? 22 : 18, marginLeft: -16 },
                        ]}
                    />
                    <Text style={style.bodyContent}>{description}</Text>
                </View>
                {hasIcon && (
                    <View
                        style={{
                            flex: 1.4,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        {icon !== undefined ? (
                            icon
                        ) : (
                            <Image
                                resizeMode="contain"
                                style={{
                                    width: "100%",
                                    height: 100,
                                }}
                                testID="itemImage"
                                source={iconSource}
                            />
                        )}
                    </View>
                )}
            </Card.Content>
            <Card.Actions>
                <Button
                    onPress={navigateTo}
                    contentStyle={styles.cardAction}
                    mode="text"
                    icon={() => (
                        <Icon name="arrow-forward" size={18} style={{ color: color.primary }} />
                    )}
                >
                    <Text style={[style.buttonText, { color: color.primary }]}>{actionText}</Text>
                </Button>
            </Card.Actions>
        </Card>
    )
}

const styles = StyleSheet.create({
    cardAction: { flexDirection: "row-reverse", paddingLeft: 8 },
    cardContent: { flexDirection: "row" },
    containerCard: { marginTop: 20, padding: 0 },
})

export default DashboardItem
