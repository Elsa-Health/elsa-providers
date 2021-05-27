import React from "react"
import { StyleSheet } from "react-native"
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons"
import { Row, Text } from ".."
import { fullFormatDate } from "../../common/utils"
import { color } from "../../theme"

const VisitDate: React.FC = () => (
    <Row
        justifyContent="space-between"
        alignItems="center"
        marginVertical={10}
        styles={{
            paddingRight: 10,
            borderBottomWidth: 1,
            paddingBottom: 16,
            borderBottomColor: "#E5E5E5",
            marginBottom: 10,
        }}
    >
        <Row>
            <MaterialIcon
                style={styles.icon}
                size={28}
                color={color.primary}
                name={"calendar-today"}
            />
            <Text tx="common.todaysDate" bold size="h6">
                Today's Date
            </Text>
        </Row>
        <Text text={fullFormatDate(new Date())} size="default" />
    </Row>
)

const styles = StyleSheet.create({
    icon: { marginRight: 10 },
})

export default React.memo(VisitDate)