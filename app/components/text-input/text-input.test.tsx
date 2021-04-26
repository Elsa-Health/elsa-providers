import React from "react"
import { render } from "@testing-library/react-native"
import { TextInput } from "./text-input"

test("it renders without blowing up", () => {
    const mockFn = jest.fn()
    const { getByTestId } = render(
        <TextInput onChangeText={mockFn} />,
    )
})
