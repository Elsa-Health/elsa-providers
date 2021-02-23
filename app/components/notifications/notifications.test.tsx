import React from "react"
import { render } from "@testing-library/react-native"
import { Notification } from "./notifications"

test("it renders", () => {
    const { getByText } = render(
        <Notification title="Test Notification" onPress={() => {}} variation="info" />,
    )
})
