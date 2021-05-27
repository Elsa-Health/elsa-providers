import React from "react"
import { render } from "@testing-library/react-native"
import { Card } from "./cards"
import { Text } from "../text/text"

test("it renders", () => {
    const { getByText } = render(
        <Card>
            <Text>Test Card</Text>
        </Card>,
    )
})
