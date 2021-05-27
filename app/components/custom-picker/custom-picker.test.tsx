import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import CustomPicker from "./custom-picker"
import { pickerOptionsFromList } from "../../common/utils"

test("it renders and selects one of the given options", () => {
    const mockFn = jest.fn()
    const { getByTestId } = render(
        <CustomPicker
            onChange={mockFn}
            options={pickerOptionsFromList(["one", "two", "three"])}
            selectedValue="one"
        />,
    )

    fireEvent(getByTestId("customPicker"), "onValueChange", { value: "test" })
    expect(mockFn).toHaveBeenCalled()
})
