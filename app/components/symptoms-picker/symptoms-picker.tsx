import React from "react"
import { View } from "react-native"
import SearchAndSelectBar from "../search-and-select-bar/search-and-select-bar"

const SymptomsPicker: React.FC = ({}) => {
    const [selectedSymptoms, setSelectedSymptoms] = React.useState([])

    return (
        <View>
            <SearchAndSelectBar options={["fever", "cough"]} selectedOptions={[]} toggleOption={() => {}} />
        </View>
    )
}

export { SymptomsPicker }