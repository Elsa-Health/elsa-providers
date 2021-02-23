import { StackActions, useNavigation } from "@react-navigation/native"
import React from "react"
import { View, Dimensions } from "react-native"
import ReferIcon from "../../assets/icons/refer-patient.svg"
import { Text, Screen, Button } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { useVisitStore } from "../../models/addo-store"

const { height } = Dimensions.get("window")

const ReferPatient: React.FC = () => {
    const navigation = useNavigation()
    const [resetVisit] = useVisitStore((state) => [state.resetVisit])
    const complete = () => {
        resetVisit()
        navigation.reset({ index: 0, routes: [{ name: "addo.Dashboard" }] })
    }
    return (
        <Screen preset="scroll" titleTx="addo.referYourPatient.title" title="Refer Your Patient">
            <Spacer size={height / 10} />
            <View style={{ alignItems: "center" }}>
                <ReferIcon />
            </View>
            <Spacer size={40} />
            <Text size="h5" bold tx="addo.referYourPatient.heading">
                Your patient has a critical danger sign and needs to seek medical attention at a
                hospital immediately.
            </Text>
            <Spacer size={20} />

            <Text size="h6" tx="addo.referYourPatient.subHeading">
                Please refer them to the nearest facility for care.
            </Text>
            <Spacer size={20} />

            <Text size="h6" tx="addo.referYourPatient.endAssessment">
                This will end your patient's assesment.
            </Text>

            <Spacer size={20} />
            <Button
                labelSize="default"
                onPress={complete}
                labelTx="addo.referYourPatient.completeAssessment"
                label="Complete Assessment"
                mode="contained"
            />
        </Screen>
    )
}

export default ReferPatient
