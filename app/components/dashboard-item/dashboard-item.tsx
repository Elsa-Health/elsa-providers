import React from "react"
import { View, Image, StyleSheet } from "react-native"
import { Card } from "react-native-paper"
import Icon from "react-native-vector-icons/MaterialIcons"

import { style, md, color, sm } from "../../theme"
import { useNavigation } from "@react-navigation/native"
import { Text } from "../text/text"
import Spacer from "../spacer/spacer"
import { Button } from "../button/button"
import { TextProps } from "../text/text.props"

export interface DashboardItemProps {
    title: string
    titleSize?: TextProps["size"]
    titleI18nKey?: string
    description: string
    descriptionSize?: TextProps["size"]
    descriptionI18nKey?: string
    actionText: string
    actionTextSize?: TextProps["size"]
    actionI18nKey?: string
    iconSource?: any
    icon?: React.ReactNode
    route?: string
    routeParams?: { [key: string]: string }
}

const DashboardItem: React.FC<DashboardItemProps> = ({
    title,
    titleSize = "h5",
    titleI18nKey,
    description,
    descriptionSize = "default",
    iconSource,
    icon,
    actionText,
    actionTextSize = "default",
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
                            paddingRight: 8,
                        }
                    }
                >
                    <Text tx={titleI18nKey} bold size={titleSize}>
                        {title}
                    </Text>

                    <Spacer size={10} />
                    <Text size={descriptionSize}>{description}</Text>

                    <View style={{ flexDirection: "row" }}>
                        <Button
                            onPress={navigateTo}
                            contentStyle={styles.cardAction}
                            style={{ marginLeft: -15 }}
                            labelSize={actionTextSize}
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
        // marginLeft: sm ? 10 : 0,
    },
})

export default DashboardItem
