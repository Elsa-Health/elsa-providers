// THIS File HOLDS ALL THE COMPONENTS
// THE COMPONENTS ARE TO BE MOVED TO SEPARATE FILES AS SPECIFIED IN STYLE GUIDE
// THEY ARE KEPT HERE TO SPEED UP DEVELOPEENT PROCESS

import React, { Children, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity, View, TouchableOpacityBase } from "react-native"
import { Card, Button, TextInput } from "react-native-paper"
import { Screen, Text, Row, Col, Notification } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, style as styles } from "../theme"
import { any } from "ramda"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { ScrollView } from "react-native-gesture-handler"
import Spacer from "../components/spacer/spacer"

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
    // marginTop: 36,
    // marginBottom: 36,
    // borderTopColor: color.dim,
    // borderTopWidth: 1,
    // borderBottomColor: color.dim,
    // borderBottomWidth: 1,
}

const CARD_STYLE: ViewStyle = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.1,
    // shadowRadius: 3.84,
    elevation: 1,
    backgroundColor: color.palette.white,
    ...DEFAULTS,
}

// TODO :  add changable style here
function Panel({ children }) {
    return (
        <Card style={CARD_STYLE}>
            <Card.Content>{children}</Card.Content>
        </Card>
    )
}

function Divider() {
    return <View style={{ backgroundColor: color.dim, width: "100%", height: 1 }} />
}

const longText =
    "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Omnis perferendis, tempora hic possimus, voluptatum magnam ad neque nulla cum, unde dolores. A magni saepe dignissimos ratione accusamus recusandae error commodi!"

type ElsaButtonProps = {
    block: boolean
    variation: string
    withArrow: boolean
    backgroundColor: string
    color: string
}

//refactoring to specify the types is required

//ommited color prop for now since we are having only buttons with two colros, white and primary color

const ElsaButton = ({
    block,
    variation,
    withArrow,
    backgroundColor,
    onPress = () => {
        console.log("Non passed")
    },
    style,
}) => {
    //planning to figure out all the styles here
    //to be refactored

    return (
        <Button
            contentStyle={{ flexDirection: "row-reverse", paddingLeft: 8 }}
            icon={withArrow ? "arrow-right" : null}
            mode={variation}
            onPress={onPress}
            uppercase={false}
            //vertical margin bellow is kept just for testing purpose only
            style={[
                variation === "outlined" ? { borderWidth: 1, borderColor: color.primary } : {},
                { marginVertical: 8, ...style },
            ]}
        >
            <Text color={variation === "contained" ? "white" : "primary"} size="h6">
                Press Me
            </Text>
        </Button>
    )
}

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

/// TODO : add the expand logic
function ElsaCard({ children, title, icon, expandable, tooltip = false }) {
    const [expanded, setExpanded] = useState(false)
    return (
        <Panel>
            <Row>
                <Col md={1}>{icon && <Icon name={icon} size={36} color={color.primary} />}</Col>
                <Col md={10} colStyles={{ justifyContent: "center" }}>
                    <Text size="h5" bold italic>
                        {title}
                        {tooltip && (
                            <Icon
                                name="help"
                                size={28}
                                // eslint-disable-next-line react-native/no-inline-styles
                                style={{
                                    // backgroundColor: "yellow",
                                    marginLeft: 100,
                                }}
                                color={color.primary}
                            />
                        )}
                    </Text>
                </Col>
                {expandable && (
                    <Col md={1}>
                        <TouchableOpacity
                            onPress={() => {
                                setExpanded(!expanded)
                                //expand the card more here
                            }}
                        >
                            <Icon
                                name={expanded ? "expand-less" : "expand-more"}
                                size={36}
                                color={color.primary}
                            />
                        </TouchableOpacity>
                    </Col>
                )}
            </Row>
            <Row>
                <Col md={12} colStyles={{ marginTop: 8 }}>
                    {children}
                </Col>
            </Row>
        </Panel>
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
                    <ElsaButton variation="contained" withArrow={true} />
                    <ElsaButton variation="contained" />
                    <ElsaButton variation="outlined" withArrow={true} />
                    <ElsaButton variation="outlined" />
                    <ElsaButton variation="text" withArrow />
                    <ElsaButton variation="text" onPress={demoOnpress} />
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

                <Col md={12} colStyles={DEFAULTS}>
                    <Panel>
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
                    </Panel>
                </Col>

                <Col md={12} colStyles={DEFAULTS}>
                    <ElsaCard icon="email" expandable={false} title="Card Title">
                        <Text>Card content here</Text>
                    </ElsaCard>
                </Col>
            </Row>
        </Screen>
    )
}
