import React from "react"
import { render } from "@testing-library/react-native"
import { Button } from "./button"

test("it renders", () => {
    const mockFn = jest.fn()
    const { getByText } = render(<Button onPress={mockFn} label="Test Button" labelSize="h6" />)
})
