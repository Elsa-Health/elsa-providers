import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, TouchableOpacity, Alert } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
import { TextInput, Button, ActivityIndicator } from "react-native-paper"
import _ from "lodash"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import { useStores } from "../models/root-store"
import { color } from "../theme"
import { Picker } from "@react-native-community/picker"

export interface HospitalRecommendationScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
    route: {
        params: {
            symptoms?: {[symptom: string]: string}
        }
    }
}

const CONTAINER: ViewStyle = {
    padding: 10,
}

const ACTIVITY_INDICATOR: ViewStyle = {
    marginTop: "50%",
}

const months = [
    "january",
    "february",
    "march",
    "april",
    "may",
    "june",
    "july",
    "august",
    "september",
    "october",
    "november",
    "december",
]

export const HospitalRecommendationScreen: React.FunctionComponent<HospitalRecommendationScreenProps> = observer(
    props => {
        const rootState = useStores()
        const today = new Date()
        const [state, setstate] = React.useState({
            name: "",
            hospital: {},
            telephone: "+255",
            date: today.getDate(),
            month: today.getMonth(),
            year: today.getFullYear(),
            hour: today.getHours(),
            mins: 0,
        })

        const { application, centers } = rootState
        React.useEffect(() => {
            rootState.loadCenters()
        }, [])

        const submit = () => {
            rootState
                .referrToHospital({
                    name: state.name,
                    date: `${state.month + 1}/${state.date}/${state.year}`,
                    hospitalId: state.hospital.id,
                    telephone: state.telephone,
                    time: `${state.hour}:${state.mins}`,
                    symptoms: props.route.params.symptoms
                })
                .then(res => {
                    props.navigation.navigate("completed-referral")
                })
                .catch(error => {
                    console.log(error)
                    alert("There was an error making the referral")
                })
        }

        if (centers.loadingCenters) {
            return (
                <React.Fragment>
                    <ActivityIndicator style={ACTIVITY_INDICATOR} size={24} />
                    <View>
                        <Text align="center">Loading Centers ...</Text>
                    </View>
                </React.Fragment>
            )
        }

        console.log(props.route.params.symptoms)
        return (
            <Screen preset="scroll">
                <Header headerText="Hospital Referral" />
                <Text italic style={{ padding: 10, paddingTop: 0 }}>
                    If your patient needs to be referred to another hospital, please complete the
                    following information.
                </Text>

                <View style={CONTAINER}>
                    <TextInput
                        label="Patient Name"
                        value={state.name}
                        onChangeText={text => setstate({ ...state, name: text })}
                        mode="outlined"
                    />
                    <TextInput
                        label="Telephone Number"
                        value={state.telephone}
                        onChangeText={text => setstate({ ...state, telephone: text })}
                        keyboardType="phone-pad"
                        mode="outlined"
                    />
                    <HospitalSearch
                        centers={centers.centersList}
                        onSelect={hospital => {
                            setstate({ ...state, hospital })
                            console.log("HOSPITAL: ", hospital)
                        }}
                    />

                    <Text style={{ marginTop: 10 }}>Appointment Date</Text>
                    <View style={{ flexDirection: "row", marginBottom: 10 }}>
                        <Picker
                            selectedValue={state.date}
                            style={{ flex: 3 }}
                            onValueChange={(itemValue, itemIndex) =>
                                setstate({ ...state, date: +itemValue })
                            }
                        >
                            {_.times(31, n => n + 1).map(n => (
                                <Picker.Item key={n} label={n.toString()} value={n} />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={state.month}
                            style={{ flex: 4 }}
                            onValueChange={(itemValue, itemIndex) =>
                                setstate({ ...state, month: itemValue })
                            }
                        >
                            {_.times(12, n => n).map(n => (
                                <Picker.Item
                                    key={months[n]}
                                    label={_.upperFirst(months[n])}
                                    value={n}
                                />
                            ))}
                        </Picker>
                        <Picker
                            selectedValue={state.year}
                            style={{ flex: 3 }}
                            onValueChange={(itemValue, itemIndex) =>
                                setstate({ ...state, year: +itemValue })
                            }
                        >
                            {_.times(2, n => n + today.getFullYear()).map(n => (
                                <Picker.Item key={n} label={n.toString()} value={n} />
                            ))}
                        </Picker>
                    </View>

                    <Text>Appointment Time</Text>
                    <View style={{ flexDirection: "row" }}>
                        <Picker
                            selectedValue={state.hour}
                            style={{ flex: 3 }}
                            onValueChange={(itemValue, itemIndex) =>
                                setstate({ ...state, hour: +itemValue })
                            }
                        >
                            {_.times(24, n => n + 1).map(n => (
                                <Picker.Item key={n} label={`${n.toString()}:00`} value={n} />
                            ))}
                        </Picker>
                    </View>

                    <TextInput label="Notes" mode="outlined" />

                    <Button
                        mode="contained"
                        onPress={submit}
                        loading={application.loadingAssessments}
                        disabled={application.loadingAssessments}
                        style={{ marginTop: 30 }}
                    >
                        <Text color="white">Submit</Text>
                    </Button>
                </View>
            </Screen>
        )
    },
)

const hospitalsList = [
    {
        name: "Amana Hospital",
        location: {},
        address: "Posta, Kariakoo",
        id: "897ru8-23897409",
    },
    {
        name: "Muhimbili Hospital",
        location: {},
        address: "Upanga, Kariakoo",
        id: "j02fw-j0f2imk",
    },
    {
        name: "Herbert Kairuki Hospital",
        location: {},
        address: "Mikocheni A",
        id: "9hfuwn-23897409",
    },
    {
        name: "Mwananyamala Hospital",
        location: {},
        address: "Mwananyamala",
        id: "897ru8-829hfuewn",
    },
]

interface HospitalSearchProps {
    onSelect: Function
    centers: any[]
}

const HospitalSearch: React.FC<HospitalSearchProps> = ({ onSelect, centers }) => {
    const [search, setsearch] = React.useState("")
    const [selectedHospital, sethospital] = React.useState({})
    return (
        <View>
            <TextInput
                value={search}
                mode="outlined"
                onChangeText={text => setsearch(text)}
                label="Hospital Name"
            />

            <View>
                {_.map(
                    centers.filter(({ name }) => {
                        if (search.length > 2) {
                            return name.toLowerCase().includes(search.toLowerCase())
                        }
                        return name === selectedHospital.name
                    }),
                    (hospital, index, collection) => (
                        <TouchableOpacity
                            key={hospital.name}
                            onPress={() => {
                                setsearch(hospital.name)
                                sethospital(hospital)
                                onSelect(hospital)
                            }}
                            style={{
                                padding: 10,
                                borderBottomWidth: index + 1 === collection.length ? 0 : 1,
                                paddingBottom: 15,
                                borderBottomColor: color.palette.lighterGrey,
                                flexDirection: "row",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}
                        >
                            <View>
                                <Text>{hospital.name}</Text>
                                <Text>{hospital.address}</Text>
                            </View>

                            {selectedHospital.name === hospital.name && (
                                <View>
                                    <Icon name="check-decagram" size={24} color="green" />
                                </View>
                            )}
                        </TouchableOpacity>
                    ),
                )}
            </View>
        </View>
    )
}
