import React from "react"
import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import { Button, Checkbox, Screen, Text } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { useVisitStore } from "../../models/addo-store"

const PatientConsent: React.FC = () => {
    const navigation = useNavigation()
    // const [state, setState] = React.useState(false)
    const [patientConsent, setState] = useVisitStore((state) => [
        state.patientConsent,
        state.updateVisit,
    ])

    const submitConsent = () => patientConsent && navigation.navigate("addo.VisitHistory")

    return (
        <Screen preset="scroll" titleTx="addo.consent.title" title="Patient Consent">
            <Spacer size={20} />
            <Text tx="addo.consent.title" bold size="h6">
                AfyaTek Program - Patient Consent
            </Text>
            <Spacer size={20} />

            <Text size="default" tx="addo.consent.body.1" lineHeight={18}>
                The following information describes the AfyaTek program. Please read it to your
                patient.
            </Text>
            <Spacer size={14} />
            <Text size="default" tx="addo.consent.body.2" lineHeight={20}>
                The AfyaTek program is seeking to improve health outcomes in Tanzania. This tool
                helps assess patient symptoms and provide guidelines for next steps. {`\n\n`}No
                personally identifying information will be collected from you during this symptom
                assessment. You do not have to participate in this study if you do not want to.{" "}
                {`\n\n`}If you would like to withdraw, you are able to do so at any time. If you
                have questions, please feel free to contact us directly.
            </Text>
            <Spacer size={10} />
            <View>
                <Checkbox
                    value={patientConsent}
                    onToggle={() => setState({ patientConsent: !patientConsent })}
                    multiline
                    tx="addo.consent.checkbox"
                    text="The patient or their guardian agrees to participate in this study and understands the information described above."
                />
            </View>
            <Spacer size={30} />
            <Button
                labelSize="default"
                disabled={!patientConsent}
                onPress={submitConsent}
                mode="contained"
                labelTx="addo.consent.continue"
                label="Continue"
            />
            <Spacer size={5} />
            <Button
                onPress={() => navigation.goBack()}
                mode="outlined"
                labelSize="default"
                labelTx="addo.consent.abort"
                label="Patient or guardian does not consent"
            />
        </Screen>
    )
}

export default PatientConsent
