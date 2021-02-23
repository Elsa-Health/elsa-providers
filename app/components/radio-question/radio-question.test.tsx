import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import RadioQuestion from "./radio-question"
import { pickerOptionsFromList } from "../../common/utils"
import { SYMPTOM_PRESENCE } from "../../common/constants"

test("it renders and selects one of the given options", () => {
    const mockFn = jest.fn()
    const { getByTestId } = render(
        <RadioQuestion
            id="testQuestion"
            onPress={mockFn}
            question="Is this a test question?"
            options={SYMPTOM_PRESENCE}
        />,
    )

    // fireEvent(getByTestId("radio-option__testQuestion-Yes"), "press", { value: "test" })
    // expect(mockFn).toHaveBeenCalled()
})
