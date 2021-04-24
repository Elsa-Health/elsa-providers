import React from "react"
import { View } from "react-native"

interface SpacerProps {
    horizontal?: boolean
    size: number | string
}

const Spacer: React.FC<SpacerProps> = ({ horizontal, size }) => {
    return (
        <View
            style={{
                flexDirection: horizontal ? "row" : "column",
                height: horizontal ? "auto" : size,
                width: horizontal ? size : "auto",
            }}
        />
    )
}

export default Spacer
