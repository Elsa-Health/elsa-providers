import React, { Component, useState } from "react"
import { View, StyleSheet } from "react-native"
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import { stylesResponsive } from "../../theme"

interface RowProps {
    rowStyles?: StyleObj
    styles?: StyleObj
    justifyContent?:
        | "space-between"
        | "center"
        | "flex-start"
        | "flex-end"
        | "space-around"
        | "space-evenly"
}

const Row: React.FC<RowProps> = (props: any) => {
    const { children, rowStyles, styles, justifyContent = "flex-start" } = props
    return (
        <View style={[stylesResponsive.row, rowStyles, styles, { justifyContent }]}>
            {children}
        </View>
    )
}

export { Row }
