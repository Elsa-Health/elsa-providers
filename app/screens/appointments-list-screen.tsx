import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StatusBar, View, TouchableOpacity, Alert } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Agenda } from "react-native-calendars"
import auth from "@react-native-firebase/auth"
import { Screen, Text, Header } from "../components"
import { FAB, Button } from "react-native-paper"
import { useStores } from "../models/root-store"
import { color } from "../theme"
import R from "ramda"
import EStyleSheet from "react-native-extended-stylesheet"
import _ from "lodash"
import Icon from "react-native-vector-icons/MaterialIcons"

export interface AppointmentsListScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const ROOT: ViewStyle = {
    flex: 1,
}

const SIGNOUT_BTN = {
    alignSelf: "flex-end",
    paddingTop: 10,
    paddingRight: 20,
    zIndex: 100,
    position: "absolute",
}

const styles = EStyleSheet.create({
    fab: {
        position: "absolute",
        margin: 16,
        padding: 8,
        right: 0,
        bottom: 0,
    },
})

function friendlyFormatTimeBlock(block: number) {
    const h = block > 12 ? block - 12 : block
    const m = "00"
    const meridiem = block >= 12 ? "PM" : "AM"

    const nextH = h === 12 ? 1 : h + 1
    const nextMeridiem = block + 1 >= 12 ? "PM" : "AM"
    return `${h.toString().padStart(2, "0")}:${m} ${meridiem} - ${nextH}:${m} ${nextMeridiem}`
}

function emptyDatesGenerator(n = 14) {
    const items = {}
    _.times(n, n => n).forEach(n => {
        const date = new Date()
        date.setDate(date.getDate() + n)
        const dayValue =
            Math.random() > 0.5
                ? [
                      { appointments: 12, timeBlock: 12 },
                      { appointments: 13, timeBlock: 14 },
                      { appointments: 10, timeBlock: 11 },
                  ]
                : []
        items[
            `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}`
        ] = dayValue
    })
    return items
}

export const AppointmentsListScreen: React.FunctionComponent<AppointmentsListScreenProps> = observer(
    props => {
        const { centerAppointments } = useStores()

        const today = new Date()
        // const items = emptyDatesGenerator()
        const signOut = () => {
            Alert.alert("Sign Out", "Are you sure you want to sign out?", [
                {
                    text: "cancel",
                },
                {
                    text: "Sign Out",
                    onPress: () =>
                        auth()
                            .signOut()
                            .then(res => props.navigation.popToTop()),
                },
            ])
        }

        const items = centerAppointments.appointmentsList.map(app => {
            const date = new Date(app.date)
            const dateStr = `${date.getFullYear()}-${(date.getMonth() + 1)
                .toString()
                .padStart(2, "0")}-${date
                .getDate()
                .toString()
                .padStart(2, "0")}`
            const hour = Number(app.time.split(":")[0])
            const hourStr = hour > 12 ? hour - 12 : hour
            return { ...app, date: dateStr, timeBlock: hourStr }
            // return { ...app, date: dateStr }
        })

        const appointmentDates = _.keys(_.groupBy(items, "date"))

        const appointmentMapping = {}
        appointmentDates.forEach(d => (appointmentMapping[d] = []))

        items.forEach(item => {
            appointmentMapping[item.date].push(item)
        })

        // TODO: fill in the missing dates with empties

        // console.log("Sorted", _.groupBy(items, "date"))

        console.log(centerAppointments.appointmentsList)
        return (
            <Screen style={ROOT} preset="scroll">
                <StatusBar backgroundColor="white" />

                <TouchableOpacity style={SIGNOUT_BTN} onPress={signOut}>
                    <Icon name="exit-to-app" size={26} />
                </TouchableOpacity>

                {/* <Button
                    style={{ alignSelf: "flex-end", padding: 0, margin: 0 }}
                    contentStyle={{ padding: 0, margin: 0 }}
                    labelStyle={{ padding: 0, margin: 0 }}
                    onPress={signOut}
                >
                    <Icon name="exit-to-app" size={26} />
                </Button> */}

                <Header style={{ marginTop: 0 }} headerText="Appointments List"></Header>

                <Agenda
                    // The list of items that have to be displayed in agenda. If you want to render item as empty date
                    // the value of date key has to be an empty array []. If there exists no value for date key it is
                    // considered that the date in question is not yet loaded
                    items={{
                        "2020-05-27": [{ appointments: 12, timeBlock: 12 }],
                        "2020-05-28": [{ appointments: 12, timeBlock: 12 }],
                        "2020-05-29": [{ appointments: 12, timeBlock: 12 }],
                        "2020-05-14": [
                            { appointments: 3, timeBlock: 10 },
                            { appointments: 2, timeBlock: 11 },
                            { appointments: 1, timeBlock: 14 },
                        ],
                        "2020-05-15": [{ appointments: 3, timeBlock: 10 }],
                        "2020-05-16": [{ appointments: 3, timeBlock: 9 }],
                    }}
                    // items={appointmentMapping}
                    // Callback that gets called when items for a certain month should be loaded (month became visible)
                    loadItemsForMonth={month => {
                        console.log("trigger items loading")
                    }}
                    // Callback that fires when the calendar is opened or closed
                    onCalendarToggled={calendarOpened => {
                        console.log(calendarOpened)
                    }}
                    // Callback that gets called on day press
                    onDayPress={day => {
                        console.log("day pressed")
                    }}
                    // Callback that gets called when day changes while scrolling agenda list
                    onDayChange={day => {
                        console.log("day changed")
                    }}
                    // Initially selected day
                    selected={new Date()}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    minDate={"2020-01-01"}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    maxDate={"2020-12-30"}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={3}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={3}
                    // Specify how each item should be rendered in agenda
                    renderItem={(item, firstItemInDay) => {
                        console.log("ITem: ", item)
                        return (
                            <TouchableOpacity
                                style={{
                                    backgroundColor: "white",
                                    flex: 1,
                                    borderRadius: 5,
                                    padding: 10,
                                    marginRight: 10,
                                    marginTop: firstItemInDay ? 37 : 17,
                                }}
                                onPress={() => props.navigation.navigate("appointment-extended")}
                            >
                                <Text>{friendlyFormatTimeBlock(item.timeBlock)}</Text>
                                <Text style={{ fontStyle: "italic" }}>
                                    {item.appointments} appointments in this block
                                </Text>
                            </TouchableOpacity>
                        )
                    }}
                    // Specify how each date should be rendered. day can be undefined if the item is not first in that day.
                    // renderDay={(day, item) => {
                    //     return <View />
                    // }}
                    // Specify how empty date content with no items should be rendered
                    renderEmptyDate={() => {
                        return (
                            <View
                                style={{
                                    height: 15,
                                    flex: 1,
                                    paddingTop: 30,
                                    borderBottomColor: "#ccc",
                                    borderBottomWidth: 1,
                                }}
                            />
                        )
                    }}
                    // Specify how agenda knob should look like
                    // renderKnob={() => {
                    //     return (
                    //         <React.Fragment>
                    //             <View
                    //                 style={{
                    //                     height: 3,
                    //                     borderRadius: 10,
                    //                     width: 20,
                    //                     marginBottom: 1,
                    //                     backgroundColor: color.palette.lightGrey,
                    //                 }}
                    //             />
                    //             <View
                    //                 style={{
                    //                     height: 3,
                    //                     borderRadius: 10,
                    //                     width: 10,
                    //                     marginBottom: 1,
                    //                     alignSelf: "center",
                    //                     backgroundColor: color.palette.lightGrey,
                    //                 }}
                    //             />
                    //             <View
                    //                 style={{
                    //                     height: 3,
                    //                     borderRadius: 10,
                    //                     width: 5,
                    //                     alignSelf: "center",
                    //                     backgroundColor: color.palette.lightGrey,
                    //                 }}
                    //             />
                    //         </React.Fragment>
                    //     )
                    // }}
                    // Specify what should be rendered instead of ActivityIndicator
                    // renderEmptyData={() => {
                    //     return <View />
                    // }}
                    // Specify your item comparison function for increased performance
                    rowHasChanged={(r1, r2) => {
                        return r1.appointments !== r2.appointments
                    }}
                    // Hide knob button. Default = false
                    // hideKnob={false}
                    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                    markedDates={{
                        "2020-04-25": { marked: true },
                        "2020-05-17": { marked: true },
                        "2012-05-18": { disabled: true },
                    }}
                    // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
                    disabledByDefault={true}
                    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                    onRefresh={() => console.log("refreshing...")}
                    // Set this true while waiting for new data from a refresh
                    refreshing={false}
                    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                    refreshControl={null}
                    // Agenda theme
                    theme={{
                        // ...calendarTheme,
                        agendaDayTextColor: color.palette.greyDarker,
                        agendaDayNumColor: color.primary,
                        agendaTodayColor: "red",
                        agendaKnobColor: color.palette.lighterGrey,
                    }}
                    // Agenda container style
                    style={{}}
                />

                <FAB
                    style={styles.fab}
                    small
                    icon="plus"
                    color="white"
                    onPress={() => props.navigation.navigate("respiratory-presentation")}
                />
            </Screen>
        )
    },
)

// FIXME: Group all the time slots automatically in order to have time block groupings
