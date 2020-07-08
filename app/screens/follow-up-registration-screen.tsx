import * as React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View, Dimensions } from "react-native"
import { ParamListBase } from "@react-navigation/native"
import { NativeStackNavigationProp } from "react-native-screens/native-stack"
import { Screen, Text, Header } from "../components"
import PlacesInput from "react-native-places-input"
import { useStores } from "../models/root-store"
import { color } from "../theme"
import { Button, TextInput } from "react-native-paper"

export interface FollowUpRegistrationScreenProps {
    navigation: NativeStackNavigationProp<ParamListBase>
}

const { height } = Dimensions.get("window")

const CONTAINER: ViewStyle = {
    padding: 10,
}

export const FollowUpRegistrationScreen: React.FunctionComponent<FollowUpRegistrationScreenProps> = observer(
    props => {
        const [state, setstate] = React.useState({
            address: {},
            telephone: "+255",
            yearOfBirth: "1990",
        })
        const rootStore = useStores()
        const setLocation = (address: { [k: string]: any }) => {
            console.log(address)
            setstate({ ...state, address })
        }
        const subscribe = () => {
            rootStore
                .subscribeToFollowUp(state.telephone, state.address, state.yearOfBirth, null)
                .then(res => props.navigation.navigate("completed-follow-up-subscription"))
        }
        return (
            <View style={{ height }}>
                <Header headerText="Follow Up Registration" />
                <Text italic style={{ padding: 10, paddingTop: 0 }}>
                    Your patient will be asked to input their symptoms every day for 14 days.
                </Text>

                <View style={CONTAINER}>
                    <TextInput
                        mode="outlined"
                        value={state.telephone}
                        style={{ marginBottom: 15 }}
                        onChangeText={text => setstate({ ...state, telephone: text })}
                        label="Telephone (+255)"
                    />

                    <TextInput
                        mode="outlined"
                        value={state.yearOfBirth}
                        style={{ marginBottom: 15 }}
                        keyboardType="number-pad"
                        onChangeText={text => setstate({ ...state, yearOfBirth: text })}
                        label="Mwaka wa kuzaliwa"
                    />

                    <LocationSearch onChooseLocation={setLocation} />

                    <Button mode="contained" style={{ marginTop: 30 }} onPress={subscribe}>
                        <Text color="white">Submit</Text>
                    </Button>
                </View>
            </View>
        )
    },
)

const styles = {
    wrapper: { height: 60 },
    locationInput: {
        borderWidth: 1,
        borderRadius: 5,
        borderColor: color.palette.greyDarker,
        marginLeft: 0,
        margin: 0,
    },
    container: {
        marginLeft: 0,
        margin: 0,
    },
}

const LocationSearch: React.FC<{ onChooseLocation: Function }> = ({ onChooseLocation }) => {
    return (
        <View>
            <Text text="Patient Location" />
            <View style={styles.wrapper}>
                <PlacesInput
                    googleApiKey="AIzaSyDg5i6wGVF2TXN-sRhQCqGX8zWQzyG3Oe4"
                    queryCountries={["tz"]}
                    placeHolder="Search by name"
                    stylesContainer={styles.container}
                    stylesInput={styles.locationInput}
                    onSelect={(place: any) => onChooseLocation(place.result)}
                />
            </View>
        </View>
    )
}
