import React from "react"
import { render } from "@testing-library/react-native"
import ExtendedDatePicker from "./extended-date-picker"

test("it renders", () => {
    const mockFn = jest.fn()
    const { getByTestId } = render(
        <ExtendedDatePicker onDateSet={mockFn} label="This is the test title for my date picker" />,
    )
})
