import React, { useState } from "react"
import { StyleSheet } from "react-native"
import { Screen } from "../../components"

const binaryOptions = [
    { label: "Yes", value: true },
    { label: "No", value: false },
]

const PatientNewVisit: React.FC = () => {
    // console.log("Testing zustand state : ", isPatientNew)
    return <Screen preset="scroll" title="Patient Information"></Screen>
}

const styles = StyleSheet.create({
    buttonCard: {
        elevation: 3,
    },
    cardContent: {
        alignItems: "center",
        paddingVertical: 25,
    },
})

export default PatientNewVisit
