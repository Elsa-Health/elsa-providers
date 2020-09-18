import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { Card } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialIcons"

import { style, md, color } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { Text } from "../text/text"
import Spacer from "../spacer/spacer"
import { Button } from "../button/button"

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
                    <Text bold size="h5">
                        {title}
                    </Text>

                    <Spacer size={10} />
                    <Text>{description}</Text>

                    <View style={{ flexDirection: "row" }}>
                        <Button
                            onPress={navigateTo}
                            contentStyle={styles.cardAction}
                            style={{ marginLeft: -15 }}
                            labelSize="default"
                            withArrow
                            mode="text"
                            label={actionText.toUpperCase()}
                        />
                    </View>
                </View>
                {hasIcon && (
                    <View style={styles.imageContainer}>
                        {icon !== undefined ? (
                            icon
                        ) : (
                            <Image
                                resizeMode="contain"
                                style={styles.image}
                                testID="itemImage"
                                source={iconSource}
                            />
                        )}
                    </View>
                )}
            </Card.Content>
            {/* <Card.Actions>
                <Button
                    onPress={navigateTo}
                    contentStyle={styles.cardAction}
                    mode="text"
                    icon={() => (
                        <Icon name="arrow-forward" size={18} style={{ color: color.primary }} />
                    )}
                    label={actionText.toUpperCase()}
                />
            </Card.Actions> */}
        </Card>
    )
}

const styles = StyleSheet.create({
    cardAction: { paddingLeft: 0, marginLeft: 0 },
    cardContent: { flexDirection: "row" },
    containerCard: { marginTop: 16, padding: 0 },
    image: {
        height: 100,
        width: "100%",
    },
    imageContainer: {
        alignContent: "center",
        alignItems: "center",
        flex: 1.2,
        justifyContent: "center",
    },
})

export default DashboardItem
