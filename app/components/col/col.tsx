import React, { Component, useState } from "react"
import { View } from "react-native"
import type { StyleObj } from "react-native/Libraries/StyleSheet/StyleSheetTypes"
import { stylesResponsive, color } from "../../theme"

interface ColProps {
    xs?: string | number
    sm?: string | number
    md?: string | number
    lg?: string | number
    colStyles?: StyleObj
    marginVertical?: number
    marginTop?: number
    marginBottom?: number
    paddingVertical?: number
    bordered?: boolean // Determines whether to border the top and bottom of the section
}

const Col: React.FC<ColProps> = ({
    children,
    xs,
    sm,
    md,
    lg,
    marginVertical,
    marginBottom = 0,
    marginTop = 0,
    paddingVertical,
    bordered,
    colStyles,
}) => {
    // state data
    const [state, setState] = useState({
        styles: stylesResponsive,
    })
    // grab the props

    const { styles } = state
    const columns_xs = "col_" + xs
    const columns_sm = "col_sm_" + sm
    const columns_md = "col_md_" + md
    const columns_lg = "col_lg_" + lg

    return (
        <View
            style={[
                styles[columns_xs],
                styles[columns_sm],
                styles[columns_md],
                styles[columns_lg],
                marginVertical ? { marginVertical } : { marginTop, marginBottom },
                paddingVertical && { paddingVertical },
                bordered && {
                    borderTopWidth: 1,
                    borderBottomWidth: 1,
                    borderColor: color.offWhiteBackground,
                },
                colStyles,
            ]}
        >
            {children}
        </View>
    )
}

export { Col }
