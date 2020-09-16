// THIS File HOLDS ALL THE COMPONENTS
// THE COMPONENTS ARE TO BE MOVED TO SEPARATE FILES AS SPECIFIED IN STYLE GUIDE
// THEY ARE KEPT HERE TO SPEED UP DEVELOPEENT PROCESS

import React, { Children, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity, View, TouchableOpacityBase } from "react-native"
import { Card, Button, TextInput } from "react-native-paper"
import { Screen, Text, Row, Col } from "../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, style as styles } from "../theme"
import { any } from "ramda"
import MaterialIcon from "react-native-vector-icons/MaterialIcons"
import { ScrollView } from "react-native-gesture-handler"

const ROOT: ViewStyle = {
    // backgroundColor: color.palette.black,
    flex: 1,
    paddingVertical: 12,
}

const DEFAULTS: ViewStyle | TextStyle = {
    borderRadius: 5,
    marginVertical: 12,
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

// font sizes to be updated
// planning to add "body" size for content text
const Notification = ({ variation, title, onPress = () => {} }) => {
    // function hexToRgb(hex) {
    //     const bigint = parseInt(hex, 16)
    //     const r = (bigint >> 16) & 255
    //     const g = (bigint >> 8) & 255
    //     const b = bigint & 255

    //     return r + "," + g + "," + b
    // }

    // the values are either to be hardcoded or generated
    // if found in the design have to be hardcoded then
    // also background color variatios are to be picked
    const getBackgroundColor = () => {
        switch (variation) {
            case "info":
                return "#F2F4F7"
            case "warning":
                return "#FF8800"
            case "danger":
                return "red"
            case "notes":
                return color.primary
        }
    }
    const getTitleColor = () => {
        switch (variation) {
            case "info":
                return "#4665AF"
            case "warning":
                return "#FF8800"
            case "danger":
                return "red"
            case "notes":
                return color.primary
        }
    }

    const getIconName = () => {
        switch (variation) {
            case "info":
                return "info"
            case "warning":
                return "warning"
            case "danger":
                return "error"
            case "notes":
                return "notes"
        }
    }

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    borderWidth: 1,
                    borderRadius: 5,
                    borderColor: getTitleColor(),
                    padding: 14,
                    paddingVertical: 18,
                    // backgroundColor: getBackgroundColor(),
                    //  opacity:0.1
                    marginVertical: 12,
                }}
            >
                <Row>
                    <Col md={1}>
                        <Icon name={getIconName()} color={getTitleColor()} size={30} />
                    </Col>

                    {/* reducing default left space for the title and the icon */}
                    <Col md={10} colStyles={{ marginLeft: -15 }}>
                        {title && (
                            <Text size="h6" style={{ color: getTitleColor() }}>
                                {title}
                            </Text>
                        )}
                    </Col>
                    <Col md={12} colStyles={{ marginTop: 5 }}>
                        <Text size="h6" color="black">
                            Subtitle
                        </Text>
                    </Col>
                </Row>
            </View>
        </TouchableOpacity>
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
                    <Text size="h5" bold>
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
            {/* this is definitely a wrong place for the scrollview */}
            <ScrollView>
                <Row>
                    {/* Panel Components */}
                    <Col md={12}>
                        <Panel>
                            <Text size="h6">Panel</Text>
                        </Panel>
                    </Col>

                    <Col md={12} colStyles={DEFAULTS}>
                        <Panel>
                            <ElsaButton variation="contained" withArrow={true} />
                            <ElsaButton variation="contained" />
                            <ElsaButton variation="outlined" withArrow={true} />
                            <ElsaButton variation="outlined" />
                            <ElsaButton variation="text" withArrow />
                            <ElsaButton variation="text" onPress={demoOnpress} />
                        </Panel>
                    </Col>

                    <Col md={12} colStyles={DEFAULTS}>
                        <Panel>
                            <Notification variation="info" title="Info" onPress={demoOnpress} />
                            <Notification variation="warning" title="Warning" />
                            <Notification variation="danger" title="Danger" />
                            <Notification variation="danger" />
                        </Panel>
                    </Col>

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
            </ScrollView>
        </Screen>
    )
}
