import React from "react"
import Icon from "react-native-vector-icons/MaterialIcons"
import { View, StyleSheet } from "react-native"
import { Text } from "../../components"

interface BulletListProps {
    items: string[]
    id: string
    textSize?: string,
    
}

const BulletList: React.FC<BulletListProps> = ({ items = [], id, textSize = "h5" }) => {
    return (
        <View style={styles.container}>
            {items.map((item, index) => (
                <View style={styles.listItem} key={`bullet-list-item__${id}-${index}`}>
                    <Icon size={12} name="lens" style={styles.bulletIcon} />
                    <View>
                        <Text size={textSize}>{item}</Text>
                        {/* <Text size={textSize} color="gray">{item}</Text> */}
                    </View>
                </View>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    bulletIcon: { marginRight: 10 },
    container: { paddingHorizontal: "10%", paddingVertical: "3%" },
    listItem: { alignItems: "center", flexDirection: "row", marginVertical: 5 },
})

export default BulletList
