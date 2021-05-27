import React, { useEffect } from "react"
import { ToastAndroid } from "react-native"
import { Button, Screen, Text } from "../../components"
import Spacer from "../../components/spacer/spacer"
import { useAuthenticationStore } from "../../models/ctc-store"
import { CodeScannerView } from "./ScanQRCode"
import _ from "lodash"
import { changeLanguage, translate } from "../../i18n"
import { useLocale } from "../../models/language"

const CTCAuthenticator = () => {
    const authStore = useAuthenticationStore()
    // const [locale, setLocale] = useLocale((state) => [state.locale, state.setLocale])
    const onSuccess = async (data) => {
        const fieldNames = [
            "version",
            "id",
            "firstName",
            "lastName",
            "role",
            "telephone",
            "facilityName",
            "city",
            "facilityId",
        ]
        const QRInfo = data.split("|")

        const info = {}

        fieldNames.forEach((name, idx) => (info[name] = QRInfo[idx]))

        // console.log(info)

        if (Array.isArray(QRInfo) && QRInfo.length > 2 && info.facilityName && info.version) {
            authStore.setAuthenticated(true, info)

            ToastAndroid.show(
                "Welcome " + _.upperFirst(info.firstName) + " " + _.upperFirst(info.lastName),
                ToastAndroid.SHORT,
            )
        } else {
            authStore.setAuthenticated(false, {})
        }
    }

    


    return (
        <Screen preset="scroll" title={"Scan Your Card"}>
            <Spacer size={20} />
            {/* <Button label={"Change " + locale} onPress={() => setLocale(locale === "sw" ? "en" : "sw")} /> */}
            <Text tx="authenticator.subtitle">
                Please scan the QR code on your ID card.
            </Text>

            <CodeScannerView onScan={onSuccess} />
        </Screen>
    )
}

export default CTCAuthenticator
