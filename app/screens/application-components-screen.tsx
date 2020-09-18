// THIS File HOLDS ALL THE COMPONENTS
// THE COMPONENTS ARE TO BE MOVED TO SEPARATE FILES AS SPECIFIED IN STYLE GUIDE
// THEY ARE KEPT HERE TO SPEED UP DEVELOPEENT PROCESS

import React, { Children, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity, View, TouchableOpacityBase } from "react-native"
import { FAB, TextInput } from "react-native-paper"
import { Screen, Text, Row, Col, Notification, Button, Card, SymptomsPicker } from "../components"
import DrugsNurse from "../assets/icons/drugs-nurse.svg"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, style as styles } from "../theme"
import { any } from "ramda"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { ScrollView } from "react-native-gesture-handler"
import Spacer from "../components/spacer/spacer"
import DashboardItem from "../components/dashboard-item/dashboard-item"

const ROOT: ViewStyle = {
    // backgroundColor: color.palette.black,
    paddingVertical: 12,
}

const DEFAULTS: ViewStyle | TextStyle = {
    borderRadius: 5,
    marginVertical: 12,
}

const SECTION: ViewStyle = {
    paddingVertical: 36,
}

// TODO :  add changable style here

function Divider() {
    return <View style={{ backgroundColor: color.dim, width: "100%", height: 1 }} />
}

const longText =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis perferendis, tempora hic possimus, voluptatum magnam ad neque nulla cum, unde dolores. A magni saepe dignissimos ratione accusamus recusandae error commodi!"

// currently using material icons only

function Icon({ name, color, size, style }) {
    return (
        <MaterialIcon
            name={name}
            size={size}
            color={color}
            style={[{ height: size, width: size }, style]}
        />
    )
}

// to be renamed when found right name now ËlsaTextInput
// title for the inputs with some title in it

// to be implemented by 16th morning
function ElsaPicker() {
    return null
}

function ElsaQuestion() {
    return null
}

function ElsaDatePicker() {
    return null
}

function ElsaSymptomSearch() {
    return null
}

function ElsaCheckBox() {
    return null
}

function ElsaTextInput({
    label = "",
    placeholder = "",
    style,
    title,
    keyboardType,
    multiline = false,
    rows = 1,
    onChangeText = () => {},
}) {
    return (
        <View>
            {title && (
                <View style={{ marginVertical: 8 }}>
                    <Text size="h6">{title}</Text>
                </View>
            )}
            <TextInput
                label={label}
                placeholder={placeholder}
                // value={state.telephone}
                onChangeText={onChangeText}
                mode="outlined"
                keyboardType={keyboardType}
                multiline={multiline}
                numberOfLines={rows}
                // placeholder="Namba ya simu"
                style={[!multiline && styles.input, style]}
                underlineColor="transparent"
                theme={{ colors: { primary: color.primary } }}
            />
        </View>
    )
}

export const ApplicationComponentsScreen = () => {
    const demoOnpress = () => {
        console.log("on press clicked")
    }
    return (
        <Screen style={ROOT} preset="scroll" title="All components">
            <Row>
                {/* Panel Components */}
                {/* <Col md={12}>
                    <Panel>
                        <Text size="h6">Panel</Text>
                    </Panel>
                </Col> */}

                <Col md={12} colStyles={SECTION}>
                    <Text size="h3">Text</Text>
                    <Spacer size={5} />
                    <Text size="small">small: The quick brown fox jumps over the lazy dog</Text>
                    <Spacer size={5} />
                    <Text size="h6" ellipsizeMode="tail" numberOfLines={1}>
                        h6: The quick brown fox jumps over the lazy dog
                    </Text>
                    <Spacer size={5} />
                    <Text size="h5" ellipsizeMode="tail" numberOfLines={1}>
                        h5: The quick brown fox jumps over the lazy dog
                    </Text>
                    <Spacer size={5} />
                    <Text size="h4" ellipsizeMode="tail" numberOfLines={1}>
                        h4: The quick brown fox jumps over the lazy dog
                    </Text>
                    <Spacer size={5} />
                    <Text size="h3" ellipsizeMode="tail" numberOfLines={1}>
                        h3: The quick brown fox jumps over the lazy dog
                    </Text>
                    <Spacer size={5} />
                    <Text size="h2" ellipsizeMode="tail" numberOfLines={1}>
                        h2: The quick brown fox jumps over the lazy dog
                    </Text>
                    <Spacer size={5} />
                    <Text size="h1" ellipsizeMode="tail" numberOfLines={1}>
                        h1: The quick brown fox jumps over the lazy dog
                    </Text>
                    <Spacer size={5} />
                    <Text bold size="h6">
                        bold: The quick brown fox jumps over the lazy dog
                    </Text>
                    <Spacer size={5} />
                    <Text italic size="h6">
                        italic: The quick brown fox jumps over the lazy dog
                    </Text>
                    <Spacer size={5} />
                    <Text italic bold size="h6">
                        bold, italic: The quick brown fox jumps over the lazy dog
                    </Text>
                </Col>

                <Divider />

                <Col md={12} colStyles={SECTION}>
                    <Text size="h3">Buttons</Text>
                    <Button
                        onPress={() => null}
                        label="Button with Icon"
                        labelSize="h6"
                        mode="text"
                        withArrow={true}
                    />
                    <Button
                        onPress={() => null}
                        label="Contained with Icon"
                        labelSize="h6"
                        mode="contained"
                        withArrow={true}
                    />
                    <Button
                        onPress={() => null}
                        label="Contained full width"
                        labelSize="h6"
                        mode="contained"
                    />
                    <Button
                        onPress={() => null}
                        label="Outlined full width"
                        labelSize="h6"
                        mode="outlined"
                    />
                    <Button
                        onPress={() => null}
                        label="Text only full width"
                        labelSize="h6"
                        mode="text"
                    />
                    <Button
                        onPress={() => null}
                        label="Override styles"
                        labelSize="h6"
                        backgroundColor="green"
                        mode="outlined"
                    />

                    <View style={{ flexDirection: "row" }}>
                        <FAB icon="plus" />
                        <Spacer horizontal size={20} />
                        <FAB icon="tow-truck" />
                        <Spacer horizontal size={20} />
                        <FAB
                            style={{ backgroundColor: color.white }}
                            color={color.primary}
                            icon="table-edit"
                        />
                    </View>
                </Col>

                <Divider />

                <Col md={12} colStyles={SECTION}>
                    <Text size="h3">Notifications</Text>
                    <Notification variation="info" title="Info" onPress={demoOnpress}>
                        <Text size="h6">
                            <Text bold size="h6">
                                Status:{" "}
                            </Text>
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut voluptas
                            porro dignissimos? Totam, ipsa accusantium? Similique, quasi reiciendis
                            consectetur, odit impedit.
                        </Text>
                    </Notification>
                    <Notification variation="warning" title="Warning">
                        <Text size="h6">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut voluptas
                            porro dignissimos? Totam, ipsa accusantium? Similique, quasi reiciendis
                            consectetur, odit impedit.
                        </Text>
                    </Notification>
                    <Notification variation="danger" title="Danger">
                        <Text size="h6">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut voluptas
                            porro dignissimos? Totam, ipsa accusantium? Similique, quasi reiciendis
                            consectetur, odit impedit.
                        </Text>
                    </Notification>
                    <Notification variation="note">
                        <Text size="h6">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ut voluptas
                            porro dignissimos? Totam, ipsa accusantium? Similique, quasi reiciendis
                            consectetur, odit impedit.
                        </Text>
                    </Notification>
                </Col>

                <Divider />

                <Col md={12} colStyles={SECTION}>
                    <Text size="h3">Cards</Text>
                    <Card>
                        <Text>I am just a simple panel</Text>
                    </Card>

                    <Card leftIcon="account" title="Card Title">
                        <Text>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis ab
                            adipisci magnam doloremque dolores mollitia? Autem, iure hic dicta
                            tempore nisi praesentium quisquam quas ipsam debitis officia blanditiis
                            odit saepe.
                        </Text>
                    </Card>

                    <Card leftIcon="tow-truck" title="Collapsible Card" collapsible>
                        <Text>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Officiis ab
                            adipisci magnam doloremque dolores mollitia? Autem, iure hic dicta
                            tempore nisi praesentium quisquam quas ipsam debitis officia blanditiis
                            odit saepe.
                        </Text>
                    </Card>

                    <DashboardItem
                        title="Main Dashboard Card"
                        icon={<DrugsNurse width="130" height="130" />}
                        actionText="Begin New Assessment"
                        description="Assess your patients’ symptoms to understand more about their health and receive valuable insights for next steps to take."
                        route="ctc-qrcode-scan-screen"
                    />
                </Col>

                <Divider />

                <Col md={12} colStyles={SECTION}>
                    <Text size="h3">Symptoms Picker</Text>

                    <SymptomsPicker />
                </Col>

                <Divider />
                <Col md={12} colStyles={DEFAULTS}>
                    <Card>
                        <ElsaTextInput
                            label="Label"
                            placeholder="08282"
                            keyboardType="phone-pad"
                            // title="Some Title"
                        />

                        <ElsaTextInput
                            label="Label"
                            placeholder="08282"
                            keyboardType="phone-pad"
                            title="Some Title"
                            multiline={true}
                            rows={5}
                        />
                    </Card>
                </Col>

                {/* <Col md={12} colStyles={DEFAULTS}>
                    <ElsaCard icon="email" expandable={false} title="Card Title">
                        <Text>Card content here</Text>
                    </ElsaCard>
                </Col> */}
            </Row>
        </Screen>
    )
}
