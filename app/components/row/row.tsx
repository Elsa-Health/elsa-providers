import React, { Component, useState } from "react"
import { View, StyleSheet } from "react-native"
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import { stylesResponsive } from "../../theme"

interface RowProps {
    rowStyles?: StyleObj
    styles?: StyleObj
    marginVertical?: number
    justifyContent?:
        | "space-between"
        | "center"
        | "flex-start"
        | "flex-end"
        | "space-around"
        | "space-evenly"
    alignContent?:
        | "space-between"
        | "center"
        | "flex-start"
        | "flex-end"
        | "space-around"
        | "space-evenly"
    alignItems?: "center" | "flex-start" | "flex-end" | "baseline" | "stretch"
}

const Row: React.FC<RowProps> = (props: any) => {
    const {
        children,
        rowStyles,
        styles,
        justifyContent = "flex-start",
        alignContent = "flex-start",
        alignItems = "flex-start",
        marginVertical = 2,
    } = props
    return (
        <View
            style={[
                stylesResponsive.row,
                rowStyles,
                styles,
                { justifyContent, alignContent, alignItems, marginVertical },
            ]}
        >
            {children}
        </View>
    )
}

export { Row }
