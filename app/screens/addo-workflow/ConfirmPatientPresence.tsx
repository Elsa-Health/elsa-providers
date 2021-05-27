import React from "react"
import PatientConfirmationImg from "../../assets/icons/confirmation.svg"
import { Dimensions } from "react-native"
import { Button, Screen, Text } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { useNavigation } from "@react-navigation/native"

const { width, height } = Dimensions.get("window")

const ConfirmPatientPresence: React.FC = () => {
    const navigation = useNavigation()
    const goToConsent = React.useCallback(() => navigation.navigate("addo.PatientConsent"), [])
    return (
        <Screen preset="scroll" titleTx="addo.confirmation.title" title="Confirmation">
            <PatientConfirmationImg style={{ marginVertical: height / 15, alignSelf: "center" }} />
            <Text bold tx="addo.confirmation.pleaseConfirm">
                Please confirm the following:
            </Text>
            <Spacer size={20} />
            <Text tx="addo.confirmation.confirmationBody">
                Is the patient for whom you are completing this symptom assessment present in your
                ADDO now/during the time of this assessment?
            </Text>

            <Spacer size={30} />
            <Button
                onPress={goToConsent}
                mode="contained"
                labelSize="default"
                labelTx="addo.confirmation.presentPatient"
                label="Patient is present"
            />
            <Spacer size={5} />
            <Button
                onPress={navigation.goBack}
                mode="outlined"
                labelSize="default"
                labelTx="addo.confirmation.absentPatient"
                label="Patient is NOT present"
            />
        </Screen>
    )
}

ConfirmPatientPresence.whyDidYouRender = true

export default ConfirmPatientPresence
